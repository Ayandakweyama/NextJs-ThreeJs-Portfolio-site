"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import MotionHeading from "@/components/MotionHeading";
import PageIntro from "@/components/PageIntro";

const certifications = [
  {
    id: 1,
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google & Coursera",
    date: "April 2025",
    type: "Data Analytics",
    link: "https://www.coursera.org/account/accomplishments/verify/DBN4JU5G4NPG",
    imageUrl: "/certifications/Google Cert 1.jpeg"
  },
  {
    id: 2,
    title: "Django Essential Training",
    issuer: "LinkedIn Learning",
    date: "July 2024",
    type: "Web Development",
    link: "https://www.linkedin.com/learning/certificates/19ca54046d6aaafcbad8abd9eebe0ef29acaedb37950fc910dbfc6a6dcc0aaf8",
    imageUrl: "/certifications/django.png"
  },
  {
    id: 3,
    title: "ITIL Foundation",
    issuer: "LinkedIn Learning",
    date: "July 2024",
    type: "IT service management",
    link: "https://www.linkedin.com/learning/certificates/a90ec2bbc783cae56e1dffe2ca4458e002483de557c805acc90206f4a6518cff",
    imageUrl: "/certifications/ITIL.jpg"
  },
  {
    id: 4,
    title: "Foundations of User Experience",
    issuer: "Google & Coursera",
    date: "February 2023",
    type: "User Experience",
    link: "https://www.coursera.org/account/accomplishments/verify/SSXVN492ZFEX",
    imageUrl: "/certifications/ui.jpeg"
  },
 {
    id: 5,
    title: "MS-900",
    issuer: "Microsoft",
    date: "May 27, 2025",
    type: "Microsoft compliance",
    link: "https://learn.microsoft.com/en-us/users/ayanda-2395/credentials/certification/microsoft-365-fundamentals?source=docs&tab=credentials-tab",
    imageUrl: "/certifications/ms-900.png"
  },
];

export default function CertificationsPage() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (selected && !dialogRef.current.open) dialogRef.current.showModal();
  }, [selected]);

  return (
    <>
      <PageIntro title="Certifications" description="Browse my credentials in data analytics, web development, design, and IT. Open a certificate to see it and find the issuer’s verification link." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certificate) => (
          <article key={certificate.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#141211]">
            <div className="relative aspect-video border-b border-white/10 bg-[#24211f]">
              <Image src={certificate.imageUrl} alt="" fill sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-3" />
            </div>
            <div className="flex flex-1 flex-col items-start p-5">
              <p className="text-sm text-white/65">{certificate.type}</p>
              <MotionHeading as="h2" className="mt-2 text-xl font-semibold">{certificate.title}</MotionHeading>
              <p className="mb-4 mt-2 text-sm text-white/75">{certificate.issuer} · {certificate.date}</p>
              <button type="button" onClick={() => setSelected(certificate)}
                aria-label={`View certificate: ${certificate.title}`}
                className="mt-auto inline-flex min-h-11 items-center font-medium text-[#dbc2ac] underline-offset-4 hover:underline">
                View certificate
              </button>
            </div>
          </article>
        ))}
      </div>
      <Link href="/projects" className="mt-8 inline-flex min-h-11 items-center text-[#dbc2ac] underline underline-offset-4">See my projects</Link>

      <dialog ref={dialogRef} aria-labelledby="certificate-title"
        className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#141211] p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        onClose={() => setSelected(null)}>
        {selected && (
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="p-5 sm:p-7">
              <button type="button" aria-label="Close certificate" onClick={() => dialogRef.current.close()}
                className="mb-4 inline-flex size-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10">
                <X size={20} aria-hidden="true" />
              </button>
              <MotionHeading as="h2" id="certificate-title" className="text-2xl font-semibold">{selected.title}</MotionHeading>
              <p className="mt-3 text-sm text-white/75">{selected.issuer} · {selected.date}</p>
              <a href={selected.link} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[#dbc2ac] px-4 font-semibold text-black hover:bg-[#efdbc9]">
                Verify with issuer
              </a>
            </div>
            <div className="relative min-h-56 bg-[#24211f] sm:min-h-80">
              <Image src={selected.imageUrl} alt={`${selected.title} certificate`} fill sizes="(min-width: 768px) 56vw, 100vw" className="object-contain p-4" />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
