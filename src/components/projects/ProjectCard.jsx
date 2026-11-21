import MotionHeading from "@/components/MotionHeading";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, categoryFilter }) {
  const { id, slug, name, summary, description, date, imageUrls } = project;

  const href = `/projects/${slug ?? id}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#141211]">
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[#211d1a]">
        <Image src={imageUrls[0]} alt={`${name} preview`} fill sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
      </div>
      <div className="flex flex-1 flex-col items-start p-5">
        <time dateTime={date} className="text-sm text-white/60">{date.slice(0, 4)}</time>
        <MotionHeading as="h3" className="mt-2 text-xl font-semibold">{name}</MotionHeading>
        <p className="mb-5 mt-2 line-clamp-3 text-sm leading-relaxed text-white/75">{summary || description}</p>
        <Link prefetch={false} href={categoryFilter ? { pathname: href, query: { category: categoryFilter } } : href} aria-label={`View case study: ${name}`} className="mt-auto inline-flex min-h-11 items-center gap-2 font-medium text-[#dbc2ac] underline-offset-4 hover:underline">
          View case study <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
