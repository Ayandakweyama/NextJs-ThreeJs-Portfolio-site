'use client';
import React, { Suspense } from "react";
import Image from "next/image";
import bg from "../../public/background/home-background.png";
import Navigation from "@/components/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically load the client-only ModelViewer (default export)
// Spinner shown during model load
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const ModelViewer = dynamic(
  () => import("@/components/models/Wizard").then((mod) => mod.default),
  { ssr: false, loading: LoadingSpinner }
);

export default function Home() {
  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-between relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />

      <div className="w-full h-screen relative">
        {/* Navigation above canvas */}
        <div className="relative z-50 pointer-events-auto">
          <Navigation />
        </div>
        {/* 3D model viewer under navigation */}
        <div className="relative z-10 pointer-events-none">
          <Suspense fallback={<LoadingSpinner />}>
            <ModelViewer />
          </Suspense>
        </div>
      </div>
    </motion.main>
  );
}
