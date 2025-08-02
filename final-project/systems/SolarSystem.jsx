import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const randomAngle = () => Math.random() * Math.PI * 2;


const Planet = React.forwardRef(({ radius, texture, children, ...props }, ref) => {
  return (
    <group ref={ref} {...props}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial map={texture || null} color={texture ? 'white' : '#cccccc'} />
      </mesh>
      {children}
    </group>
  );
});

export default function SolarSystem({ planetRefs }) {

  const [
    sunTex, mercuryTex, venusTex, earthTex, marsTex, jupiterTex, saturnTex, saturnRingTex, uranusTex, neptuneTex
  ] = useTexture([
    '/textures/2k_sun.jpg', '/textures/8k_mercury.jpg', '/textures/8k_venus_surface.jpg',
    '/textures/2k_earth_daymap.jpg', '/textures/8k_mars.jpg', '/textures/8k_jupiter.jpg',
    '/textures/8k_saturn.jpg', '/textures/8k_saturn_ring_alpha.png','/textures/2k_uranus.jpg',
    '/textures/2k_neptune.jpg'
  ]);

  const cubeTextures = new THREE.CubeTextureLoader().load([
    '/textures/cubeMap/nx.png', '/textures/cubeMap/ny.png', '/textures/cubeMap/nz.png',
    '/textures/cubeMap/px.png', '/textures/cubeMap/py.png', '/textures/cubeMap/pz.png'
  ]);

  const localRefs = {
    mercury: planetRefs?.mercury || useRef(),
    venus:   planetRefs?.venus   || useRef(),
    earth:   planetRefs?.earth   || useRef(),
    mars:    planetRefs?.mars    || useRef(),
    jupiter: planetRefs?.jupiter || useRef(),
    saturn:  planetRefs?.saturn  || useRef(),
    uranus:  planetRefs?.uranus  || useRef(),
    neptune: useRef(),
  };

  const angles = useRef({
    a1: randomAngle(), a2: randomAngle(), a3: randomAngle(), a4: randomAngle(),
    a5: randomAngle(), a6: randomAngle(), a7: randomAngle(), a8: randomAngle(),
  });

  useFrame(() => {
    angles.current = {
      a1: angles.current.a1 + 0.005,
      a2: angles.current.a2 + 0.002,
      a3: angles.current.a3 + 0.0017,
      a4: angles.current.a4 + 0.0009,
      a5: angles.current.a5 + 0.00014,
      a6: angles.current.a6 + 0.000057,
      a7: angles.current.a7 + 0.00002,
      a8: angles.current.a8 + 0.00001,
    };

    const orbits = {
      mercury: [25, 24.75, angles.current.a1], venus:   [33, 32.75, angles.current.a2],
      earth:   [42, 41.75, angles.current.a3], mars:    [52, 51.75, angles.current.a4],
      jupiter: [75, 74.5,  angles.current.a5], saturn:  [97, 96.5,  angles.current.a6],
      uranus:  [117, 116.7, angles.current.a7], neptune: [137, 136.7, angles.current.a8],
    };

    Object.entries(orbits).forEach(([name, [rx, rz, angle]]) => {
      const mesh = localRefs[name]?.current;
      if (mesh) {
        mesh.position.x = rx * Math.cos(angle);
        mesh.position.z = rz * Math.sin(angle);
      }
    });
  });

  return (
    <>
      <primitive attach="background" object={cubeTextures} />
      
      <pointLight position={[0, 0, 0]} intensity={10000} />
      <ambientLight intensity={0.8} />

      <mesh>
        <sphereGeometry args={[20, 128, 128]} />
        <meshStandardMaterial map={sunTex} emissive={0xffff00} emissiveIntensity={0.2} />
      </mesh>

      <Planet ref={localRefs.mercury} radius={0.07} texture={mercuryTex} />
      <Planet ref={localRefs.venus} radius={0.17} texture={venusTex} />
      <Planet ref={localRefs.earth} radius={0.18} texture={earthTex} />
      <Planet ref={localRefs.mars} radius={0.10} texture={marsTex} />
      <Planet ref={localRefs.jupiter} radius={2.01} texture={jupiterTex} />
    
      <Planet ref={localRefs.saturn} radius={1.67} texture={saturnTex}>
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[2.6, 3, 512]} />
          <meshStandardMaterial map={saturnRingTex} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      </Planet>
      
      <Planet ref={localRefs.uranus} radius={0.73} texture={uranusTex} />
      <Planet ref={localRefs.neptune} radius={0.71} texture={neptuneTex} />
    </>
  );
}
