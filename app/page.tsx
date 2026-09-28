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
import { FluidCursor } from "@/components/effects/FluidCursor";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";

export default function Home() {
  const atmosphere = useCommandCenterStore((state) => state.atmosphere);
  const activeSection = useCommandCenterStore((state) => state.activeSection);
  const setActiveSection = useCommandCenterStore((state) => state.setActiveSection);
  const toggleContact = useCommandCenterStore((state) => state.toggleContact);
  const toggleTerminal = useCommandCenterStore((state) => state.toggleTerminal);

  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const isHeroVisible = activeSection === "hero" && !selectedProjectId;

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

      {/* Interactive WebGL Navier-Stokes Fluid Cursor Simulation */}
      <FluidCursor />

      {/* 2D Screen-Space Cyber Badges Overlay */}
      <SpatialBadgesOverlay />

      {/* Ultra-Delicate Ambient Grid & Scanlines (Softened for Editorial Luxury) */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-20" />
      <div className="absolute inset-0 cyber-grid pointer-events-none z-10 opacity-15" />

      {/* Floating Borderless Navigation HUD (WayWild Style) */}
      <NavigationHUD />

      {/* WayWild-Inspired Luxury Editorial Hero Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between px-6 pt-20 pb-6 sm:px-12 sm:pt-24 sm:pb-10 md:px-16 overflow-hidden">
        {/* Upper-Mid Row: Editorial Philosophy (Left) & Live Performance Metric (Right) */}
        {/* Hidden on short screens to avoid vertical clutter */}
        <div
          className={`w-full hidden min-[850px]:flex items-start justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHeroVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0 pointer-events-none"
          }`}
        >
          {/* Mid-Left: Play / Philosophy Callout */}
          <div className="flex items-center gap-3.5 pointer-events-auto">
            <button
              onClick={() => {
                sound.playClick();
                toggleContact();
              }}
              onMouseEnter={() => sound.playHover()}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer group"
              title="Initiate Collaboration"
            >
              <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-white ml-0.5 group-hover:scale-110 transition-transform" />
            </button>
            <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-white/80 uppercase leading-snug">
              SYSTEMS ARCHITECTURE,<br />
              THOUGHTFULLY<br />
              ENGINEERED
            </div>
          </div>

          {/* Mid-Right: Average Performance / Reliability Rating */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              <span>99.9%</span>
              <span className="text-amber-400 text-lg">★</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-white/50 uppercase">
              UPTIME & RELIABILITY
            </span>
          </div>
        </div>

        {/* Mid-Right Floating Glass Orb Interactive CTA (WayWild Explorer Sphere) */}
        {/* Scaled responsively so it stays balanced across desktop, tablet, and compact windows */}
        <div
          className={`absolute right-4 sm:right-10 md:right-16 top-1/2 -translate-y-8 sm:-translate-y-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHeroVisible ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-24 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => {
              sound.playWhoosh();
              setActiveSection("projects");
            }}
            onMouseEnter={() => sound.playHover()}
            className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border border-white/20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center p-3 sm:p-4 transition-all duration-500 hover:scale-105 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            <span className="text-base sm:text-lg md:text-xl text-white mb-0.5 sm:mb-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white leading-tight">
              EXPLORE<br />PROJECTS
            </span>
            <div className="absolute inset-0 rounded-full border border-white/10 scale-100 group-hover:scale-115 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          </button>
        </div>

        {/* Bottom Hero Section: Luxury Pill Badges + Adaptive Headline + Subtitle */}
        {/* Smoothly slides down to exit when a pod is zoomed in or exiting hero */}
        <div
          className={`max-w-4xl pb-1 sm:pb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHeroVisible ? "translate-y-0 opacity-100" : "translate-y-28 opacity-0 pointer-events-none"
          }`}
        >
          {/* Bottom Left Pills (WayWild Mountain Treks / Wild Camping Style) */}
          <div className="flex flex-wrap gap-2 mb-4 pointer-events-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveSection("projects");
              }}
              onMouseEnter={() => sound.playHover()}
              className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-wider text-white/80 uppercase hover:border-white/50 hover:bg-white/10 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              DISTRIBUTED SYSTEMS
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveSection("sandbox");
              }}
              onMouseEnter={() => sound.playHover()}
              className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-wider text-white/80 uppercase hover:border-white/50 hover:bg-white/10 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              SPATIAL 3D WEB
            </button>
            <button
              onClick={() => {
                sound.playClick();
                toggleTerminal();
              }}
              onMouseEnter={() => sound.playHover()}
              className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-wider text-white/80 uppercase hover:border-white/50 hover:bg-white/10 hover:text-white transition-all cursor-pointer hidden sm:inline-block shadow-sm"
            >
              SYSTEM AUTOMATION
            </button>
          </div>

          {/* High-Contrast Editorial Serif Headline (Scales dynamically with viewport width + height) */}
          <h1 className="font-display text-[clamp(2.4rem,4.2vw+2vh,5.8rem)] tracking-tight leading-[0.88] text-white uppercase mb-3 select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            ARCHITECT<br />WITHOUT LIMITS
          </h1>

          {/* Refined Human Subtitle */}
          <p className="text-xs sm:text-sm text-white/70 max-w-lg font-normal leading-relaxed">
            Joshua Camacho — Full-Stack Systems Engineer & Creative Developer crafting resilient cloud infrastructure, distributed microservices, and interactive spatial web applications.
          </p>
        </div>
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