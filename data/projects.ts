export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: "E-Commerce" | "Systems & Automation" | "FinTech" | "3D & Procedural";
  summary: string;
  status: "PRODUCTION" | "ACTIVE" | "IN_DEVELOPMENT";
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    apis: string[];
  };
  metrics: ProjectMetric[];
  techStack: string[];
  links: {
    liveDemo?: string;
    github?: string;
  };
  spatialPosition: [number, number, number];
}

export const PROJECTS: ProjectData[] = [
  {
    id: "hlpshop",
    title: "HLPSHOP",
    subtitle: "Multi-Vendor E-Commerce & Logistics Engine",
    category: "E-Commerce",
    status: "PRODUCTION",
    summary:
      "Enterprise-grade multi-vendor platform engineered with Next.js App Router, Supabase real-time database, and PayMongo payment integration. Built for low-latency storefront operations with localized payment processing and multi-tiered vendor dashboards.",
    architecture: {
      frontend: "Next.js 15 (App Router), Tailwind CSS, Zustand",
      backend: "Next.js Server Actions & Edge Middleware",
      database: "Supabase (PostgreSQL with Row-Level Security)",
      apis: ["PayMongo API", "Webhooks Event Engine", "Resend SMTP"],
    },
    metrics: [
      { label: "Checkout Latency", value: "< 450ms" },
      { label: "Data Integrity", value: "100% RLS Protected" },
      { label: "Vendor Onboarding", value: "Real-time" },
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "PayMongo", "Tailwind CSS"],
    links: {
      liveDemo: "https://hlpshop-pw9kr0wym-schneizelcodes-projects.vercel.app",
      github: "https://github.com/SchneizelCodes",
    },
    spatialPosition: [-2.0, 0.7, 0.8],
  },
  {
    id: "pandeloot",
    title: "PANDELOOT",
    subtitle: "Real-Time Inventory & Operational State Machine",
    category: "Systems & Automation",
    status: "ACTIVE",
    summary:
      "High-velocity inventory management and digital commerce web platform. Features resilient optimistic state updates, automated inventory replenishment pipelines, and custom event-driven webhook relays.",
    architecture: {
      frontend: "React 19, TypeScript, Framer Motion",
      backend: "Node.js / Edge Runtime, Redis Cache Layer",
      database: "PostgreSQL with connection pooling (PgBouncer)",
      apis: ["Custom Webhook Hub", "Discord Bot Integration", "Stripe Connect"],
    },
    metrics: [
      { label: "State Sync", value: "Optimistic < 50ms" },
      { label: "Cache Hit Rate", value: "94.2%" },
      { label: "Concurrency", value: "Zero Collisions" },
    ],
    techStack: ["TypeScript", "PostgreSQL", "Redis", "Edge Functions", "Tailwind CSS"],
    links: {
      liveDemo: "https://pande-loot-1f4zt009h-schneizelcodes-projects.vercel.app",
      github: "https://github.com/SchneizelCodes",
    },
    spatialPosition: [-1.4, -1.2, 1.2],
  },
  {
    id: "fintech-stream",
    title: "FINTECH STREAM",
    subtitle: "Real-Time Financial Systems & Orderflow Stream",
    category: "FinTech",
    status: "IN_DEVELOPMENT",
    summary:
      "Upcoming low-latency market surveillance and financial streaming terminal. Planned architecture includes sub-second tick intervals, liquidity cluster heatmaps, and custom volume profile algorithms directly inside hardware-accelerated Canvas.",
    architecture: {
      frontend: "HTML5 High-DPI Canvas, WebGL Shader Shards",
      backend: "WebSocket Multiplexer & Order Book Aggregator",
      database: "TimescaleDB / ClickHouse Time-Series Store",
      apis: ["Public Financial WebSocket Streams", "Derivatives Orderbook"],
    },
    metrics: [
      { label: "Target Frequency", value: "60 FPS Clamped" },
      { label: "Target Jitter", value: "< 15ms" },
      { label: "Pipeline Status", value: "Architecture Phase" },
    ],
    techStack: ["WebSockets", "HTML5 Canvas", "TypeScript", "TimescaleDB"],
    links: {
      github: "https://github.com/SchneizelCodes",
    },
    spatialPosition: [1.4, -1.2, 1.2],
  },
  {
    id: "blender-lab",
    title: "PROCEDURAL 3D LAB",
    subtitle: "Blender 3D Procedural Lab & glTF Pipeline",
    category: "3D & Procedural",
    status: "IN_DEVELOPMENT",
    summary:
      "Upcoming procedural 3D environment and automated asset optimization pipeline. Engineered for headless Blender Python scripting (`bpy`) to compile, bake normal maps, and export Draco-compressed glTF assets for instant web loading.",
    architecture: {
      frontend: "Three.js, WebGL 2.0, glTF Draco Loader",
      backend: "Headless Python `bpy` batch processing CLI",
      database: "Cloudflare R2 Object Storage CDN",
      apis: ["Blender MCP Server", "Texture Synthesis Engine"],
    },
    metrics: [
      { label: "Compression Goal", value: "80%+ Reduction" },
      { label: "Load Time Target", value: "< 1.5s on 4G" },
      { label: "Pipeline Status", value: "R&D Prototype" },
    ],
    techStack: ["Blender (Python)", "Three.js", "glTF / GLB", "WebGL"],
    links: {
      github: "https://github.com/SchneizelCodes",
    },
      spatialPosition: [2.0, 0.7, 0.8],
  },
];