import Image from 'next/image';
import bg from "../../../../public/background/contact-background.png";
import Form from "@/components/contact/Form";
import dynamic from "next/dynamic";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/navigation";
const NokiaPhone = dynamic(() => import("@/components/models/NokiaPhone"), { ssr: false });

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <Image
        src={bg}
        alt="Next.js Portfolio website&apos;s contact page background image"
        priority
        sizes="100vw"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
      />
      <div className="relative z-50 pointer-events-auto">
        <Navigation />
      </div>
      <div className="w-1/2 h-3/5 xs:h-3/4 sm:h-screen absolute top-[65%] -translate-y-1/2 left-0 -z-10">
        <RenderModel>
          <NokiaPhone position={[0, 1.5, 0]} scale={[0.005, 0.005, 0.005]} />
        </RenderModel>
      </div>
      <article className="relative w-full flex flex-col items-center justify-center py-8 sm:py-0 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-6 w-full sm:w-3/4">
          <h1 className="text-accent font-semibold text-center text-4xl capitalize">
            Let&apos;s get in touch
          </h1>
          <p className="text-center font-light text-sm xs:text-base">
            Step into a world where ideas take flight and innovation shapes reality. Whether you&apos;re here to build, collaborate, or spark new adventures, your words are the first spark of something greater. Use the form below to send your message across this digital horizon — and let&apos;s create something extraordinary together.
          </p>
        </div>
        <Form />
      </article>
    </>
  );
}
