import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RotatingWireframeCubeProps {
  scrollProgress: number;
}

const RotatingWireframeCube: React.FC<RotatingWireframeCubeProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame((state) => {
    if (meshRef.current && edgesRef.current) {
      const rotationSpeed = 8;
      const targetRotationX = scrollProgress * Math.PI * rotationSpeed;
      const targetRotationY = scrollProgress * Math.PI * rotationSpeed * 0.5;
      
      meshRef.current.rotation.x = targetRotationX;
      meshRef.current.rotation.y = targetRotationY;
      edgesRef.current.rotation.x = targetRotationX;
      edgesRef.current.rotation.y = targetRotationY;
      
      const floatY = Math.sin(state.clock.getElapsedTime()) * 0.1;
      meshRef.current.position.y = floatY;
      edgesRef.current.position.y = floatY;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edges}>
        <lineBasicMaterial color="#ffffff" linewidth={1} />
      </lineSegments>
    </group>
  );
};

interface WireframeCubeProps {
  scrollProgress: number;
  opacity?: number;
}

export const WireframeCube: React.FC<WireframeCubeProps> = ({ scrollProgress, opacity = 1 }) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 12,
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight 
          position={[-10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
        />
        <RotatingWireframeCube scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default WireframeCube;
