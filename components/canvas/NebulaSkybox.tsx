"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

export function NebulaSkybox() {
  const skyboxRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/nebula_skybox.glb");
  const nebulaTexture = useTexture("/models/nebula_8k.jpg");

  useEffect(() => {
    // 16x Anisotropic filtering + Linear sampling prevents any blurriness across 360 degree curvature
    nebulaTexture.colorSpace = THREE.SRGBColorSpace;
    nebulaTexture.anisotropy = 16;
    nebulaTexture.minFilter = THREE.LinearFilter;
    nebulaTexture.magFilter = THREE.LinearFilter;
    nebulaTexture.generateMipmaps = false;
    nebulaTexture.needsUpdate = true;

    scene.traverse((child) => {
      // Hide any cameras or extraneous lights baked into the asset
      if ((child as any).isCamera || (child as any).isLight) {
        child.visible = false;
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // MeshBasicMaterial ensures deep space nebular glow is never shadowed by scene point/directional lights
        const mat = new THREE.MeshBasicMaterial({
          map: nebulaTexture,
          side: THREE.BackSide,
          depthWrite: false,
          toneMapped: true,
        });
        mesh.material = mat;
      }
    });
  }, [scene, nebulaTexture]);

  // Gentle cosmic drift rotation
  useFrame((state, delta) => {
    if (skyboxRef.current) {
      // Majestic slow cosmic rotation
      skyboxRef.current.rotation.y += delta * 0.012;
      skyboxRef.current.rotation.x += delta * 0.004;

      // Keep skybox centered on camera position so user never travels out of the sphere
      skyboxRef.current.position.copy(state.camera.position);
    }
  });

  return (
    <>
      <group ref={skyboxRef}>
        <primitive object={scene} scale={0.7} />
      </group>
      {/* Pin-point crisp 3D deep space stars overlay for razor-sharp depth */}
      <Stars
        radius={80}
        depth={40}
        count={2500}
        factor={3.5}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </>
  );
}

useGLTF.preload("/models/nebula_skybox.glb");
useTexture.preload("/models/nebula_8k.jpg");
