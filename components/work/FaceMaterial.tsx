import { useTexture, useVideoTexture } from '@react-three/drei';
import { FaceContent, FaceIndex } from '@/types/cube';

interface FaceMaterialProps {
  content: FaceContent;
  faceIndex: FaceIndex;
}

function ImageMaterial({ src, faceIndex }: { src: string; faceIndex: FaceIndex }) {
  const texture = useTexture(src);
  return (
    <meshBasicMaterial 
      attach={`material-${faceIndex}`} 
      map={texture} 
      toneMapped={false}
    />
  );
}

function VideoMaterial({ src, faceIndex }: { src: string; faceIndex: FaceIndex }) {
  const videoTexture = useVideoTexture(src, {
    loop: true,
    muted: true,
    start: true,
  });
  return (
    <meshBasicMaterial 
      attach={`material-${faceIndex}`} 
      map={videoTexture} 
      toneMapped={false}
    />
  );
}

function ColorMaterial({ color, faceIndex }: { color: string; faceIndex: FaceIndex }) {
  return (
    <meshStandardMaterial 
      attach={`material-${faceIndex}`} 
      color={color} 
      metalness={0.15} 
      roughness={0.7} 
    />
  );
}

export function FaceMaterial({ content, faceIndex }: FaceMaterialProps) {
  if (content.type === 'image' && content.src) {
    return <ImageMaterial src={content.src} faceIndex={faceIndex} />;
  }
  
  if (content.type === 'video' && content.src) {
    return <VideoMaterial src={content.src} faceIndex={faceIndex} />;
  }
  
  return <ColorMaterial color={content.color || '#0f0f0f'} faceIndex={faceIndex} />;
}

export default FaceMaterial;
