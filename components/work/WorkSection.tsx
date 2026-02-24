import { useRef, useState, useEffect, useCallback } from 'react';
import RotatingCube from "@/components/work/RotatingCube";
import HeroSection from "@/components/work/HeroSection";
import NextSection from "@/components/work/NextSection";
import WireframeCube from "@/components/work/WireframeCube";

const WorkSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBlackSectionActive, setIsBlackSectionActive] = useState(false);
  const [blackSectionProgress, setBlackSectionProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const blackSectionRef = useRef<HTMLDivElement>(null);

  const handleBlackSectionScroll = useCallback((progress: number) => {
    setBlackSectionProgress(progress);
  }, []);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollProgress >= 1 && e.deltaY > 0) {
        setIsBlackSectionActive(true);
        return;
      }
      
      if (isBlackSectionActive && e.deltaY < 0) {
        const blackSection = blackSectionRef.current;
        if (blackSection && blackSection.scrollTop <= 0) {
          setIsBlackSectionActive(false);
          e.preventDefault();
          setScrollProgress(prev => Math.max(0, prev + e.deltaY * 0.0008));
          return;
        }
        return;
      }
      
      if (isBlackSectionActive) {
        return;
      }
      
      e.preventDefault();
      setScrollProgress(prev => {
        const delta = e.deltaY * 0.0008;
        const newProgress = Math.max(0, Math.min(1, prev + delta));
        return newProgress;
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [scrollProgress, isBlackSectionActive]);

  useEffect(() => {
    if (scrollProgress >= 1 && !isBlackSectionActive) {
      setIsBlackSectionActive(true);
    }
  }, [scrollProgress, isBlackSectionActive]);

  const blackPageProgress = scrollProgress > 0.7 
    ? (scrollProgress - 0.7) / 0.3
    : 0;

  const blackPageTranslateY = (1 - blackPageProgress) * 100;

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden h-screen"
    >
      {/* Hero Section with Cube */}
      <div 
        className="relative h-screen"
        style={{
          opacity: scrollProgress > 0.9 ? 1 - (scrollProgress - 0.9) / 0.1 : 1,
          transform: `translateY(${scrollProgress > 0.85 ? -(scrollProgress - 0.85) * 500 : 0}px)`,
          zIndex: 10
        }}
      >
        <HeroSection scrollProgress={scrollProgress} />
        <RotatingCube scrollProgress={scrollProgress} />
      </div>
      
      {/* Next Section - slides up from bottom */}
      <div 
        ref={blackSectionRef}
        className="fixed inset-x-0 bottom-0"
        style={{
          height: '100vh',
          transform: `translateY(${blackPageTranslateY}%)`,
          transition: 'transform 0.3s ease-out',
          willChange: 'transform',
          zIndex: 15,
          pointerEvents: blackPageProgress > 0 ? 'auto' : 'none',
          overflowY: isBlackSectionActive ? 'auto' : 'hidden',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <NextSection 
          isFullyVisible={isBlackSectionActive} 
          scrollContainerRef={blackSectionRef}
          onScrollProgress={handleBlackSectionScroll}
        />
      </div>

      {/* Black background layer behind wireframe cube */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 11,
          backgroundColor: '#0a0a0a',
          opacity: isBlackSectionActive ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Wireframe cube - fixed center, above background, below content */}
      <WireframeCube 
        scrollProgress={blackSectionProgress} 
        opacity={isBlackSectionActive ? 1 : 0} 
      />
    </div>
  );
};

export default WorkSection;
