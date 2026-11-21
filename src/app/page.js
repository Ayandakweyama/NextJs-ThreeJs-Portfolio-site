import Link from "next/link";
import MotionHeading from "@/components/MotionHeading";
import HeroScene from "@/components/HeroScene";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectsData } from "./data";
import { resumeUrl } from "./navigation";

export default function Home() {
  const featuredProjects = projectsData
    .filter(({ featuredOrder }) => featuredOrder !== undefined)
    .sort((first, second) => first.featuredOrder - second.featuredOrder);

  return (
    <main id="main-content" className="bg-gradient-to-b from-black/10 via-black/25 to-black/75">
      <section className="overflow-hidden">
        <div className="home-hero-grid mx-auto grid max-w-7xl items-center gap-5 px-5 pb-3 pt-9 sm:px-8 sm:pb-8 sm:pt-12 lg:gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-10">
          <div className="text-center lg:text-left">
            <MotionHeading className="hero-name mx-auto max-lg:max-w-[min(100%,10ch)] lg:mx-0">Ayanda Kweyama</MotionHeading>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-xl lg:mx-0 lg:mt-5 lg:text-white/80">
              Full-stack developer building practical web apps and interactive experiences.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 min-[360px]:gap-2.5 sm:gap-4 lg:mt-8 lg:justify-start">
              <Link href="/projects" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg bg-[#dbc2ac] px-3 py-2.5 text-[13px] min-[360px]:px-3.5 min-[360px]:text-sm font-semibold text-black hover:bg-[#efdbc9] sm:px-5 sm:py-3 sm:text-base">
                View projects
              </Link>
              <a href={resumeUrl} download className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg border border-white/35 bg-black/40 px-3 py-2.5 text-[13px] min-[360px]:px-3.5 min-[360px]:text-sm font-medium text-white hover:bg-white/15 sm:px-5 sm:py-3 sm:text-base">
                Download resume
              </a>
            </div>
          </div>
          <HeroScene />
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-5 pb-12 pt-7 sm:px-8 sm:py-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <MotionHeading as="h2" id="featured-heading" className="text-3xl font-semibold tracking-tight">Featured projects</MotionHeading>
          <Link href="/projects" className="text-sm font-medium text-[#dbc2ac] underline underline-offset-4">Browse all projects</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>
    </main>
  );
}
