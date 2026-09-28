"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { useCommandCenterStore, CAMERA_PRESETS } from "@/store/useCommandCenterStore";
import { X, ExternalLink, Cpu, Layers } from "lucide-react";

export function ProjectModal() {
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const activeSection = useCommandCenterStore((state) => state.activeSection);

  const project = PROJECTS.find((p) => p.id === selectedProjectId);

  const handleClose = () => {
    setSelectedProjectId(null);
    setCameraTarget(CAMERA_PRESETS[activeSection] || CAMERA_PRESETS.hero);
  };

  // Keyboard shortcut: Press ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProjectId) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProjectId, activeSection]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* Transparent Backdrop Click-to-Dismiss Zone (Zero Blur on 3D Viewport) */}
          <div
            onClick={handleClose}
            className="absolute inset-0 pointer-events-auto cursor-pointer"
            title="Click outside to close inspection"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative pointer-events-auto w-full max-w-2xl h-full bg-[#080d16]/95 border-l border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-y-auto"
          >
            {/* Drawer Top Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#080d16]/90 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-sm">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  NODE_ID // {project.id.toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-sm border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title="Close [ESC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              
              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-sm font-mono text-cyan-400/90 tracking-wide">
                  {project.subtitle}
                </p>
              </div>

              {/* Engineering Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-sm bg-slate-900/60 border border-slate-800 flex flex-col"
                  >
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      {metric.label}
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-emerald-400">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>System Architecture Summary</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-4 rounded-sm border border-slate-800/80">
                  {project.summary}
                </p>
              </div>

              {/* Deep Architecture Breakdown Matrix */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Subsystem Specifications</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-sm bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] mb-1">FRONTEND LAYER</span>
                    <span className="text-slate-200">{project.architecture.frontend}</span>
                  </div>
                  <div className="p-3 rounded-sm bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] mb-1">BACKEND / RUNTIME</span>
                    <span className="text-slate-200">{project.architecture.backend}</span>
                  </div>
                  <div className="p-3 rounded-sm bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] mb-1">PERSISTENCE & DB</span>
                    <span className="text-slate-200">{project.architecture.database}</span>
                  </div>
                  <div className="p-3 rounded-sm bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] mb-1">EXTERNAL APIS & PIPELINES</span>
                    <span className="text-cyan-400/90">{project.architecture.apis.join(" • ")}</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Tech Matrix
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-sm text-xs font-mono bg-slate-800/70 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Live Demo & GitHub */}
              <div className="pt-4 flex items-center gap-3">
                {project.links.liveDemo && (
                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-cyan-500 text-black font-mono font-bold text-xs tracking-wider hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LAUNCH PRODUCTION ENGINE
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    SOURCE CODE
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}