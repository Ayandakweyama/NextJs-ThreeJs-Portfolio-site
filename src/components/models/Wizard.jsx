"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";

const Wizard = React.memo(function Wizard({ onReady, touchRotation }) {
  const { scene } = useGLTF("/models/ThreeDLogo.glb");
  const modelRef = useRef();
  const spin = useRef(0);
  const [hovered, setHover] = useState(false);

  // Apply custom material to all meshes
  useEffect(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#88766A",
      roughness: 0.42,
      metalness: 0.3
    });

    const originalMaterials = new Map();
    scene.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.set(child, child.material);
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    onReady();
    return () => {
      originalMaterials.forEach((original, mesh) => { mesh.material = original; });
      material.dispose();
    };
  }, [scene, onReady]);

  // Subtle floating animation
  useFrame((state, delta) => {
    if (!touchRotation.current.dragging) spin.current += Math.min(delta, 0.05) * 0.12;
    modelRef.current.rotation.y = spin.current + touchRotation.current.angle;
    modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <primitive
        ref={modelRef}
        object={scene}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 4.05 : 3.9}
      />
    </Float>
  );
});

export function ModelViewer({ onReady, onUnavailable, active }) {
  const [isRotating, setIsRotating] = useState(true);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const touchRotation = useRef({ angle: 0, dragging: false });
  const gesture = useRef(null);

  // Handle touch here so OrbitControls only receives mouse and pen events.
  function handleTouch(event) {
    if (event.pointerType !== "touch") return;
    event.stopPropagation();

    if (event.type === "pointerdown") {
      if (event.isPrimary) {
        gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, axis: null };
      }
      return;
    }

    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;

    if (event.type !== "pointermove") {
      gesture.current = null;
      touchRotation.current.dragging = false;
      setIsTouchDragging(false);
      return;
    }

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.axis && Math.max(Math.abs(dx), Math.abs(dy)) >= 8) {
      start.axis = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      if (start.axis === "horizontal") {
        touchRotation.current.dragging = true;
        setIsTouchDragging(true);
      }
    }

    if (start.axis === "horizontal") {
      touchRotation.current.angle += dx * 0.014;
      start.x = event.clientX;
    }
  }

  return (
    <div
      className="w-full h-full relative"
      onPointerDownCapture={handleTouch}
      onPointerMoveCapture={handleTouch}
      onPointerUpCapture={handleTouch}
      onPointerCancelCapture={handleTouch}
    >
      <Canvas
        style={{ touchAction: "pan-y" }}
        fallback={null}
        frameloop={active ? "always" : "never"}
        onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", onUnavailable)}
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        <hemisphereLight args={["#f9e6d5", "#55443c", 1.6]} />
        
        {/* Model */}
        <Suspense fallback={null}>
          <Wizard onReady={onReady} touchRotation={touchRotation} />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          onStart={() => setIsRotating(false)}
          onEnd={() => setIsRotating(true)}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={isRotating && !isTouchDragging}
          autoRotateSpeed={2}
          makeDefault
        />
      </Canvas>

    </div>
  );
}

useGLTF.preload("/models/ThreeDLogo.glb");

// Default export for ModelViewer (client component)
export default ModelViewer;
