import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import { FaceMaterial } from '@/components/work/FaceMaterial';
import { FaceContent, FaceIndex } from '@/types/cube';
import desktopVideo from '@/assets/work/desktop1.mp4';
import iphoneRecycleVideo from '@/assets/work/iPhone_recycle_1.mp4';
import petVideo from '@/assets/work/pet.mp4';
import tablegameVideo from '@/assets/work/tablegame.mp4';

const cubeContent: FaceContent[] = [
  { type: 'video', src: iphoneRecycleVideo, title: 'iPhone Recycle' },
  { type: 'video', src: tablegameVideo, title: 'Table Game' },
  { type: 'color', color: '#0f0f0f', title: 'Top Face' },
  { type: 'color', color: '#0f0f0f', title: 'Bottom Face' },
  { type: 'video', src: petVideo, title: 'Pet Video' },
  { type: 'video', src: desktopVideo, title: 'Desktop Demo' },
];

interface CubeProps {
  scrollProgress: number;
}

function Cube({ scrollProgress }: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    let targetScale = 1;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetPositionY = 0;
    
    if (scrollProgress < 0.1) {
      const scaleProgress = scrollProgress / 0.1;
      targetScale = 0.3 + scaleProgress * 0.7;
      targetRotationX = 0.3;
      targetRotationY = 0.3;
    } else if (scrollProgress < 0.15) {
      const normalizeProgress = (scrollProgress - 0.1) / 0.05;
      targetScale = 1;
      targetRotationX = 0.3 * (1 - normalizeProgress);
      targetRotationY = 0.3;
    } else if (scrollProgress < 0.7) {
      const rotateProgress = (scrollProgress - 0.15) / 0.55;
      targetScale = 1;
      targetRotationX = 0;
      
      const faceCount = 4;
      const currentFace = Math.floor(rotateProgress * faceCount);
      const faceProgress = (rotateProgress * faceCount) % 1;
      
      const easedProgress = faceProgress < 0.4 
        ? faceProgress / 0.4 * 0.3
        : 0.3 + (faceProgress - 0.4) / 0.6 * 0.7;
      
      const totalProgress = (currentFace + easedProgress) / faceCount;
      targetRotationY = totalProgress * Math.PI * 2;
    } else {
      const exitProgress = (scrollProgress - 0.7) / 0.3;
      targetScale = 1;
      targetRotationX = 0;
      targetRotationY = Math.PI * 2;
      targetPositionY = exitProgress * 8;
    }
    
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, targetRotationX, 0.08
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, targetRotationY, 0.08
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y, targetPositionY, 0.1
    );
  });

  return (
    <Box
      ref={meshRef}
      args={[2.2, 2.2, 2.2]}
      scale={0.3}
      rotation={[0.3, 0.3, 0]}
    >
      {cubeContent.map((content, index) => (
        <FaceMaterial 
          key={index} 
          content={content} 
          faceIndex={index as FaceIndex} 
        />
      ))}
    </Box>
  );
}

function CubeFallback() {
  return (
    <Box args={[2.2, 2.2, 2.2]} scale={0.3} rotation={[0.4, 0.4, 0]}>
      <meshStandardMaterial color="#1a1a1a" />
    </Box>
  );
}

interface RotatingCubeProps {
  scrollProgress: number;
}

export function RotatingCube({ scrollProgress }: RotatingCubeProps) {
  return (
    <div className="w-full h-screen" style={{ backgroundColor: '#f8f8f8' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <Suspense fallback={<CubeFallback />}>
          <Cube scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RotatingCube;
