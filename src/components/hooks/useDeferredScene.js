"use client";

import { useEffect, useRef, useState } from "react";

export default function useDeferredScene() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intersects = !("IntersectionObserver" in window);
    let observer;
    let timer;

    function update() {
      window.clearTimeout(timer);
      const canAnimate = intersects && !document.hidden && !reduceMotion.matches;
      setVisible(canAnimate);
      if (canAnimate) timer = window.setTimeout(() => setReady(true), 200);
    }

    if (!intersects && ref.current) {
      observer = new IntersectionObserver(([entry]) => {
        intersects = entry.isIntersecting;
        update();
      });
      observer.observe(ref.current);
    }
    update();
    reduceMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
      reduceMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return { ref, visible, ready };
}
