"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BackgroundMotionControl } from "./SiteAtmosphere";
import { sitePages } from "@/app/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[60] site-header">
      <a className="sr-only focus:not-sr-only focus:absolute focus:bg-black focus:p-3" href="#main-content">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 px-4 py-1 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-8">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} aria-label="Home" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-white/10 sm:justify-self-start">
          <Image src="/logo.png" alt="" width={36} height={36} />
        </Link>
        <nav aria-label="Main navigation" className="order-last flex w-full flex-wrap justify-between gap-x-1 min-[360px]:justify-center min-[360px]:gap-x-3 sm:order-none sm:w-auto sm:gap-x-6">
          {sitePages.map(({ link, label }) => {
            const active = pathname === link || pathname.startsWith(link + "/");
            return (
              <Link key={link} href={link} aria-current={active ? (pathname === link ? "page" : "location") : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 text-xs font-medium min-[360px]:text-sm hover:text-white ${active ? "border-[#dbc2ac] text-white" : "border-transparent text-white/70"}`}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="sm:justify-self-end">
          <BackgroundMotionControl />
        </div>
      </div>
    </header>
  );
}
