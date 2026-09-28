"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS, ProjectData } from "@/data/projects";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";

const THEME_COLORS: Record<CoreTheme, string> = {
  cyan: "#00f0ff",
  emerald: "#10b981",
  amber: "#f59e0b",
};

interface PodItemProps {
  project: ProjectData;
  index: number;
}

function PodItem({ project, index }: PodItemProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const crystalRef = useRef<THREE.Mesh>(null!);
  const scannerRingRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const coreTheme = useCommandCenterStore((state) => state.coreTheme);
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);

  const isSelected = selectedProjectId === project.id;
  const activeColor = THEME_COLORS[coreTheme];

  // Dynamic 60fps physics: idle bobbing vs active inspection spin
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + index * 1.5;
    const { pointer } = state;

    if (groupRef.current) {
      groupRef.current.position.y =
        project.spatialPosition[1] + Math.sin(t * 1.6) * 0.1;
    }

    if (crystalRef.current) {
      if (isSelected) {
        crystalRef.current.rotation.y += delta * 2.8;
        crystalRef.current.rotation.x += delta * 1.2;
        crystalRef.current.rotation.z = pointer.x * 0.5;
      } else {
        crystalRef.current.rotation.y += delta * (hovered ? 1.8 : 0.6);
        crystalRef.current.rotation.x += delta * 0.3;
      }
    }

    if (scannerRingRef.current && isSelected) {
      scannerRingRef.current.rotation.z += delta * 3.0;
      scannerRingRef.current.rotation.x = Math.sin(t * 2.5) * 0.3;
    }
  });

  const handleClick = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSelectedProjectId(project.id);

    // Frame the pod close and centered in the left 50% viewport
    setCameraTarget({
      position: [
        project.spatialPosition[0] - 1.4,
        project.spatialPosition[1],
        project.spatialPosition[2] + 2.2,
      ],
      target: [
        project.spatialPosition[0],
        project.spatialPosition[1],
        project.spatialPosition[2],
      ],
    });
  };

  const displayText =
    project.status === "IN_DEVELOPMENT"
      ? `0${index + 1} // ${project.title}  [R&D]`
      : `0${index + 1} // ${project.title}`;

  // Width of the cyber plate based on title length
  const badgeWidth = useMemo(() => {
    return Math.max(displayText.length * 0.08 + 0.3, 1.8);
  }, [displayText]);

  return (
    <group
      ref={groupRef}
      position={project.spatialPosition}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Invisible Generous Click Hitbox */}
      <mesh visible={false}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshBasicMaterial />
      </mesh>

      {/* 3D Geometric Crystal */}
      <mesh
        ref={crystalRef}
        scale={isSelected ? 1.5 : hovered ? 1.3 : 1}
      >
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={isSelected ? "#020617" : "#070c14"}
          roughness={0.1}
          metalness={0.98}
          emissive={isSelected || hovered ? activeColor : "#1e293b"}
          emissiveIntensity={isSelected ? 1.2 : hovered ? 0.9 : 0.25}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh scale={isSelected ? 1.7 : hovered ? 1.45 : 1.15}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshBasicMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={isSelected ? 0.9 : hovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Holographic Scanner Ring (Active Only on Selected Pod) */}
      {isSelected && (
        <mesh ref={scannerRingRef}>
          <torusGeometry args={[0.9, 0.015, 16, 64]} />
          <meshBasicMaterial
            color={activeColor}
            transparent
            opacity={0.8}
            wireframe
          />
        </mesh>
      )}
    </group>
  );
}

export function ProjectPods() {
  return (
    <group>
      {PROJECTS.map((project, index) => (
        <PodItem key={project.id} project={project} index={index} />
      ))}
    </group>
  );
}