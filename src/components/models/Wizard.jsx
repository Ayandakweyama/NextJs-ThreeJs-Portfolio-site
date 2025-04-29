"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useGLTF, OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";

const Wizard = React.memo(function Wizard(props) {
  const { scene } = useGLTF("/models/ThreeDLogo.glb");
  const modelRef = useRef();
  const [hovered, setHover] = useState(false);

  // Apply custom material to all meshes
  useEffect(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#88766A",
      roughness: 0.3,
      metalness: 0.7,
      envMapIntensity: 1.2
    });

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Subtle floating animation
  useFrame((state) => {
    modelRef.current.rotation.y += 0.002;
    modelRef.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <primitive
        {...props}
        ref={modelRef}
        object={scene}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? [3.1, 3.1, 3.1] : [3, 3, 3]}
      />
    </Float>
  );
});

export function ModelViewer() {
  const controlsRef = useRef();
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="w-full h-[70vh] relative">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
        onPointerDown={() => setIsRotating(false)}
        onPointerUp={() => setIsRotating(true)}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset="city" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.8}
          scale={10}
          blur={2}
          far={5}
        />
        
        {/* Model */}
        <Suspense fallback={null}>
          <Wizard />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={isRotating}
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