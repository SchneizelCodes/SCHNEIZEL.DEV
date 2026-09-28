"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";

const THEME_COLORS: Record<CoreTheme, string> = {
  cyan: "#00f0ff",
  emerald: "#10b981",
  amber: "#f59e0b",
};

// Reusable math vectors for 60fps tracking without garbage collection
const tempCursorWorld = new THREE.Vector3();
const tempHeadWorldPos = new THREE.Vector3();
const tempFlightPos = new THREE.Vector3();

export function QuantumCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyAnchorRef = useRef<THREE.Group>(null!);
  const outerCageRef = useRef<THREE.Mesh>(null!);
  const containmentFieldRef = useRef<THREE.Mesh>(null!);
  const satellitesRef = useRef<THREE.Group>(null!);
  const headMeshRef = useRef<THREE.Object3D | null>(null);
  const headBoneRef = useRef<THREE.Object3D | null>(null);

  const [hovered, setHovered] = useState(false);
  const [isPlayingSpecial, setIsPlayingSpecial] = useState(false);

  // Connect to Zustand store
  const coreTheme = useCommandCenterStore((state) => state.coreTheme);
  const setCoreTheme = useCommandCenterStore((state) => state.setCoreTheme);
  const activeColor = THEME_COLORS[coreTheme];

  // Load the Robot GLB model and its skeletal animations
  const { scene, animations } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Visor material reference for dynamic emissive color pulsing
  const visorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Cycle to next theme on click + audio + robot greeting
  const handleInteraction = (e?: any) => {
    if (e) e.stopPropagation();
    sound.playClick();
    sound.playVictory();

    // 1. Cycle core theme
    const sequence: CoreTheme[] = ["cyan", "emerald", "amber"];
    const nextIndex = (sequence.indexOf(coreTheme) + 1) % sequence.length;
    setCoreTheme(sequence[nextIndex]);

    // 2. Trigger robot greeting wave/thumbs-up
    if (!isPlayingSpecial) {
      setIsPlayingSpecial(true);
      const specialAction = actions["Robot_Wave"] || actions["Robot_ThumbsUp"];
      const flightAction = actions["Robot_Idle"] || actions["Robot_Standing"];

      if (specialAction && flightAction) {
        specialAction.reset();
        specialAction.setLoop(THREE.LoopOnce, 1);
        specialAction.clampWhenFinished = false;
        specialAction.fadeIn(0.2).play();
        flightAction.crossFadeTo(specialAction, 0.2, false);

        setTimeout(() => {
          specialAction.crossFadeTo(flightAction, 0.4, false);
          flightAction.reset().fadeIn(0.4).play();
          setIsPlayingSpecial(false);
        }, 1600);
      } else {
        setTimeout(() => setIsPlayingSpecial(false), 1000);
      }
    }
  };

  // Configure high-tech cyber chrome materials & baseline animation
  useEffect(() => {
    // 1. Locate Head mesh (Node 0) and Head bone (Node 1)
    scene.traverse((child) => {
      if (child.name === "Head") {
        if ((child as THREE.Mesh).isMesh) {
          headMeshRef.current = child;
        } else if ((child as THREE.Bone).isBone) {
          headBoneRef.current = child;
        }
      }

      // Apply high-tech cyber chrome materials
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((mat) => {
            const m = mat as THREE.MeshStandardMaterial;
            if (m.name === "Black") {
              // Glowing cyber visor
              visorMatRef.current = new THREE.MeshStandardMaterial({
                color: new THREE.Color("#050810"),
                emissive: new THREE.Color(activeColor),
                emissiveIntensity: 4.0,
                roughness: 0.1,
                metalness: 0.5,
              });
              return visorMatRef.current;
            } else if (m.name === "Main") {
              // Main Chassis - Obsidian Chrome / Cyber Platinum
              return new THREE.MeshStandardMaterial({
                color: new THREE.Color("#0c1322"),
                metalness: 0.95,
                roughness: 0.16,
              });
            } else {
              // Grey - Brushed Titanium Trim
              return new THREE.MeshStandardMaterial({
                color: new THREE.Color("#334155"),
                metalness: 0.9,
                roughness: 0.2,
              });
            }
          });
        }
      }
    });

    // 2. Play zero-g airborne idle
    const flightAction = actions["Robot_Idle"] || actions["Robot_Standing"];
    if (flightAction) {
      flightAction.reset().fadeIn(0.3).play();
    }

    return () => {
      flightAction?.stop();
    };
  }, [scene, actions]);

  // Update glowing visor when theme switches
  useEffect(() => {
    if (visorMatRef.current) {
      visorMatRef.current.emissive.set(activeColor);
    }
  }, [activeColor]);

  // 60fps render loop: Robot and Quantum Core move in 100% mathematical lockstep
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer, viewport } = state;

    // 1. Map cursor to 3D world space
    const cursorX = pointer.x * viewport.width * 0.45;
    const cursorY = pointer.y * viewport.height * 0.45;
    const cursorZ = 2.5;
    tempCursorWorld.set(cursorX, cursorY, cursorZ);

    // 2. Unified 3D High-Energy Flight Path (Moves Quantum Core & Robot as ONE)
    const flightX = Math.sin(t * 0.95) * 0.72 + Math.cos(t * 2.1) * 0.22;
    const flightY = Math.cos(t * 1.15) * 0.52 + Math.sin(t * 2.3) * 0.18;
    const flightZ = Math.sin(t * 1.35) * 0.45 + Math.cos(t * 0.85) * 0.18;

    tempFlightPos.set(flightX, flightY, flightZ);

    if (groupRef.current) {
      groupRef.current.position.lerp(tempFlightPos, delta * 3.5);

      // Subtle responsive cursor leaning
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.2,
        delta * 3
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.28,
        delta * 3
      );
    }

    // 3. Dynamic Banking & Roll of the Robot inside the Bubble
    if (bodyAnchorRef.current) {
      const targetRoll = Math.sin(t * 0.95) * 0.32 + Math.cos(t * 2.1) * 0.12;
      const targetPitch = Math.cos(t * 1.15) * 0.22;
      const targetYaw = Math.sin(t * 0.7) * 0.45;

      bodyAnchorRef.current.rotation.z = THREE.MathUtils.lerp(bodyAnchorRef.current.rotation.z, targetRoll, delta * 3.5);
      bodyAnchorRef.current.rotation.x = THREE.MathUtils.lerp(bodyAnchorRef.current.rotation.x, targetPitch, delta * 3.5);
      bodyAnchorRef.current.rotation.y = THREE.MathUtils.lerp(bodyAnchorRef.current.rotation.y, targetYaw, delta * 3.5);
    }

    // 4. Head Tracking: Gaze stays locked onto Cursor
    const headTarget = headMeshRef.current || headBoneRef.current;
    if (headTarget) {
      headTarget.getWorldPosition(tempHeadWorldPos);

      const dx = tempCursorWorld.x - tempHeadWorldPos.x;
      const dy = tempCursorWorld.y - tempHeadWorldPos.y;
      const dz = tempCursorWorld.z - tempHeadWorldPos.z;

      const bodyYaw = bodyAnchorRef.current ? bodyAnchorRef.current.rotation.y : 0;
      const targetYaw = Math.atan2(dx, dz) - bodyYaw;
      const targetPitch = -Math.atan2(dy, Math.hypot(dx, dz));

      const clampedYaw = THREE.MathUtils.clamp(targetYaw, -1.3, 1.3);
      const clampedPitch = THREE.MathUtils.clamp(targetPitch, -0.7, 0.7);

      headTarget.rotation.y = THREE.MathUtils.lerp(headTarget.rotation.y, clampedYaw, delta * 8);
      headTarget.rotation.x = THREE.MathUtils.lerp(headTarget.rotation.x, clampedPitch, delta * 8);
    }

    // 5. Counter-rotating outer cage with harmonic scale breathing
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x -= delta * 0.18;
      outerCageRef.current.rotation.z += delta * 0.22;
      const pulse = 1 + Math.sin(t * 2.2) * 0.03;
      outerCageRef.current.scale.set(pulse, pulse, pulse);
    }

    // 6. Translucent Containment Field Bubble subtle rotation
    if (containmentFieldRef.current) {
      containmentFieldRef.current.rotation.y += delta * 0.12;
    }

    // 7. Orbiting satellite data nodes
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 0.6;
      satellitesRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onClick={handleInteraction}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Central Specular Illumination */}
      <pointLight
        color={activeColor}
        intensity={hovered ? 12 : 7}
        distance={10}
        decay={1.8}
      />

      {/* ============================================================== */}
      {/* THE COMPACT QUANTUM CORE BUBBLE (Fitted to the Robot's Stature) */}
      {/* ============================================================== */}
      <mesh ref={containmentFieldRef}>
        {/* Radius 0.78: Custom-fitted to robot height of ~0.96 with snug clearance */}
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshPhysicalMaterial
          color="#060c18"
          roughness={0.06}
          metalness={0.15}
          transmission={0.92}
          thickness={0.5}
          transparent
          opacity={0.32}
          emissive={activeColor}
          emissiveIntensity={hovered ? 0.4 : 0.18}
        />
      </mesh>

      {/* Outer Angular Wireframe Aura (Radius 0.90) */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshStandardMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={hovered ? 0.5 : 0.25}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Satellite Data Nodes around the flying bubble */}
      <group ref={satellitesRef}>
        <mesh position={[1.25, 0.2, 0]}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-1.1, -0.3, 0.4]}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.3, 1.2, -0.4]}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* THE ROBOT (Inside the Bubble, Centered, Moving in Lockstep)     */}
      {/* ============================================================== */}
      <group scale={0.32}>
        {/* Click Hitbox */}
        <mesh visible={false} position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 3.2, 2.5]} />
          <meshBasicMaterial />
        </mesh>

        {/* Body Anchor with Zero-G Banking: Vertically centered at [-1.05] so pivot is at robot's core */}
        <group ref={bodyAnchorRef} position={[0, -1.05, 0]}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

// Preload the robot GLB model
useGLTF.preload("/models/robot.glb");