'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/app/providers';

function AudioWaveform({ isLight }: { isLight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  // We memoize the base positions to calculate waves without cumulative errors
  const basePositions = useMemo(() => {
    const geom = new THREE.PlaneGeometry(60, 60, 80, 80);
    return new Float32Array(geom.attributes.position.array);
  }, []);

  useFrame((state, delta) => {
    if (geomRef.current) {
      const positions = geomRef.current.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime * 1.5; // Speed of the wave
      
      // Update each vertex to create rolling audio waves
      for (let i = 0; i < positions.length; i += 3) {
        const x = basePositions[i];
        const y = basePositions[i + 1];
        
        // Complex wave math simulating overlapping frequencies (bass, mid, treble)
        const bass = Math.sin(x * 0.2 + time) * 1.5;
        const mid = Math.cos(y * 0.3 + time * 1.2) * 0.8;
        const treble = Math.sin((x * y) * 0.05 - time * 2) * 0.3;
        
        // Z is the 3rd component (height of the wave)
        positions[i + 2] = bass + mid + treble;
      }
      
      geomRef.current.attributes.position.needsUpdate = true;
    }
    
    if (meshRef.current) {
      // Gently map mouse scroll to grid tilt for interactivity
      const scrollY = window.scrollY;
      const targetRotationX = -Math.PI / 2 + 0.3 + (scrollY * 0.0005);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, delta * 3);
      // Very slow infinite spin
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2 + 0.3, 0, 0]} position={[0, -6, -15]}>
      <planeGeometry ref={geomRef} args={[60, 60, 80, 80]} />
      <meshBasicMaterial 
        wireframe
        color={isLight ? "#0284C7" : "#00f3ff"}
        transparent
        opacity={isLight ? 0.4 : 0.15}
      />
    </mesh>
  );
}

function AudioWaveformAccent({ isLight }: { isLight: boolean }) {
  const geomRef = useRef<THREE.PlaneGeometry>(null);
  
  const basePositions = useMemo(() => {
    const geom = new THREE.PlaneGeometry(60, 60, 60, 60);
    return new Float32Array(geom.attributes.position.array);
  }, []);

  useFrame((state) => {
    if (geomRef.current) {
      const positions = geomRef.current.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime * 1.5; 
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = basePositions[i];
        const y = basePositions[i + 1];
        
        const bass = Math.sin(x * 0.2 + time) * 1.5;
        const mid = Math.cos(y * 0.3 + time * 1.2) * 0.8;
        const treble = Math.sin((x * y) * 0.05 - time * 2) * 0.3;
        
        // This accent layer is slightly lower and out of phase
        positions[i + 2] = (bass + mid + treble) - 1.5;
      }
      geomRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2 + 0.3, 0, 0]} position={[0, -6, -15]}>
      <planeGeometry ref={geomRef} args={[60, 60, 60, 60]} />
      <meshBasicMaterial 
        wireframe
        color={isLight ? "#E11D48" : "#ff00ea"}
        transparent
        opacity={isLight ? 0.3 : 0.25}
      />
    </mesh>
  );
}

export default function BackgroundModel() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-90 mix-blend-normal dark:mix-blend-screen">
      <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
        <fog attach="fog" args={[isLight ? '#FFFFFF' : '#030014', 10, 35]} />
        
        <AudioWaveform isLight={isLight} />
        <AudioWaveformAccent isLight={isLight} />
        
      </Canvas>
    </div>
  );
}
