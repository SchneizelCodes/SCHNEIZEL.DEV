"use client";

import { useCommandCenterStore } from "@/store/useCommandCenterStore";

export function TelemetryHUD() {
  const telemetry = useCommandCenterStore((state) => state.telemetry);
  const activeSection = useCommandCenterStore((state) => state.activeSection);
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);

  const isHeroVisible = activeSection === "hero" && !selectedProjectId;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 p-6 sm:px-12 md:px-16 pointer-events-none">
      <div className="w-full flex items-end justify-between">
        
        {/* Bottom Left: Editorial Location & Availability (Borderless, Editorial) */}
        {/* Smoothly slides down to exit when a pod is zoomed in */}
        <div
          className={`text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-white/50 uppercase hidden sm:flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHeroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>MANILA, PH // AVAILABLE FOR CONTRACT & FULL-TIME</span>
          <span className="text-white/20">•</span>
          <span className="text-white/40">SECTOR: {activeSection.toUpperCase()}</span>
        </div>

        {/* Bottom Right: Sleek Frosted Glass Status Pill (WayWild Pill Style) */}
        <div className="rounded-full px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-xl text-xs font-sans text-white/90 tracking-wider flex items-center gap-3 shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white tracking-widest">{telemetry.fps} FPS</span>
          </div>
          <span className="text-white/20">•</span>
          <span className="text-white/50 tracking-widest text-[10px] uppercase hidden sm:inline">WEBGL 2.0</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-emerald-300 font-semibold tracking-widest text-[10px] uppercase">OPTIMAL</span>
        </div>

      </div>
    </footer>
  );
}