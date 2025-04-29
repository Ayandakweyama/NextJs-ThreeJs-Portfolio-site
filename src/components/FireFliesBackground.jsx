"use client";
import React, { useEffect, useState } from "react";

const createFirefly = () => ({
  id: Math.random(),
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 6 + 5}px`,
  animationDuration: `${Math.random() * 5 + 5}s`,
  opacity: Math.random() * 0.5 + 0.3,
});

const FireFliesBackground = () => {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    // Initial batch of fireflies
    const initialFireflies = Array.from({ length: 10 }, () => createFirefly());
    setFireflies(initialFireflies);

    const addFireflyPeriodically = () => {
      const newFirefly = createFirefly();
      setFireflies((currentFireflies) => [
        ...currentFireflies.slice(-20), // Increased max fireflies
        newFirefly,
      ]);
    };

    const interval = setInterval(addFireflyPeriodically, 800); // Slightly faster generation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {fireflies.map((firefly) => {
        return (
          <div
            key={firefly.id}
            className="absolute rounded-full"
            style={{
              top: firefly.top,
              left: firefly.left,
              width: firefly.size,
              height: firefly.size,
              opacity: firefly.opacity,
              boxShadow: `0 0 10px 2px #88766A`,
              backgroundColor: "#88766A",
              animation: `move ${firefly.animationDuration} infinite alternate, 
                         flicker 3s infinite alternate`,
              transition: "opacity 0.5s ease-in-out",
            }}
          ></div>
        );
      })}
      <style jsx>{`
        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(20px, 20px);
          }
        }
        @keyframes flicker {
          0%, 100% {
            opacity: ${fireflies[0]?.opacity ?? 0.5};
          }
          50% {
            opacity: ${(fireflies[0]?.opacity ?? 0.5) / 2};
          }
        }
      `}</style>
    </div>
  );
};

export default FireFliesBackground;