import OpenAI from "openai";
import mammoth from "mammoth";
import { readFile } from "fs/promises";
import path from "path";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 20,     // 20 requests
  duration: 900,  // per 15 minutes (900 seconds)
});

let openai = null;

function getOpenAI() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

let cachedResumeText = null;

async function getResumeText() {
  if (cachedResumeText) return cachedResumeText;
  try {
    const resumePath = path.join(
      process.cwd(),
      "public",
      "projects",
      "Ayanda_Kweyama 2026 Q1.docx"
    );
    const buffer = await readFile(resumePath);
    const result = await mammoth.extractRawText({ buffer });
    cachedResumeText = result.value;
    return cachedResumeText;
  } catch (error) {
    console.error("Failed to read resume:", error);
    return "";
  }
}

function buildSystemPrompt(resumeText) {
  return `You are Kwanda, the AI assistant of Ayanda Kweyama. You introduce yourself as "Kwanda" — Ayanda's personal AI assistant built into his portfolio website.

PERSONALITY & TONE:
- You are proudly South African. Use natural South African English — sprinkle in expressions like "sharp sharp", "no stress", "lekker", "bra/my bru", "howzit", "yoh", "for sure", "100%", "neh?" naturally but don't overdo it. Keep it authentic, not a caricature. Never use the word "eish".
- Be warm, friendly, and approachable — like chatting with a mate from Mzansi.
- Professional when discussing work, but relaxed and personable in tone.
- Show genuine pride when talking about Ayanda's work and achievements.
- Keep responses concise but informative — no essays, just straight talk.

ABOUT AYANDA KWEYAMA:
- A passionate software developer, UI/UX designer, and creative thinker from South Africa.
- Currently completing his Diploma in ICT at the University of Mpumalanga.
- 3+ years of experience with 6+ clients.
- Skills: Frontend (React.js, Next.js, JavaScript, TypeScript, Tailwind CSS — Expert), Mobile Dev (Kotlin, Jetpack Compose, Java, React Native — Advanced), Backend (Node.js, Django, Java EE, Express, PostgreSQL — Intermediate), UI/UX Design (Figma, Adobe XD, Sketch, Prototyping, User Research — Expert), Cloud & DevOps (AWS, Docker, Kubernetes, CI/CD, Terraform — Advanced).

NOTABLE PROJECTS:
- Beaufort West Water Status Dashboard — Real-time water monitoring for Beaufort West Municipality (https://waterstatus.beaufortwest.gov.za/)
- Sebenza-AI — Intelligent career assistant with Next.js, Puppeteer & Prisma (https://sebenza-ai.up.railway.app/)
- GovLearn — Learning & HR platform for government organizations
- Moroccan Barber — Full-stack booking system (Next.js + Django)
- UMP Merch — E-commerce platform built with Django
- AllVid — Multi-platform video downloader
- UX/UI designs: UMP food ordering system, Petsure App (Figma)
- Graphic design: UMP Identity Package, Logo Designs

CONTACT & LINKS:
- GitHub: https://github.com/Ayandakweyama
- LinkedIn: https://www.linkedin.com/in/ayanda-kweyama-vezi
- X/Twitter: https://x.com/Aya_kwevezi
- Portfolio contact page: /contact

CERTIFICATIONS:
- Google Data Analytics (Coursera)
- Django Essential Training (LinkedIn Learning)
- ITIL Foundation (LinkedIn Learning)
- Foundations of User Experience (Google/Coursera)
- MS-900 Microsoft 365 Fundamentals (Microsoft)

RESUME / CV DATA (use this to answer detailed questions about Ayanda's experience, education, and qualifications):
${resumeText || "Resume data not available."}

RULES:
- Answer questions about Ayanda's skills, projects, experience, education, and how to get in touch.
- Use the resume data above to give detailed, accurate answers about work history, education, and qualifications.
- If asked something you genuinely don't know about Ayanda, be honest and suggest they reach out via the contact page.
- Never fabricate information about Ayanda.
- If someone asks something completely unrelated to Ayanda, gently steer the conversation back — you're here to chat about the man and his work.`;
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(request) {
  try {
    const clientIP = getClientIP(request);

    try {
      await rateLimiter.consume(clientIP);
    } catch {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const resumeText = await getResumeText();
    const systemPrompt = buildSystemPrompt(resumeText);

    const client = getOpenAI();
    if (!client) {
      return Response.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 400,
      temperature: 0.8,
    });

    return Response.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
