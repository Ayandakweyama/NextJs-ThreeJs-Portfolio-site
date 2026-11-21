"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useState } from "react";

import useDeferredScene from "./hooks/useDeferredScene";

const ModelViewer = dynamic(() => import("@/components/models/Wizard"), { ssr: false });

class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroScene() {
  const { ref, visible, ready: canMount } = useDeferredScene();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showScene = useCallback(() => setLoaded(true), []);
  const hideScene = useCallback(() => setFailed(true), []);

  return (
    <div ref={ref} aria-hidden="true" className="home-hero-scene relative -mx-3 grid h-[clamp(12rem,58vw,17rem)] place-items-center overflow-hidden sm:mx-0 sm:h-[23rem] lg:h-[clamp(30rem,47vw,38rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#dbc2ac20,transparent_67%)] lg:hidden" />
      <div className="home-hero-ring pointer-events-none absolute aspect-square w-48 rounded-full border border-[#dbc2ac]/20 sm:w-80 lg:w-[29rem]" />
      <div className="home-hero-ring home-hero-ring--inner pointer-events-none absolute aspect-square w-36 rounded-full border border-[#dbc2ac]/15 sm:w-64 lg:w-[23rem]" />
      <Image src="/logo.png" alt="" width={190} height={190} className={`pointer-events-none w-32 sm:w-40 lg:w-48 ${loaded && !failed ? "hidden motion-reduce:block" : ""}`} />
      {loaded && !failed && <span className="home-hero-swipe-hint pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden text-center text-xs text-white/70">Swipe to rotate</span>}
      {canMount && !failed && (
        <div className="absolute inset-0 motion-reduce:hidden">
          <SceneBoundary>
            <ModelViewer onReady={showScene} onUnavailable={hideScene} active={visible} />
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
