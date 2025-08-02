import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import FocusCamera from './components/FocusCamera';
import Navbar from './components/Navbar';
import SolarSystem from './systems/SolarSystem';
import InfoPanel from './components/InfoPanel'; 

export default function App() {
  const cameraRef = useRef();
  const orbitControlsRef = useRef();
  const [activePlanet, setActivePlanet] = useState(null);

  const planetRefs = {
    earth: useRef(),
    venus: useRef(),
    jupiter: useRef(),
    mars: useRef(), 
    saturn: useRef(),
    uranus: useRef(),
  };

  return (
    <>
      <Navbar
        cameraRef={cameraRef}
        planetRefs={planetRefs}
        setActivePlanet={setActivePlanet}
      />
      
      
      <InfoPanel activePlanet={activePlanet} setActivePlanet={setActivePlanet} />

      <Canvas camera={{ position: [0, 20, 50], fov: 45 }}>
        <Suspense fallback={null}>
          <FocusCamera ref={cameraRef} orbitControlsRef={orbitControlsRef} />
          
          <SolarSystem planetRefs={planetRefs} />
        </Suspense>
        <OrbitControls ref={orbitControlsRef} />
      </Canvas>
    </>
  );
}
