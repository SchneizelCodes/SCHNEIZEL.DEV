"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";

const tempBasePos = new THREE.Vector3();
const tempBaseTarget = new THREE.Vector3();
const tempCenter = new THREE.Vector3();
const tempCamPos = new THREE.Vector3();
const camRight = new THREE.Vector3();
const camUp = new THREE.Vector3();
const camForward = new THREE.Vector3();
const moveDir = new THREE.Vector3();

export function CameraController() {
  const cameraTarget = useCommandCenterStore((state) => state.cameraTarget);
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const selectedStarSystemId = useCommandCenterStore((state) => state.selectedStarSystemId);
  const viewPerspective = useCommandCenterStore((state) => state.viewPerspective);
  const toggleViewPerspective = useCommandCenterStore((state) => state.toggleViewPerspective);
  const playerPos = useCommandCenterStore((state) => state.playerPos);
  const setTelemetry = useCommandCenterStore((state) => state.setTelemetry);
  const { gl, camera } = useThree();

  // Interpolated camera lookAt target and position
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // User interactive orbital rotation offsets (spherical angles)
  const targetOrbitAngles = useRef({ theta: 0, phi: 0 });
  const currentOrbitAngles = useRef({ theta: 0, phi: 0 });

  // User interactive spatial panning offset
  const targetPanOffset = useRef(new THREE.Vector3(0, 0, 0));
  const currentPanOffset = useRef(new THREE.Vector3(0, 0, 0));

  // Flight velocity for WASD / Arrow key flight thrusters
  const flightVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const activeKeys = useRef<Set<string>>(new Set());

  // User interactive zoom offset
  const targetUserZoom = useRef(0);
  const currentUserZoom = useRef(0);

  // Velocity for smooth mouse drag momentum / inertia
  const velocity = useRef({ theta: 0, phi: 0 });

  // Pointer drag state tracking
  const isPointerDown = useRef(false);
  const dragButton = useRef<number>(0);
  const isShiftKey = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const pointerLast = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // When selected project changes or cameraTarget presets switch, smoothly reset offsets to baseline
  useEffect(() => {
    targetOrbitAngles.current = { theta: 0, phi: 0 };
    targetPanOffset.current.set(0, 0, 0);
    targetUserZoom.current = 0;
    velocity.current = { theta: 0, phi: 0 };
    flightVelocity.current.set(0, 0, 0);
  }, [
    selectedProjectId,
    cameraTarget.position[0],
    cameraTarget.position[1],
    cameraTarget.position[2],
  ]);

  // WASD and Arrow Keys POV Flight Controller listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      const code = e.code;
      activeKeys.current.add(code);

      // If user presses WASD or flight keys while inspecting a pod, smoothly resume flight!
      if (
        (code === "KeyW" ||
          code === "KeyA" ||
          code === "KeyS" ||
          code === "KeyD" ||
          code === "ArrowUp" ||
          code === "ArrowDown" ||
          code === "ArrowLeft" ||
          code === "ArrowRight") &&
        selectedProjectId
      ) {
        setSelectedProjectId(null);
      }

      // Hotkey 'V' to toggle Third-Person Player POV vs Orbit View
      if (code === "KeyV") {
        toggleViewPerspective();
      }

      // Hotkey 'R' to reset viewpoint
      if ((code === "KeyR" || e.key === "r" || e.key === "R") && !e.ctrlKey && !e.metaKey) {
        targetOrbitAngles.current = { theta: 0, phi: 0 };
        targetPanOffset.current.set(0, 0, 0);
        targetUserZoom.current = 0;
        velocity.current = { theta: 0, phi: 0 };
        flightVelocity.current.set(0, 0, 0);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      activeKeys.current.delete(e.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedProjectId, setSelectedProjectId]);

  // Pointer event listeners on canvas for 360 free movement
  useEffect(() => {
    const dom = gl.domElement;
    if (!dom) return;

    // Prevent default context menu on right click so right-drag can pan freely
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Ignore if clicking on an interactive UI modal / drawer
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".pointer-events-auto, [data-scrollable='true']")) {
        return;
      }

      isPointerDown.current = true;
      dragButton.current = e.button;
      isShiftKey.current = e.shiftKey;
      pointerStart.current = { x: e.clientX, y: e.clientY };
      pointerLast.current = { x: e.clientX, y: e.clientY };
      hasDragged.current = false;

      // Stop previous inertia on new touch/click
      velocity.current = { theta: 0, phi: 0 };

      dom.style.cursor = "grabbing";
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;

      const dx = e.clientX - pointerLast.current.x;
      const dy = e.clientY - pointerLast.current.y;
      pointerLast.current = { x: e.clientX, y: e.clientY };

      const totalDist = Math.hypot(
        e.clientX - pointerStart.current.x,
        e.clientY - pointerStart.current.y
      );
      if (totalDist > 4) {
        hasDragged.current = true;
      }

      // Check if panning (Right click, Middle click, or Shift + Left click)
      const isPan = dragButton.current === 2 || dragButton.current === 1 || isShiftKey.current;

      if (isPan) {
        // Pan relative to current camera orientation
        camera.matrix.extractBasis(camRight, camUp, new THREE.Vector3());
        camRight.normalize();
        camUp.normalize();

        const panFactor = 0.02;
        targetPanOffset.current.addScaledVector(camRight, -dx * panFactor);
        targetPanOffset.current.addScaledVector(camUp, dy * panFactor);
      } else {
        // Orbit rotation (Yaw & Pitch)
        const rotSpeedX = 0.0055;
        const rotSpeedY = 0.0045;

        targetOrbitAngles.current.theta -= dx * rotSpeedX;
        targetOrbitAngles.current.phi = THREE.MathUtils.clamp(
          targetOrbitAngles.current.phi + dy * rotSpeedY,
          -Math.PI * 0.44,
          Math.PI * 0.44
        );

        // Record velocity for release momentum
        velocity.current.theta = -dx * rotSpeedX * 0.8;
        velocity.current.phi = dy * rotSpeedY * 0.8;
      }
    };

    const handlePointerUp = () => {
      isPointerDown.current = false;
      dom.style.cursor = "grab";
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".overflow-y-auto, [data-scrollable='true']")) {
        return;
      }

      const zoomStep = e.deltaY * 0.008;
      targetUserZoom.current = THREE.MathUtils.clamp(
        targetUserZoom.current + zoomStep,
        -5.0,
        35.0
      );
    };

    // Double-click to reset free camera back to overview
    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".pointer-events-auto, [data-scrollable='true']")) {
        return;
      }
      targetOrbitAngles.current = { theta: 0, phi: 0 };
      targetPanOffset.current.set(0, 0, 0);
      targetUserZoom.current = 0;
      velocity.current = { theta: 0, phi: 0 };
      flightVelocity.current.set(0, 0, 0);
    };

    dom.style.cursor = "grab";
    dom.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("dblclick", handleDblClick);

    return () => {
      dom.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("dblclick", handleDblClick);
    };
  }, [gl, camera]);

  useFrame((state, delta) => {
    const { pointer } = state;
    const keys = activeKeys.current;

    const isThirdPerson =
      viewPerspective === "thirdPerson" &&
      !selectedProjectId &&
      !selectedStarSystemId;

    // 1. WASD & Arrow Key Flight Propulsion Physics (Active in Free Orbit mode)
    if (!isThirdPerson && keys.size > 0) {
      camera.getWorldDirection(camForward);
      camRight.crossVectors(camForward, camera.up).normalize();
      camUp.copy(camera.up).normalize();

      moveDir.set(0, 0, 0);

      // Forward / Backward along POV look direction
      if (keys.has("KeyW") || keys.has("ArrowUp")) moveDir.add(camForward);
      if (keys.has("KeyS") || keys.has("ArrowDown")) moveDir.sub(camForward);

      // Strafe Left / Right
      if (keys.has("KeyD") || keys.has("ArrowRight")) moveDir.add(camRight);
      if (keys.has("KeyA") || keys.has("ArrowLeft")) moveDir.sub(camRight);

      // Ascend / Descend
      if (keys.has("Space") || keys.has("KeyE")) moveDir.add(camUp);
      if (keys.has("KeyQ") || keys.has("KeyC")) moveDir.sub(camUp);

      // Shift key engages Turbo Hyperspace Boost
      const isBoosting = keys.has("ShiftLeft") || keys.has("ShiftRight");

      if (moveDir.lengthSq() > 0) {
        moveDir.normalize();
        const thrustSpeed = isBoosting ? 160.0 : 70.0;
        flightVelocity.current.addScaledVector(moveDir, delta * thrustSpeed);
      }
    }

    // Apply flight inertia translation to camera target pan (in Free Orbit mode)
    if (!isThirdPerson && flightVelocity.current.lengthSq() > 0.0001) {
      targetPanOffset.current.addScaledVector(flightVelocity.current, delta);
      flightVelocity.current.multiplyScalar(0.92); // Smooth zero-g space drag
    }

    // Apply inertia momentum decay when pointer is released
    if (!isPointerDown.current) {
      if (
        Math.abs(velocity.current.theta) > 0.0001 ||
        Math.abs(velocity.current.phi) > 0.0001
      ) {
        targetOrbitAngles.current.theta += velocity.current.theta;
        targetOrbitAngles.current.phi = THREE.MathUtils.clamp(
          targetOrbitAngles.current.phi + velocity.current.phi,
          -Math.PI * 0.44,
          Math.PI * 0.44
        );
        velocity.current.theta *= 0.92;
        velocity.current.phi *= 0.92;
      }
    }

    // Subtle mouse parallax offset
    const parallaxX = pointer.x * 0.25;
    const parallaxY = pointer.y * 0.15;

    // Aspect-ratio adaptive framing
    const aspect = state.viewport.aspect;
    const aspectScale = aspect < 1.6 ? Math.min(1.4, 1.6 / Math.max(aspect, 0.75)) : 1.0;

    // Smooth exponential interpolation
    const rotDamp = 1 - Math.exp(-delta * 9);
    currentOrbitAngles.current.theta = THREE.MathUtils.lerp(
      currentOrbitAngles.current.theta,
      targetOrbitAngles.current.theta,
      rotDamp
    );
    currentOrbitAngles.current.phi = THREE.MathUtils.lerp(
      currentOrbitAngles.current.phi,
      targetOrbitAngles.current.phi,
      rotDamp
    );

    const panDamp = 1 - Math.exp(-delta * 14);
    currentPanOffset.current.lerp(targetPanOffset.current, panDamp);

    const zoomDamp = 1 - Math.exp(-delta * 8);
    currentUserZoom.current = THREE.MathUtils.lerp(
      currentUserZoom.current,
      targetUserZoom.current,
      zoomDamp
    );

    if (isThirdPerson) {
      // Third-Person Perspective (TPP) Chase Camera following Robot Player
      const robotX = playerPos[0];
      const robotY = playerPos[1];
      const robotZ = playerPos[2];

      const lookTargetX = robotX;
      const lookTargetY = robotY + 0.85;
      const lookTargetZ = robotZ;

      // Chase distance zoomable via scroll wheel
      const chaseDistance = THREE.MathUtils.clamp(6.8 + currentUserZoom.current, 3.5, 22.0);

      // Orbit angles around player
      const chaseTheta = currentOrbitAngles.current.theta;
      const chasePhi = THREE.MathUtils.clamp(
        0.22 + currentOrbitAngles.current.phi,
        -Math.PI * 0.35,
        Math.PI * 0.42
      );

      const targetCamX =
        lookTargetX + chaseDistance * Math.cos(chasePhi) * Math.sin(chaseTheta) + parallaxX;
      const targetCamY =
        lookTargetY + chaseDistance * Math.sin(chasePhi) + parallaxY;
      const targetCamZ =
        lookTargetZ + chaseDistance * Math.cos(chasePhi) * Math.cos(chaseTheta);

      tempCamPos.set(targetCamX, targetCamY, targetCamZ);

      // Fast, responsive chase interpolation for smooth flight feel
      const posLerp = 1 - Math.exp(-delta * 9.5);
      camera.position.lerp(tempCamPos, posLerp);

      const rotLerp = 1 - Math.exp(-delta * 12.0);
      currentLookAt.current.lerp(new THREE.Vector3(lookTargetX, lookTargetY, lookTargetZ), rotLerp);
      camera.lookAt(currentLookAt.current);
    } else {
      // Calculate dynamic camera center & position in Free Orbit Mode
      tempBaseTarget.set(...cameraTarget.target);
      tempCenter.copy(tempBaseTarget).add(currentPanOffset.current);

      tempBasePos.set(
        cameraTarget.position[0],
        cameraTarget.position[1],
        cameraTarget.position[2] * aspectScale
      );

      const relVec = tempBasePos.clone().sub(tempBaseTarget);
      const baseRadius = relVec.length();
      const effectiveRadius = Math.max(baseRadius + currentUserZoom.current, 1.2);

      const baseTheta = Math.atan2(relVec.x, relVec.z);
      const basePhi = Math.asin(
        THREE.MathUtils.clamp(relVec.y / Math.max(baseRadius, 0.001), -0.999, 0.999)
      );

      const finalTheta = baseTheta + currentOrbitAngles.current.theta;
      const finalPhi = THREE.MathUtils.clamp(
        basePhi + currentOrbitAngles.current.phi,
        -Math.PI * 0.44,
        Math.PI * 0.44
      );

      tempCamPos.set(
        tempCenter.x + effectiveRadius * Math.cos(finalPhi) * Math.sin(finalTheta) + parallaxX,
        tempCenter.y + effectiveRadius * Math.sin(finalPhi) + parallaxY,
        tempCenter.z + effectiveRadius * Math.cos(finalPhi) * Math.cos(finalTheta)
      );

      const posLerp = 1 - Math.exp(-delta * 6);
      camera.position.lerp(tempCamPos, posLerp);

      const rotLerp = 1 - Math.exp(-delta * 7);
      currentLookAt.current.lerp(tempCenter, rotLerp);
      camera.lookAt(currentLookAt.current);
    }

    // Update Telemetry
    const fps = Math.round(1 / Math.max(delta, 0.001));
    setTelemetry({
      fps,
      camPos: [
        Number(camera.position.x.toFixed(2)),
        Number(camera.position.y.toFixed(2)),
        Number(camera.position.z.toFixed(2)),
      ],
    });
  });

  return null;
}