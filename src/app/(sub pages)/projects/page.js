import Image from "next/image";
import bg from "../../../../public/background/projects-background.png";
import { projectsData } from "../../data";
import RenderModel from "@/components/RenderModel";
import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";

const XboxController = dynamic(() => import("@/components/models/XboxController"), {
  ssr: false,
});

const ProjectList = dynamic(() => import("@/components/projects"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export const metadata = {
  title: "Projects",
};

// Enable static generation
export async function generateStaticParams() {
  return [];
}

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
      <section className="relative z-50 w-full max-w-4xl mx-auto lg:mx-0 lg:-ml-16 px-4 py-8 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-4 lg:hidden">
          My Projects
        </h1>
      </section>
      <ProjectList projects={projectsData} />
      <div className="relative z-50 px-4">
        <p className="text-center lg:text-left font-bold text-white lg:ml-16">
          Be on the lookout as I deploy more of my work!
        </p>
      </div>

      <div className="hidden lg:flex fixed top-1/4 right-0 items-center justify-end pr-0 -mr-80 -z-10">
        <RenderModel>
          <XboxController />
        </RenderModel>
      </div>
    </>
  );
}
