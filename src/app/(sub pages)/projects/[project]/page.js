import MotionHeading from "@/components/MotionHeading";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projectsData } from "../../../data";

function findProject(key) {
  return projectsData.find(({ id, slug }) => (slug ?? String(id)) === key);
}

export function generateStaticParams() {
  return projectsData.map(({ id, slug }) => ({ project: slug ?? String(id) }));
}

export function generateMetadata({ params }) {
  const project = findProject(params.project);
  return project ? { title: project.name, description: project.summary ?? project.description } : {};
}

export default function CaseStudy({ params, searchParams }) {
  const project = findProject(params.project);
  if (!project) notFound();

  const { name, description, date, demoLink, imageUrls, category, caseStudy } = project;
  const backHref = searchParams.category === category ? `/projects?category=${category}` : "/projects";
  const externalLabel = new URL(demoLink, "https://example.com").hostname;
  const actionLabel = externalLabel === "github.com" ? "View source" : externalLabel.endsWith("figma.com") ? "Open in Figma" : "Visit live project";

  return (
    <article className="w-full max-w-5xl">
      <Link href={backHref} className="inline-flex min-h-11 items-center gap-2 font-medium text-[#dbc2ac] hover:underline">
        <ArrowLeft size={18} aria-hidden="true" /> Back to projects
      </Link>
      <header className="mb-8 mt-5 max-w-3xl">
        <time dateTime={date} className="text-sm text-white/60">{date.slice(0, 4)}</time>
        <MotionHeading className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">{name}</MotionHeading>
        <p className="mt-5 text-lg leading-relaxed text-white/80">{description}</p>
        {demoLink !== "#" && (
          <a href={demoLink} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#dbc2ac] px-4 font-semibold text-black hover:bg-[#efdbc9]">
            {actionLabel} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        )}
      </header>
      {caseStudy && (
        <dl className="mb-10 grid gap-5 rounded-2xl border border-white/15 bg-[#141211] p-6 sm:grid-cols-3">
          {[["What I built", caseStudy.build], ["Design decision", caseStudy.decision], ["Result", caseStudy.outcome]].map(([label, detail]) => (
            <div key={label}>
              <dt className="font-semibold text-white">{label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/75">{detail}</dd>
            </div>
          ))}
        </dl>
      )}
      <section aria-labelledby="screenshots-heading">
        <MotionHeading as="h2" id="screenshots-heading" className="mb-4 text-2xl font-semibold">Screenshots</MotionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {imageUrls.map((src, index) => (
            <a key={src} href={src} aria-label={`Open ${name} screenshot ${index + 1} full size`}
              className="relative block aspect-video overflow-hidden rounded-xl border border-white/15 bg-[#141211] hover:border-[#dbc2ac]">
              <Image src={src} alt={`${name} screenshot ${index + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-contain" />
            </a>
          ))}
        </div>
      </section>
      <Link href="/contact" className="mt-10 inline-flex min-h-11 items-center font-medium text-[#dbc2ac] underline underline-offset-4">
        Get in touch
      </Link>
    </article>
  );
}
