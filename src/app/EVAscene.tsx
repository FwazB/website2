"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Box } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function EVAmodel() {
  const { scene, animations } = useGLTF("/EVA.gltf");
  const { actions } = useAnimations(animations, scene);

  if (actions && Object.keys(actions).length > 0) {
    const action = actions[Object.keys(actions)[0]];
    if (action) action.play();
  }

  return <primitive object={scene} scale={1} />;
}

function Navbar3D() {
  return (
    <Box args={[5, 0.5, 0.2]} position={[0, 3, 0]} castShadow>
      <meshStandardMaterial color="blue" />
    </Box>
  );
}

export default function EVAscene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 60 }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Navbar3D />
        <EVAmodel />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
