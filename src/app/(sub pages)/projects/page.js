import Image from "next/image";
import bg from "../../../../public/background/projects-background.png";
import ProjectList from "@/components/projects";
import { projectsData } from "../../data";
import RenderModel from "@/components/RenderModel";
import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";

const XboxController = dynamic(() => import("@/components/models/XboxController"), {
  ssr: false,
});

export const metadata = {
  title: "Projects",
};

export default function Home() {
  return (
    <>
      <Image
        src={bg}
        alt="Next.js Portfolio website's about page background image"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
        priority
        sizes="100vw"
      />
      <div className="relative z-50 pointer-events-auto">
        <Navigation />
      </div>
      <section className="relative z-50 w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-4">
          My Projects
        </h1>
        <p className="text-white/90 text-sm sm:text-base mb-6">
          Explore a curated selection of my latest work, showcasing skills in Next.js, Three.js, and modern front-end architectures.
        </p>
      </section>
      <ProjectList projects={projectsData} />
      <p className="text-center font-bold text-white mt-6">
        Be on the lookout as I deploy more of my work!
      </p>

      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <RenderModel>
          <XboxController />
        </RenderModel>
      </div>
    </>
  );
}
