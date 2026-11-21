"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { contactFields, validateContactField } from "./email";

const inputClasses = "w-full rounded-lg border border-white/20 bg-black/45 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#dbc2ac]";
const buttonClasses = "rounded-lg bg-[#dbc2ac] px-5 py-3 font-semibold text-black hover:bg-[#efdbc9] disabled:opacity-60";

export default function Form() {
  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm();
  const [feedback, setFeedback] = useState(null);
  const pending = useRef(null);

  async function submit(values) {
    setFeedback(null);
    const payload = JSON.stringify(values);

    try {
      if (pending.current?.payload !== payload) {
        pending.current = { payload, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ ...values, submissionId: pending.current.id }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([name, message], index) => {
            setError(name, { type: "server", message }, { shouldFocus: index === 0 });
          });
        } else {
          setFeedback({ error: true, text: result.error || "Could not send your message. Try again or email me directly." });
        }
        return;
      }
      pending.current = null;
      reset();
      setFeedback({ text: "Thanks. Your message was submitted." });
    } catch {
      setFeedback({ error: true, text: "Could not confirm your message. Try again or email me directly." });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit, () => setFeedback(null))} noValidate className="flex w-full flex-col gap-4">
      {contactFields.map((field) => {
        const { name, label, max } = field;
        const id = `contact-${name}`;
        const error = errors[name];
        const shared = {
          ...register(name, {
            setValueAs: (value) => value.trim(),
            validate: (value) => validateContactField(field, value),
          }),
          id,
          maxLength: max,
          className: inputClasses,
          "aria-required": true,
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? `${id}-error` : undefined,
          readOnly: isSubmitting,
        };

        return (
          <div key={name}>
            <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
            {name === "message" ? (
              <textarea {...shared} rows={6} />
            ) : (
              <input {...shared} type={name === "email" ? "email" : "text"} autoComplete={name} />
            )}
            {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-200">{error.message}</p>}
          </div>
        );
      })}
      <div hidden aria-hidden="true">
        <label htmlFor="contact-company-website">Company website</label>
        <input id="contact-company-website" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
      </div>
      <button type="submit" disabled={isSubmitting} className={buttonClasses}>
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      {feedback && <p role={feedback.error ? "alert" : "status"} className={feedback.error ? "text-sm text-red-200" : "text-sm text-green-200"}>{feedback.text}</p>}
    </form>
  );
}
