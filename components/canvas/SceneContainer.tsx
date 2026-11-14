"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";
import { Preloader } from "./Preloader";
import { NebulaSkybox } from "./NebulaSkybox";
import { MilkyWayGalaxy } from "./MilkyWayGalaxy";
import { StarSystems } from "./StarSystems";
import { MeteorBelts } from "./MeteorBelts";
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
          camera={{ position: [0, 16.0, 36.0], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {/* Deep Obsidian Space Background Color */}
            <color
              attach="background"
              args={[
                atmosphere === "solarGold"
                  ? "#080502"
                  : atmosphere === "blueprintCad"
                  ? "#020712"
                  : atmosphere === "matrixEmerald"
                  ? "#010705"
                  : "#020306"
              ]}
            />

            {/* Dynamic Atmosphere Lighting (Calibrated for High Object Contrast) */}
            <ambientLight
              intensity={
                atmosphere === "solarGold"
                  ? 0.45
                  : atmosphere === "blueprintCad"
                  ? 0.4
                  : 0.28
              }
            />
            <directionalLight
              position={[12, 12, 6]}
              intensity={atmosphere === "solarGold" ? 2.2 : 1.8}
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

            {/* Celestial Rear-Top Rim Light (Accentuates All 3D Object Silhouettes) */}
            <directionalLight
              position={[-14, 16, -12]}
              intensity={2.6}
              color={
                atmosphere === "solarGold"
                  ? "#fde68a"
                  : atmosphere === "blueprintCad"
                  ? "#bae6fd"
                  : atmosphere === "matrixEmerald"
                  ? "#a7f3d0"
                  : "#ffffff"
              }
            />

            {/* Cosmic Celestial Nebula & Starfield */}
            <NebulaSkybox />

            {/* Macro Milky Way Galaxy (Sagittarius A* Core, Bulge, & 4 Spiral Arms) */}
            <MilkyWayGalaxy />

            {/* Polystellar Category Systems (The Multi-Stellar Orrery) */}
            <StarSystems />

            {/* 4-Zone Asteroid Belts, Lagrange Swarms & Comets */}
            <MeteorBelts />

            {/* Active 3D Camera & Particle Atmosphere */}
            <CameraController />
            <ParticleField count={600} />

            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
