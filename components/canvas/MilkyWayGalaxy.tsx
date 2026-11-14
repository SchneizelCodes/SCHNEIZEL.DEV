"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Photon Sphere & Relativistic Doppler Accretion Shader for Event Horizon
const eventHorizonVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const eventHorizonFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec2 centered = (vUv - 0.5) * 2.0;
    float r = length(centered);
    if (r < 0.52 || r > 1.0) discard;

    float angle = atan(centered.y, centered.x);

    // Relativistic Doppler beaming and high-velocity swirling plasma
    float swirl = sin(angle * 4.0 - uTime * 3.5 + r * 22.0) * 0.5 + 0.5;
    float innerFade = smoothstep(0.52, 0.62, r);
    float outerFade = smoothstep(1.0, 0.72, r);

    // Doppler asymmetry: brighter on approaching side
    float doppler = 0.6 + 0.4 * sin(angle + 0.5);

    vec3 hotWhite = vec3(1.0, 0.98, 0.88);
    vec3 hotOrange = vec3(1.0, 0.35, 0.04);
    vec3 deepRed = vec3(0.85, 0.08, 0.01);

    vec3 col = mix(hotWhite, hotOrange, smoothstep(0.52, 0.75, r));
    col = mix(col, deepRed, smoothstep(0.75, 1.0, r));
    col *= (0.8 + 0.2 * swirl) * doppler * 3.2;

    float alpha = innerFade * outerFade * 0.95;
    gl_FragColor = vec4(col, alpha);
  }
`;

export function MilkyWayGalaxy() {
  const pointsRef = useRef<THREE.Points>(null!);
  const galaxyGroupRef = useRef<THREE.Group>(null!);

  const horizonUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  // Sagittarius A* Supermassive Black Hole Coordinates
  // Placed at [0, -18.0, 0] so the Solar System orbits directly above the swirling accretion disk!
  const galacticCorePos: [number, number, number] = [0, -18.0, 0];

  // Particle Galaxy Generator matching the JavaScript animation code from video:
  // ad6bc66a-7428-4d03-a983-85f3fe5e2019.mp4
  const { positions, colors } = useMemo(() => {
    const parameters = {
      count: 48000,
      radius: 260.0,
      branches: 4,
      spin: 1.15,
      randomness: 0.44,
      randomnessPower: 4.2,
      blackHoleRadius: 11.0, // Event horizon void radius
    };

    const posArray = new Float32Array(parameters.count * 3);
    const colorArray = new Float32Array(parameters.count * 3);

    // Color gradient stops:
    // Core accretion: Blazing fiery crimson & red-orange (#ff1800, #ff4d00)
    // Mid-range: Golden plasma (#ffaa00, #fef08a)
    // Outer spiral arms: Cosmic cyan & deep electric blue (#38bdf8, #1d4ed8)
    const colorCore = new THREE.Color("#ff1800");
    const colorAccretion = new THREE.Color("#ff5500");
    const colorMid = new THREE.Color("#ffaa00");
    const colorOuter = new THREE.Color("#38bdf8");
    const colorRim = new THREE.Color("#1e3a8a");

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      // Higher particle density near the black hole event horizon
      const rPower = Math.pow(Math.random(), 1.65);
      const r =
        parameters.blackHoleRadius +
        rPower * (parameters.radius - parameters.blackHoleRadius);

      const spinAngle = r * parameters.spin * 0.045;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      // EXACT MATHEMATICAL FORMULA FROM THE JAVASCRIPT ANIMATION VIDEO:
      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        r;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        r *
        0.42;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        r;

      const lx = Math.cos(branchAngle + spinAngle) * r + randomX;
      const ly = randomY;
      const lz = Math.sin(branchAngle + spinAngle) * r + randomZ;

      posArray[i3] = galacticCorePos[0] + lx;
      posArray[i3 + 1] = galacticCorePos[1] + ly;
      posArray[i3 + 2] = galacticCorePos[2] + lz;

      // Color transition from blazing red-orange black hole core to blue-white outer arms
      const tNorm =
        (r - parameters.blackHoleRadius) /
        (parameters.radius - parameters.blackHoleRadius);

      const mixedColor = new THREE.Color();
      if (tNorm < 0.08) {
        // Ultra-dense inner fiery accretion ring
        mixedColor.copy(colorCore).lerp(colorAccretion, tNorm / 0.08);
      } else if (tNorm < 0.28) {
        // Mid accretion golden plasma
        mixedColor.copy(colorAccretion).lerp(colorMid, (tNorm - 0.08) / 0.2);
      } else if (tNorm < 0.65) {
        // Transition to cyan arms
        mixedColor.copy(colorMid).lerp(colorOuter, (tNorm - 0.28) / 0.37);
      } else {
        // Deep space blue outer halo
        mixedColor.copy(colorOuter).lerp(colorRim, (tNorm - 0.65) / 0.35);
      }

      colorArray[i3] = mixedColor.r;
      colorArray[i3 + 1] = mixedColor.g;
      colorArray[i3 + 2] = mixedColor.b;
    }

    return { positions: posArray, colors: colorArray };
  }, [galacticCorePos]);

  // 60 FPS Majestic Swirling Rotation
  useFrame((state, delta) => {
    horizonUniforms.uTime.value += delta;
    if (pointsRef.current) {
      // Swirling rotation around Sagittarius A* core
      pointsRef.current.rotation.y += delta * 0.018;
    }
  });

  return (
    <group ref={galaxyGroupRef}>
      {/* 48,000-Particle Black Hole & Barred Spiral Galaxy (Exact Design from Video) */}
      <group position={galacticCorePos}>
        <points ref={pointsRef} position={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.88}
            vertexColors
            transparent
            opacity={0.88}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Sagittarius A* Event Horizon Void & Relativistic Accretion Ring */}
      <group position={galacticCorePos}>
        {/* 2. Relativistic Doppler Accretion Disk Ring (Horizontal) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[38.0, 38.0]} />
          <shaderMaterial
            vertexShader={eventHorizonVertexShader}
            fragmentShader={eventHorizonFragmentShader}
            uniforms={horizonUniforms}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 3. Tilted Relativistic Accretion Halo (Gravitational Lensing Arc) */}
        <mesh rotation={[Math.PI * 0.38, 0, Math.PI * 0.12]}>
          <planeGeometry args={[44.0, 44.0]} />
          <shaderMaterial
            vertexShader={eventHorizonVertexShader}
            fragmentShader={eventHorizonFragmentShader}
            uniforms={horizonUniforms}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 4. Core Gravitational Illuminator */}
        <pointLight color="#ff4400" intensity={12.0} distance={180} decay={1.8} />
      </group>
    </group>
  );
}
