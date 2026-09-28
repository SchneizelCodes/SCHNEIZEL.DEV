"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenterStore, CAMERA_PRESETS } from "@/store/useCommandCenterStore";
import { CandlestickSimulator } from "./CandlestickSimulator";
import { WorkflowInspector } from "./WorkflowInspector";
import { ShaderInspector } from "./ShaderInspector";
import { ParallaxCssLab } from "./ParallaxCssLab";
import { X, Cpu, TrendingUp, GitFork, Box, Mountain } from "lucide-react";

type SandboxTab = "candlestick" | "workflow" | "shader" | "parallax";

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
            className="relative pointer-events-auto w-full max-w-4xl bg-[#080d16]/90 border border-white/10 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Header: Editorial Typography & Circular Glass Action */}
            <div className="flex items-center justify-between p-6 sm:px-8 sm:py-6 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-inner">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
                    ENGINEERING SANDBOX & LAB
                  </h2>
                  <p className="text-xs text-white/50 tracking-wider font-sans mt-0.5">
                    Live system simulations & hardware-accelerated prototypes
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                title="Close Sandbox [ESC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Navigation: WayWild-Inspired Luxury Pill Switcher */}
            <div className="flex items-center gap-2 p-3 sm:px-8 border-b border-white/10 bg-black/20 overflow-x-auto">
              <button
                onClick={() => setActiveTab("candlestick")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "candlestick"
                    ? "bg-white text-slate-950 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>ORDERFLOW</span>
              </button>

              <button
                onClick={() => setActiveTab("workflow")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "workflow"
                    ? "bg-white text-slate-950 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>AI PIPELINE</span>
              </button>

              <button
                onClick={() => setActiveTab("shader")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "shader"
                    ? "bg-white text-slate-950 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D SHADER</span>
              </button>

              <button
                onClick={() => setActiveTab("parallax")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "parallax"
                    ? "bg-white text-slate-950 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Mountain className="w-3.5 h-3.5 text-amber-400" />
                <span>CSS PARALLAX LAB</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {activeTab === "candlestick" && <CandlestickSimulator />}
              {activeTab === "workflow" && <WorkflowInspector />}
              {activeTab === "shader" && <ShaderInspector />}
              {activeTab === "parallax" && <ParallaxCssLab />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}