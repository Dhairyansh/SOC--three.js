import { useFrame } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three';


const HOME_POSITION = new THREE.Vector3(0, 20, 50);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);

const FocusCamera = forwardRef(({ orbitControlsRef }, ref) => {
  const focusObject = useRef(null);
  
  const isReturningHome = useRef(false);

  useImperativeHandle(ref, () => ({
    
    focusOn: (objectToFocus) => {
      focusObject.current = objectToFocus;
      isReturningHome.current = false; 
    },
    
    clearFocus: () => {
      focusObject.current = null; 
      isReturningHome.current = true; 
    },
  }));

  useFrame((state) => {
    const speed = 0.08;

    if (focusObject.current) {
     
      const targetPosition = new THREE.Vector3();
      focusObject.current.getWorldPosition(targetPosition);

      const objectSize = new THREE.Box3().setFromObject(focusObject.current).getBoundingSphere(new THREE.Sphere()).radius;
      const baseDistance = 4;
      const sizeFactor = 2;
      const cameraDistance = baseDistance + (objectSize * sizeFactor);

      const desiredCameraPos = new THREE.Vector3(
        targetPosition.x,
        targetPosition.y + 1,
        targetPosition.z + cameraDistance
      );

      
      state.camera.position.lerp(desiredCameraPos, speed);
      if (orbitControlsRef.current) {
        orbitControlsRef.current.target.lerp(targetPosition, speed);
        orbitControlsRef.current.update();
      }

    } else if (isReturningHome.current) {
      
      state.camera.position.lerp(HOME_POSITION, speed);
      
      if (orbitControlsRef.current) {
        orbitControlsRef.current.target.lerp(HOME_TARGET, speed);
        orbitControlsRef.current.update();
      }

      
      const distanceToHome = state.camera.position.distanceTo(HOME_POSITION);
      if (distanceToHome < 0.1) {
       
        isReturningHome.current = false; 
        state.camera.position.copy(HOME_POSITION);
        if (orbitControlsRef.current) {
            orbitControlsRef.current.target.copy(HOME_TARGET);
        }
      }
    }
    
  });

  return null;
});

export default FocusCamera;
