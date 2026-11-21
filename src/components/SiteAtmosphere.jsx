"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext(null);
const poster = "/background/portfolio-poster.webp";

const rainLayers = [
  { depth: "far", drops: 12, period: 4.2 },
  { depth: "middle", drops: 9, period: 3.2 },
  { depth: "near", drops: 6, period: 2.5 },
];

function BackgroundRain({ moving }) {
  return (
    <div className="portfolio-rain" data-moving={moving}>
      {rainLayers.map(({ depth, drops, period }, layer) => (
        <div key={depth} className={`portfolio-rain__layer portfolio-rain__layer--${depth}`}>
          {Array.from({ length: drops }, (_, index) => {
            const duration = period + ((index * 7 + layer) % 6) * 0.18;
            return (
              <span key={index} className="portfolio-rain__drop" style={{
                "--rain-x": `${(index * 100 / drops + layer * 3 + (index % 3) * 0.8) % 100}%`,
                "--rain-duration": `${duration}s`,
                "--rain-delay": `-${duration * ((index * 13 + layer * 7) % 29) / 29}s`,
              }} />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function BackgroundMotionControl() {
  const { playing, setChoice } = useContext(MotionContext);
  const Icon = playing ? Pause : Play;

  return (
    <button
      type="button"
      aria-label={playing ? "Pause background motion" : "Play background motion"}
      onClick={() => setChoice(!playing)}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white"
    >
      <Icon size={16} aria-hidden="true" />
      <span className="hidden sm:inline">{playing ? "Pause motion" : "Play motion"}</span>
    </button>
  );
}

export default function SiteAtmosphere({ children }) {
  const pathname = usePathname();
  const video = useRef(null);
  const [systemAllowsMotion, setSystemAllowsMotion] = useState(false);
  const [choice, setChoice] = useState(null);
  const [visible, setVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const playing = choice ?? systemAllowsMotion;
  const moving = playing && visible;
  const showMist = pathname === "/" || pathname === "/about";

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setSystemAllowsMotion(!preference.matches && !navigator.connection?.saveData);
    const syncVisibility = () => setVisible(!document.hidden);

    syncPreference();
    syncVisibility();
    preference.addEventListener("change", syncPreference);
    document.addEventListener("visibilitychange", syncVisibility);

    return () => {
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!moving || videoReady) return;
    const timer = window.setTimeout(() => setVideoReady(true), 750);
    return () => window.clearTimeout(timer);
  }, [moving, videoReady]);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (!playing || !visible) {
      player.pause();
      return;
    }
    player.play().catch((error) => {
      if (error.name !== "AbortError") setChoice(false);
    });
  }, [playing, visible, videoReady]);

  return (
    <MotionContext.Provider value={{ playing, setChoice }}>
      <div aria-hidden="true" className="portfolio-atmosphere">
        {videoReady && (playing || hasStarted) && (
          <video
            ref={video}
            src="/background/portfolio-background.mp4"
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            onPlaying={() => setHasStarted(true)}
          />
        )}
        <div className="portfolio-atmosphere__scrim" />
        {showMist && (playing || hasStarted) && (
          <div className="portfolio-mist" data-playing={moving}>
            <div className="portfolio-mist__layer portfolio-mist__layer--far" />
            <div className="portfolio-mist__layer portfolio-mist__layer--middle" />
            <div className="portfolio-mist__layer portfolio-mist__layer--near" />
          </div>
        )}
        {(playing || hasStarted) && <BackgroundRain moving={moving} />}
      </div>
      {playing && (
        <div key={pathname} aria-hidden="true" className="portfolio-page-mist" data-moving={moving} />
      )}
      {children}
    </MotionContext.Provider>
  );
}
