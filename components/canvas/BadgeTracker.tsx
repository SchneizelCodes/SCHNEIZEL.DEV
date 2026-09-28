"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS } from "@/data/projects";
import { useBadgeStore } from "@/store/useBadgeStore";

const tempVec = new THREE.Vector3();

export function BadgeTracker() {
  const setBadgePosition = useBadgeStore((state) => state.setBadgePosition);

  useFrame((state) => {
    const { camera, size } = state;
    const t = state.clock.getElapsedTime();

    PROJECTS.forEach((project, index) => {
      // Calculate 3D position including the zero-g floating bob
      tempVec.set(
        project.spatialPosition[0],
        project.spatialPosition[1] + Math.sin(t * 1.6 + index * 1.5) * 0.1 - 0.75,
        project.spatialPosition[2]
      );

      // Project 3D vector to Normalized Device Coordinates (-1 to +1)
      tempVec.project(camera);

      // Check if pod is in front of the camera
      const isVisible = tempVec.z < 1;

      // Convert to screen pixels
      const x = (tempVec.x * 0.5 + 0.5) * size.width;
      const y = (-tempVec.y * 0.5 + 0.5) * size.height;

      setBadgePosition(project.id, { x, y, visible: isVisible });
    });
  });

  return null;
}