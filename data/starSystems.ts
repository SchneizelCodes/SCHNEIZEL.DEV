export interface SystemUtility {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  commandSnippet?: string;
  link?: string;
}

export interface StarSystemData {
  id: string;
  name: string;
  celestialBody: string; // Real-life counterpart: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
  title: string;
  designation: string;
  domain: string;
  spectralClass: string;
  spectralColor: string;
  coronaColor: string;
  summary: string;
  // Astronomical physics & miniature metrics
  semiMajorAxis: number; // Miniature orbit radius (AU scaled to WebGL units)
  eccentricity: number; // Orbital eccentricity (0 = circle)
  inclinationDeg: number; // Orbital tilt in degrees
  size: number; // Miniature planet radius/size
  realDistAU: number;
  realRadiusKm: number;
  realOrbitPeriod: string;
  periodSpeedFactor: number; // Speed factor following Kepler's 3rd Law (omega ~ a^-1.5)
  ringRadius?: number; // e.g. Saturn: 8.0
  hasMoon?: boolean; // e.g. Earth: moon at radius 2.8, size 0.32
  position: [number, number, number]; // Reference initial Cartesian coordinate
  cameraFocus: {
    position: [number, number, number];
    target: [number, number, number];
  };
  planetRange: [number, number]; // Project numbers [min, max] (1-100 total)
  telemetry: {
    totalProjects: number;
    productionCount: number;
    activeCount: number;
    systemHealth: string;
  };
  utilities: SystemUtility[];
}

// Function calculating real-time Keplerian orbit coordinates (Kepler's 1st, 2nd, 3rd Laws)
export function getPlanetaryPosition(
  semiMajorAxis: number,
  eccentricity: number,
  inclinationDeg: number,
  speed: number,
  time: number
): [number, number, number] {
  // Mean anomaly
  const M = time * speed;

  // First-order approximation of Kepler's Equation for True Anomaly (nu)
  const nu =
    M +
    (2 * eccentricity - Math.pow(eccentricity, 3) / 4) * Math.sin(M) +
    1.25 * Math.pow(eccentricity, 2) * Math.sin(2 * M);

  // Distance from focal point (Sun)
  const r =
    (semiMajorAxis * (1 - eccentricity * eccentricity)) /
    (1 + eccentricity * Math.cos(nu));

  // Convert to 3D Cartesian coordinates with orbital inclination tilt elevated above black hole
  const incRad = (inclinationDeg * Math.PI) / 180;
  const x = r * Math.cos(nu);
  const z = r * Math.sin(nu) * Math.cos(incRad);
  const y = 14.0 + r * Math.sin(nu) * Math.sin(incRad);

  return [x, y, z];
}

// Global Sun Astronomical Specification
export const SUN_SPEC = {
  name: "The Sun (Sol Prime)",
  spectralClass: "G2V Yellow Dwarf",
  color: "#FFD27D",
  coronaColor: "#f59e0b",
  size: 10.0, // Miniature size matching the specification table
  realRadiusKm: 696340,
  realDistAU: 0.0,
  position: [0, 14.0, 0] as [number, number, number],
};

// 8 Sovereign Systems aligned with the 8 Planetary Bodies of the Solar System
export const STAR_SYSTEMS: StarSystemData[] = [
  {
    id: "system-mercury",
    name: "Mercury • Vulcan Dynamo",
    celestialBody: "Mercury",
    title: "The Iron Crucible",
    designation: "Class-M Pitted Terrestrial World",
    domain: "Low-Level Systems, Compilers & Performance",
    spectralClass: "Pitted Slate Planet",
    spectralColor: "#8C827A",
    coronaColor: "#a8a29e",
    summary:
      "High-velocity memory allocation, WebAssembly compute engines, SIMD vector instructions, and zero-allocation performance pipelines under extreme radiation.",
    semiMajorAxis: 16.0,
    eccentricity: 0.205,
    inclinationDeg: 7.0,
    size: 0.5,
    realDistAU: 0.39,
    realRadiusKm: 2439,
    realOrbitPeriod: "88 days",
    periodSpeedFactor: 0.28,
    position: [16.0, 0, 0],
    cameraFocus: {
      position: [13.5, 1.8, 4.5],
      target: [16.0, 0, 0],
    },
    planetRange: [77, 88],
    telemetry: {
      totalProjects: 12,
      productionCount: 1,
      activeCount: 1,
      systemHealth: "OVERCLOCKED",
    },
    utilities: [
      {
        id: "util-wasm-vector",
        title: "Wasm SIMD Matrix Multiplier",
        category: "Assembly / Rust",
        description: "Compiled Rust WebAssembly routine for fast 4x4 matrix vector operations in the browser.",
        badge: "Rust / Wasm",
        commandSnippet: "wasm-pack build --target web --release",
      },
    ],
  },
  {
    id: "system-venus",
    name: "Venus • Hyperion Core",
    celestialBody: "Venus",
    title: "The Chromatic Loom",
    designation: "Class-O Sulfuric Atmospheric Super-World",
    domain: "3D WebGL, Spatial UI & Shaders",
    spectralClass: "Sulfuric Ochre Planet",
    spectralColor: "#E3BB7B",
    coronaColor: "#d97706",
    summary:
      "Procedural GLSL shader pipelines, custom Three.js raymarching environments, and real-time kinetic visual computing engines obscured by thick atmospheric clouds.",
    semiMajorAxis: 22.0,
    eccentricity: 0.007,
    inclinationDeg: 3.4,
    size: 1.15,
    realDistAU: 0.72,
    realRadiusKm: 6051,
    realOrbitPeriod: "225 days",
    periodSpeedFactor: 0.174,
    position: [22.0, 0, 0],
    cameraFocus: {
      position: [18.5, 2.2, 5.5],
      target: [22.0, 0, 0],
    },
    planetRange: [13, 24],
    telemetry: {
      totalProjects: 12,
      productionCount: 1,
      activeCount: 2,
      systemHealth: "60 FPS SOLID",
    },
    utilities: [
      {
        id: "util-moire-shader",
        title: "Mystery Moiré Vertex-Fragment Shader",
        category: "GLSL / Three.js",
        description: "GPU-driven concentric shell interference pattern with view-dependent Fresnel luminance.",
        badge: "GLSL Shader",
        commandSnippet: "import { holoVertexShader } from '@/components/canvas/ProjectPods'",
      },
    ],
  },
  {
    id: "system-earth",
    name: "Earth • Nexus Prime",
    celestialBody: "Earth",
    title: "The Production Foundry",
    designation: "Class-F Terran Biosphere & Moon System",
    domain: "Full-Stack & Cloud Platforms",
    spectralClass: "Blue/White Oceans & Continents",
    spectralColor: "#2B82C9",
    coronaColor: "#38bdf8",
    summary:
      "High-concurrency enterprise web platforms, serverless architectures, and transactional e-commerce engines designed for zero downtime and low checkout latency.",
    semiMajorAxis: 28.0,
    eccentricity: 0.017,
    inclinationDeg: 0.0,
    size: 1.2,
    realDistAU: 1.0,
    realRadiusKm: 6371,
    realOrbitPeriod: "365.25 days",
    periodSpeedFactor: 0.12,
    hasMoon: true,
    position: [28.0, 0, 0],
    cameraFocus: {
      position: [24.0, 2.4, 6.0],
      target: [28.0, 0, 0],
    },
    planetRange: [1, 12],
    telemetry: {
      totalProjects: 12,
      productionCount: 2,
      activeCount: 1,
      systemHealth: "100% NOMINAL",
    },
    utilities: [
      {
        id: "util-next-turbo",
        title: "Next.js 15 Turbopack Build Optimizer",
        category: "Cloud Runtime",
        description: "Optimized server actions pipeline with streaming SSR and PgBouncer connection reuse.",
        badge: "Next.js / Edge",
        commandSnippet: "pnpm build --turbo",
      },
      {
        id: "util-webhook-relay",
        title: "Idempotent Webhook Event Hub",
        category: "Event Processing",
        description: "Zero-loss webhook signature verifier and retry worker built on Redis Streams.",
        badge: "Redis / Node",
        commandSnippet: "docker run -p 6379:6379 redis:alpine",
      },
    ],
  },
  {
    id: "system-mars",
    name: "Mars • Aegis Alpha",
    celestialBody: "Mars",
    title: "The Ledger Dynamo",
    designation: "Class-A Rust Carmine Frontier",
    domain: "Financial Engines & High-Frequency State",
    spectralClass: "Rust Carmine Desert",
    spectralColor: "#C1440E",
    coronaColor: "#ea580c",
    summary:
      "Deterministic order-matching engines, real-time cryptocurrency candlestick simulators, and fault-tolerant financial settlement ledgers across iron-oxide canyons.",
    semiMajorAxis: 36.0,
    eccentricity: 0.093,
    inclinationDeg: 1.85,
    size: 0.7,
    realDistAU: 1.52,
    realRadiusKm: 3389,
    realOrbitPeriod: "687 days",
    periodSpeedFactor: 0.082,
    position: [36.0, 0, 0],
    cameraFocus: {
      position: [32.5, 2.0, 5.0],
      target: [36.0, 0, 0],
    },
    planetRange: [25, 37],
    telemetry: {
      totalProjects: 13,
      productionCount: 1,
      activeCount: 2,
      systemHealth: "99.999% INTEGRITY",
    },
    utilities: [
      {
        id: "util-candlestick-engine",
        title: "Virtual Orderbook Tick Generator",
        category: "Financial Algo",
        description: "Sub-millisecond simulated market depth generator with Poisson-distributed volatility spikes.",
        badge: "TypeScript Algo",
        commandSnippet: "import { CandlestickSimulator } from '@/components/sandbox/CandlestickSimulator'",
      },
    ],
  },
  {
    id: "system-jupiter",
    name: "Jupiter • Chronos Monarch",
    celestialBody: "Jupiter",
    title: "The Gas Colossus & Trojan King",
    designation: "Class-K Banded Cream Giant with Lagrange Swarms",
    domain: "Distributed Architecture & Data Engineering",
    spectralClass: "Banded Cream Gas Giant",
    spectralColor: "#C88B3A",
    coronaColor: "#fbbf24",
    summary:
      "Global multi-region replication, write-ahead log synchronization, and large-scale data lake warehousing pipelines protected by colossal gravitational Hill Spheres.",
    semiMajorAxis: 58.0,
    eccentricity: 0.048,
    inclinationDeg: 1.3,
    size: 4.2,
    realDistAU: 5.2,
    realRadiusKm: 69911,
    realOrbitPeriod: "11.86 years",
    periodSpeedFactor: 0.041,
    position: [58.0, 0, 0],
    cameraFocus: {
      position: [48.0, 6.5, 14.0],
      target: [58.0, 0, 0],
    },
    planetRange: [38, 50],
    telemetry: {
      totalProjects: 13,
      productionCount: 0,
      activeCount: 2,
      systemHealth: "SYNCHRONIZED",
    },
    utilities: [
      {
        id: "util-cdc-stream",
        title: "Change Data Capture (CDC) Pipeline",
        category: "Data Streaming",
        description: "Real-time WAL parser streaming database state mutations directly into analytical caches.",
        badge: "Kafka / Redis",
        commandSnippet: "SELECT * FROM pg_create_logical_replication_slot('cdc_slot', 'wal2json');",
      },
    ],
  },
  {
    id: "system-saturn",
    name: "Saturn • Nereus Abyssal",
    celestialBody: "Saturn",
    title: "The Ringed Colossus",
    designation: "Class-B Pale Gold Giant with Majestic Ring System",
    domain: "Real-Time WebSockets & Event Relays",
    spectralClass: "Pale Gold Ringed Giant",
    spectralColor: "#E2BF7D",
    coronaColor: "#fde047",
    summary:
      "Bioluminescent low-latency telemetry pipelines, bidirectional WebSocket audio/video transport, and peer-to-peer data mesh networks framed by expansive ring bands.",
    semiMajorAxis: 78.0,
    eccentricity: 0.056,
    inclinationDeg: 2.5,
    size: 3.5,
    ringRadius: 8.0,
    realDistAU: 9.58,
    realRadiusKm: 58232,
    realOrbitPeriod: "29.45 years",
    periodSpeedFactor: 0.026,
    position: [78.0, 0, 0],
    cameraFocus: {
      position: [68.0, 6.0, 16.0],
      target: [78.0, 0, 0],
    },
    planetRange: [64, 76],
    telemetry: {
      totalProjects: 13,
      productionCount: 0,
      activeCount: 2,
      systemHealth: "< 24ms LATENCY",
    },
    utilities: [
      {
        id: "util-ws-heartbeat",
        title: "Resilient WebSocket Heartbeat & Reconnect",
        category: "Networking",
        description: "Exponential backoff with jitter and binary packet compression over secure TLS sockets.",
        badge: "WebSockets",
        commandSnippet: "const socket = new WebSocket('wss://stream.schneizel.dev');",
      },
    ],
  },
  {
    id: "system-uranus",
    name: "Uranus • Nocturne Void",
    celestialBody: "Uranus",
    title: "The Cyan Ice Giant",
    designation: "Class-T Aquamarine Tilted Dynamo",
    domain: "Autonomous AI Agents & MCP Protocols",
    spectralClass: "Cyan/Aquamarine Ice Giant",
    spectralColor: "#4b70dd",
    coronaColor: "#38bdf8",
    summary:
      "Multi-agent tool orchestration, Model Context Protocol servers, LLM streaming agents, and autonomic self-healing systems rotating along an extreme 98° axial tilt.",
    semiMajorAxis: 102.0,
    eccentricity: 0.046,
    inclinationDeg: 0.77,
    size: 2.2,
    realDistAU: 19.22,
    realRadiusKm: 25362,
    realOrbitPeriod: "84.0 years",
    periodSpeedFactor: 0.017,
    position: [102.0, 0, 0],
    cameraFocus: {
      position: [92.0, 4.5, 12.0],
      target: [102.0, 0, 0],
    },
    planetRange: [51, 63],
    telemetry: {
      totalProjects: 13,
      productionCount: 1,
      activeCount: 3,
      systemHealth: "AUTONOMOUS",
    },
    utilities: [
      {
        id: "util-mcp-tooling",
        title: "Model Context Protocol JSON-RPC Bridge",
        category: "AI Agent Dev",
        description: "Zero-latency stdio and SSE MCP server integration for agent tool declarations and execution.",
        badge: "MCP / TypeScript",
        commandSnippet: "npx @modelcontextprotocol/inspector node build/index.js",
      },
    ],
  },
  {
    id: "system-neptune",
    name: "Neptune • Cocytus Cryo",
    celestialBody: "Neptune",
    title: "The Deep Azure Sovereign",
    designation: "Class-A Cryogenic Supersonic Wind World",
    domain: "Experimental R&D & Procedural Cosmos",
    spectralClass: "Deep Azure Ice Giant",
    spectralColor: "#274687",
    coronaColor: "#6366f1",
    summary:
      "Extreme cryogenic algorithmic sandboxes, non-Euclidean procedural topography, and avant-garde interactive digital artifacts orbiting at the edge of the Kuiper Belt.",
    semiMajorAxis: 124.0,
    eccentricity: 0.009,
    inclinationDeg: 1.77,
    size: 2.1,
    realDistAU: 30.05,
    realRadiusKm: 24622,
    realOrbitPeriod: "164.8 years",
    periodSpeedFactor: 0.012,
    position: [124.0, 0, 0],
    cameraFocus: {
      position: [114.0, 4.5, 12.0],
      target: [124.0, 0, 0],
    },
    planetRange: [89, 100],
    telemetry: {
      totalProjects: 12,
      productionCount: 0,
      activeCount: 1,
      systemHealth: "EXPERIMENTAL",
    },
    utilities: [
      {
        id: "util-simplex-noise",
        title: "Procedural Fractal Simplex Noise",
        category: "Math / Procedural",
        description: "Seamless 3D spherical simplex noise generator with analytical derivatives for terrain normal computation.",
        badge: "Procedural",
        commandSnippet: "float n = snoise(vec4(position * scale, time * 0.1));",
      },
    ],
  },
];
