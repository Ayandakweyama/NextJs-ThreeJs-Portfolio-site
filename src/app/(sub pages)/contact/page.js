import { Mail } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import MotionHeading from "@/components/MotionHeading";
import Form from "@/components/contact/Form";
import { contactEmail } from "@/components/contact/email";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageIntro title="Contact" description="Get in touch about a project, a role, or a collaboration." />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-white/15 bg-black/65 p-5 backdrop-blur-md sm:p-8" aria-labelledby="contact-message-heading">
          <MotionHeading as="h2" id="contact-message-heading" className="text-2xl font-semibold">Write a message</MotionHeading>
          <p className="mb-6 mt-2 text-sm leading-relaxed text-white/75">Tell me what you have in mind and leave an email address so I can reply.</p>
          <Form />
        </section>
        <aside className="relative min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-black/65 p-5 backdrop-blur-md sm:p-8">
          <Mail size={22} aria-hidden="true" className="mb-4 text-[#dbc2ac]" />
          <MotionHeading as="h2" className="text-2xl font-semibold">Email me directly</MotionHeading>
          <p className="mt-2 text-sm leading-relaxed text-white/75">Use your email app if you prefer or need to attach files.</p>
          <a className="mt-3 inline-flex min-h-11 items-center break-all text-[#dbc2ac] underline underline-offset-4" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </aside>
      </div>
    </>
  );
}
