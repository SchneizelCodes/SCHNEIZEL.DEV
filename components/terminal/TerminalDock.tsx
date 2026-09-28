"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";
import { Terminal as TerminalIcon, X, Minus, CornerDownLeft, Sparkles } from "lucide-react";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalDock() {
  const isTerminalOpen = useCommandCenterStore((state) => state.isTerminalOpen);
  const toggleTerminal = useCommandCenterStore((state) => state.toggleTerminal);
  const setCoreTheme = useCommandCenterStore((state) => state.setCoreTheme);
  const setMode = useCommandCenterStore((state) => state.setMode);
    const setIsContactOpen = useCommandCenterStore((state) => state.setIsContactOpen);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "sys.init",
      output: (
        <div className="text-slate-400 space-y-1">
          <p className="text-cyan-400 font-bold">
            JOSHUA CAMACHO // COMMAND SHELL (v2.4.0-edge)
          </p>
          <p>Type <span className="text-emerald-400 font-bold">help</span> to list available diagnostic commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);

  // Focus input when opened
  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  // Scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.toLowerCase().split(" ");
    let response: React.ReactNode = "";

    switch (cmd) {
      case "help":
        response = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div><span className="text-cyan-400 font-bold">skills</span> - Developer skill matrix & competencies</div>
            <div><span className="text-cyan-400 font-bold">stack</span> - Inspect portfolio runtime architecture</div>
            <div><span className="text-cyan-400 font-bold">projects</span> - View all 4 system pods and telemetry</div>
            <div><span className="text-cyan-400 font-bold">theme [cyan|emerald|amber]</span> - Switch 3D theme</div>
            <div><span className="text-cyan-400 font-bold">mode [spatial|fasttrack]</span> - Switch visual mode</div>
            <div><span className="text-cyan-400 font-bold">whoami</span> - Engineering bio & philosophy</div>
            <div><span className="text-cyan-400 font-bold">contact</span> - Direct encrypted inquiry endpoints</div>
            <div><span className="text-cyan-400 font-bold">clear</span> - Clear terminal buffer</div>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-3 text-xs">
            <div>
              <p className="text-cyan-400 font-bold mb-1">[ FULL-STACK SYSTEMS ]</p>
              <p className="text-slate-300">Next.js 15 (App Router), React 19, TypeScript, Node.js, Zustand, Tailwind CSS, Server Actions</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold mb-1">[ CLOUD & DATABASES ]</p>
              <p className="text-slate-300">Supabase, PostgreSQL (RLS), Redis, TimescaleDB, Docker, Vercel Edge Runtime</p>
            </div>
            <div>
              <p className="text-amber-400 font-bold mb-1">[ 3D & PROCEDURAL ]</p>
              <p className="text-slate-300">Three.js, React Three Fiber (R3F), Drei, GLTF/GLB Pipelines, Blender Python Automation (`bpy`)</p>
            </div>
            <div>
              <p className="text-purple-400 font-bold mb-1">[ REAL-TIME & AUTOMATION ]</p>
              <p className="text-slate-300">WebSockets, Event Streams, PayMongo Payment Engine, AI/LLM Orchestration</p>
            </div>
          </div>
        );
        break;

      case "stack":
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">CURRENT LIVE RUNTIME ENVIRONMENT:</p>
            <p>• Framework: Next.js 15.x (React 19 Server Components)</p>
            <p>• 3D Viewport: Three.js r170+ / @react-three/fiber v9</p>
            <p>• State Store: Zustand v5 (Zero-re-render WebGL-to-DOM bridge)</p>
            <p>• Shaders & Motion: Framer Motion + WebGL SDF Billboard Engine</p>
            <p>• Styling: Tailwind CSS v4 Industrial Design Tokens</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <p><span className="text-cyan-400 font-bold">01 // HLPSHOP:</span> Multi-Vendor E-Commerce Engine [PRODUCTION - LATENCY &lt; 450ms]</p>
            <p><span className="text-cyan-400 font-bold">02 // PANDELOOT:</span> Inventory State Machine & Automation [ACTIVE - SYNC &lt; 50ms]</p>
            <p><span className="text-amber-400 font-bold">03 // FINTECH STREAM:</span> Orderflow Tick Engine [IN_DEVELOPMENT - 60FPS TARGET]</p>
            <p><span className="text-amber-400 font-bold">04 // BLENDER LAB:</span> Python glTF Draco Pipeline [IN_DEVELOPMENT - 80% REDUCTION]</p>
          </div>
        );
        break;

      case "theme":
        const targetTheme = args[0] as CoreTheme;
        if (["cyan", "emerald", "amber"].includes(targetTheme)) {
          setCoreTheme(targetTheme);
          response = (
            <span className="text-emerald-400">
              SUCCESS: 3D Quantum Core accent lighting switched to [{targetTheme.toUpperCase()}].
            </span>
          );
        } else {
          response = <span className="text-red-400">ERROR: Unknown theme. Use: theme cyan | theme emerald | theme amber</span>;
        }
        break;

      case "mode":
        const targetMode = args[0];
        if (targetMode === "spatial" || targetMode === "fasttrack") {
          setMode(targetMode === "spatial" ? "spatial" : "fastTrack");
          response = <span className="text-emerald-400">SUCCESS: Interface switched to [{targetMode.toUpperCase()}].</span>;
        } else {
          response = <span className="text-red-400">ERROR: Use: mode spatial | mode fasttrack</span>;
        }
        break;

      case "whoami":
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-white font-bold">Joshua Camacho</p>
            <p className="text-cyan-400">Full-Stack Systems Engineer & Creative 3D Developer</p>
            <p className="text-slate-400 mt-2">
              Passionate about high-throughput web systems, real-time distributed data, and procedural 3D graphics on the web.
            </p>
          </div>
        );
        break;

            case "contact":
        setIsContactOpen(true);
        response = (
          <span className="text-emerald-400 font-bold">
            OPENING SECURE TRANSMISSION DISPATCH CONSOLE...
          </span>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = (
          <span className="text-red-400">
            Command not recognized: &apos;{trimmed}&apos;. Type &apos;help&apos; for list.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: response }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#070b14]/90 backdrop-blur-2xl pointer-events-auto shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col max-h-[450px] overflow-hidden">
            
            {/* Terminal Window Header Bar: macOS Glass & Editorial Tracking */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
              {/* Traffic control dots */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTerminal}
                  className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-rose-500 transition-colors cursor-pointer"
                  title="Close"
                />
                <button
                  onClick={toggleTerminal}
                  className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-amber-400 transition-colors cursor-pointer"
                  title="Minimize"
                />
                <button
                  className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-emerald-400 transition-colors cursor-pointer"
                  title="Expand"
                />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[11px] text-white/70 font-medium tracking-[0.2em] uppercase">
                  SCHNEIZEL SHELL • BASH V2.4
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Close Button */}
              <button
                onClick={toggleTerminal}
                className="w-7 h-7 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                title="Close Terminal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Terminal Scroll History Area */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs flex-1 bg-transparent">
              {history.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <span className="text-emerald-400">❯</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="pl-4 text-white/70">{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Command Input Form: Sleek Pill Capsule */}
            <form
              onSubmit={handleCommand}
              className="p-3.5 sm:px-5 border-t border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md focus-within:border-white/40 focus-within:bg-white/[0.07] transition-all">
                <span className="text-emerald-400 font-sans text-xs font-semibold tracking-wider">
                  guest ❯
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type 'help', 'skills', 'theme emerald', 'stack'..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 text-xs font-sans focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-7 h-7 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-slate-200 transition-all cursor-pointer shadow-sm"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}