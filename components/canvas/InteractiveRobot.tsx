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

// Reusable math vectors to prevent garbage collection at 60 FPS
const tempCursorWorld = new THREE.Vector3();
const tempHeadWorldPos = new THREE.Vector3();
const tempFlightPos = new THREE.Vector3();
const tempTargetQuat = new THREE.Quaternion();
const currentHeadQuat = new THREE.Quaternion();

export function InteractiveRobot() {
  const rootRef = useRef<THREE.Group>(null!);
  const bodyAnchorRef = useRef<THREE.Group>(null!);
  const headBoneRef = useRef<THREE.Bone | null>(null);
  const cursorOrbRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  const [hovered, setHovered] = useState(false);
  const [isPlayingSpecial, setIsPlayingSpecial] = useState(false);

  // Connect to Zustand store
  const coreTheme = useCommandCenterStore((state) => state.coreTheme);
  const setCoreTheme = useCommandCenterStore((state) => state.setCoreTheme);
  const activeColor = THEME_COLORS[coreTheme];

  // Visor material reference for dynamic emissive color pulsing
  const visorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Load the Robot GLB model and its skeletal animations
  const { scene, animations } = useGLTF("/models/robot.glb");

  // 1. Strip baked Head rotation keyframe tracks from animation clips
  // This permanently prevents the AnimationMixer from fighting our mouse tracking
  useEffect(() => {
    animations.forEach((clip) => {
      clip.tracks = clip.tracks.filter(
        (track) =>
          !track.name.toLowerCase().includes("head.quaternion") &&
          !track.name.toLowerCase().includes("head.rotation")
      );
    });
  }, [animations]);

  const { actions } = useAnimations(animations, rootRef);

  // Click interaction: cycle core theme + play victory fanfare + robot wave/thumbs-up
  const handleClick = (e: any) => {
    e.stopPropagation();
    sound.playClick();
    sound.playVictory();

    // 1. Cycle core theme
    const sequence: CoreTheme[] = ["cyan", "emerald", "amber"];
    const nextIndex = (sequence.indexOf(coreTheme) + 1) % sequence.length;
    setCoreTheme(sequence[nextIndex]);

    // 2. Trigger special wave gesture
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

  // Configure materials and locate Head bone
  useEffect(() => {
    scene.traverse((child) => {
      // Find head bone
      if (child.name === "Head" && (child as THREE.Bone).isBone) {
        headBoneRef.current = child as THREE.Bone;
      }

      // Apply high-tech cyber chrome materials
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          if (mat.name === "Black" || mesh.name.includes("Cylinder_2")) {
            // Glowing cyber visor
            visorMatRef.current = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#050810"),
              emissive: new THREE.Color(activeColor),
              emissiveIntensity: 4.5,
              roughness: 0.1,
              metalness: 0.5,
            });
            mesh.material = visorMatRef.current;
          } else if (mat.name === "Main") {
            // Main Chassis - Liquid Carbon / Obsidian Chrome
            mesh.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#0b1220"),
              metalness: 0.95,
              roughness: 0.15,
            });
          } else {
            // Grey - Brushed Titanium Trim
            mesh.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#334155"),
              metalness: 0.9,
              roughness: 0.2,
            });
          }
        }
      }
    });

    // Play flight idle animation
    const flightAction = actions["Robot_Idle"] || actions["Robot_Standing"];
    if (flightAction) {
      flightAction.reset().fadeIn(0.3).play();
    }

    return () => {
      flightAction?.stop();
    };
  }, [scene, actions, activeColor]);

  // Update glowing visor when theme switches
  useEffect(() => {
    if (visorMatRef.current) {
      visorMatRef.current.emissive.set(activeColor);
    }
  }, [activeColor]);

  // 60 FPS Physics & Motion Loop (Default priority 0 preserves automatic WebGL rendering)
  useFrame((state, delta) => {
    const { pointer, viewport } = state;
    const t = state.clock.getElapsedTime();

    // 1. Map cursor to 3D world coordinates
    const cursorX = pointer.x * viewport.width * 0.45;
    const cursorY = pointer.y * viewport.height * 0.45;
    const cursorZ = 2.5;
    tempCursorWorld.set(cursorX, cursorY, cursorZ);

    // 2. Position the floating cursor light orb
    if (cursorOrbRef.current) {
      cursorOrbRef.current.position.lerp(tempCursorWorld, Math.min(delta * 7, 1));
    }
    if (lightRef.current && cursorOrbRef.current) {
      lightRef.current.position.copy(cursorOrbRef.current.position);
    }

    // 3. Wide-Range Zero-G Soaring Flight (Flying Lower in Open Space)
    // Baseline Y is -1.15 so he stays comfortably below hero typography!
    // Broad sweeping range across X (±2.5) and depth Z (±0.5)
    const flightX = Math.sin(t * 0.65) * 2.2 + Math.cos(t * 1.4) * 0.5;
    const flightY = -1.15 + Math.cos(t * 0.85) * 0.35 + Math.sin(t * 1.7) * 0.15;
    const flightZ = Math.sin(t * 0.95) * 0.45 + Math.cos(t * 0.5) * 0.2;

    tempFlightPos.set(flightX, flightY, flightZ);

    if (rootRef.current) {
      rootRef.current.position.lerp(tempFlightPos, Math.min(delta * 2.5, 1));
    }

    // 4. Fluid Zero-G Flight Banking (Natural aerodynamic banking into curves)
    if (bodyAnchorRef.current) {
      const targetRoll = Math.cos(t * 0.65) * -0.28;
      const targetPitch = Math.sin(t * 0.85) * 0.14;
      const targetYaw = Math.cos(t * 0.45) * 0.35;

      bodyAnchorRef.current.rotation.z = THREE.MathUtils.lerp(
        bodyAnchorRef.current.rotation.z,
        targetRoll,
        Math.min(delta * 3.5, 1)
      );
      bodyAnchorRef.current.rotation.x = THREE.MathUtils.lerp(
        bodyAnchorRef.current.rotation.x,
        targetPitch,
        Math.min(delta * 3.5, 1)
      );
      bodyAnchorRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyAnchorRef.current.rotation.y,
        targetYaw,
        Math.min(delta * 3.5, 1)
      );
    }

    // 5. Smooth Head Tracking (Eyes locked onto cursor)
    if (headBoneRef.current) {
      headBoneRef.current.getWorldPosition(tempHeadWorldPos);

      // Save pre-lookAt quaternion
      currentHeadQuat.copy(headBoneRef.current.quaternion);

      // Compute lookAt orientation directly in world space
      headBoneRef.current.lookAt(tempCursorWorld);
      tempTargetQuat.copy(headBoneRef.current.quaternion);

      // Restore and smoothly slerp to target gaze
      headBoneRef.current.quaternion.copy(currentHeadQuat);
      headBoneRef.current.quaternion.slerp(tempTargetQuat, Math.min(delta * 9, 1));
    }
  });

  return (
    <>
      {/* Floating Cursor Light Orb that follows the mouse */}
      <mesh ref={cursorOrbRef} position={[0, 0, 3]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Dynamic Specular Point Light emanating from Cursor */}
      <pointLight
        ref={lightRef}
        color={activeColor}
        intensity={hovered ? 12 : 7}
        distance={12}
        decay={1.6}
      />

      {/* Robot Root Group: Free-flying lower in space with scale 0.45 */}
      <group
        ref={rootRef}
        position={[0, -1.15, 0]}
        scale={0.45}
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* Generous Click Hitbox */}
        <mesh visible={false} position={[0, 0, 0]}>
          <boxGeometry args={[3, 4, 3]} />
          <meshBasicMaterial />
        </mesh>

        {/* Body Anchor with Aerodynamic Banking (Pivot centered at robot's core) */}
        <group ref={bodyAnchorRef} position={[0, -1.05, 0]}>
          <primitive object={scene} />
        </group>
      </group>
    </>
  );
}

// Preload the robot GLB model
useGLTF.preload("/models/robot.glb");