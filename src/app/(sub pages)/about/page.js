import PageIntro from "@/components/PageIntro";
import MotionHeading from "@/components/MotionHeading";
import AboutScene from "@/components/about/AboutScene";
import Link from "next/link";
import AboutDetails from "@/components/about";
import { resumeUrl } from "../../navigation";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About" description="My background, skills, and the tools I use to build for the web and mobile." />
      <div className="space-y-6">
        <section aria-labelledby="about-title" className="grid items-stretch overflow-hidden rounded-3xl border border-white/15 bg-black/65 backdrop-blur-md md:grid-cols-[1.15fr_1fr]">
          <div className="px-6 py-9 sm:p-10 lg:p-14">
            <MotionHeading as="h2" id="about-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ayanda Kweyama
            </MotionHeading>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              I&apos;m a software developer and UI/UX designer. I studied ICT at the University of Mpumalanga and bring a background in graphic design and mobile development to my work.
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-white/70">
              I build web and mobile applications with React, Next.js, and Kotlin, with a focus on how they look, feel, and work.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg bg-[#dbc2ac] px-4 font-semibold text-black hover:bg-[#efdbc9]">
                Get in touch
              </Link>
              <a href={resumeUrl} download className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-4 text-white hover:bg-white/10">
                Download resume
              </a>
            </div>
          </div>
          <AboutScene />
        </section>
        <AboutDetails />
        <Link href="/certifications" className="inline-flex min-h-11 items-center text-[#dbc2ac] underline underline-offset-4">Explore my certifications</Link>
      </div>
    </>
  );
}
