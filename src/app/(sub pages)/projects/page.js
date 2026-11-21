import PageIntro from "@/components/PageIntro";
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectsData } from "../../data";

export const metadata = { title: "Projects" };

const categories = [
  { value: "all", label: "All" },
  { value: "development", label: "Development" },
  { value: "uxui", label: "UX/UI" },
  { value: "graphic", label: "Graphic" },
];

export default function Projects({ searchParams }) {
  const active = categories.find(({ value }) => value === searchParams.category)?.value ?? "all";
  const projects = projectsData.filter(({ category }) => active === "all" || active === category);

  return (
    <>
      <section>
        <PageIntro title="Projects" description="A selection of full-stack applications, interface design, and visual identity work." />
        <nav aria-label="Project categories" className="mb-6 flex flex-wrap gap-2">
          {categories.map(({ value, label }) => (
            <Link key={value} href={value === "all" ? "/projects" : `/projects?category=${value}`}
              scroll={false} aria-current={active === value ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium ${active === value ? "border-[#dbc2ac] bg-[#dbc2ac] text-black" : "border-white/25 bg-black/60 text-white/80 hover:bg-white/15"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} categoryFilter={active === "all" ? undefined : active} />)}
        </div>
        <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center text-[#dbc2ac] underline underline-offset-4">Get in touch about a project</Link>
      </section>
    </>
  );
}
