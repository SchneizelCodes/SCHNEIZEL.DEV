"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";

const THEME_COLORS: Record<CoreTheme, string> = {
  cyan: "#00f0ff",
  emerald: "#10b981",
  amber: "#f59e0b",
};

export function QuantumCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const outerCageRef = useRef<THREE.Mesh>(null!);
  const satellitesRef = useRef<THREE.Group>(null!);

  const [hovered, setHovered] = useState(false);

  // Connect to Zustand store
  const coreTheme = useCommandCenterStore((state) => state.coreTheme);
  const setCoreTheme = useCommandCenterStore((state) => state.setCoreTheme);

  const activeColor = THEME_COLORS[coreTheme];

  // Cycle to next theme on click
  const handleCycleTheme = () => {
    const sequence: CoreTheme[] = ["cyan", "emerald", "amber"];
    const nextIndex = (sequence.indexOf(coreTheme) + 1) % sequence.length;
    setCoreTheme(sequence[nextIndex]);
  };

  // 60fps render loop for cinematic physics & zero-g levitation
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // 1. Zero-G Harmonic Levitation (gentle vertical breathing)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.18;
      
      // Cursor Leaning (subtle tilt toward user's pointer)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.35,
        delta * 3
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45,
        delta * 3
      );
    }

    // 2. High-speed multi-axis core tumble
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x += delta * 0.45;
      innerMeshRef.current.rotation.y += delta * 0.7;
    }

    // 3. Counter-rotating wireframe cage with harmonic scale breathing
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x -= delta * 0.25;
      outerCageRef.current.rotation.z += delta * 0.35;
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      outerCageRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Orbiting satellite data nodes
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 0.8;
      satellitesRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dynamic central point light */}
      <pointLight
        color={activeColor}
        intensity={hovered ? 10 : 5}
        distance={12}
        decay={2}
      />

      {/* Inner Metallic Faceted Core */}
      <mesh
        ref={innerMeshRef}
        onClick={handleCycleTheme}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#070c14"
          roughness={0.12}
          metalness={0.98}
          emissive={activeColor}
          emissiveIntensity={hovered ? 0.45 : 0.2}
        />
      </mesh>

      {/* Outer Angular Wireframe Cage */}
      <mesh ref={outerCageRef} onClick={handleCycleTheme}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshStandardMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={hovered ? 0.6 : 0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Satellite Data Nodes */}
      <group ref={satellitesRef}>
        <mesh position={[2.4, 0.4, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-2.1, -0.6, 0.8]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.5, 2.3, -0.7]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}