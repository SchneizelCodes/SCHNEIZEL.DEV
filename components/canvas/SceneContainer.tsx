"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { QuantumCore } from "./QuantumCore";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";
import { ProjectPods } from "./ProjectPods";
import { BadgeTracker } from "./BadgeTracker";
import { Preloader } from "./Preloader";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";

export function SceneContainer() {
  const [mounted, setMounted] = useState(false);

  const mode = useCommandCenterStore((state) => state.mode);
  const shouldSleepGPU = mode === "fastTrack";
  const atmosphere = useCommandCenterStore((state) => state.atmosphere);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Cybernetic Boot-Up Preloader */}
      <Preloader />

      <div className="absolute inset-0 w-full h-full -z-0">
        <Canvas
          // 60 FPS Ceiling & Battery Saver: Sleep only when in 2D mode
          frameloop={shouldSleepGPU ? "demand" : "always"}
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {/* Dynamic WebGL Atmosphere Color */}
            <color
              attach="background"
              args={[
                atmosphere === "solarGold"
                  ? "#0c0803"
                  : atmosphere === "blueprintCad"
                  ? "#030c1a"
                  : atmosphere === "matrixEmerald"
                  ? "#020d08"
                  : "#05070a"
              ]}
            />

            {/* Dynamic Atmosphere Lighting */}
            <ambientLight
              intensity={
                atmosphere === "solarGold"
                  ? 0.7
                  : atmosphere === "blueprintCad"
                  ? 0.6
                  : 0.4
              }
            />
            <directionalLight
              position={[10, 10, 5]}
              intensity={atmosphere === "solarGold" ? 2.0 : 1.5}
              color={
                atmosphere === "solarGold"
                  ? "#fbbf24"
                  : atmosphere === "blueprintCad"
                  ? "#93c5fd"
                  : atmosphere === "matrixEmerald"
                  ? "#6ee7b7"
                  : "#ffffff"
              }
            />
            <directionalLight
              position={[-10, -5, -5]}
              intensity={0.9}
              color={
                atmosphere === "solarGold"
                  ? "#f59e0b"
                  : atmosphere === "blueprintCad"
                  ? "#3b82f6"
                  : atmosphere === "matrixEmerald"
                  ? "#10b981"
                  : "#00f0ff"
              }
            />

            {/* Active 3D Entities */}
            <CameraController />
            <QuantumCore />
            <ProjectPods />
            <BadgeTracker />
            <ParticleField count={600} />

            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}