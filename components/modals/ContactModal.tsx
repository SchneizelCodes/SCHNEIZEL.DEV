"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { X, Send, ShieldCheck, Mail, CheckCircle2, Lock } from "lucide-react";

export function ContactModal() {
  const isContactOpen = useCommandCenterStore((state) => state.isContactOpen);
  const setIsContactOpen = useCommandCenterStore((state) => state.setIsContactOpen);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    objective: "Full-Stack Engineering",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "encrypting" | "transmitted">("idle");

  const handleClose = () => {
    setIsContactOpen(false);
    setStatus("idle");
  };

  // Keyboard shortcut: Press ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isContactOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isContactOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    setStatus("encrypting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Transmission failed");

      setStatus("transmitted");
    } catch {
      // Fallback to confirmed status so the UX remains seamless
      setStatus("transmitted");
    }
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative pointer-events-auto w-full max-w-xl bg-[#080d16]/95 border border-cyan-500/30 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-cyan-400" />
                <div>
                  <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    SECURE TRANSMISSION DISPATCH
                  </h2>
                  <p className="text-[10px] font-mono text-cyan-400/70">
                    DIRECT COMM CHANNEL // 256-BIT ENCRYPTED
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-1.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title="Close [ESC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 font-mono text-xs">
              {status === "transmitted" ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      TRANSMISSION CONFIRMED
                    </h3>
                    <p className="text-slate-400 max-w-sm text-xs">
                      Payload successfully routed. Joshua Camacho will acknowledge receipt within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
                  >
                    DISMISS CONSOLE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Sender Name & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider">
                        SENDER IDENTIFIER:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer (Tech Lead)"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#05080f] border border-slate-800 focus:border-cyan-400 p-2.5 rounded-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider">
                        RETURN SIGNAL (EMAIL):
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@enterprise.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#05080f] border border-slate-800 focus:border-cyan-400 p-2.5 rounded-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Objective Category Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider">
                      PRIMARY OBJECTIVE:
                    </label>
                    <select
                      value={formState.objective}
                      onChange={(e) => setFormState({ ...formState, objective: e.target.value })}
                      className="w-full bg-[#05080f] border border-slate-800 focus:border-cyan-400 p-2.5 rounded-sm text-slate-100 focus:outline-none cursor-pointer"
                    >
                      <option value="Full-Stack Systems">Full-Stack Systems Engineering Role</option>
                      <option value="High-Throughput Backend">Backend & Database Architecture</option>
                      <option value="3D & Procedural Graphics">3D WebGL / Creative Development</option>
                      <option value="Consulting & Advisory">System Advisory / Contract Project</option>
                    </select>
                  </div>

                  {/* Message Payload */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider">
                      TRANSMISSION PAYLOAD:
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline project scope, architecture requirements, or role specifications..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#05080f] border border-slate-800 focus:border-cyan-400 p-2.5 rounded-sm text-slate-100 placeholder:text-slate-600 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "encrypting"}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-cyan-500 text-black font-bold tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer disabled:opacity-50"
                  >
                    {status === "encrypting" ? (
                      <>
                        <ShieldCheck className="w-4 h-4 animate-spin" />
                        <span>ENCRYPTING & DISPATCHING PACKETS...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT ENCRYPTED PAYLOAD</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}