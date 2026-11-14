export interface ProjectMetric {
  label: string;
  value: string;
}

export type PlanetArchetype =
  | "mirror"
  | "bismuth"
  | "cinnabar"
  | "pyrite"
  | "gasGiant"
  | "ringed"
  | "ice"
  | "lava"
  | "oceanic"
  | "organic"
  | "desert"
  | "anomaly"
  | "circuit"
  | "crystal"
  | "storm"
  | "aurora"
  | "twilight"
  | "mineral";

export interface PlanetVisual {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  atmosphereColor: string;
  radius: number;
  archetype: PlanetArchetype;
  hasRing: boolean;
  ringInner?: number;
  ringOuter?: number;
  ringTilt?: [number, number, number];
  ringColor?: string;
  rotationSpeed: number;
  axialTilt: number;
  surfacePattern: "stripes" | "cracked" | "iridescent" | "swirl" | "crystals" | "craters" | "lattice" | "storm";
  patternScale: number;
  emissiveIntensity: number;
  roughness: number;
  hasMoon?: boolean;
}

export interface ProjectData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: string;
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
  visual: PlanetVisual;
}

export const PROJECTS: ProjectData[] = [
  {
    "id": "hlpshop",
    "number": 1,
    "title": "HLPSHOP",
    "subtitle": "Multi-Vendor E-Commerce & Logistics Engine",
    "category": "Geological & Mineral",
    "summary": "Enterprise-grade multi-vendor platform engineered with Next.js App Router, Supabase real-time database, and PayMongo payment integration. Built for low-latency storefront operations with localized payment processing and multi-tiered vendor dashboards.",
    "status": "PRODUCTION",
    "architecture": {
      "frontend": "Next.js 15 (App Router), Tailwind CSS, Zustand",
      "backend": "Next.js Server Actions & Edge Middleware",
      "database": "Supabase (PostgreSQL with Row-Level Security)",
      "apis": [
        "PayMongo API",
        "Webhooks Event Engine",
        "Resend SMTP"
      ]
    },
    "metrics": [
      {
        "label": "Checkout Latency",
        "value": "< 450ms"
      },
      {
        "label": "Data Integrity",
        "value": "100% RLS Protected"
      },
      {
        "label": "Vendor Onboarding",
        "value": "Real-time"
      }
    ],
    "techStack": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "PayMongo",
      "Tailwind CSS"
    ],
    "links": {
      "liveDemo": "https://hlpshop-pw9kr0wym-schneizelcodes-projects.vercel.app",
      "github": "https://github.com/SchneizelCodes"
    },
    "spatialPosition": [
      -4.6,
      1.2,
      2.8
    ],
    "visual": {
      "primaryColor": "#2dd4bf",
      "secondaryColor": "#0f172a",
      "accentColor": "#f8fafc",
      "atmosphereColor": "#5eead4",
      "radius": 0.95,
      "archetype": "mirror",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#f8fafc",
      "rotationSpeed": 0.4,
      "axialTilt": 0.28,
      "surfacePattern": "cracked",
      "patternScale": 7,
      "emissiveIntensity": 0.35,
      "roughness": 0.1,
      "hasMoon": true
    }
  },
  {
    "id": "pandeloot",
    "number": 2,
    "title": "PANDELOOT",
    "subtitle": "Real-Time Inventory & Operational State Machine",
    "category": "Geological & Mineral",
    "summary": "High-velocity inventory management and digital commerce web platform. Features resilient optimistic state updates, automated inventory replenishment pipelines, and custom event-driven webhook relays.",
    "status": "ACTIVE",
    "architecture": {
      "frontend": "React 19, TypeScript, Framer Motion",
      "backend": "Node.js / Edge Runtime, Redis Cache Layer",
      "database": "PostgreSQL with connection pooling (PgBouncer)",
      "apis": [
        "Custom Webhook Hub",
        "Discord Bot Integration",
        "Stripe Connect"
      ]
    },
    "metrics": [
      {
        "label": "State Sync",
        "value": "Optimistic < 50ms"
      },
      {
        "label": "Cache Hit Rate",
        "value": "94.2%"
      },
      {
        "label": "Concurrency",
        "value": "Zero Collisions"
      }
    ],
    "techStack": [
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Edge Functions",
      "Tailwind CSS"
    ],
    "links": {
      "liveDemo": "https://pande-loot-1f4zt009h-schneizelcodes-projects.vercel.app",
      "github": "https://github.com/SchneizelCodes"
    },
    "spatialPosition": [
      4.8,
      -1.1,
      3.2
    ],
    "visual": {
      "primaryColor": "#d946ef",
      "secondaryColor": "#06b6d4",
      "accentColor": "#eab308",
      "atmosphereColor": "#f472b6",
      "radius": 1.05,
      "archetype": "bismuth",
      "hasRing": true,
      "ringInner": 1.35,
      "ringOuter": 1.95,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#06b6d4",
      "rotationSpeed": 0.62,
      "axialTilt": 0.42,
      "surfacePattern": "iridescent",
      "patternScale": 8,
      "emissiveIntensity": 0.5,
      "roughness": 0.18,
      "hasMoon": false
    }
  },
  {
    "id": "planet-3-cinnabar-fissures",
    "number": 3,
    "title": "CINNABAR FISSURES",
    "subtitle": "Vermilion Fault Crags & Quicksilver Lakes",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 3",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      11.7,
      1.83,
      1.48
    ],
    "visual": {
      "primaryColor": "#dc2626",
      "secondaryColor": "#94a3b8",
      "accentColor": "#f87171",
      "atmosphereColor": "#ef4444",
      "radius": 0.9,
      "archetype": "cinnabar",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#f87171",
      "rotationSpeed": 0.84,
      "axialTilt": 0.15,
      "surfacePattern": "cracked",
      "patternScale": 6.5,
      "emissiveIntensity": 0.4,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-4-pyrite-monoliths",
    "number": 4,
    "title": "PYRITE MONOLITHS",
    "subtitle": "Brass-Gold Cubic Megalith Mountain Ranges",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 4",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -10.77,
      1.77,
      -6.09
    ],
    "visual": {
      "primaryColor": "#eab308",
      "secondaryColor": "#1e293b",
      "accentColor": "#fef08a",
      "atmosphereColor": "#fde047",
      "radius": 0.88,
      "archetype": "pyrite",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#fef08a",
      "rotationSpeed": 1.06,
      "axialTilt": 0.22,
      "surfacePattern": "crystals",
      "patternScale": 9,
      "emissiveIntensity": 0.45,
      "roughness": 0.15,
      "hasMoon": true
    }
  },
  {
    "id": "planet-5-pumice-archipelago",
    "number": 5,
    "title": "PUMICE ARCHIPELAGO",
    "subtitle": "Drifting Porous Continents over Liquid Sulfur",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 5",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      7.65,
      1.65,
      10.52
    ],
    "visual": {
      "primaryColor": "#eab308",
      "secondaryColor": "#64748b",
      "accentColor": "#f59e0b",
      "atmosphereColor": "#fbbf24",
      "radius": 0.92,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#f59e0b",
      "rotationSpeed": 1.28,
      "axialTilt": 0.18,
      "surfacePattern": "craters",
      "patternScale": 5.5,
      "emissiveIntensity": 0.3,
      "roughness": 0.6,
      "hasMoon": false
    }
  },
  {
    "id": "planet-6-banded-agate-chasm",
    "number": 6,
    "title": "BANDED AGATE CHASM",
    "subtitle": "Extreme Horizontal Pastel Strata Rift Valleys",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 6",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -10.11,
      1.5,
      -10.45
    ],
    "visual": {
      "primaryColor": "#fb923c",
      "secondaryColor": "#3b82f6",
      "accentColor": "#fef3c7",
      "atmosphereColor": "#60a5fa",
      "radius": 1.15,
      "archetype": "gasGiant",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#fef3c7",
      "rotationSpeed": 0.4,
      "axialTilt": 0.35,
      "surfacePattern": "stripes",
      "patternScale": 12,
      "emissiveIntensity": 0.3,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-7-basalt-pillar-steppes",
    "number": 7,
    "title": "BASALT PILLAR STEPPES",
    "subtitle": "Monolithic Hexagonal Columnar Causeways",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 7",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      8.39,
      1.31,
      10.7
    ],
    "visual": {
      "primaryColor": "#0f766e",
      "secondaryColor": "#18181b",
      "accentColor": "#2dd4bf",
      "atmosphereColor": "#14b8a6",
      "radius": 0.98,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#2dd4bf",
      "rotationSpeed": 0.62,
      "axialTilt": 0.12,
      "surfacePattern": "lattice",
      "patternScale": 10,
      "emissiveIntensity": 0.28,
      "roughness": 0.4,
      "hasMoon": true
    }
  },
  {
    "id": "planet-8-magnetite-spire-tundra",
    "number": 8,
    "title": "MAGNETITE SPIRE TUNDRA",
    "subtitle": "Warped Ferrofluid Magnetic Needle Mountains",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 8",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -3.04,
      1.09,
      -15.15
    ],
    "visual": {
      "primaryColor": "#09090b",
      "secondaryColor": "#38bdf8",
      "accentColor": "#94a3b8",
      "atmosphereColor": "#0284c7",
      "radius": 0.85,
      "archetype": "anomaly",
      "hasRing": true,
      "ringInner": 1.25,
      "ringOuter": 1.6,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#38bdf8",
      "rotationSpeed": 0.84,
      "axialTilt": 0.52,
      "surfacePattern": "cracked",
      "patternScale": 8.5,
      "emissiveIntensity": 0.55,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-9-gypsum-forest",
    "number": 9,
    "title": "GYPSUM FOREST",
    "subtitle": "Skyscraper-Sized Translucent Selenite Caverns",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 9",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      3.46,
      0.86,
      18.54
    ],
    "visual": {
      "primaryColor": "#f1f5f9",
      "secondaryColor": "#c084fc",
      "accentColor": "#ffffff",
      "atmosphereColor": "#e9d5ff",
      "radius": 0.9,
      "archetype": "crystal",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 1.06,
      "axialTilt": 0.2,
      "surfacePattern": "crystals",
      "patternScale": 7.5,
      "emissiveIntensity": 0.5,
      "roughness": 0.1,
      "hasMoon": false
    }
  },
  {
    "id": "planet-10-native-copper-crust",
    "number": 10,
    "title": "NATIVE COPPER CRUST",
    "subtitle": "Raw Metallic Ridges Streaked with Verdigris Patina",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 10",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -1.32,
      0.61,
      -17.03
    ],
    "visual": {
      "primaryColor": "#ea580c",
      "secondaryColor": "#10b981",
      "accentColor": "#fed7aa",
      "atmosphereColor": "#34d399",
      "radius": 0.94,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#fed7aa",
      "rotationSpeed": 1.28,
      "axialTilt": 0.25,
      "surfacePattern": "cracked",
      "patternScale": 6,
      "emissiveIntensity": 0.35,
      "roughness": 0.35,
      "hasMoon": true
    }
  },
  {
    "id": "planet-11-sinter-terraces",
    "number": 11,
    "title": "SINTER TERRACES",
    "subtitle": "Turquoise, Sulfur & Orange Mineral Geysers",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 11",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -5.5,
      0.37,
      15.8
    ],
    "visual": {
      "primaryColor": "#06b6d4",
      "secondaryColor": "#f97316",
      "accentColor": "#facc15",
      "atmosphereColor": "#22d3ee",
      "radius": 0.88,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#facc15",
      "rotationSpeed": 0.4,
      "axialTilt": 0.3,
      "surfacePattern": "swirl",
      "patternScale": 5.5,
      "emissiveIntensity": 0.4,
      "roughness": 0.3,
      "hasMoon": false
    }
  },
  {
    "id": "planet-12-opal-sieve",
    "number": 12,
    "title": "OPAL SIEVE",
    "subtitle": "Milky White Sands with Prismatic Fire-Opals",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 12",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      6.59,
      0.13,
      -18.34
    ],
    "visual": {
      "primaryColor": "#fafafa",
      "secondaryColor": "#ec4899",
      "accentColor": "#3b82f6",
      "atmosphereColor": "#f472b6",
      "radius": 0.96,
      "archetype": "crystal",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#3b82f6",
      "rotationSpeed": 0.62,
      "axialTilt": 0.18,
      "surfacePattern": "iridescent",
      "patternScale": 8,
      "emissiveIntensity": 0.45,
      "roughness": 0.12,
      "hasMoon": false
    }
  },
  {
    "id": "planet-13-slate-shingle-badlands",
    "number": 13,
    "title": "SLATE SHINGLE BADLANDS",
    "subtitle": "Endless Plateaus of Layered Gray-Violet Flagstones",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 13",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -8.33,
      -0.08,
      19.17
    ],
    "visual": {
      "primaryColor": "#64748b",
      "secondaryColor": "#475569",
      "accentColor": "#818cf8",
      "atmosphereColor": "#6366f1",
      "radius": 0.86,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#818cf8",
      "rotationSpeed": 0.84,
      "axialTilt": 0.15,
      "surfacePattern": "lattice",
      "patternScale": 9,
      "emissiveIntensity": 0.25,
      "roughness": 0.55,
      "hasMoon": true
    }
  },
  {
    "id": "planet-14-asphalt-lake-basin",
    "number": 14,
    "title": "ASPHALT LAKE BASIN",
    "subtitle": "Matte-Black Pitch Plains & Bitumen Cauldrons",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 14",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      15.38,
      -0.27,
      -14.98
    ],
    "visual": {
      "primaryColor": "#0a0a0a",
      "secondaryColor": "#171717",
      "accentColor": "#d97706",
      "atmosphereColor": "#b45309",
      "radius": 0.92,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#d97706",
      "rotationSpeed": 1.06,
      "axialTilt": 0.1,
      "surfacePattern": "swirl",
      "patternScale": 5,
      "emissiveIntensity": 0.2,
      "roughness": 0.7,
      "hasMoon": false
    }
  },
  {
    "id": "planet-15-serpentine-ribbons",
    "number": 15,
    "title": "SERPENTINE RIBBONS",
    "subtitle": "Jade-Green Waxy Metamorphic Stone & Asbestos Veins",
    "category": "Geological & Mineral",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 15",
      "To Be Developed",
      "Geological & Mineral"
    ],
    "links": {},
    "spatialPosition": [
      -17.03,
      -0.42,
      11.34
    ],
    "visual": {
      "primaryColor": "#059669",
      "secondaryColor": "#65a30d",
      "accentColor": "#f8fafc",
      "atmosphereColor": "#10b981",
      "radius": 0.9,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#f8fafc",
      "rotationSpeed": 1.28,
      "axialTilt": 0.22,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.3,
      "roughness": 0.35,
      "hasMoon": false
    }
  },
  {
    "id": "planet-16-opaline-gas-giant",
    "number": 16,
    "title": "OPALINE GAS GIANT",
    "subtitle": "Mother-of-Pearl Non-Turbulent Ammonia Cloud Strata",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 16",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      17.3,
      -0.53,
      -11.37
    ],
    "visual": {
      "primaryColor": "#e0e7ff",
      "secondaryColor": "#f472b6",
      "accentColor": "#a7f3d0",
      "atmosphereColor": "#c084fc",
      "radius": 1.65,
      "archetype": "gasGiant",
      "hasRing": true,
      "ringInner": 2.1,
      "ringOuter": 3.2,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#f472b6",
      "rotationSpeed": 0.4,
      "axialTilt": 0.38,
      "surfacePattern": "stripes",
      "patternScale": 14,
      "emissiveIntensity": 0.45,
      "roughness": 0.2,
      "hasMoon": true
    }
  },
  {
    "id": "planet-17-hyper-storm-vortex",
    "number": 17,
    "title": "HYPER-STORM VORTEX",
    "subtitle": "Cyclopean Crimson Eye with Electrical Discharges",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 17",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      -23.13,
      -0.59,
      9.42
    ],
    "visual": {
      "primaryColor": "#1e1b4b",
      "secondaryColor": "#dc2626",
      "accentColor": "#38bdf8",
      "atmosphereColor": "#ef4444",
      "radius": 1.75,
      "archetype": "storm",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#38bdf8",
      "rotationSpeed": 0.62,
      "axialTilt": 0.45,
      "surfacePattern": "storm",
      "patternScale": 10,
      "emissiveIntensity": 0.65,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-18-methane-amber-giant",
    "number": 18,
    "title": "METHANE AMBER GIANT",
    "subtitle": "Glowing Golden-Honey Clouds & Tholin Rain",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 18",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      24.26,
      -0.6,
      -2.77
    ],
    "visual": {
      "primaryColor": "#d97706",
      "secondaryColor": "#78350f",
      "accentColor": "#fde68a",
      "atmosphereColor": "#f59e0b",
      "radius": 1.55,
      "archetype": "gasGiant",
      "hasRing": true,
      "ringInner": 1.9,
      "ringOuter": 2.8,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#78350f",
      "rotationSpeed": 0.84,
      "axialTilt": 0.32,
      "surfacePattern": "stripes",
      "patternScale": 11,
      "emissiveIntensity": 0.5,
      "roughness": 0.22,
      "hasMoon": false
    }
  },
  {
    "id": "planet-19-phosphorus-ringed-world",
    "number": 19,
    "title": "PHOSPHORUS RINGED WORLD",
    "subtitle": "Tangerine Cloud Bands with Triple Ice Rings",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 19",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      -22.13,
      -0.55,
      -2.65
    ],
    "visual": {
      "primaryColor": "#ea580c",
      "secondaryColor": "#ca8a04",
      "accentColor": "#ffffff",
      "atmosphereColor": "#fb923c",
      "radius": 1.6,
      "archetype": "ringed",
      "hasRing": true,
      "ringInner": 2,
      "ringOuter": 3.4,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 1.06,
      "axialTilt": 0.52,
      "surfacePattern": "stripes",
      "patternScale": 13,
      "emissiveIntensity": 0.55,
      "roughness": 0.18,
      "hasMoon": true
    }
  },
  {
    "id": "planet-20-diamond-rain-giant",
    "number": 20,
    "title": "DIAMOND RAIN GIANT",
    "subtitle": "Deep Cyan-Indigo Mantle with Diamond Precipitation",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 20",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      25.51,
      -0.44,
      4.14
    ],
    "visual": {
      "primaryColor": "#0369a1",
      "secondaryColor": "#38bdf8",
      "accentColor": "#ffffff",
      "atmosphereColor": "#0284c7",
      "radius": 1.5,
      "archetype": "gasGiant",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 1.28,
      "axialTilt": 0.28,
      "surfacePattern": "stripes",
      "patternScale": 9,
      "emissiveIntensity": 0.6,
      "roughness": 0.15,
      "hasMoon": false
    }
  },
  {
    "id": "planet-21-hot-jupiter",
    "number": 21,
    "title": "HOT JUPITER",
    "subtitle": "Tidally Torched Soot Crust with Supersonic Magma Lanes",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 21",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      -25.32,
      -0.29,
      -7.47
    ],
    "visual": {
      "primaryColor": "#09090b",
      "secondaryColor": "#f97316",
      "accentColor": "#ffedd5",
      "atmosphereColor": "#ea580c",
      "radius": 1.8,
      "archetype": "lava",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#ffedd5",
      "rotationSpeed": 0.4,
      "axialTilt": 0.1,
      "surfacePattern": "cracked",
      "patternScale": 8,
      "emissiveIntensity": 0.75,
      "roughness": 0.3,
      "hasMoon": false
    }
  },
  {
    "id": "planet-22-noctilucent-aeroworld",
    "number": 22,
    "title": "NOCTILUCENT AEROWORLD",
    "subtitle": "High Mesospheric Electric-Cyan Ice Cloud Shell",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 22",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      20.36,
      -0.08,
      14.83
    ],
    "visual": {
      "primaryColor": "#06b6d4",
      "secondaryColor": "#0284c7",
      "accentColor": "#67e8f9",
      "atmosphereColor": "#22d3ee",
      "radius": 1.35,
      "archetype": "gasGiant",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#67e8f9",
      "rotationSpeed": 0.62,
      "axialTilt": 0.22,
      "surfacePattern": "swirl",
      "patternScale": 7,
      "emissiveIntensity": 0.7,
      "roughness": 0.15,
      "hasMoon": true
    }
  },
  {
    "id": "planet-23-stratospheric-aureole",
    "number": 23,
    "title": "STRATOSPHERIC AUREOLE",
    "subtitle": "Nested Non-Mixing Atmospheric Density Halos",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 23",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      -20.65,
      0.18,
      -20.02
    ],
    "visual": {
      "primaryColor": "#a855f7",
      "secondaryColor": "#eab308",
      "accentColor": "#f43f5e",
      "atmosphereColor": "#d946ef",
      "radius": 1.45,
      "archetype": "gasGiant",
      "hasRing": true,
      "ringInner": 1.8,
      "ringOuter": 2.7,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#eab308",
      "rotationSpeed": 0.84,
      "axialTilt": 0.4,
      "surfacePattern": "stripes",
      "patternScale": 15,
      "emissiveIntensity": 0.5,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-24-vapor-canopy",
    "number": 24,
    "title": "VAPOR CANOPY",
    "subtitle": "Blinding White Steam Envelope & Furnace Surface",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 24",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      18.95,
      0.47,
      20.82
    ],
    "visual": {
      "primaryColor": "#f8fafc",
      "secondaryColor": "#cbd5e1",
      "accentColor": "#e2e8f0",
      "atmosphereColor": "#ffffff",
      "radius": 1.25,
      "archetype": "gasGiant",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#e2e8f0",
      "rotationSpeed": 1.06,
      "axialTilt": 0.18,
      "surfacePattern": "swirl",
      "patternScale": 5,
      "emissiveIntensity": 0.6,
      "roughness": 0.1,
      "hasMoon": false
    }
  },
  {
    "id": "planet-25-auroral-cage",
    "number": 25,
    "title": "AURORAL CAGE",
    "subtitle": "Olive Clouds Enclosed by Blinding Emerald Curtains",
    "category": "Atmospheric & Gas Giant",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 25",
      "To Be Developed",
      "Atmospheric & Gas Giant"
    ],
    "links": {},
    "spatialPosition": [
      -11.47,
      0.8,
      -23.19
    ],
    "visual": {
      "primaryColor": "#15803d",
      "secondaryColor": "#10b981",
      "accentColor": "#a855f7",
      "atmosphereColor": "#34d399",
      "radius": 1.4,
      "archetype": "aurora",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#a855f7",
      "rotationSpeed": 1.28,
      "axialTilt": 0.35,
      "surfacePattern": "swirl",
      "patternScale": 8,
      "emissiveIntensity": 0.8,
      "roughness": 0.25,
      "hasMoon": true
    }
  },
  {
    "id": "planet-26-nitrogen-slush-sea",
    "number": 26,
    "title": "NITROGEN SLUSH SEA",
    "subtitle": "Rose-Tinted Cryogenic Plumes & Slush Icebergs",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 26",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      8.85,
      1.16,
      28.81
    ],
    "visual": {
      "primaryColor": "#fda4af",
      "secondaryColor": "#f43f5e",
      "accentColor": "#ffffff",
      "atmosphereColor": "#fb7185",
      "radius": 0.95,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 0.4,
      "axialTilt": 0.25,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.35,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-27-blue-ice-pressure-spines",
    "number": 27,
    "title": "BLUE-ICE PRESSURE SPINES",
    "subtitle": "Deep Glass-Clear Sapphire Glacial Ridges",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 27",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      -6.15,
      1.53,
      -31.36
    ],
    "visual": {
      "primaryColor": "#1d4ed8",
      "secondaryColor": "#60a5fa",
      "accentColor": "#ffffff",
      "atmosphereColor": "#3b82f6",
      "radius": 0.92,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 0.62,
      "axialTilt": 0.32,
      "surfacePattern": "cracked",
      "patternScale": 7.5,
      "emissiveIntensity": 0.45,
      "roughness": 0.1,
      "hasMoon": false
    }
  },
  {
    "id": "planet-28-dry-ice-polygons",
    "number": 28,
    "title": "DRY-ICE POLYGONS",
    "subtitle": "Chalk-White Carbon Dioxide Spider Tessellations",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 28",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      -2.74,
      1.91,
      29.21
    ],
    "visual": {
      "primaryColor": "#f8fafc",
      "secondaryColor": "#18181b",
      "accentColor": "#94a3b8",
      "atmosphereColor": "#e2e8f0",
      "radius": 0.88,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#94a3b8",
      "rotationSpeed": 0.84,
      "axialTilt": 0.15,
      "surfacePattern": "lattice",
      "patternScale": 10,
      "emissiveIntensity": 0.3,
      "roughness": 0.3,
      "hasMoon": true
    }
  },
  {
    "id": "planet-29-methane-glaze-world",
    "number": 29,
    "title": "METHANE GLAZE WORLD",
    "subtitle": "Glossy Black Ice Plains over Hydrocarbon Basins",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 29",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      7.29,
      2.29,
      -28.53
    ],
    "visual": {
      "primaryColor": "#020617",
      "secondaryColor": "#1e293b",
      "accentColor": "#0ea5e9",
      "atmosphereColor": "#0369a1",
      "radius": 0.94,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#0ea5e9",
      "rotationSpeed": 1.06,
      "axialTilt": 0.2,
      "surfacePattern": "cracked",
      "patternScale": 6,
      "emissiveIntensity": 0.25,
      "roughness": 0.08,
      "hasMoon": false
    }
  },
  {
    "id": "planet-30-cryovolcanic-calderas",
    "number": 30,
    "title": "CRYOVOLCANIC CALDERAS",
    "subtitle": "Glassy Domes Oozing Lavender Ammonia Lava",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 30",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      -9.85,
      2.65,
      30.6
    ],
    "visual": {
      "primaryColor": "#e0e7ff",
      "secondaryColor": "#a855f7",
      "accentColor": "#c084fc",
      "atmosphereColor": "#818cf8",
      "radius": 0.9,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#c084fc",
      "rotationSpeed": 1.28,
      "axialTilt": 0.18,
      "surfacePattern": "craters",
      "patternScale": 5,
      "emissiveIntensity": 0.4,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-31-frost-rift-lattice",
    "number": 31,
    "title": "FROST-RIFT LATTICE",
    "subtitle": "Bright White Crust with Blood-Red Tidal Fractures",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 31",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      18.47,
      2.99,
      -29.07
    ],
    "visual": {
      "primaryColor": "#f8fafc",
      "secondaryColor": "#991b1b",
      "accentColor": "#b91c1c",
      "atmosphereColor": "#fca5a5",
      "radius": 0.96,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#b91c1c",
      "rotationSpeed": 0.4,
      "axialTilt": 0.28,
      "surfacePattern": "cracked",
      "patternScale": 8.5,
      "emissiveIntensity": 0.45,
      "roughness": 0.15,
      "hasMoon": true
    }
  },
  {
    "id": "planet-32-needle-ice-spires",
    "number": 32,
    "title": "NEEDLE-ICE SPIRES",
    "subtitle": "Penitentes Dagger Crystals Tilted Toward Equator",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 32",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      -23.47,
      3.31,
      22.96
    ],
    "visual": {
      "primaryColor": "#f1f5f9",
      "secondaryColor": "#38bdf8",
      "accentColor": "#ffffff",
      "atmosphereColor": "#7dd3fc",
      "radius": 0.85,
      "archetype": "crystal",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 0.62,
      "axialTilt": 0.4,
      "surfacePattern": "crystals",
      "patternScale": 9,
      "emissiveIntensity": 0.4,
      "roughness": 0.12,
      "hasMoon": false
    }
  },
  {
    "id": "planet-33-frosted-dune-sea",
    "number": 33,
    "title": "FROSTED DUNE SEA",
    "subtitle": "Pitch-Black Basalt Sand Crowned with White Frost",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 33",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      24.49,
      3.58,
      -18.7
    ],
    "visual": {
      "primaryColor": "#171717",
      "secondaryColor": "#f8fafc",
      "accentColor": "#e2e8f0",
      "atmosphereColor": "#94a3b8",
      "radius": 0.91,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#e2e8f0",
      "rotationSpeed": 0.84,
      "axialTilt": 0.22,
      "surfacePattern": "stripes",
      "patternScale": 9.5,
      "emissiveIntensity": 0.3,
      "roughness": 0.45,
      "hasMoon": false
    }
  },
  {
    "id": "planet-34-slush-belt-world",
    "number": 34,
    "title": "SLUSH-BELT WORLD",
    "subtitle": "Global Snowball with Narrow Jagged Charcoal Equator",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 34",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      -31,
      3.81,
      17.14
    ],
    "visual": {
      "primaryColor": "#e2e8f0",
      "secondaryColor": "#334155",
      "accentColor": "#38bdf8",
      "atmosphereColor": "#bae6fd",
      "radius": 1,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#38bdf8",
      "rotationSpeed": 1.06,
      "axialTilt": 0.3,
      "surfacePattern": "swirl",
      "patternScale": 6.5,
      "emissiveIntensity": 0.35,
      "roughness": 0.3,
      "hasMoon": true
    }
  },
  {
    "id": "planet-35-calving-shelf-monolith",
    "number": 35,
    "title": "CALVING SHELF MONOLITH",
    "subtitle": "Sheer Vertical Blue Ice Walls in Pitch-Black Brine",
    "category": "Cryogenic & Ice",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 35",
      "To Be Developed",
      "Cryogenic & Ice"
    ],
    "links": {},
    "spatialPosition": [
      34.88,
      3.99,
      -11.99
    ],
    "visual": {
      "primaryColor": "#0284c7",
      "secondaryColor": "#020617",
      "accentColor": "#7dd3fc",
      "atmosphereColor": "#38bdf8",
      "radius": 0.93,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#7dd3fc",
      "rotationSpeed": 1.28,
      "axialTilt": 0.24,
      "surfacePattern": "cracked",
      "patternScale": 7,
      "emissiveIntensity": 0.4,
      "roughness": 0.18,
      "hasMoon": false
    }
  },
  {
    "id": "planet-36-lava-lake-lattice",
    "number": 36,
    "title": "LAVA LAKE LATTICE",
    "subtitle": "Hexagonal Black Slag Plates with Magma Channels",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 36",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      -33.12,
      4.12,
      2.95
    ],
    "visual": {
      "primaryColor": "#171717",
      "secondaryColor": "#ff4500",
      "accentColor": "#fbbf24",
      "atmosphereColor": "#f97316",
      "radius": 1.08,
      "archetype": "lava",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#fbbf24",
      "rotationSpeed": 0.4,
      "axialTilt": 0.15,
      "surfacePattern": "cracked",
      "patternScale": 9,
      "emissiveIntensity": 0.85,
      "roughness": 0.3,
      "hasMoon": false
    }
  },
  {
    "id": "planet-37-sulfur-fumarole-barrens",
    "number": 37,
    "title": "SULFUR FUMAROLE BARRENS",
    "subtitle": "Chartreuse Plains with Smoking Hornitos",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 37",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      36.04,
      4.19,
      3.4
    ],
    "visual": {
      "primaryColor": "#eab308",
      "secondaryColor": "#84cc16",
      "accentColor": "#b45309",
      "atmosphereColor": "#facc15",
      "radius": 0.89,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#b45309",
      "rotationSpeed": 0.62,
      "axialTilt": 0.2,
      "surfacePattern": "craters",
      "patternScale": 7,
      "emissiveIntensity": 0.45,
      "roughness": 0.5,
      "hasMoon": true
    }
  },
  {
    "id": "planet-38-obsidian-glass-sinks",
    "number": 38,
    "title": "OBSIDIAN GLASS SINKS",
    "subtitle": "Jet-Black Volcanic Glass with Glowing Magma Tubes",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 38",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      -37.65,
      4.2,
      -6.66
    ],
    "visual": {
      "primaryColor": "#0a0a0a",
      "secondaryColor": "#ef4444",
      "accentColor": "#f97316",
      "atmosphereColor": "#dc2626",
      "radius": 0.95,
      "archetype": "lava",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#f97316",
      "rotationSpeed": 0.84,
      "axialTilt": 0.25,
      "surfacePattern": "cracked",
      "patternScale": 7.5,
      "emissiveIntensity": 0.65,
      "roughness": 0.12,
      "hasMoon": false
    }
  },
  {
    "id": "planet-39-iron-rain-scorch",
    "number": 39,
    "title": "IRON-RAIN SCORCH",
    "subtitle": "Gunmetal Crust Swept by Vaporized Iron Downpours",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 39",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      32.52,
      4.16,
      13.04
    ],
    "visual": {
      "primaryColor": "#475569",
      "secondaryColor": "#f97316",
      "accentColor": "#f1f5f9",
      "atmosphereColor": "#ea580c",
      "radius": 1.02,
      "archetype": "lava",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#f1f5f9",
      "rotationSpeed": 1.06,
      "axialTilt": 0.08,
      "surfacePattern": "craters",
      "patternScale": 6.5,
      "emissiveIntensity": 0.6,
      "roughness": 0.4,
      "hasMoon": false
    }
  },
  {
    "id": "planet-40-basalt-flood-trap",
    "number": 40,
    "title": "BASALT FLOOD TRAP",
    "subtitle": "Stepped Continental Fissure Plateau Staircases",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 40",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      -31.17,
      4.07,
      -22.28
    ],
    "visual": {
      "primaryColor": "#262626",
      "secondaryColor": "#171717",
      "accentColor": "#ea580c",
      "atmosphereColor": "#78350f",
      "radius": 0.96,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#ea580c",
      "rotationSpeed": 1.28,
      "axialTilt": 0.18,
      "surfacePattern": "lattice",
      "patternScale": 8,
      "emissiveIntensity": 0.35,
      "roughness": 0.5,
      "hasMoon": true
    }
  },
  {
    "id": "planet-41-pelean-spine-caldera",
    "number": 41,
    "title": "PELEAN SPINE CALDERA",
    "subtitle": "Hydraulic Lava Plugs & Colossal Vertical Rock Spires",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 41",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      30.14,
      3.93,
      27.74
    ],
    "visual": {
      "primaryColor": "#44403c",
      "secondaryColor": "#f59e0b",
      "accentColor": "#dc2626",
      "atmosphereColor": "#b45309",
      "radius": 0.91,
      "archetype": "lava",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#dc2626",
      "rotationSpeed": 0.4,
      "axialTilt": 0.22,
      "surfacePattern": "craters",
      "patternScale": 6,
      "emissiveIntensity": 0.5,
      "roughness": 0.45,
      "hasMoon": false
    }
  },
  {
    "id": "planet-42-carbonatite-ghost-volcanoes",
    "number": 42,
    "title": "CARBONATITE GHOST VOLCANOES",
    "subtitle": "Chalky White Cones Erupting Black-to-White Lava",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 42",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      -21.99,
      3.75,
      -29.57
    ],
    "visual": {
      "primaryColor": "#f5f5f4",
      "secondaryColor": "#1c1917",
      "accentColor": "#a8a29e",
      "atmosphereColor": "#e7e5e4",
      "radius": 0.88,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#a8a29e",
      "rotationSpeed": 0.62,
      "axialTilt": 0.16,
      "surfacePattern": "cracked",
      "patternScale": 7,
      "emissiveIntensity": 0.3,
      "roughness": 0.35,
      "hasMoon": false
    }
  },
  {
    "id": "planet-43-ash-cinder-dunes",
    "number": 43,
    "title": "ASH-CINDER DUNES",
    "subtitle": "Matte Coal-Black Dunes under Overcast Sepia Sky",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 43",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      16.71,
      3.53,
      33.99
    ],
    "visual": {
      "primaryColor": "#18181b",
      "secondaryColor": "#78350f",
      "accentColor": "#f59e0b",
      "atmosphereColor": "#a16207",
      "radius": 0.93,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#f59e0b",
      "rotationSpeed": 0.84,
      "axialTilt": 0.2,
      "surfacePattern": "stripes",
      "patternScale": 8.5,
      "emissiveIntensity": 0.25,
      "roughness": 0.6,
      "hasMoon": true
    }
  },
  {
    "id": "planet-44-ignimbrite-plain",
    "number": 44,
    "title": "IGNIMBRITE PLAIN",
    "subtitle": "Terracotta & Cream Tuff Beds with Wind Hoodoos",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 44",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      -13.64,
      3.29,
      -40.22
    ],
    "visual": {
      "primaryColor": "#c2410c",
      "secondaryColor": "#fef3c7",
      "accentColor": "#f97316",
      "atmosphereColor": "#ea580c",
      "radius": 0.9,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#f97316",
      "rotationSpeed": 1.06,
      "axialTilt": 0.25,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.35,
      "roughness": 0.4,
      "hasMoon": false
    }
  },
  {
    "id": "planet-45-magma-ocean-cradle",
    "number": 45,
    "title": "MAGMA OCEAN CRADLE",
    "subtitle": "Churning Molten Planet with Drifting Slag Crusts",
    "category": "Volcanic & Magmatic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 45",
      "To Be Developed",
      "Volcanic & Magmatic"
    ],
    "links": {},
    "spatialPosition": [
      3.77,
      3.03,
      41.77
    ],
    "visual": {
      "primaryColor": "#ea580c",
      "secondaryColor": "#ff4500",
      "accentColor": "#fef08a",
      "atmosphereColor": "#f97316",
      "radius": 1.18,
      "archetype": "lava",
      "hasRing": true,
      "ringInner": 1.45,
      "ringOuter": 2.1,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#f97316",
      "rotationSpeed": 1.28,
      "axialTilt": 0.35,
      "surfacePattern": "swirl",
      "patternScale": 7,
      "emissiveIntensity": 0.9,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-46-pelagic-abyss",
    "number": 46,
    "title": "PELAGIC ABYSS",
    "subtitle": "Thousand-Kilometer Deep Ultramarine Global Ocean",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 46",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      4.09,
      2.77,
      -39.42
    ],
    "visual": {
      "primaryColor": "#020617",
      "secondaryColor": "#1d4ed8",
      "accentColor": "#ffffff",
      "atmosphereColor": "#2563eb",
      "radius": 1.15,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 0.4,
      "axialTilt": 0.22,
      "surfacePattern": "swirl",
      "patternScale": 5,
      "emissiveIntensity": 0.35,
      "roughness": 0.05,
      "hasMoon": true
    }
  },
  {
    "id": "planet-47-mangrove-spoke-delta",
    "number": 47,
    "title": "MANGROVE SPOKE DELTA",
    "subtitle": "Emerald Coastal Root Webs across Turquoise Lagoons",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 47",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      -7.81,
      2.51,
      39.44
    ],
    "visual": {
      "primaryColor": "#059669",
      "secondaryColor": "#06b6d4",
      "accentColor": "#10b981",
      "atmosphereColor": "#2dd4bf",
      "radius": 0.96,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#10b981",
      "rotationSpeed": 0.62,
      "axialTilt": 0.18,
      "surfacePattern": "swirl",
      "patternScale": 6.5,
      "emissiveIntensity": 0.35,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-48-reef-archipelagos",
    "number": 48,
    "title": "REEF ARCHIPELAGOS",
    "subtitle": "Neon Turquoise Atoll Rings against Deep Navy Seas",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 48",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      17.37,
      2.26,
      -40.68
    ],
    "visual": {
      "primaryColor": "#06b6d4",
      "secondaryColor": "#1e3a8a",
      "accentColor": "#22d3ee",
      "atmosphereColor": "#38bdf8",
      "radius": 0.98,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#22d3ee",
      "rotationSpeed": 0.84,
      "axialTilt": 0.25,
      "surfacePattern": "craters",
      "patternScale": 7.5,
      "emissiveIntensity": 0.45,
      "roughness": 0.15,
      "hasMoon": false
    }
  },
  {
    "id": "planet-49-bioluminescent-sea",
    "number": 49,
    "title": "BIOLUMINESCENT SEA",
    "subtitle": "Nocturnal Dinoflagellate Neon Cyan & Cobalt Swells",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 49",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      -25.8,
      2.03,
      36.86
    ],
    "visual": {
      "primaryColor": "#0f172a",
      "secondaryColor": "#00f0ff",
      "accentColor": "#38bdf8",
      "atmosphereColor": "#00f0ff",
      "radius": 1.05,
      "archetype": "aurora",
      "hasRing": true,
      "ringInner": 1.35,
      "ringOuter": 1.85,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#00f0ff",
      "rotationSpeed": 1.06,
      "axialTilt": 0.32,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.75,
      "roughness": 0.1,
      "hasMoon": true
    }
  },
  {
    "id": "planet-50-sargasso-mat-sea",
    "number": 50,
    "title": "SARGASSO MAT SEA",
    "subtitle": "Rust-Orange Vegetative Canopies over Violet Oceans",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 50",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      28.36,
      1.83,
      -29.47
    ],
    "visual": {
      "primaryColor": "#7c2d12",
      "secondaryColor": "#581c87",
      "accentColor": "#f97316",
      "atmosphereColor": "#9333ea",
      "radius": 0.97,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#f97316",
      "rotationSpeed": 1.28,
      "axialTilt": 0.2,
      "surfacePattern": "swirl",
      "patternScale": 5.5,
      "emissiveIntensity": 0.3,
      "roughness": 0.35,
      "hasMoon": false
    }
  },
  {
    "id": "planet-51-thermal-chimney-flats",
    "number": 51,
    "title": "THERMAL CHIMNEY FLATS",
    "subtitle": "Black Smoker Forests Venting Mineral Plumes in Shallows",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 51",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      -35.4,
      1.67,
      24.86
    ],
    "visual": {
      "primaryColor": "#065f46",
      "secondaryColor": "#18181b",
      "accentColor": "#34d399",
      "atmosphereColor": "#10b981",
      "radius": 0.9,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#34d399",
      "rotationSpeed": 0.4,
      "axialTilt": 0.15,
      "surfacePattern": "craters",
      "patternScale": 6,
      "emissiveIntensity": 0.4,
      "roughness": 0.3,
      "hasMoon": false
    }
  },
  {
    "id": "planet-52-algal-bloom-swirls",
    "number": 52,
    "title": "ALGAL BLOOM SWIRLS",
    "subtitle": "Swirling Continental Ribbons of Emerald, Cream & Magenta",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 52",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      42.27,
      1.56,
      -21.47
    ],
    "visual": {
      "primaryColor": "#047857",
      "secondaryColor": "#ec4899",
      "accentColor": "#fef3c7",
      "atmosphereColor": "#10b981",
      "radius": 1.02,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#fef3c7",
      "rotationSpeed": 0.62,
      "axialTilt": 0.28,
      "surfacePattern": "swirl",
      "patternScale": 8,
      "emissiveIntensity": 0.45,
      "roughness": 0.2,
      "hasMoon": true
    }
  },
  {
    "id": "planet-53-hyper-saline-salt-ribbons",
    "number": 53,
    "title": "HYPER-SALINE SALT RIBBONS",
    "subtitle": "Vivid Pink & Magenta Halophilic Archaea Brine Pans",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 53",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      -42.02,
      1.49,
      13.33
    ],
    "visual": {
      "primaryColor": "#ec4899",
      "secondaryColor": "#f43f5e",
      "accentColor": "#ffffff",
      "atmosphereColor": "#fb7185",
      "radius": 0.92,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 0.84,
      "axialTilt": 0.18,
      "surfacePattern": "cracked",
      "patternScale": 7,
      "emissiveIntensity": 0.4,
      "roughness": 0.22,
      "hasMoon": false
    }
  },
  {
    "id": "planet-54-subglacial-plume-vent",
    "number": 54,
    "title": "SUBGLACIAL PLUME VENT",
    "subtitle": "Ice Crust with Enceladus-Type Space Cryogeysers",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 54",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      44.7,
      1.48,
      -2.61
    ],
    "visual": {
      "primaryColor": "#f8fafc",
      "secondaryColor": "#38bdf8",
      "accentColor": "#ffffff",
      "atmosphereColor": "#7dd3fc",
      "radius": 0.88,
      "archetype": "ice",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 1.06,
      "axialTilt": 0.25,
      "surfacePattern": "cracked",
      "patternScale": 6.5,
      "emissiveIntensity": 0.5,
      "roughness": 0.12,
      "hasMoon": false
    }
  },
  {
    "id": "planet-55-tidal-bore-estuary",
    "number": 55,
    "title": "TIDAL BORE ESTUARY",
    "subtitle": "Funnel Canyons Swept Daily by 50-Meter Tidal Waves",
    "category": "Aquatic & Oceanic",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 55",
      "To Be Developed",
      "Aquatic & Oceanic"
    ],
    "links": {},
    "spatialPosition": [
      -48.38,
      1.52,
      -4.39
    ],
    "visual": {
      "primaryColor": "#78350f",
      "secondaryColor": "#0284c7",
      "accentColor": "#f59e0b",
      "atmosphereColor": "#38bdf8",
      "radius": 0.94,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#f59e0b",
      "rotationSpeed": 1.28,
      "axialTilt": 0.22,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.35,
      "roughness": 0.3,
      "hasMoon": true
    }
  },
  {
    "id": "planet-56-mycelial-network-mat",
    "number": 56,
    "title": "MYCELIAL NETWORK MAT",
    "subtitle": "Kilometers-Wide Violet & Buff Fungal Spore Plates",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 56",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      44.37,
      1.61,
      9.63
    ],
    "visual": {
      "primaryColor": "#7c3aed",
      "secondaryColor": "#fef3c7",
      "accentColor": "#c084fc",
      "atmosphereColor": "#a855f7",
      "radius": 0.95,
      "archetype": "organic",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#c084fc",
      "rotationSpeed": 0.4,
      "axialTilt": 0.2,
      "surfacePattern": "lattice",
      "patternScale": 7.5,
      "emissiveIntensity": 0.5,
      "roughness": 0.4,
      "hasMoon": false
    }
  },
  {
    "id": "planet-57-black-leaf-canopy",
    "number": 57,
    "title": "BLACK-LEAF CANOPY",
    "subtitle": "Anthocyanin Ink-Violet Plant Canopies under Red Dwarf",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 57",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      -41.81,
      1.76,
      -18.82
    ],
    "visual": {
      "primaryColor": "#1e1b4b",
      "secondaryColor": "#4c1d95",
      "accentColor": "#b91c1c",
      "atmosphereColor": "#7c2d12",
      "radius": 0.98,
      "archetype": "organic",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#b91c1c",
      "rotationSpeed": 0.62,
      "axialTilt": 0.28,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.3,
      "roughness": 0.4,
      "hasMoon": false
    }
  },
  {
    "id": "planet-58-carnivorous-bog-basin",
    "number": 58,
    "title": "CARNIVOROUS BOG BASIN",
    "subtitle": "Glistening Mucilage Sundew Forests & Pitcher Vats",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 58",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      41.63,
      1.95,
      29.26
    ],
    "visual": {
      "primaryColor": "#b91c1c",
      "secondaryColor": "#d97706",
      "accentColor": "#f87171",
      "atmosphereColor": "#ea580c",
      "radius": 0.91,
      "archetype": "organic",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#f87171",
      "rotationSpeed": 0.84,
      "axialTilt": 0.16,
      "surfacePattern": "swirl",
      "patternScale": 7,
      "emissiveIntensity": 0.45,
      "roughness": 0.2,
      "hasMoon": true
    }
  },
  {
    "id": "planet-59-chitin-ridge-shallows",
    "number": 59,
    "title": "CHITIN RIDGE SHALLOWS",
    "subtitle": "Bone-White Mountains Formed of Discarded Exoskeletons",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 59",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      -34.01,
      2.2,
      -34.8
    ],
    "visual": {
      "primaryColor": "#fdf2f8",
      "secondaryColor": "#f472b6",
      "accentColor": "#ffffff",
      "atmosphereColor": "#fbcfe8",
      "radius": 0.9,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 1.06,
      "axialTilt": 0.18,
      "surfacePattern": "crystals",
      "patternScale": 8,
      "emissiveIntensity": 0.35,
      "roughness": 0.28,
      "hasMoon": false
    }
  },
  {
    "id": "planet-60-pollen-fog-highlands",
    "number": 60,
    "title": "POLLEN FOG HIGHLANDS",
    "subtitle": "Golden-Chartreuse Translucent Atmospheric Spore Bloom",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 60",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      26.57,
      2.48,
      37.93
    ],
    "visual": {
      "primaryColor": "#ca8a04",
      "secondaryColor": "#65a30d",
      "accentColor": "#fef08a",
      "atmosphereColor": "#eab308",
      "radius": 1.05,
      "archetype": "gasGiant",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#fef08a",
      "rotationSpeed": 1.28,
      "axialTilt": 0.24,
      "surfacePattern": "swirl",
      "patternScale": 5.5,
      "emissiveIntensity": 0.55,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-61-coral-forest-tundra",
    "number": 61,
    "title": "CORAL-FOREST TUNDRA",
    "subtitle": "Terrestrial Branching Sea-Fans & Sponge Spires",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 61",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      -23.06,
      2.79,
      -44.19
    ],
    "visual": {
      "primaryColor": "#f43f5e",
      "secondaryColor": "#06b6d4",
      "accentColor": "#fda4af",
      "atmosphereColor": "#fb7185",
      "radius": 0.93,
      "archetype": "organic",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#fda4af",
      "rotationSpeed": 0.4,
      "axialTilt": 0.22,
      "surfacePattern": "crystals",
      "patternScale": 8.5,
      "emissiveIntensity": 0.4,
      "roughness": 0.35,
      "hasMoon": true
    }
  },
  {
    "id": "planet-62-silk-weave-lowlands",
    "number": 62,
    "title": "SILK-WEAVE LOWLANDS",
    "subtitle": "Vast River Valleys Draped in Glistening Arachnid Silk",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 62",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      13.14,
      3.12,
      50.47
    ],
    "visual": {
      "primaryColor": "#f8fafc",
      "secondaryColor": "#0f766e",
      "accentColor": "#ffffff",
      "atmosphereColor": "#5eead4",
      "radius": 0.89,
      "archetype": "organic",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 0.62,
      "axialTilt": 0.14,
      "surfacePattern": "lattice",
      "patternScale": 9,
      "emissiveIntensity": 0.45,
      "roughness": 0.18,
      "hasMoon": false
    }
  },
  {
    "id": "planet-63-succulent-bulb-steppe",
    "number": 63,
    "title": "SUCCULENT BULB STEPPE",
    "subtitle": "Rolling Hills of Translucent Gelatinous Green Spheres",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 63",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      -2.42,
      3.47,
      -50.97
    ],
    "visual": {
      "primaryColor": "#10b981",
      "secondaryColor": "#0284c7",
      "accentColor": "#6ee7b7",
      "atmosphereColor": "#34d399",
      "radius": 0.92,
      "archetype": "organic",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#6ee7b7",
      "rotationSpeed": 0.84,
      "axialTilt": 0.2,
      "surfacePattern": "craters",
      "patternScale": 6.5,
      "emissiveIntensity": 0.5,
      "roughness": 0.15,
      "hasMoon": false
    }
  },
  {
    "id": "planet-64-spore-horn-mesa",
    "number": 64,
    "title": "SPORE-HORN MESA",
    "subtitle": "Acoustic Resonant Horn Structures Singing in Wind",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 64",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      -2.86,
      3.82,
      48.8
    ],
    "visual": {
      "primaryColor": "#ea580c",
      "secondaryColor": "#78350f",
      "accentColor": "#fed7aa",
      "atmosphereColor": "#fb923c",
      "radius": 0.94,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#fed7aa",
      "rotationSpeed": 1.06,
      "axialTilt": 0.26,
      "surfacePattern": "stripes",
      "patternScale": 7,
      "emissiveIntensity": 0.35,
      "roughness": 0.45,
      "hasMoon": true
    }
  },
  {
    "id": "planet-65-ironwood-bramble-tangle",
    "number": 65,
    "title": "IRONWOOD BRAMBLE TANGLE",
    "subtitle": "Dense Metallic-Luster Thorn Thickets Covering Continents",
    "category": "Organic & Xenobiological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 65",
      "To Be Developed",
      "Organic & Xenobiological"
    ],
    "links": {},
    "spatialPosition": [
      12.84,
      4.17,
      -49.42
    ],
    "visual": {
      "primaryColor": "#262626",
      "secondaryColor": "#7f1d1d",
      "accentColor": "#991b1b",
      "atmosphereColor": "#b91c1c",
      "radius": 0.88,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#991b1b",
      "rotationSpeed": 1.28,
      "axialTilt": 0.12,
      "surfacePattern": "lattice",
      "patternScale": 8,
      "emissiveIntensity": 0.3,
      "roughness": 0.5,
      "hasMoon": false
    }
  },
  {
    "id": "planet-66-carmine-dune-expanse",
    "number": 66,
    "title": "CARMINE DUNE EXPANSE",
    "subtitle": "Crescent Barchan Dunes of Crimson Iron Oxide",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 66",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      -24.4,
      4.5,
      49.38
    ],
    "visual": {
      "primaryColor": "#dc2626",
      "secondaryColor": "#b45309",
      "accentColor": "#f87171",
      "atmosphereColor": "#ef4444",
      "radius": 0.96,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#f87171",
      "rotationSpeed": 0.4,
      "axialTilt": 0.28,
      "surfacePattern": "stripes",
      "patternScale": 9,
      "emissiveIntensity": 0.35,
      "roughness": 0.45,
      "hasMoon": false
    }
  },
  {
    "id": "planet-67-white-gypsum-salt-flat",
    "number": 67,
    "title": "WHITE GYPSUM SALT FLAT",
    "subtitle": "Blinding Pure-White Flats Reflecting 90% Starlight",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 67",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      29.24,
      4.8,
      -43.4
    ],
    "visual": {
      "primaryColor": "#ffffff",
      "secondaryColor": "#f1f5f9",
      "accentColor": "#cbd5e1",
      "atmosphereColor": "#e2e8f0",
      "radius": 0.9,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#cbd5e1",
      "rotationSpeed": 0.62,
      "axialTilt": 0.15,
      "surfacePattern": "cracked",
      "patternScale": 8,
      "emissiveIntensity": 0.4,
      "roughness": 0.15,
      "hasMoon": true
    }
  },
  {
    "id": "planet-68-yardang-ridge-corridor",
    "number": 68,
    "title": "YARDANG RIDGE CORRIDOR",
    "subtitle": "Aerodynamic Fleet of Supersonic Wind-Carved Rock",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 68",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      -36.72,
      5.07,
      35.23
    ],
    "visual": {
      "primaryColor": "#b45309",
      "secondaryColor": "#78350f",
      "accentColor": "#fde68a",
      "atmosphereColor": "#d97706",
      "radius": 0.92,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#fde68a",
      "rotationSpeed": 0.84,
      "axialTilt": 0.22,
      "surfacePattern": "stripes",
      "patternScale": 11,
      "emissiveIntensity": 0.3,
      "roughness": 0.5,
      "hasMoon": false
    }
  },
  {
    "id": "planet-69-singing-sand-seas",
    "number": 69,
    "title": "SINGING SAND SEAS",
    "subtitle": "400-Meter Golden Dunes Emitting Rhythmic Acoustic Hums",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 69",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      46.45,
      5.3,
      -30.21
    ],
    "visual": {
      "primaryColor": "#eab308",
      "secondaryColor": "#a16207",
      "accentColor": "#fef08a",
      "atmosphereColor": "#facc15",
      "radius": 0.98,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#fef08a",
      "rotationSpeed": 1.06,
      "axialTilt": 0.2,
      "surfacePattern": "stripes",
      "patternScale": 8.5,
      "emissiveIntensity": 0.4,
      "roughness": 0.4,
      "hasMoon": false
    }
  },
  {
    "id": "planet-70-playa-of-sliding-stones",
    "number": 70,
    "title": "PLAYA OF SLIDING STONES",
    "subtitle": "Cracked Mud Basins Crossed by Ice-Driven Boulders",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 70",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      -48.7,
      5.49,
      24.67
    ],
    "visual": {
      "primaryColor": "#d4d4d8",
      "secondaryColor": "#71717a",
      "accentColor": "#38bdf8",
      "atmosphereColor": "#a1a1aa",
      "radius": 0.87,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#38bdf8",
      "rotationSpeed": 1.28,
      "axialTilt": 0.14,
      "surfacePattern": "cracked",
      "patternScale": 7,
      "emissiveIntensity": 0.25,
      "roughness": 0.4,
      "hasMoon": true
    }
  },
  {
    "id": "planet-71-porous-caliche-badlands",
    "number": 71,
    "title": "POROUS CALICHE BADLANDS",
    "subtitle": "Chalky Solution Tubes & Sponge-Like Labyrinth Cliffs",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 71",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      51.46,
      5.62,
      -13.81
    ],
    "visual": {
      "primaryColor": "#e5e5e5",
      "secondaryColor": "#a3a3a3",
      "accentColor": "#f5f5f5",
      "atmosphereColor": "#d4d4d4",
      "radius": 0.89,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#f5f5f5",
      "rotationSpeed": 0.4,
      "axialTilt": 0.18,
      "surfacePattern": "craters",
      "patternScale": 8,
      "emissiveIntensity": 0.28,
      "roughness": 0.55,
      "hasMoon": false
    }
  },
  {
    "id": "planet-72-pebble-desert-reg",
    "number": 72,
    "title": "PEBBLE DESERT REG",
    "subtitle": "Polished Black Stone Pavement with Desert Varnish",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 72",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      -57.18,
      5.7,
      1.97
    ],
    "visual": {
      "primaryColor": "#171717",
      "secondaryColor": "#404040",
      "accentColor": "#d4af37",
      "atmosphereColor": "#737373",
      "radius": 0.88,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#d4af37",
      "rotationSpeed": 0.62,
      "axialTilt": 0.16,
      "surfacePattern": "craters",
      "patternScale": 9,
      "emissiveIntensity": 0.35,
      "roughness": 0.25,
      "hasMoon": false
    }
  },
  {
    "id": "planet-73-cratered-dune-field",
    "number": 73,
    "title": "CRATERED DUNE FIELD",
    "subtitle": "Orange Sand Seas Peppered with Impact Glass Craters",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 73",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      55.39,
      5.72,
      5.69
    ],
    "visual": {
      "primaryColor": "#f97316",
      "secondaryColor": "#18181b",
      "accentColor": "#fbbf24",
      "atmosphereColor": "#ea580c",
      "radius": 0.95,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#fbbf24",
      "rotationSpeed": 0.84,
      "axialTilt": 0.25,
      "surfacePattern": "craters",
      "patternScale": 6.5,
      "emissiveIntensity": 0.35,
      "roughness": 0.45,
      "hasMoon": true
    }
  },
  {
    "id": "planet-74-fossil-bone-badlands",
    "number": 74,
    "title": "FOSSIL-BONE BADLANDS",
    "subtitle": "Ochre Clay Studded with Petrified Biological Relics",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 74",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      -52.24,
      5.69,
      -13.17
    ],
    "visual": {
      "primaryColor": "#d97706",
      "secondaryColor": "#f5f5f4",
      "accentColor": "#fed7aa",
      "atmosphereColor": "#b45309",
      "radius": 0.9,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#fed7aa",
      "rotationSpeed": 1.06,
      "axialTilt": 0.2,
      "surfacePattern": "cracked",
      "patternScale": 6,
      "emissiveIntensity": 0.3,
      "roughness": 0.5,
      "hasMoon": false
    }
  },
  {
    "id": "planet-75-sand-spire-oasis",
    "number": 75,
    "title": "SAND-SPIRE OASIS",
    "subtitle": "Delicate Sand Columns Guarding Emerald Thermal Springs",
    "category": "Desert & Arid",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 75",
      "To Be Developed",
      "Desert & Arid"
    ],
    "links": {},
    "spatialPosition": [
      52.87,
      5.6,
      24.84
    ],
    "visual": {
      "primaryColor": "#ca8a04",
      "secondaryColor": "#059669",
      "accentColor": "#10b981",
      "atmosphereColor": "#34d399",
      "radius": 0.93,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#10b981",
      "rotationSpeed": 1.28,
      "axialTilt": 0.22,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.45,
      "roughness": 0.35,
      "hasMoon": false
    }
  },
  {
    "id": "planet-76-toroidal-ringworld",
    "number": 76,
    "title": "TOROIDAL RINGWORLD",
    "subtitle": "Stable Planetary Doughnut with Swirling Center Void",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 76",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      -46.81,
      5.46,
      -35.89
    ],
    "visual": {
      "primaryColor": "#00f0ff",
      "secondaryColor": "#3b82f6",
      "accentColor": "#ffffff",
      "atmosphereColor": "#38bdf8",
      "radius": 1.25,
      "archetype": "ringed",
      "hasRing": true,
      "ringInner": 0.4,
      "ringOuter": 2.2,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#00f0ff",
      "rotationSpeed": 0.4,
      "axialTilt": 0.45,
      "surfacePattern": "stripes",
      "patternScale": 8,
      "emissiveIntensity": 0.8,
      "roughness": 0.15,
      "hasMoon": true
    }
  },
  {
    "id": "planet-77-shattered-crust",
    "number": 77,
    "title": "SHATTERED CRUST",
    "subtitle": "Hovering Tectonic Plates Suspended above Mantle Rifts",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 77",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      37.97,
      5.27,
      41.56
    ],
    "visual": {
      "primaryColor": "#18181b",
      "secondaryColor": "#ef4444",
      "accentColor": "#fbbf24",
      "atmosphereColor": "#dc2626",
      "radius": 1.05,
      "archetype": "lava",
      "hasRing": true,
      "ringInner": 1.35,
      "ringOuter": 1.8,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#ef4444",
      "rotationSpeed": 0.62,
      "axialTilt": 0.35,
      "surfacePattern": "cracked",
      "patternScale": 9.5,
      "emissiveIntensity": 0.85,
      "roughness": 0.3,
      "hasMoon": false
    }
  },
  {
    "id": "planet-78-oblate-spinner",
    "number": 78,
    "title": "OBLATE SPINNER",
    "subtitle": "Ultra-Rapid 3-Hour Spheroid with Equatorial Debris Halo",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 78",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      -33.86,
      5.04,
      -46.25
    ],
    "visual": {
      "primaryColor": "#6366f1",
      "secondaryColor": "#06b6d4",
      "accentColor": "#c7d2fe",
      "atmosphereColor": "#818cf8",
      "radius": 1.5,
      "archetype": "gasGiant",
      "hasRing": true,
      "ringInner": 1.9,
      "ringOuter": 2.9,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#6366f1",
      "rotationSpeed": 0.84,
      "axialTilt": 0.6,
      "surfacePattern": "stripes",
      "patternScale": 14,
      "emissiveIntensity": 0.55,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-79-tidally-locked-eyeball",
    "number": 79,
    "title": "TIDALLY LOCKED EYEBALL",
    "subtitle": "Permanent Stellar Bullseye: Blazing Desert to Ice Sea",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 79",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      24.68,
      4.78,
      54.03
    ],
    "visual": {
      "primaryColor": "#0284c7",
      "secondaryColor": "#dc2626",
      "accentColor": "#020617",
      "atmosphereColor": "#38bdf8",
      "radius": 1,
      "archetype": "oceanic",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#020617",
      "rotationSpeed": 1.06,
      "axialTilt": 0.25,
      "surfacePattern": "swirl",
      "patternScale": 5,
      "emissiveIntensity": 0.6,
      "roughness": 0.2,
      "hasMoon": true
    }
  },
  {
    "id": "planet-80-synestia-vapor-donut",
    "number": 80,
    "title": "SYNESTIA VAPOR DONUT",
    "subtitle": "Post-Collision Halo of Glowing Vaporized Rock",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 80",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      -11.83,
      4.5,
      -59.84
    ],
    "visual": {
      "primaryColor": "#f97316",
      "secondaryColor": "#eab308",
      "accentColor": "#ffffff",
      "atmosphereColor": "#ea580c",
      "radius": 1.6,
      "archetype": "lava",
      "hasRing": true,
      "ringInner": 1.8,
      "ringOuter": 3.1,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#f97316",
      "rotationSpeed": 1.28,
      "axialTilt": 0.3,
      "surfacePattern": "swirl",
      "patternScale": 7,
      "emissiveIntensity": 0.9,
      "roughness": 0.1,
      "hasMoon": false
    }
  },
  {
    "id": "planet-81-chondrule-agglomerate",
    "number": 81,
    "title": "CHONDRULE AGGLOMERATE",
    "subtitle": "Low-Gravity Rubble Pile of Fused Glassy Chondrules",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 81",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      4.65,
      4.21,
      59.43
    ],
    "visual": {
      "primaryColor": "#52525b",
      "secondaryColor": "#a1a1aa",
      "accentColor": "#e4e4e7",
      "atmosphereColor": "#71717a",
      "radius": 0.8,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#e4e4e7",
      "rotationSpeed": 0.4,
      "axialTilt": 0.15,
      "surfacePattern": "craters",
      "patternScale": 8.5,
      "emissiveIntensity": 0.3,
      "roughness": 0.5,
      "hasMoon": false
    }
  },
  {
    "id": "planet-82-magnetic-field-lattice",
    "number": 82,
    "title": "MAGNETIC FIELD LATTICE",
    "subtitle": "Superconducting Floating Plates with Meissner Levitation",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 82",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      5.36,
      3.91,
      -57.76
    ],
    "visual": {
      "primaryColor": "#00f0ff",
      "secondaryColor": "#10b981",
      "accentColor": "#ffffff",
      "atmosphereColor": "#00f0ff",
      "radius": 1.1,
      "archetype": "aurora",
      "hasRing": true,
      "ringInner": 1.4,
      "ringOuter": 2,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#10b981",
      "rotationSpeed": 0.62,
      "axialTilt": 0.45,
      "surfacePattern": "lattice",
      "patternScale": 9,
      "emissiveIntensity": 0.8,
      "roughness": 0.15,
      "hasMoon": true
    }
  },
  {
    "id": "planet-83-binary-contact-world",
    "number": 83,
    "title": "BINARY CONTACT WORLD",
    "subtitle": "Two Spherical Bodies Sharing an Hourglass Atmosphere",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 83",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      -19.45,
      3.61,
      58.67
    ],
    "visual": {
      "primaryColor": "#8b5cf6",
      "secondaryColor": "#ec4899",
      "accentColor": "#c084fc",
      "atmosphereColor": "#a855f7",
      "radius": 1.3,
      "archetype": "gasGiant",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#c084fc",
      "rotationSpeed": 0.84,
      "axialTilt": 0.38,
      "surfacePattern": "stripes",
      "patternScale": 10,
      "emissiveIntensity": 0.6,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-84-glass-bead-core",
    "number": 84,
    "title": "GLASS-BEAD CORE",
    "subtitle": "Translucent Quartz Crust Revealing Deep Magma Chambers",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 84",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      27.15,
      3.33,
      -56.96
    ],
    "visual": {
      "primaryColor": "#38bdf8",
      "secondaryColor": "#f97316",
      "accentColor": "#ffffff",
      "atmosphereColor": "#7dd3fc",
      "radius": 0.98,
      "archetype": "crystal",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#ffffff",
      "rotationSpeed": 1.06,
      "axialTilt": 0.22,
      "surfacePattern": "cracked",
      "patternScale": 7.5,
      "emissiveIntensity": 0.7,
      "roughness": 0.08,
      "hasMoon": false
    }
  },
  {
    "id": "planet-85-polar-funnel-world",
    "number": 85,
    "title": "POLAR-FUNNEL WORLD",
    "subtitle": "Deep Conical Depressions Funneling Atmosphere to Core",
    "category": "Exotic & Gravitational",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 85",
      "To Be Developed",
      "Exotic & Gravitational"
    ],
    "links": {},
    "spatialPosition": [
      -35.13,
      3.07,
      49.08
    ],
    "visual": {
      "primaryColor": "#0f172a",
      "secondaryColor": "#38bdf8",
      "accentColor": "#93c5fd",
      "atmosphereColor": "#0284c7",
      "radius": 1.05,
      "archetype": "storm",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#93c5fd",
      "rotationSpeed": 1.28,
      "axialTilt": 0.5,
      "surfacePattern": "storm",
      "patternScale": 8,
      "emissiveIntensity": 0.6,
      "roughness": 0.25,
      "hasMoon": true
    }
  },
  {
    "id": "planet-86-ecumenopolis-ruin",
    "number": 86,
    "title": "ECUMENOPOLIS RUIN",
    "subtitle": "Rusting Continental Skyscraper Megalopolis Bedrock",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 86",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      47.3,
      2.85,
      -40.5
    ],
    "visual": {
      "primaryColor": "#334155",
      "secondaryColor": "#d97706",
      "accentColor": "#94a3b8",
      "atmosphereColor": "#b45309",
      "radius": 1.1,
      "archetype": "circuit",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#94a3b8",
      "rotationSpeed": 0.4,
      "axialTilt": 0.2,
      "surfacePattern": "lattice",
      "patternScale": 12,
      "emissiveIntensity": 0.45,
      "roughness": 0.4,
      "hasMoon": false
    }
  },
  {
    "id": "planet-87-planetary-circuit-lattice",
    "number": 87,
    "title": "PLANETARY CIRCUIT LATTICE",
    "subtitle": "Continent-Scale Silicon, Gold & Copper Logic Trenches",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 87",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      -52.81,
      2.66,
      34.86
    ],
    "visual": {
      "primaryColor": "#0f172a",
      "secondaryColor": "#eab308",
      "accentColor": "#00f0ff",
      "atmosphereColor": "#00f0ff",
      "radius": 1.08,
      "archetype": "circuit",
      "hasRing": true,
      "ringInner": 1.35,
      "ringOuter": 1.85,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#00f0ff",
      "rotationSpeed": 0.62,
      "axialTilt": 0.3,
      "surfacePattern": "lattice",
      "patternScale": 14,
      "emissiveIntensity": 0.85,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-88-strip-mined-trench-world",
    "number": 88,
    "title": "STRIP-MINED TRENCH WORLD",
    "subtitle": "Terraced Step-Mines Thousands of Kilometers Deep",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 88",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      56.15,
      2.52,
      -26.88
    ],
    "visual": {
      "primaryColor": "#1c1917",
      "secondaryColor": "#ea580c",
      "accentColor": "#78716c",
      "atmosphereColor": "#a8a29e",
      "radius": 1,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#78716c",
      "rotationSpeed": 0.84,
      "axialTilt": 0.16,
      "surfacePattern": "stripes",
      "patternScale": 10,
      "emissiveIntensity": 0.35,
      "roughness": 0.5,
      "hasMoon": true
    }
  },
  {
    "id": "planet-89-orbital-ring-graveyard",
    "number": 89,
    "title": "ORBITAL RING GRAVEYARD",
    "subtitle": "Broken Titanium Space Elevators Draped across Red Rust",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 89",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      -63.67,
      2.43,
      13.65
    ],
    "visual": {
      "primaryColor": "#7f1d1d",
      "secondaryColor": "#94a3b8",
      "accentColor": "#f87171",
      "atmosphereColor": "#b91c1c",
      "radius": 1.02,
      "archetype": "ringed",
      "hasRing": true,
      "ringInner": 1.4,
      "ringOuter": 2.1,
      "ringTilt": [
        0.52,
        0,
        0.46
      ],
      "ringColor": "#94a3b8",
      "rotationSpeed": 1.06,
      "axialTilt": 0.42,
      "surfacePattern": "cracked",
      "patternScale": 7,
      "emissiveIntensity": 0.5,
      "roughness": 0.35,
      "hasMoon": false
    }
  },
  {
    "id": "planet-90-scaffolded-chassis",
    "number": 90,
    "title": "SCAFFOLDED CHASSIS",
    "subtitle": "Exposed Core in Carbon-Nanotube Hexagonal Trusses",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 90",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      64.94,
      2.39,
      -1.14
    ],
    "visual": {
      "primaryColor": "#09090b",
      "secondaryColor": "#00f0ff",
      "accentColor": "#38bdf8",
      "atmosphereColor": "#0284c7",
      "radius": 1.15,
      "archetype": "circuit",
      "hasRing": true,
      "ringInner": 1.5,
      "ringOuter": 2.3,
      "ringTilt": [
        0.62,
        0,
        0.54
      ],
      "ringColor": "#00f0ff",
      "rotationSpeed": 1.28,
      "axialTilt": 0.35,
      "surfacePattern": "lattice",
      "patternScale": 11,
      "emissiveIntensity": 0.8,
      "roughness": 0.15,
      "hasMoon": false
    }
  },
  {
    "id": "planet-91-slag-cast-sprawls",
    "number": 91,
    "title": "SLAG-CAST SPRAWLS",
    "subtitle": "Purple-Grey Glassy Foundry Runoffs over Mountain Chains",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 91",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      -62.02,
      2.41,
      -7.38
    ],
    "visual": {
      "primaryColor": "#475569",
      "secondaryColor": "#7e22ce",
      "accentColor": "#cbd5e1",
      "atmosphereColor": "#9333ea",
      "radius": 0.94,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.38
      ],
      "ringColor": "#cbd5e1",
      "rotationSpeed": 0.4,
      "axialTilt": 0.22,
      "surfacePattern": "swirl",
      "patternScale": 6,
      "emissiveIntensity": 0.35,
      "roughness": 0.3,
      "hasMoon": true
    }
  },
  {
    "id": "planet-92-glassed-battlefield",
    "number": 92,
    "title": "GLASSED BATTLEFIELD",
    "subtitle": "Fused Green Trinitite Plains with Radioluminescent Glow",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 92",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      63.35,
      2.48,
      17.31
    ],
    "visual": {
      "primaryColor": "#15803d",
      "secondaryColor": "#84cc16",
      "accentColor": "#4ade80",
      "atmosphereColor": "#22c55e",
      "radius": 0.92,
      "archetype": "mirror",
      "hasRing": false,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.46
      ],
      "ringColor": "#4ade80",
      "rotationSpeed": 0.62,
      "axialTilt": 0.18,
      "surfacePattern": "cracked",
      "patternScale": 8,
      "emissiveIntensity": 0.75,
      "roughness": 0.12,
      "hasMoon": false
    }
  },
  {
    "id": "planet-93-terraform-fail-grid",
    "number": 93,
    "title": "TERRAFORM FAIL GRID",
    "subtitle": "Square Biosphere Blocks Trapped in Containment Fields",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 93",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      -59.62,
      2.6,
      -31.01
    ],
    "visual": {
      "primaryColor": "#10b981",
      "secondaryColor": "#d97706",
      "accentColor": "#fef08a",
      "atmosphereColor": "#059669",
      "radius": 0.96,
      "archetype": "circuit",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.54
      ],
      "ringColor": "#fef08a",
      "rotationSpeed": 0.84,
      "axialTilt": 0.2,
      "surfacePattern": "lattice",
      "patternScale": 10,
      "emissiveIntensity": 0.45,
      "roughness": 0.35,
      "hasMoon": false
    }
  },
  {
    "id": "planet-94-junk-heap-stratum",
    "number": 94,
    "title": "JUNK-HEAP STRATUM",
    "subtitle": "Techno-Fossil Canyons of Compacted Micro-Machines",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 94",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      50.38,
      2.77,
      42.25
    ],
    "visual": {
      "primaryColor": "#52525b",
      "secondaryColor": "#ca8a04",
      "accentColor": "#0284c7",
      "atmosphereColor": "#a1a1aa",
      "radius": 0.91,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.38
      ],
      "ringColor": "#0284c7",
      "rotationSpeed": 1.06,
      "axialTilt": 0.15,
      "surfacePattern": "craters",
      "patternScale": 7,
      "emissiveIntensity": 0.3,
      "roughness": 0.55,
      "hasMoon": true
    }
  },
  {
    "id": "planet-95-solar-shielded-world",
    "number": 95,
    "title": "SOLAR-SHIELDED WORLD",
    "subtitle": "Perpetually Eclipsed Surface under Space Louvers",
    "category": "Post-Technological",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 95",
      "To Be Developed",
      "Post-Technological"
    ],
    "links": {},
    "spatialPosition": [
      -45.56,
      2.98,
      -48.25
    ],
    "visual": {
      "primaryColor": "#0f172a",
      "secondaryColor": "#475569",
      "accentColor": "#f59e0b",
      "atmosphereColor": "#334155",
      "radius": 1.05,
      "archetype": "circuit",
      "hasRing": true,
      "ringInner": 1.4,
      "ringOuter": 2.2,
      "ringTilt": [
        0.72,
        0,
        0.46
      ],
      "ringColor": "#f59e0b",
      "rotationSpeed": 1.28,
      "axialTilt": 0.25,
      "surfacePattern": "lattice",
      "patternScale": 8.5,
      "emissiveIntensity": 0.5,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-96-ribbon-ocean-belt",
    "number": 96,
    "title": "RIBBON-OCEAN BELT",
    "subtitle": "Ring Ocean Flanked by Scorching Badlands & Solid Glaciers",
    "category": "Twilight & Boundary",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 96",
      "To Be Developed",
      "Twilight & Boundary"
    ],
    "links": {},
    "spatialPosition": [
      37.67,
      3.23,
      54.7
    ],
    "visual": {
      "primaryColor": "#1d4ed8",
      "secondaryColor": "#b91c1c",
      "accentColor": "#ffffff",
      "atmosphereColor": "#3b82f6",
      "radius": 1.04,
      "archetype": "oceanic",
      "hasRing": true,
      "ringInner": 1.35,
      "ringOuter": 1.85,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.54
      ],
      "ringColor": "#38bdf8",
      "rotationSpeed": 0.4,
      "axialTilt": 0.05,
      "surfacePattern": "stripes",
      "patternScale": 6,
      "emissiveIntensity": 0.6,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-97-permanent-dawn-mist",
    "number": 97,
    "title": "PERMANENT DAWN MIST",
    "subtitle": "Fixed 5:00 AM Dawn Skies over Dew-Covered Silver Ferns",
    "category": "Twilight & Boundary",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 97",
      "To Be Developed",
      "Twilight & Boundary"
    ],
    "links": {},
    "spatialPosition": [
      -23.69,
      3.51,
      -63.53
    ],
    "visual": {
      "primaryColor": "#fdba74",
      "secondaryColor": "#4338ca",
      "accentColor": "#f472b6",
      "atmosphereColor": "#f43f5e",
      "radius": 0.95,
      "archetype": "twilight",
      "hasRing": false,
      "ringTilt": [
        0.52,
        0,
        0.38
      ],
      "ringColor": "#f472b6",
      "rotationSpeed": 0.62,
      "axialTilt": 0.02,
      "surfacePattern": "swirl",
      "patternScale": 5.5,
      "emissiveIntensity": 0.5,
      "roughness": 0.25,
      "hasMoon": true
    }
  },
  {
    "id": "planet-98-terminator-wind-gutter",
    "number": 98,
    "title": "TERMINATOR WIND GUTTER",
    "subtitle": "Wind-Fluted Limestone Towers Eroded by 300 km/h Boundary Gales",
    "category": "Twilight & Boundary",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 98",
      "To Be Developed",
      "Twilight & Boundary"
    ],
    "links": {},
    "spatialPosition": [
      14.42,
      3.81,
      68.48
    ],
    "visual": {
      "primaryColor": "#a3a3a3",
      "secondaryColor": "#0284c7",
      "accentColor": "#f59e0b",
      "atmosphereColor": "#737373",
      "radius": 0.93,
      "archetype": "desert",
      "hasRing": false,
      "ringTilt": [
        0.62,
        0,
        0.46
      ],
      "ringColor": "#f59e0b",
      "rotationSpeed": 0.84,
      "axialTilt": 0.04,
      "surfacePattern": "stripes",
      "patternScale": 9,
      "emissiveIntensity": 0.35,
      "roughness": 0.45,
      "hasMoon": false
    }
  },
  {
    "id": "planet-99-sub-stellar-salt-horn",
    "number": 99,
    "title": "SUB-STELLAR SALT HORN",
    "subtitle": "Towering White Mountain of Salt beneath Overhead Midday Sun",
    "category": "Twilight & Boundary",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 99",
      "To Be Developed",
      "Twilight & Boundary"
    ],
    "links": {},
    "spatialPosition": [
      -4.58,
      4.12,
      -67.43
    ],
    "visual": {
      "primaryColor": "#ffffff",
      "secondaryColor": "#ea580c",
      "accentColor": "#fde047",
      "atmosphereColor": "#f97316",
      "radius": 0.91,
      "archetype": "mineral",
      "hasRing": false,
      "ringTilt": [
        0.72,
        0,
        0.54
      ],
      "ringColor": "#fde047",
      "rotationSpeed": 1.06,
      "axialTilt": 0.01,
      "surfacePattern": "cracked",
      "patternScale": 7.5,
      "emissiveIntensity": 0.55,
      "roughness": 0.2,
      "hasMoon": false
    }
  },
  {
    "id": "planet-100-antipodal-auroral-eye",
    "number": 100,
    "title": "ANTIPODAL AURORAL EYE",
    "subtitle": "Midnight Pole Dominated by Stationary Spiral Plasma Aurora",
    "category": "Twilight & Boundary",
    "summary": "",
    "status": "IN_DEVELOPMENT",
    "architecture": {
      "frontend": "",
      "backend": "",
      "database": "",
      "apis": []
    },
    "metrics": [],
    "techStack": [
      "Sector 100",
      "To Be Developed",
      "Twilight & Boundary"
    ],
    "links": {},
    "spatialPosition": [
      -11.19,
      4.43,
      66.47
    ],
    "visual": {
      "primaryColor": "#030712",
      "secondaryColor": "#00f0ff",
      "accentColor": "#a855f7",
      "atmosphereColor": "#00f0ff",
      "radius": 1.15,
      "archetype": "aurora",
      "hasRing": true,
      "ringInner": 1.5,
      "ringOuter": 2.4,
      "ringTilt": [
        0.8200000000000001,
        0,
        0.38
      ],
      "ringColor": "#a855f7",
      "rotationSpeed": 1.28,
      "axialTilt": 0.55,
      "surfacePattern": "storm",
      "patternScale": 8.5,
      "emissiveIntensity": 0.95,
      "roughness": 0.1,
      "hasMoon": true
    }
  }
];
