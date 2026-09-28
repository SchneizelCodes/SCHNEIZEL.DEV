"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenterStore, CAMERA_PRESETS } from "@/store/useCommandCenterStore";
import { CandlestickSimulator } from "./CandlestickSimulator";
import { WorkflowInspector } from "./WorkflowInspector";
import { ShaderInspector } from "./ShaderInspector";
import { X, Cpu, TrendingUp, GitFork, Box } from "lucide-react";

type SandboxTab = "candlestick" | "workflow" | "shader";

export function EngineeringSandbox() {
  const activeSection = useCommandCenterStore((state) => state.activeSection);
  const setActiveSection = useCommandCenterStore((state) => state.setActiveSection);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);

  const [activeTab, setActiveTab] = useState<SandboxTab>("candlestick");

  const isOpen = activeSection === "sandbox";

  const handleClose = () => {
    setActiveSection("hero");
    setCameraTarget(CAMERA_PRESETS.hero);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative pointer-events-auto w-full max-w-4xl bg-[#080d16]/95 border border-cyan-500/30 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <div>
                  <h2 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
                    ENGINEERING SANDBOX & LAB
                  </h2>
                  <p className="text-[11px] font-mono text-cyan-400/80">
                    Live system simulations & hardware-accelerated prototypes
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-1.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title="Close Sandbox [ESC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 px-5 pt-4 border-b border-slate-800/80 bg-slate-950/40">
              <button
                onClick={() => setActiveTab("candlestick")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                  activeTab === "candlestick"
                    ? "border-cyan-400 text-cyan-300 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>01 // FINANCIAL ORDERFLOW SIM</span>
              </button>

              <button
                onClick={() => setActiveTab("workflow")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                  activeTab === "workflow"
                    ? "border-cyan-400 text-cyan-300 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>02 // AUTOMATED AI PIPELINE</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === "candlestick" && <CandlestickSimulator />}
              {activeTab === "workflow" && <WorkflowInspector />}
              {activeTab === "shader" && <ShaderInspector />}
            </div>

                          <button
                onClick={() => setActiveTab("shader")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                  activeTab === "shader"
                    ? "border-cyan-400 text-cyan-300 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>03 // 3D SHADER LAB</span>
              </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}