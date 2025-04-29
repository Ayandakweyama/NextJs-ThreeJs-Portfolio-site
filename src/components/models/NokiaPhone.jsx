"use client";
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function NokiaPhone(props) {
  const { nodes, materials } = useGLTF('/models/old_nokia_phone_low_poly.glb');
  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.005;
  });
  return (
    <group ref={modelRef} {...props} dispose={null}>
      <group
        position={[-89.008, -25.512, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[44.74, 21.863, 44.74]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_back_0.geometry}
          material={materials.back}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_side_0.geometry}
          material={materials.side}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_screen_0.geometry}
          material={materials.screen}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/old_nokia_phone_low_poly.glb');
