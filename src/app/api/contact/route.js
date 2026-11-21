import { isIP } from "node:net";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { contactEmail, contactFields, validateContactField } from "@/components/contact/email";

const maximumBodySize = 16 * 1024;
const clientLimit = new RateLimiterMemory({ points: 5, duration: 900 });
const instanceLimit = new RateLimiterMemory({ points: 50, duration: 900 });
const unavailable = "The contact form is temporarily unavailable. Please use the direct email link.";
const failed = "Your message could not be confirmed. Try again or use the direct email link.";
const submissionIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readSubmission(request) {
  if (!request.body) return { status: 400, error: "Enter a message to continue." };
  if (Number(request.headers.get("content-length")) > maximumBodySize) {
    return { status: 413, error: "This message is too large." };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";

  try {
    for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
      bytes += chunk.value.byteLength;
      if (bytes > maximumBodySize) {
        await reader.cancel();
        return { status: 413, error: "This message is too large." };
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    return { data: JSON.parse(text + decoder.decode()) };
  } catch {
    return { status: 400, error: "The message could not be read." };
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin &&
      request.headers.get("sec-fetch-site") !== "same-origin") {
    return Response.json({ error: "Open the Contact page to send a message." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ error: "The message must be submitted as JSON." }, { status: 415 });
  }

  const submission = await readSubmission(request);
  if (submission.error) return Response.json({ error: submission.error }, { status: submission.status });
  const { data } = submission;
  if (!data || typeof data !== "object" || Array.isArray(data) || typeof data.submissionId !== "string" || !submissionIdPattern.test(data.submissionId)) {
    return Response.json({ error: "The message could not be read." }, { status: 400 });
  }

  if (data.companyWebsite) return Response.json({ ok: true });

  const values = Object.fromEntries(contactFields.map(({ name }) => [
    name, typeof data[name] === "string" ? data[name].trim() : "",
  ]));
  const fieldErrors = Object.fromEntries(contactFields.map((field) => [
    field.name, validateContactField(field, values[field.name]),
  ]).filter(([, result]) => result !== true));
  if (Object.keys(fieldErrors).length) return Response.json({ fieldErrors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) return Response.json({ error: unavailable }, { status: 503 });

  const forwarded = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  const address = request.ip || request.headers.get("x-real-ip") || forwarded || "";
  try {
    await clientLimit.consume(isIP(address) ? address : "unknown");
    await instanceLimit.consume("all");
  } catch (limit) {
    const seconds = Math.max(1, Math.ceil((limit.msBeforeNext || 900000) / 1000));
    return Response.json({ error: "Too many messages. Please wait before trying again." }, {
      status: 429,
      headers: { "Retry-After": String(seconds) },
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-contact/${data.submissionId}`,
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL?.trim() || contactEmail],
        reply_to: values.email,
        subject: "New portfolio contact message",
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });

    if (!response.ok) {
      console.error("Contact email provider rejected the request", response.status);
      return Response.json({ error: failed }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    console.error("Contact email provider request failed");
    return Response.json({ error: failed }, { status: 502 });
  }
}
