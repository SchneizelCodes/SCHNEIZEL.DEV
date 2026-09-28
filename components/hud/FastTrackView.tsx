"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { ExternalLink, Layers, Cpu, ArrowRight, Eye } from "lucide-react";
export function FastTrackView() {
  const mode = useCommandCenterStore((state) => state.mode);
  const setMode = useCommandCenterStore((state) => state.setMode);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);

  if (mode !== "fastTrack") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-[#05070a]/95 backdrop-blur-xl overflow-y-auto pt-24 pb-20 px-4 sm:px-8"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-sm bg-slate-900/50 border border-cyan-500/20">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-2 rounded-sm bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Recruiter & Client High-Density View
              </div>
              <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white">
                SYSTEMS & ENGINEERING DOSSIER
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                Direct access to architecture specifications, live production metrics, and source code.
              </p>
            </div>

            <button
              onClick={() => setMode("spatial")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all font-mono text-xs cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>RETURN TO 3D SPATIAL</span>
            </button>
          </div>

          {/* High-Density Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className="p-6 rounded-sm bg-[#080d16] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-cyan-400 font-bold">
                      0{idx + 1} // {project.category}
                    </span>
                    <span
                      className={`font-mono text-[9px] px-2 py-0.5 rounded-sm border ${
                        project.status === "PRODUCTION"
                          ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30"
                          : project.status === "ACTIVE"
                          ? "bg-cyan-950/60 text-cyan-400 border-cyan-500/30"
                          : "bg-amber-950/60 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {project.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-sm bg-slate-950/60 border border-slate-900 font-mono text-[10px]">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-slate-500 uppercase">{m.label}</span>
                        <span className="text-emerald-400 font-bold mt-0.5">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-sm text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <span>INSPECT ARCHITECTURE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-sm bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                        title="GitHub Source"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.links.liveDemo && (
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-cyan-500 text-black font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}