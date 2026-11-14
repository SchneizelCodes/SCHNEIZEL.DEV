"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STAR_SYSTEMS, StarSystemData } from "@/data/starSystems";
import { PROJECTS, ProjectData } from "@/data/projects";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";
import {
  X,
  Shuffle,
  Sparkles,
  ExternalLink,
  Layers,
  Cpu,
  Terminal,
  Activity,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

export function StarSystemDrawer() {
  const selectedStarSystemId = useCommandCenterStore((state) => state.selectedStarSystemId);
  const setSelectedStarSystemId = useCommandCenterStore((state) => state.setSelectedStarSystemId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const hoveredPlanetId = useCommandCenterStore((state) => state.hoveredPlanetId);
  const setHoveredPlanetId = useCommandCenterStore((state) => state.setHoveredPlanetId);
  const triggerScramble = useCommandCenterStore((state) => state.triggerScramble);

  const [activeTab, setActiveTab] = useState<"projects" | "debris">("projects");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null!);

  const system: StarSystemData | undefined = STAR_SYSTEMS.find(
    (s) => s.id === selectedStarSystemId
  );

  // Filter planets belonging to this active sun
  const systemPlanets: ProjectData[] = system
    ? PROJECTS.filter(
        (p) =>
          p.number >= system.planetRange[0] && p.number <= system.planetRange[1]
      )
    : [];

  const isPlanetsAligned = useCommandCenterStore((state) => state.isPlanetsAligned);

  const handleClose = () => {
    sound.playClick();
    setSelectedStarSystemId(null);
    setHoveredPlanetId(null);
    // Return camera to appropriate solar system overview
    if (isPlanetsAligned) {
      setCameraTarget({
        position: [70.0, 26.0, 64.0],
        target: [70.0, 14.0, 0],
      });
    } else {
      setCameraTarget({
        position: [0, 36.0, 72.0],
        target: [0, 14.0, 0],
      });
    }
  };

  const handleScramble = () => {
    sound.playWhoosh();
    sound.playClick();
    triggerScramble();
  };

  const handleSelectProject = (project: ProjectData) => {
    sound.playClick();
    setSelectedProjectId(project.id);
    const r = project.visual?.radius || 1.0;
    setCameraTarget({
      position: [
        project.spatialPosition[0] - 1.4 * r,
        project.spatialPosition[1] + 0.1,
        project.spatialPosition[2] + 2.2 * r,
      ],
      target: [
        project.spatialPosition[0],
        project.spatialPosition[1],
        project.spatialPosition[2],
      ],
    });
  };

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    sound.playClick();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Auto-scroll list when 3D planet is hovered
  useEffect(() => {
    if (hoveredPlanetId && listRef.current) {
      const el = document.getElementById(`drawer-planet-${hoveredPlanetId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [hoveredPlanetId]);

  return (
    <AnimatePresence>
      {system && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed top-0 right-0 z-40 h-full w-full max-w-[420px] bg-[#070b14]/92 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col pointer-events-auto"
        >
          {/* Header Panel */}
          <div className="p-6 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
            {/* Top row: Close & Scramble */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded-full bg-white/5 border border-white/15 text-white/70">
                {system.designation}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleScramble}
                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/60 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Reshuffle planetary orbits around this star"
                >
                  <Shuffle className="w-3 h-3 text-amber-400" />
                  <span>Scramble</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-7 h-7 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                  title="Close System [ESC]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Star System Title */}
            <div className="space-y-1 mb-3">
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{system.name}</span>
              </h2>
              <p className="text-xs text-amber-300/80 font-mono">
                {system.title} • {system.domain}
              </p>
            </div>

            <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
              {system.summary}
            </p>

            {/* System Telemetry Counters */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex flex-col">
                <span className="text-[8.5px] uppercase tracking-wider text-white/40 font-mono">
                  Worlds
                </span>
                <span className="text-sm font-semibold text-white">
                  {system.telemetry.totalProjects}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8.5px] uppercase tracking-wider text-white/40 font-mono">
                  Deployed
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  {system.telemetry.productionCount} Live
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8.5px] uppercase tracking-wider text-white/40 font-mono">
                  Health
                </span>
                <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-1 mt-0.5">
                  <Activity className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>{system.telemetry.systemHealth}</span>
                </span>
              </div>
            </div>

            {/* Sub-Tabs: Planetary Projects vs Orbital Debris */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-white text-slate-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                Planets ({systemPlanets.length})
              </button>
              <button
                onClick={() => setActiveTab("debris")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "debris"
                    ? "bg-white text-slate-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                Debris & Tools ({system.utilities.length})
              </button>
            </div>
          </div>

          {/* List Content */}
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {activeTab === "projects" ? (
              systemPlanets.map((planet) => {
                const isHovered = hoveredPlanetId === planet.id;
                const v = planet.visual;

                return (
                  <div
                    key={planet.id}
                    id={`drawer-planet-${planet.id}`}
                    onClick={() => handleSelectProject(planet)}
                    onMouseEnter={() => {
                      setHoveredPlanetId(planet.id);
                      sound.playHover();
                    }}
                    onMouseLeave={() => setHoveredPlanetId(null)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isHovered
                        ? "bg-white/10 border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.2)] scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.05] hover:border-white/30"
                    }`}
                  >
                    {/* Left: Mini-Holo Preview Orb & Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Mini Holographic Planet Preview Orb */}
                      <div
                        className="w-8 h-8 rounded-full border border-white/20 shrink-0 shadow-md relative overflow-hidden flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${v.primaryColor}, ${v.secondaryColor})`,
                          boxShadow: `0 0 12px ${v.primaryColor}80`,
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-40 mix-blend-overlay"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 3px, #fff 3px, #fff 4px)`,
                          }}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono text-white/40">
                            #{String(planet.number).padStart(2, "0")}
                          </span>
                          <span className="text-xs font-semibold tracking-wide text-white truncate">
                            {planet.title}
                          </span>
                          {planet.status === "PRODUCTION" && (
                            <span className="px-1.5 py-0.2 text-[7.5px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              LIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/50 truncate font-light">
                          {planet.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Inspect Action Arrow */}
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isHovered
                          ? "text-white translate-x-0.5"
                          : "text-white/30"
                      }`}
                    />
                  </div>
                );
              })
            ) : (
              /* Orbital Debris / Utilities Feed */
              <div className="space-y-3">
                <p className="text-[11px] text-white/60 font-light px-1">
                  Micro-tools, configuration blueprints, and runtime modules attached to this system&apos;s asteroid belt.
                </p>

                {system.utilities.map((util) => (
                  <div
                    key={util.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 hover:border-white/25 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[8.5px] font-mono rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 uppercase">
                        {util.badge}
                      </span>
                      <span className="text-[9px] font-mono text-white/40 uppercase">
                        {util.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-white mb-1">
                        {util.title}
                      </h4>
                      <p className="text-[11px] text-white/60 font-light leading-relaxed">
                        {util.description}
                      </p>
                    </div>

                    {util.commandSnippet && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-amber-300/90 overflow-x-auto">
                        <span className="truncate mr-2">{util.commandSnippet}</span>
                        <button
                          onClick={() => handleCopySnippet(util.commandSnippet!, util.id)}
                          className="shrink-0 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
                          title="Copy command"
                        >
                          {copiedId === util.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
