"use client";

import { useCommandCenterStore } from "@/store/useCommandCenterStore";

export function TelemetryHUD() {
  const telemetry = useCommandCenterStore((state) => state.telemetry);
  const activeSection = useCommandCenterStore((state) => state.activeSection);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-end justify-between">
        
        {/* Bottom Left: Live Camera & Pipeline Coordinates */}
        <div className="hud-panel px-3.5 py-2.5 rounded-sm border border-slate-800/80 font-mono text-[11px] text-slate-400 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">CAM.VEC</span>
            <span>
              X: {telemetry.camPos[0]} | Y: {telemetry.camPos[1]} | Z: {telemetry.camPos[2]}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span>SECTOR: {activeSection.toUpperCase()}</span>
            <span>//</span>
            <span>FRAME_LOOP: DEMAND_SYNC</span>
          </div>
        </div>

        {/* Bottom Right: Framerate & GPU Diagnostics */}
        <div className="hud-panel px-3.5 py-2.5 rounded-sm border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">{telemetry.fps} FPS</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">ENGINE: WEBGL_2.0</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-cyan-400">STATUS: NOMINAL</span>
        </div>

      </div>
    </footer>
  );
}