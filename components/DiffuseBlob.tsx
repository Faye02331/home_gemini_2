
import React, { useId } from 'react';

// ============================================
// Configuration Parameters
// ============================================
export interface BlobConfig {
  width: number;
  height: number;
  blur: number;
  opacity: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}

const DEFAULT_BLOBS: BlobConfig[] = [
  {
    width: 450,
    height: 350,
    blur: 90,
    opacity: 0.15, // Reduced opacity for a more subtle background
    initialX: 20,
    initialY: 20,
    duration: 15,
    delay: 0,
  },
  {
    width: 400,
    height: 300,
    blur: 110,
    opacity: 0.12,
    initialX: 60,
    initialY: 40,
    duration: 18,
    delay: 2,
  },
  {
    width: 500,
    height: 400,
    blur: 100,
    opacity: 0.1,
    initialX: 30,
    initialY: 60,
    duration: 20,
    delay: 4,
  },
];

export interface GrainConfig {
  baseFrequency: number;
  numOctaves: number;
}

const DEFAULT_GRAIN: GrainConfig = {
  baseFrequency: 0.65,
  numOctaves: 3,
};

// ============================================
// Single Blob Component
// ============================================
function Blob({ config, index }: { config: BlobConfig; index: number }) {
  const animationName = `blob-move-${index}`;

  return (
    <>
      <style>
        {`
          @keyframes ${animationName} {
            0% {
              transform: translate(0, 0) scale(1) rotate(0deg);
              border-radius: 50% 50% 40% 60%;
            }
            25% {
              transform: translate(${80 + index * 20}px, ${40 + index * 15}px) scale(1.08) rotate(${15 + index * 5}deg);
              border-radius: 40% 60% 50% 50%;
            }
            50% {
              transform: translate(${-40 - index * 10}px, ${100 + index * 20}px) scale(0.95) rotate(${-10 - index * 3}deg);
              border-radius: 60% 40% 60% 40%;
            }
            75% {
              transform: translate(${60 + index * 15}px, ${-30 - index * 10}px) scale(1.05) rotate(${8 + index * 4}deg);
              border-radius: 45% 55% 45% 55%;
            }
            100% {
              transform: translate(0, 0) scale(1) rotate(0deg);
              border-radius: 50% 50% 40% 60%;
            }
          }
        `}
      </style>
      <div
        className="absolute rounded-full bg-black pointer-events-none"
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          filter: `blur(${config.blur}px)`,
          opacity: config.opacity,
          left: `${config.initialX}%`,
          top: `${config.initialY}%`,
          animation: `${animationName} ${config.duration}s infinite alternate ease-in-out`,
          animationDelay: `${config.delay}s`,
          willChange: "transform",
        }}
      />
    </>
  );
}

// ============================================
// Grainy Filter
// ============================================
function GrainFilter({ id, config }: { id: string; config: GrainConfig }) {
  return (
    <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true">
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={config.baseFrequency}
          numOctaves={config.numOctaves}
          stitchTiles="stitch"
        />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
        <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
      </filter>
    </svg>
  );
}

// ============================================
// Main DiffuseBlob Component
// ============================================
interface DiffuseBlobProps {
  blobs?: BlobConfig[];
  grain?: GrainConfig;
  single?: boolean;
}

export default function DiffuseBlob({
  blobs = DEFAULT_BLOBS,
  grain = DEFAULT_GRAIN,
  single = false,
}: DiffuseBlobProps) {
  const filterId = useId().replace(/:/g, "");
  const displayBlobs = single ? [blobs[0]] : blobs;

  return (
    <div className="fixed inset-0 h-screen w-full overflow-hidden bg-white pointer-events-none -z-10">
      <GrainFilter id={`grainy-filter-${filterId}`} config={grain} />
      <div
        className="relative h-full w-full"
        style={{ filter: `url(#grainy-filter-${filterId})` }}
      >
        {displayBlobs.map((config, index) => (
          <Blob key={index} config={config} index={index} />
        ))}
      </div>
    </div>
  );
}
