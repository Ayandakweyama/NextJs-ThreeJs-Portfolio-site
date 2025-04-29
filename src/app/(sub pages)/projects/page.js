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
      <ProjectList projects={projectsData} />

      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <RenderModel>
          <XboxController />
        </RenderModel>
      </div>
    </>
  );
}
