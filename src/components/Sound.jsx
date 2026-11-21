"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import { ChevronDown, Music2, Square } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { shuffleTracks } from "./music/houseTracks";

const SoundCloudTrack = dynamic(() => import("./music/SoundCloudTrack"), {
  loading: () => <p role="status" className="text-sm text-white/80">Loading music player…</p>,
});

export default function Sound() {
  const queue = useRef([]);
  const lastTrack = useRef(null);
  const [track, setTrack] = useState(null);
  const [apiReady, setApiReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const controls = useRef(null);
  const toggle = useRef(null);
  const dismissTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(dismissTimer.current), []);

  const collapse = useCallback(() => {
    if (controls.current?.contains(document.activeElement)) toggle.current?.focus();
    setExpanded(false);
  }, []);

  const onPlaybackStart = useCallback(() => {
    window.clearTimeout(dismissTimer.current);
    dismissTimer.current = window.setTimeout(collapse, 1400);
  }, [collapse]);

  const nextTrack = useCallback((reveal = true) => {
    window.clearTimeout(dismissTimer.current);
    if (!queue.current.length) queue.current = shuffleTracks(lastTrack.current);
    const next = queue.current.shift();
    lastTrack.current = next.id;
    setTrack(next);
    if (reveal) setExpanded(true);
  }, []);

  const advanceTrack = useCallback(() => nextTrack(false), [nextTrack]);

  function toggleControls() {
    window.clearTimeout(dismissTimer.current);
    if (!track) nextTrack();
    else if (expanded) collapse();
    else setExpanded(true);
  }

  function stopPlayback() {
    window.clearTimeout(dismissTimer.current);
    collapse();
    setTrack(null);
  }

  const label = !track ? "Play house music" : expanded ? "Hide music controls" : "Show music controls";
  const Icon = expanded ? ChevronDown : Music2;

  return (
    <>
      {track && (
        <section ref={controls} aria-label="House music player" id="house-music-player"
          data-expanded={expanded} aria-hidden={!expanded} inert={expanded ? undefined : ""}
          className="music-player-card fixed bottom-[4.75rem] left-4 right-4 z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-white/20 bg-black/90 p-4 shadow-xl backdrop-blur-xl sm:right-auto sm:w-96">
          <Script src="https://w.soundcloud.com/player/api.js" strategy="afterInteractive" onReady={() => setApiReady(true)} />
          <SoundCloudTrack key={track.id} track={track} apiReady={apiReady} onNext={nextTrack} onFinish={advanceTrack} onPlaybackStart={onPlaybackStart} />
          <button type="button" onClick={stopPlayback} className="mt-2 inline-flex min-h-10 items-center gap-2 text-sm text-white/75 hover:text-white">
            <Square size={13} aria-hidden="true" /> Stop music
          </button>
        </section>
      )}
      <button ref={toggle} type="button" onClick={toggleControls} aria-label={label}
        aria-expanded={expanded} aria-controls={track ? "house-music-player" : undefined}
        className="fixed bottom-4 left-4 z-50 inline-flex size-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/90 font-medium text-white hover:border-[#dbc2ac] sm:w-auto sm:px-3 sm:text-sm">
        <Icon size={20} aria-hidden="true" />
        <span className="hidden sm:inline">{label}</span>
      </button>
    </>
  );
}
