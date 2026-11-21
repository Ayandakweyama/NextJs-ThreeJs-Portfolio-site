"use client";

import dynamic from "next/dynamic";
import useDeferredScene from "../hooks/useDeferredScene";

const AboutModel = dynamic(() => import("./AboutModel"), { ssr: false });

export default function AboutScene() {
  const { ref, visible, ready } = useDeferredScene();

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none relative h-52 bg-[radial-gradient(ellipse_at_center,#b8947840,transparent_72%)] sm:h-64 md:h-auto md:min-h-80 motion-reduce:hidden">
      {ready && (
        <div className="absolute inset-0">
          <AboutModel active={visible} />
        </div>
      )}
    </div>
  );
}
