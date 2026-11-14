import { create } from "zustand";

export type Mode = "spatial" | "fastTrack";
export type CoreTheme = "cyan" | "emerald" | "amber";
export type AtmosphereMode = "cyanVoid" | "solarGold" | "blueprintCad" | "matrixEmerald";

export interface CameraTarget {
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_PRESETS: Record<string, CameraTarget> = {
  hero: {
    position: [0, 36.0, 72.0],
    target: [0, 14.0, 0],
  },
  projects: {
    position: [0, 56.0, 110.0],
    target: [0, 14.0, 0],
  },
  sandbox: {
    position: [24.0, 20.0, 20.0],
    target: [28.0, 14.0, 0.0],
  },
  terminal: {
    position: [0, 18.0, 36.0],
    target: [0, 14.0, 0],
  },
};

interface CommandCenterState {
  mode: Mode;
  activeSection: string;
  setMode: (mode: Mode) => void;
  setActiveSection: (section: string) => void;

  cameraTarget: CameraTarget;
  setCameraTarget: (target: CameraTarget) => void;

  coreTheme: CoreTheme;
  setCoreTheme: (theme: CoreTheme) => void;

  // 4-Way Atmosphere Environment Matrix
  atmosphere: AtmosphereMode;
  setAtmosphere: (env: AtmosphereMode) => void;

  telemetry: {
    fps: number;
    camPos: [number, number, number];
  };
  setTelemetry: (telemetry: { fps: number; camPos: [number, number, number] }) => void;

  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  // Multi-Stellar System State
  selectedStarSystemId: string | null;
  setSelectedStarSystemId: (id: string | null) => void;

  // Two-Way Spatial Hover Synchronization
  hoveredPlanetId: string | null;
  setHoveredPlanetId: (id: string | null) => void;

  // Planetary Syzygy / Alignment Mode (Orbit vs Straight Line Parade)
  isPlanetsAligned: boolean;
  setIsPlanetsAligned: (aligned: boolean) => void;
  togglePlanetsAligned: () => void;

  // Gravitational Scramble Trigger Token
  scrambleToken: number;
  triggerScramble: () => void;

  // Interactive Meteor Selection
  selectedMeteorId: string | null;
  setSelectedMeteorId: (id: string | null) => void;

  isTerminalOpen: boolean;
  toggleTerminal: () => void;

  isContactOpen: boolean;
  toggleContact: () => void;
  setIsContactOpen: (open: boolean) => void;

  soundEnabled: boolean;
  toggleSound: () => void;

  isLootBoxOpen: boolean;
  toggleLootBox: () => void;
  setIsLootBoxOpen: (open: boolean) => void;

  // Third-Person Player POV State (Default to Free Cosmic Orbit & Flight)
  viewPerspective: "thirdPerson" | "freeOrbit";
  setViewPerspective: (view: "thirdPerson" | "freeOrbit") => void;
  toggleViewPerspective: () => void;

  playerPos: [number, number, number];
  setPlayerPos: (pos: [number, number, number]) => void;

  playerHeading: number;
  setPlayerHeading: (heading: number) => void;

  isPlayerBoosting: boolean;
  setIsPlayerBoosting: (boosting: boolean) => void;

  isPlayerMoving: boolean;
  setIsPlayerMoving: (moving: boolean) => void;

  nearestInteractable: {
    id: string;
    name: string;
    type: "planet" | "asteroid" | "sun" | "blackhole";
    distance: number;
    prompt: string;
  } | null;
  setNearestInteractable: (
    item: {
      id: string;
      name: string;
      type: "planet" | "asteroid" | "sun" | "blackhole";
      distance: number;
      prompt: string;
    } | null
  ) => void;
}

export const useCommandCenterStore = create<CommandCenterState>((set) => ({
  mode: "spatial",
  activeSection: "hero",
  setMode: (mode) => set({ mode }),
  setActiveSection: (activeSection) => set({ activeSection }),

  cameraTarget: CAMERA_PRESETS.hero,
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),

  coreTheme: "cyan",
  setCoreTheme: (coreTheme) => set({ coreTheme }),

  atmosphere: "cyanVoid",
  setAtmosphere: (atmosphere) => {
    // Automatically match the core accent color to the atmosphere
    let theme: CoreTheme = "cyan";
    if (atmosphere === "solarGold") theme = "amber";
    if (atmosphere === "matrixEmerald") theme = "emerald";
    if (atmosphere === "blueprintCad") theme = "cyan";
    set({ atmosphere, coreTheme: theme });
  },

  telemetry: {
    fps: 60,
    camPos: [0, 0, 7],
  },
  setTelemetry: (telemetry) => set({ telemetry }),

  selectedProjectId: null,
  setSelectedProjectId: (selectedProjectId) => set({ selectedProjectId }),

  selectedStarSystemId: null,
  setSelectedStarSystemId: (selectedStarSystemId) => set({ selectedStarSystemId }),

  hoveredPlanetId: null,
  setHoveredPlanetId: (hoveredPlanetId) => set({ hoveredPlanetId }),

  isPlanetsAligned: false,
  setIsPlanetsAligned: (isPlanetsAligned) => set({ isPlanetsAligned }),
  togglePlanetsAligned: () =>
    set((state) => ({ isPlanetsAligned: !state.isPlanetsAligned })),

  scrambleToken: 0,
  triggerScramble: () => set((state) => ({ scrambleToken: state.scrambleToken + 1 })),

  selectedMeteorId: null,
  setSelectedMeteorId: (selectedMeteorId) => set({ selectedMeteorId }),

  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  isContactOpen: false,
  toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen })),
  setIsContactOpen: (isContactOpen) => set({ isContactOpen }),

  soundEnabled: true,
  toggleSound: () =>
    set((state) => ({ soundEnabled: !state.soundEnabled })),

  isLootBoxOpen: false,
  toggleLootBox: () => set((state) => ({ isLootBoxOpen: !state.isLootBoxOpen })),
  setIsLootBoxOpen: (isLootBoxOpen) => set({ isLootBoxOpen }),

  // Third-Person Player POV State (Default to Free Cosmic Orbit & Flight)
  viewPerspective: "freeOrbit",
  setViewPerspective: (viewPerspective) => set({ viewPerspective }),
  toggleViewPerspective: () =>
    set((state) => ({
      viewPerspective:
        state.viewPerspective === "thirdPerson" ? "freeOrbit" : "thirdPerson",
    })),

  playerPos: [0, 1.5, 32.0],
  setPlayerPos: (playerPos) => set({ playerPos }),

  playerHeading: 0,
  setPlayerHeading: (playerHeading) => set({ playerHeading }),

  isPlayerBoosting: false,
  setIsPlayerBoosting: (isPlayerBoosting) => set({ isPlayerBoosting }),

  isPlayerMoving: false,
  setIsPlayerMoving: (isPlayerMoving) => set({ isPlayerMoving }),

  nearestInteractable: null,
  setNearestInteractable: (nearestInteractable) => set({ nearestInteractable }),
}));
