"use client";
import React from "react";

const FireFliesBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[#88766A] rounded-full opacity-40 animate-firefly"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            boxShadow: `0 0 8px 1px #88766A`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes firefly {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(20px, -15px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, 25px) scale(0.8);
            opacity: 0.3;
          }
          75% {
            transform: translate(15px, 10px) scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-firefly {
          animation: firefly linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FireFliesBackground;