"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import AsusLaptop from "../models/AsusLaptop";

export default function AboutModel({ active }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      fallback={null}
    >
      <hemisphereLight args={["#ece4dd", "#49423d", 2]} />
      <directionalLight position={[4, 6, 5]} intensity={3} />
      <Suspense fallback={null}>
        <AsusLaptop />
      </Suspense>
    </Canvas>
  );
}
