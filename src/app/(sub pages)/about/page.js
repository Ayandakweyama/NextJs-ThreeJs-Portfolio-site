import Image from "next/image";
import bg from "../../../../public/background/about-background.png";
import dynamic from "next/dynamic";
const RenderModel = dynamic(() => import("@/components/RenderModel"), { ssr: false });
const Navigation = dynamic(() => import("@/components/navigation"), { ssr: false });

const AsusLaptop = dynamic(() => import("@/components/models/AsusLaptop"), {
  ssr: false,
});

const AboutDetails = dynamic(() => import("@/components/about"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      {/* Background Image */}
      <Image
        src={bg}
        priority
        sizes="100vw"
        alt="Next.js Portfolio website's about page background image"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
      />

      {/* Navigation */}
      <div className="relative z-50 pointer-events-auto">
        <Navigation />
      </div>

      {/* 3D Model Render */}
      <div className="w-full h-3/5 xs:h-3/4 sm:h-screen absolute top-[35%] sm:top-1/2 -translate-y-1/2 left-0 z-10">
        <RenderModel>
          <AsusLaptop position={[0, 0.5, 0]} />
        </RenderModel>
      </div>

      {/* Hero Header Section - Optimized for Mobile */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute flex flex-col items-center text-center top-[40%] sm:top-[60%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-full px-4">
          <h1 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-accent leading-tight">
            Ayanda Kweyama
          </h1>
          <p className="font-light text-foreground text-base sm:text-lg mt-2 sm:mt-4 max-w-xs sm:max-w-md">
            Meet the creative behind this portfolio
          </p>
        </div>
      </div>

      {/* About Details Section */}
      <AboutDetails />
    </>
  );
}