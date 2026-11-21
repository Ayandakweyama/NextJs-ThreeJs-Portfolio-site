"use client";

import { useState } from "react";

export default function MotionHeading({ as: Tag = "h1", children, className = "", tone, lines, ...props }) {
  const [tapped, setTapped] = useState(false);

  return (
    <Tag
      {...props}
      className={`motion-heading ${className}`}
      data-tone={tone}
      data-lines={lines}
      data-tapped={tapped || undefined}
      onPointerUp={(event) => {
        const isTouch = event.pointerType === "touch" || event.pointerType === "pen";
        if (isTouch && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setTapped(true);
      }}
      onAnimationEnd={(event) => {
        if (event.animationName === "motion-heading-tap") setTapped(false);
      }}
    >
      <span className="motion-heading__lettering">
        <span className="motion-heading__depth" aria-hidden="true">{children}</span>
        <span className="motion-heading__face">{children}</span>
      </span>
    </Tag>
  );
}
