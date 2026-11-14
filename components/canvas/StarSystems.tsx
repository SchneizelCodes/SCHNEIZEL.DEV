"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { STAR_SYSTEMS, StarSystemData, SUN_SPEC, getPlanetaryPosition } from "@/data/starSystems";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";
import { Sparkles, Globe, ChevronRight } from "lucide-react";

// ====================================================================
// SOLAR CORONA ATMOSPHERE SHADER
// ====================================================================
const solarCoronaVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const solarCoronaFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
    float pulse = sin(uTime * 2.2) * 0.12 + 0.88;
    float aura = pow(rim, 2.6) * uIntensity * pulse;
    vec3 col = mix(uColor, vec3(1.0), 0.4);
    gl_FragColor = vec4(col, aura);
  }
`;

// Photospheric Shockwave Ring Shader (Expanding pulse on Star Click)
const shockwaveVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const shockwaveFragmentShader = `
  uniform vec3 uColor;
  uniform float uProgress; // 0.0 to 1.0
  varying vec2 vUv;

  void main() {
    vec2 centered = (vUv - 0.5) * 2.0;
    float r = length(centered);
    if (r > 1.0 || r < 0.2) discard;

    float waveDist = abs(r - uProgress);
    float ringAlpha = smoothstep(0.18, 0.0, waveDist) * (1.0 - uProgress);
    vec3 flare = mix(uColor, vec3(1.0), 0.7);
    gl_FragColor = vec4(flare, ringAlpha * 1.5);
  }
`;

// Fixed X-axis coordinates for straight-line alignment parade
const ALIGNED_POSITIONS: Record<string, number> = {
  "system-mercury": 16.0,
  "system-venus": 28.0,
  "system-earth": 42.0,
  "system-mars": 56.0,
  "system-jupiter": 74.0,
  "system-saturn": 96.0,
  "system-uranus": 118.0,
  "system-neptune": 138.0,
};

// Isolated Sun 3D Model to prevent CentralSun from suspending
function SunModel() {
  const { scene } = useGLTF("/models/sun.glb");

  const clonedModel = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={clonedModel} />;
}

// ====================================================================
// CENTRAL SUN (SOL PRIME) COMPONENT
// ====================================================================
function CentralSun() {
  const modelAnchorRef = useRef<THREE.Group>(null!);
  const shockwaveRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setSelectedStarSystemId = useCommandCenterStore((state) => state.setSelectedStarSystemId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const isPlanetsAligned = useCommandCenterStore((state) => state.isPlanetsAligned);
  const togglePlanetsAligned = useCommandCenterStore((state) => state.togglePlanetsAligned);

  const shockwaveProgress = useRef(0);
  const isShockwaveActive = useRef(false);

  const coronaUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(SUN_SPEC.color) },
      uTime: { value: 0 },
      uIntensity: { value: 1.2 },
    }),
    []
  );

  const shockwaveUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(SUN_SPEC.color) },
      uProgress: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    coronaUniforms.uTime.value += delta;

    if (modelAnchorRef.current) {
      modelAnchorRef.current.rotation.y += delta * 0.12;
      modelAnchorRef.current.rotation.x = Math.sin(t * 0.2) * 0.04;
    }

    if (isShockwaveActive.current) {
      shockwaveProgress.current += delta * 1.8;
      if (shockwaveProgress.current >= 1.0) {
        shockwaveProgress.current = 0;
        isShockwaveActive.current = false;
      }
      shockwaveUniforms.uProgress.value = shockwaveProgress.current;
      if (shockwaveRef.current) {
        const scale = 1.0 + shockwaveProgress.current * 18.0;
        shockwaveRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  const handleSunClick = (e?: any) => {
    if (e?.stopPropagation) e.stopPropagation();
    sound.playClick();
    sound.playWhoosh();
    isShockwaveActive.current = true;
    shockwaveProgress.current = 0.05;

    const nextAligned = !isPlanetsAligned;
    togglePlanetsAligned();
    setSelectedStarSystemId(null);

    if (nextAligned) {
      // Smoothly frame the horizontal alignment parade of planets
      setCameraTarget({
        position: [70.0, 26.0, 68.0],
        target: [70.0, 14.0, 0],
      });
    } else {
      // Return to solar system overview
      setCameraTarget({
        position: [0, 36.0, 72.0],
        target: [0, 14.0, 0],
      });
    }
  };

  return (
    <group position={SUN_SPEC.position}>
      {/* Invisible Click Hitbox */}
      <mesh
        onClick={handleSunClick}
        onPointerOver={() => {
          setHovered(true);
          sound.playHover();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        visible={false}
      >
        <sphereGeometry args={[5.8, 16, 16]} />
        <meshBasicMaterial />
      </mesh>

      {/* Authentic Sun Model from sun.glb */}
      <group ref={modelAnchorRef} scale={0.25}>
        <Suspense fallback={null}>
          <SunModel />
        </Suspense>
      </group>

      {/* Volumetric Corona Aura */}
      <mesh scale={5.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          vertexShader={solarCoronaVertexShader}
          fragmentShader={solarCoronaFragmentShader}
          uniforms={coronaUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Expanding Photospheric Shockwave on Click */}
      <mesh ref={shockwaveRef} rotation={[-Math.PI / 2, 0, 0]} visible={isShockwaveActive.current}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          vertexShader={shockwaveVertexShader}
          fragmentShader={shockwaveFragmentShader}
          uniforms={shockwaveUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Core Solar Light Illuminator */}
      <pointLight color={SUN_SPEC.color} intensity={8.5} distance={120} decay={1.8} />

      {/* Pinned 3D Sun Title Badge with Mode Transition Prompt */}
      {mounted && (
        <Html position={[0, -6.5, 0]} center distanceFactor={26} zIndexRange={[45, 0]}>
          <div
          onClick={handleSunClick}
          className={`group px-4 py-2 rounded-full border backdrop-blur-xl flex items-center gap-2.5 select-none cursor-pointer transition-all duration-300 hover:scale-105 pointer-events-auto ${
            isPlanetsAligned
              ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_35px_rgba(245,158,11,0.5)]"
              : "bg-black/85 border-amber-400/40 text-white hover:border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-amber-300">
              {SUN_SPEC.name}
            </span>
            <span className="text-[9px] font-mono text-amber-200/80 tracking-wider">
              {isPlanetsAligned ? "↺ CLICK TO RETURN TO ORBIT" : "➔ CLICK TO ALIGN PLANETS"}
            </span>
          </div>
        </div>
      </Html>
      )}
    </group>
  );
}

// ====================================================================
// SINGLE SOVEREIGN PLANET COMPONENT
// ====================================================================
interface SovereignPlanetProps {
  system: StarSystemData;
  index: number;
  isActive: boolean;
  hasActiveSystem: boolean;
}

function SovereignPlanet({ system, index, isActive, hasActiveSystem }: SovereignPlanetProps) {
  const planetGroupRef = useRef<THREE.Group>(null!);
  const bodyMeshRef = useRef<THREE.Mesh>(null!);
  const moonRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setSelectedStarSystemId = useCommandCenterStore((state) => state.setSelectedStarSystemId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const hoveredPlanetId = useCommandCenterStore((state) => state.hoveredPlanetId);
  const isPlanetsAligned = useCommandCenterStore((state) => state.isPlanetsAligned);

  // Dynamic alignment progress interpolation (0.0 = orbit, 1.0 = straight line)
  const alignProgress = useRef(0);

  // Generate Keplerian orbital ellipse track for orbit mode
  const orbitLinePoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const pos = getPlanetaryPosition(
        system.semiMajorAxis,
        system.eccentricity,
        system.inclinationDeg,
        1.0,
        angle
      );
      points.push(pos);
    }
    return points;
  }, [system]);

  // Dynamic 60fps Physics & Smooth Orbit ➔ Alignment Transition
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smoothly damp alignment progress
    const targetProg = isPlanetsAligned ? 1.0 : 0.0;
    alignProgress.current = THREE.MathUtils.damp(
      alignProgress.current,
      targetProg,
      3.6,
      delta
    );
    const prog = alignProgress.current;

    // 1. Calculate dynamic Keplerian orbit position
    const [orbitX, orbitY, orbitZ] = getPlanetaryPosition(
      system.semiMajorAxis,
      system.eccentricity,
      system.inclinationDeg,
      system.periodSpeedFactor,
      t
    );

    // 2. Calculate target straight-line aligned position
    const lineX = ALIGNED_POSITIONS[system.id] ?? (16 + index * 16);
    const lineY = 14.0;
    const lineZ = 0.0;

    // 3. Eased interpolation between orbit and straight line
    const currentX = THREE.MathUtils.lerp(orbitX, lineX, prog);
    const currentY = THREE.MathUtils.lerp(orbitY, lineY, prog);
    const currentZ = THREE.MathUtils.lerp(orbitZ, lineZ, prog);

    if (planetGroupRef.current) {
      planetGroupRef.current.position.set(currentX, currentY, currentZ);
    }

    if (bodyMeshRef.current) {
      bodyMeshRef.current.rotation.y += delta * 0.85;
    }

    // Earth's Moon: orbits around Earth
    if (moonRef.current && system.hasMoon) {
      const moonSpeed = 1.8;
      const moonR = 2.8;
      const mAngle = t * moonSpeed;
      moonRef.current.position.set(
        Math.cos(mAngle) * moonR,
        Math.sin(mAngle * 0.8) * 0.4,
        Math.sin(mAngle) * moonR
      );
    }
  });

  const handleSelect = (e?: any) => {
    if (e?.stopPropagation) e.stopPropagation();
    sound.playClick();
    setSelectedStarSystemId(system.id);

    // Frame camera on the planet at its current position
    if (planetGroupRef.current) {
      const pos = planetGroupRef.current.position;
      const zoomDist = system.size * 2.8 + 3.5;
      setCameraTarget({
        position: [pos.x - zoomDist * 0.8, pos.y + zoomDist * 0.45, pos.z + zoomDist],
        target: [pos.x, pos.y, pos.z],
      });
    }
  };

  const isHighlighted = hovered || isActive || hoveredPlanetId === system.id;
  const showIndicator = isPlanetsAligned || isHighlighted;

  // Stagger height slightly for clean label readability
  const indicatorHeightOffset = system.size + (index % 2 === 0 ? 3.0 : 4.5);

  return (
    <>
      {/* Keplerian Orbital Track Ring (Softly fades when aligned) */}
      <Line
        points={orbitLinePoints}
        color={system.spectralColor}
        lineWidth={0.65}
        transparent
        opacity={isPlanetsAligned ? 0.04 : isActive ? 0.85 : isHighlighted ? 0.65 : 0.2}
      />

      {/* Planetary Body Group */}
      <group ref={planetGroupRef} position={system.position}>
        {/* Invisible Hitbox */}
        <mesh
          onClick={handleSelect}
          onPointerOver={() => {
            setHovered(true);
            sound.playHover();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          visible={false}
        >
          <sphereGeometry args={[system.size * 1.5, 12, 12]} />
          <meshBasicMaterial />
        </mesh>

        {/* Planet Sphere */}
        <mesh
          ref={bodyMeshRef}
          onClick={handleSelect}
          scale={isHighlighted ? 1.15 : 1.0}
        >
          <sphereGeometry args={[system.size, 32, 32]} />
          <meshStandardMaterial
            color={system.spectralColor}
            roughness={0.35}
            metalness={0.25}
            emissive={system.spectralColor}
            emissiveIntensity={isActive ? 0.85 : isHighlighted ? 0.6 : 0.25}
          />
        </mesh>

        {/* Atmospheric Rim Glow */}
        <pointLight
          color={system.spectralColor}
          intensity={isActive ? 3.5 : isHighlighted ? 2.0 : 0.8}
          distance={system.size * 5 + 4}
        />

        {/* Saturn's Majestic Rings */}
        {system.ringRadius && (
          <mesh rotation={[Math.PI * 0.38, 0, 0]}>
            <ringGeometry args={[system.size * 1.3, system.ringRadius, 48]} />
            <meshStandardMaterial
              color="#e2bf7d"
              roughness={0.35}
              metalness={0.2}
              transparent
              opacity={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Earth's Moon */}
        {system.hasMoon && (
          <group ref={moonRef}>
            <mesh>
              <sphereGeometry args={[0.32, 16, 16]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
            </mesh>
          </group>
        )}

        {/* Sleek Holographic Indicator Card (Always visible when aligned, or on hover) */}
        {mounted && showIndicator && (
          <Html
            position={[0, indicatorHeightOffset, 0]}
            center
            distanceFactor={22}
            zIndexRange={[45, 0]}
          >
            <div
              onClick={handleSelect}
              onMouseEnter={() => {
                setHovered(true);
                sound.playHover();
              }}
              onMouseLeave={() => setHovered(false)}
              className={`group flex flex-col items-center select-none cursor-pointer transition-all duration-300 pointer-events-auto ${
                isHighlighted ? "scale-110 -translate-y-1" : "scale-100"
              }`}
            >
              {/* Glass Indicator Card */}
              <div
                className={`px-3 py-1.5 rounded-xl border backdrop-blur-2xl flex items-center gap-2.5 transition-all shadow-xl ${
                  isHighlighted
                    ? "bg-black/90 border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    : "bg-black/80 border-white/20 text-white/90 hover:border-white/50"
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: system.spectralColor,
                    boxShadow: `0 0 10px ${system.spectralColor}`,
                  }}
                />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono tracking-wider font-bold uppercase text-white">
                      {system.celestialBody}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-white/10 text-cyan-300 font-medium">
                      {system.telemetry.totalProjects} PROJ
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-white/50 tracking-wider truncate max-w-[130px]">
                    {system.domain}
                  </span>
                </div>
                <ChevronRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Vertical Glowing Connector Stem */}
              <div
                className="w-[1.5px] h-3 transition-opacity duration-300"
                style={{
                  backgroundColor: system.spectralColor,
                  boxShadow: `0 0 8px ${system.spectralColor}`,
                  opacity: isHighlighted ? 1.0 : 0.6,
                }}
              />
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

useGLTF.preload("/models/sun.glb");

// ====================================================================
// STAR SYSTEMS ROOT COMPONENT
// ====================================================================
export function StarSystems() {
  const selectedStarSystemId = useCommandCenterStore((state) => state.selectedStarSystemId);
  const isPlanetsAligned = useCommandCenterStore((state) => state.isPlanetsAligned);
  const hasActiveSystem = Boolean(selectedStarSystemId);

  // Linear Alignment Axis Guide Line (Fades in when aligned)
  const alignmentLinePoints = useMemo(() => {
    return [
      [0, 14.0, 0] as [number, number, number],
      [145.0, 14.0, 0] as [number, number, number],
    ];
  }, []);

  return (
    <group>
      {/* Central Sun Anchor (Sol Prime) */}
      <CentralSun />

      {/* Luminous Straight Alignment Axis (Visible when aligned) */}
      {isPlanetsAligned && (
        <Line
          points={alignmentLinePoints}
          color="#f59e0b"
          lineWidth={0.8}
          transparent
          opacity={0.35}
        />
      )}

      {/* 8 Sovereign Planetary Systems (Orbit ➔ Linear Alignment) */}
      {STAR_SYSTEMS.map((system, index) => (
        <SovereignPlanet
          key={system.id}
          system={system}
          index={index}
          isActive={selectedStarSystemId === system.id}
          hasActiveSystem={hasActiveSystem}
        />
      ))}
    </group>
  );
}
