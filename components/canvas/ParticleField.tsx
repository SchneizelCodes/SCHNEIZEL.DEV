"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";

const THEME_COLORS: Record<CoreTheme, string> = {
  cyan: "#00f0ff",
  emerald: "#10b981",
  amber: "#f59e0b",
};

export function ParticleField({ count = 650 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const coreTheme = useCommandCenterStore((state) => state.coreTheme);

  // Store both original home positions and dynamic current positions
  const [positions, originalPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 20;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;

      vel[i3] = 0;
      vel[i3 + 1] = 0;
      vel[i3 + 2] = 0;
    }
    return [pos, orig, vel];
  }, [count]);

  // 60fps Vector Repulsion & Spring Physics Loop
  useFrame((state, delta) => {
    const { pointer, viewport } = state;
    const t = state.clock.getElapsedTime();

    // Map pointer (-1 to +1) to 3D world space coordinates
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = (pointer.y * viewport.height) / 2;

    const repulsionRadius = 3.6;
    const repulsionStrength = 8.5;
    const springReturn = 3.0; // speed at which particles return home

    const posArray = geoRef.current?.attributes.position?.array as Float32Array;
    if (!posArray) return;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 1. Natural ambient zero-g drift
      originalPositions[i3 + 1] += Math.sin(t * 0.4 + i) * 0.003;
      originalPositions[i3] += Math.cos(t * 0.3 + i) * 0.002;

      // 2. Compute distance from mouse cursor in 3D
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 3. Cursor Repulsion Force
      if (dist < repulsionRadius && dist > 0.01) {
        const force = (1 - dist / repulsionRadius) * repulsionStrength;
        const normalX = dx / dist;
        const normalY = dy / dist;

        velocities[i3] += normalX * force * delta;
        velocities[i3 + 1] += normalY * force * delta;
        velocities[i3 + 2] += (Math.random() - 0.5) * force * delta * 0.5;
      }

      // 4. Spring physics pulling back to original home coordinate
      const homeDx = originalPositions[i3] - posArray[i3];
      const homeDy = originalPositions[i3 + 1] - posArray[i3 + 1];
      const homeDz = originalPositions[i3 + 2] - posArray[i3 + 2];

      velocities[i3] += homeDx * springReturn * delta;
      velocities[i3 + 1] += homeDy * springReturn * delta;
      velocities[i3 + 2] += homeDz * springReturn * delta;

      // 5. Friction damping (prevents infinite oscillation)
      velocities[i3] *= 0.92;
      velocities[i3 + 1] *= 0.92;
      velocities[i3 + 2] *= 0.92;

      // 6. Update position
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];
    }

    geoRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        color={THEME_COLORS[coreTheme]}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}