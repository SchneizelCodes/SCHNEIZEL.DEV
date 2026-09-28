"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS, ProjectData } from "@/data/projects";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";

const THEME_COLORS: Record<CoreTheme, string> = {
  cyan: "#00f0ff",
  emerald: "#10b981",
  amber: "#f59e0b",
};

const holoVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const holoFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uScanlineDensity;
  uniform float uFresnelPower;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), uFresnelPower);

    // High-frequency horizontal holographic scanlines locked to crystal geometry
    // Gentle vertical drift gives an active sci-fi holo-emitter pulse
    float scanlineVal = sin((vPosition.y + uTime * 0.14) * uScanlineDensity);
    
    // Crisp scanlines with smooth anti-aliased transitions
    float scanline = smoothstep(-0.25, 0.35, scanlineVal);
    
    // Layer base transparency with scanlines and rim fresnel
    float alpha = (scanline * 0.72 + 0.18) * uOpacity;
    alpha += fresnel * 0.45 * uOpacity;

    // Glowing core tint
    vec3 finalColor = mix(uColor, vec3(1.0), fresnel * 0.35);

    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
  }
`;

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

  // Holographic Scanline Shader Uniforms
  const holoUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(activeColor) },
      uTime: { value: 0 },
      uOpacity: { value: 0.38 },
      uScanlineDensity: { value: 85.0 },
      uFresnelPower: { value: 2.2 },
    }),
    []
  );

  // Dynamic 60fps physics: idle bobbing vs active inspection spin
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + index * 1.5;
    const { pointer } = state;

    // Gentle floating bob
    if (groupRef.current) {
      groupRef.current.position.y =
        project.spatialPosition[1] + Math.sin(t * 1.6) * 0.1;
    }

    // Dynamic crystal rotation
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

    // Update holographic shader uniforms
    holoUniforms.uTime.value += delta;
    holoUniforms.uColor.value.set(activeColor);
    const targetOpacity = isSelected ? 0.88 : hovered ? 0.65 : 0.42;
    holoUniforms.uOpacity.value = THREE.MathUtils.lerp(
      holoUniforms.uOpacity.value,
      targetOpacity,
      0.1
    );

    // Selected holographic scanner ring
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

      {/* 3D Holographic Scanline Crystal */}
      <mesh
        ref={crystalRef}
        scale={isSelected ? 1.5 : hovered ? 1.3 : 1}
      >
        <octahedronGeometry args={[0.45, 0]} />
        <shaderMaterial
          vertexShader={holoVertexShader}
          fragmentShader={holoFragmentShader}
          uniforms={holoUniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh scale={isSelected ? 1.65 : hovered ? 1.42 : 1.12}>
        <octahedronGeometry args={[0.47, 0]} />
        <meshBasicMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={isSelected ? 0.95 : hovered ? 0.8 : 0.35}
        />
      </mesh>

      {/* Luminous Inner Core Point Light */}
      <pointLight
        color={activeColor}
        intensity={isSelected ? 3.0 : hovered ? 1.5 : 0.5}
        distance={2.0}
      />

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