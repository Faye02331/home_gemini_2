import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import { FaceMaterial } from '@/components/FaceMaterial';
import { FaceContent, FaceIndex } from '@/types/cube';
import desktopVideo from '@/assets/desktop1.mp4';
import iphoneRecycleVideo from '@/assets/iPhone_recycle_1.mp4';
import petVideo from '@/assets/pet.mp4';
import tablegameVideo from '@/assets/tablegame.mp4';

// Configure content for each face
// You can add more images/videos here as you upload them
const cubeContent: FaceContent[] = [
  { type: 'video', src: iphoneRecycleVideo, title: 'iPhone Recycle' },  // 0: Right - iPhone recycle video
  { type: 'video', src: tablegameVideo, title: 'Table Game' },          // 1: Left - 桌游视频
  { type: 'color', color: '#0f0f0f', title: 'Top Face' },               // 2: Top
  { type: 'color', color: '#0f0f0f', title: 'Bottom Face' },            // 3: Bottom
  { type: 'video', src: petVideo, title: 'Pet Video' },                 // 4: Front - pet video
  { type: 'video', src: desktopVideo, title: 'Desktop Demo' },          // 5: Back - desktop video
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
      // 阶段1: 缩放 + 保持初始倾斜
      const scaleProgress = scrollProgress / 0.1;
      targetScale = 0.3 + scaleProgress * 0.7;
      targetRotationX = 0.3;  // 轻微倾斜展示立体感
      targetRotationY = 0.3;
    } else if (scrollProgress < 0.15) {
      // 阶段2: 归正准备
      const normalizeProgress = (scrollProgress - 0.1) / 0.05;
      targetScale = 1;
      targetRotationX = 0.3 * (1 - normalizeProgress);  // 归零
      targetRotationY = 0.3;
    } else if (scrollProgress < 0.7) {
      // 阶段3: Y轴水平旋转展示四个侧面
      const rotateProgress = (scrollProgress - 0.15) / 0.55;
      targetScale = 1;
      targetRotationX = 0;  // X轴固定
      
      // 分4段，每段展示一个面，带停顿效果
      const faceCount = 4;
      const currentFace = Math.floor(rotateProgress * faceCount);
      const faceProgress = (rotateProgress * faceCount) % 1;
      
      // 停顿效果：前40%慢，后60%快
      const easedProgress = faceProgress < 0.4 
        ? faceProgress / 0.4 * 0.3
        : 0.3 + (faceProgress - 0.4) / 0.6 * 0.7;
      
      const totalProgress = (currentFace + easedProgress) / faceCount;
      targetRotationY = totalProgress * Math.PI * 2;  // 360度
    } else {
      // 阶段4: 退出
      const exitProgress = (scrollProgress - 0.7) / 0.3;
      targetScale = 1;
      targetRotationX = 0;
      targetRotationY = Math.PI * 2;
      targetPositionY = exitProgress * 8;
    }
    
    // 平滑插值
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

// Loading fallback for textures
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
    <div className="w-full h-screen bg-cube-background">
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
