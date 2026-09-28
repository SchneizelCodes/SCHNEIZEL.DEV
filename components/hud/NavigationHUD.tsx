"use client";

import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";
import { Terminal, Eye, Layers, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { AtmosphereSelector } from "./AtmosphereSelector";

const NAV_ITEMS = [
  { id: "hero", label: "CORE" },
  { id: "projects", label: "PROJECTS" },
  { id: "sandbox", label: "SANDBOX" },
  { id: "terminal", label: "TERMINAL" },
];

export function NavigationHUD() {
  const activeSection = useCommandCenterStore((state) => state.activeSection);
  const setActiveSection = useCommandCenterStore((state) => state.setActiveSection);

  const mode = useCommandCenterStore((state) => state.mode);
  const setMode = useCommandCenterStore((state) => state.setMode);

  const toggleTerminal = useCommandCenterStore((state) => state.toggleTerminal);
  const toggleContact = useCommandCenterStore((state) => state.toggleContact);

  const soundEnabled = useCommandCenterStore((state) => state.soundEnabled);
  const toggleSound = useCommandCenterStore((state) => state.toggleSound);

  const handleNavClick = (id: string) => {
    sound.playClick();
    if (id === "terminal") {
      toggleTerminal();
    }
    setActiveSection(id);
  };

  const handleSoundToggle = () => {
    toggleSound();
    sound.enabled = !soundEnabled;
    if (!soundEnabled) {
      sound.playClick();
    }
  };

  const handleModeToggle = () => {
    sound.playWhoosh();
    setMode(mode === "spatial" ? "fastTrack" : "spatial");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-6 py-6 sm:px-10 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brandmark / Signature Identity (Borderless, Floating, Editorial) */}
        <div 
          onClick={() => handleNavClick("hero")}
          className="pointer-events-auto flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-white/50 transition-colors">
            <span className="text-xs font-bold tracking-wider text-white">JC</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase group-hover:text-cyan-300 transition-colors">
                SCHNEIZEL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-white/40 tracking-[0.25em] font-mono">
              SYSTEMS ARCHITECT
            </span>
          </div>
        </div>

        {/* Floating Center Navigation (WayWild Editorial Style: Borderless, Spacious, Clean) */}
        <nav className="hidden lg:flex pointer-events-auto items-center gap-6 xl:gap-8 px-5 xl:px-6 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sound.playHover()}
                className={`relative text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Hub: Unified Glass Cluster + Solid High-Contrast Pill CTA */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          
          {/* Atmosphere Palette Switcher */}
          <div className="rounded-full border border-white/10 bg-black/30 backdrop-blur-xl px-1.5 sm:px-2 py-0.5 sm:py-1">
            <AtmosphereSelector />
          </div>

          {/* Spatial 3D / 2D Quick Toggle */}
          <button
            onClick={handleModeToggle}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            title={mode === "spatial" ? "Switch to Fast-Track 2D Dossier" : "Switch to Spatial 3D Experience"}
          >
            {mode === "spatial" ? (
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
            ) : (
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            )}
          </button>

          {/* Audio SFX Toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            title={soundEnabled ? "Mute Cyber Audio" : "Unmute Cyber Audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30" />
            )}
          </button>

          {/* CLI Terminal Launcher */}
          <button
            onClick={() => {
              sound.playClick();
              toggleTerminal();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden xl:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            title="Open UNIX CLI Terminal"
          >
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Luxury Solid Pill CTA (Directly Inspired by WayWild's DISCOVER TRIPS button) */}
          <button
            onClick={() => {
              sound.playClick();
              toggleContact();
            }}
            onMouseEnter={() => sound.playHover()}
            className="rounded-full bg-white text-slate-950 px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-1.5 cursor-pointer ml-0.5 sm:ml-1"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
}