"use client";
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function AsusLaptop(props) {
  const { nodes, materials } = useGLTF('/models/asus-laptop.glb');
  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.01;
  });
  return (
    <group ref={modelRef} {...props} dispose={null} scale={[1.5, 1.5, 1.5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
}

useGLTF.preload('/models/asus-laptop.glb');
