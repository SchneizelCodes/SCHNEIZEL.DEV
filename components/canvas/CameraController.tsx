"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";

const tempTargetPos = new THREE.Vector3();
const tempLookAt = new THREE.Vector3();

export function CameraController() {
  const cameraTarget = useCommandCenterStore((state) => state.cameraTarget);
  const setTelemetry = useCommandCenterStore((state) => state.setTelemetry);

  // Maintain persistent vector for smooth camera rotation/swivel
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const { camera, pointer } = state;

    // 1. Mouse parallax offset
    const parallaxX = pointer.x * 0.4;
    const parallaxY = pointer.y * 0.25;

    // 2. Target Camera Position
    tempTargetPos.set(
      cameraTarget.position[0] + parallaxX,
      cameraTarget.position[1] + parallaxY,
      cameraTarget.position[2]
    );

    // 3. Punchier, buttery-smooth exponential camera translation
    const posLerp = 1 - Math.exp(-delta * 5);
    camera.position.lerp(tempTargetPos, posLerp);

    // 4. Smooth look-at swivel (rotates the camera smoothly toward the pod)
    tempLookAt.set(...cameraTarget.target);
    const rotLerp = 1 - Math.exp(-delta * 6);
    currentLookAt.current.lerp(tempLookAt, rotLerp);
    camera.lookAt(currentLookAt.current);

    // 5. Update Telemetry
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