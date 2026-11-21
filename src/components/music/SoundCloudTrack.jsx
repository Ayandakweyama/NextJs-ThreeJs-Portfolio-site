"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Shuffle } from "lucide-react";
import MotionHeading from "../MotionHeading";

export default function SoundCloudTrack({ track, apiReady, onNext, onFinish, onPlaybackStart }) {
  const iframe = useRef(null);
  const hasPlayed = useRef(false);
  const [status, setStatus] = useState("loading");
  const label = {
    loading: "Loading track",
    ready: "Ready to play",
    playing: "Now playing",
    paused: "Paused",
    error: "Track unavailable",
  }[status];

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("ready"), 6000);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status !== "playing" || hasPlayed.current) return;
    hasPlayed.current = true;
    onPlaybackStart();
  }, [status, onPlaybackStart]);

  useLayoutEffect(() => {
    const element = iframe.current;
    if (!apiReady || !element?.contentWindow || !window.SC?.Widget) return;

    const { Widget } = window.SC;
    const events = Widget.Events;
    const player = Widget(element);
    const listeners = [
      [events.READY, () => {
        player.setVolume(45);
        setStatus((current) => current === "playing" ? current : "ready");
        player.isPaused((paused) => {
          if (paused === false) setStatus("playing");
        });
      }],
      [events.PLAY, () => setStatus("playing")],
      [events.PAUSE, () => setStatus("paused")],
      [events.ERROR, () => setStatus("error")],
      [events.FINISH, onFinish],
    ];

    listeners.forEach(([event, callback]) => player.bind(event, callback));
    return () => {
      if (element.contentWindow) listeners.forEach(([event]) => player.unbind(event));
    };
  }, [apiReady, onFinish]);

  const query = new URLSearchParams({
    url: `https://api.soundcloud.com/tracks/${track.id}`,
    color: "#a77b60",
    auto_play: "true",
    show_artwork: "false",
    show_comments: "false",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="music-disc" data-playing={status === "playing"} aria-hidden="true"><span /></div>
        <div className="min-w-0 flex-1">
          <p role="status" className="text-xs font-medium text-[#dbc2ac]">{label}</p>
          <MotionHeading as="h2" id="music-track-title" className="mt-1 break-words text-lg font-semibold">{track.title}</MotionHeading>
          <p className="text-sm text-white/75">{track.artist}</p>
        </div>
        <button type="button" onClick={() => onNext()} aria-label="Shuffle to another track" title="Shuffle to another track"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-[#dbc2ac] hover:bg-white/10">
          <Shuffle size={20} aria-hidden="true" />
        </button>
      </div>
      <iframe ref={iframe} title={`SoundCloud player for ${track.title} by ${track.artist}`}
        src={`https://w.soundcloud.com/player/?${query}`} allow="autoplay" className="h-[120px] w-full rounded-lg border-0" />
      <a href={`https://soundcloud.com/${track.path}`} target="_blank" rel="noreferrer"
        className="mt-2 inline-flex min-h-8 items-center text-xs text-white/75 underline underline-offset-4 hover:text-white">
        Open track on SoundCloud
      </a>
    </div>
  );
}
