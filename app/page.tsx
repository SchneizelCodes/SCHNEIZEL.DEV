"use client";

import { SceneContainer } from "@/components/canvas/SceneContainer";
import { NavigationHUD } from "@/components/hud/NavigationHUD";
import { TelemetryHUD } from "@/components/hud/TelemetryHUD";
import { FastTrackView } from "@/components/hud/FastTrackView";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { TerminalDock } from "@/components/terminal/TerminalDock";
import { EngineeringSandbox } from "@/components/sandbox/EngineeringSandbox";
import { SpatialBadgesOverlay } from "@/components/hud/SpatialBadgesOverlay";
import { ContactModal } from "@/components/modals/ContactModal";
import { PandeLootModal } from "@/components/modals/PandeLootModal";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";

export default function Home() {
  const atmosphere = useCommandCenterStore((state) => state.atmosphere);

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-700 ${
        atmosphere === "solarGold"
          ? "bg-[#0c0803] text-amber-100"
          : atmosphere === "blueprintCad"
          ? "bg-[#030c1a] text-blue-100"
          : atmosphere === "matrixEmerald"
          ? "bg-[#020d08] text-emerald-100"
          : "bg-[#05070a] text-slate-100"
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <SceneContainer />

      {/* 2D Screen-Space Cyber Badges Overlay */}
      <SpatialBadgesOverlay />

      {/* Cyberpunk Scanline & Grid Overlays */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-70" />
      <div className="absolute inset-0 cyber-grid pointer-events-none z-10 opacity-40" />

      {/* Top Navigation HUD */}
      <NavigationHUD />

      {/* Hero Content (Floating Center-Left) */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full pointer-events-none text-center px-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border text-xs tracking-widest uppercase transition-all duration-500 ${
            atmosphere === "solarGold"
              ? "border-amber-500/40 bg-amber-950/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : atmosphere === "blueprintCad"
              ? "border-blue-500/40 bg-blue-950/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              : atmosphere === "matrixEmerald"
              ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              : "border-cyan-500/30 bg-cyan-950/20 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-ping ${
              atmosphere === "solarGold"
                ? "bg-amber-400"
                : atmosphere === "blueprintCad"
                ? "bg-blue-400"
                : atmosphere === "matrixEmerald"
                ? "bg-emerald-400"
                : "bg-cyan-400"
            }`}
          />
          {atmosphere === "solarGold"
            ? "Solar Reactor Active"
            : atmosphere === "blueprintCad"
            ? "CAD Blueprint Online"
            : atmosphere === "matrixEmerald"
            ? "Matrix Terminal Live"
            : "Quantum Core Active"}
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-2 font-mono drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          JOSHUA CAMACHO
        </h1>

        <p
          className={`text-sm sm:text-base font-mono tracking-wider max-w-lg mb-6 transition-colors duration-500 ${
            atmosphere === "solarGold"
              ? "text-amber-400/90"
              : atmosphere === "blueprintCad"
              ? "text-blue-300/90"
              : atmosphere === "matrixEmerald"
              ? "text-emerald-400/90"
              : "text-cyan-400/80"
          }`}
        >
          Full-Stack Systems Engineer & Creative Developer
        </p>

        <p className="text-xs text-slate-400 font-mono tracking-widest animate-pulse pointer-events-auto cursor-pointer">
          [ CLICK CORE OR SELECT QUADRANT TO ENGAGE ]
        </p>
      </div>

      {/* Recruiter / Client Fast-Track 2D Dossier */}
      <FastTrackView />

      {/* Interactive Engineering Sandbox */}
      <EngineeringSandbox />

      {/* Slide-out Inspection Modal Tray */}
      <ProjectModal />

      {/* Interactive UNIX CLI Terminal Dock */}
      <TerminalDock />

      {/* Encrypted Contact & Inquiry Modal */}
      <ContactModal />

      {/* PandeLoot CS:GO Case Opener Modal */}
      <PandeLootModal />

      {/* Bottom Telemetry HUD */}
      <TelemetryHUD />
    </main>
  );
}