import { useRef, useState, useEffect, useCallback } from 'react';
import RotatingCube from "@/components/RotatingCube";
import HeroSection from "@/components/HeroSection";
import NextSection from "@/components/NextSection";
import WireframeCube from "@/components/portfolio/WireframeCube";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBlackSectionActive, setIsBlackSectionActive] = useState(false);
  const [blackSectionProgress, setBlackSectionProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const blackSectionRef = useRef<HTMLDivElement>(null);

  // 处理黑色区域的滚动进度
  const handleBlackSectionScroll = useCallback((progress: number) => {
    setBlackSectionProgress(progress);
  }, []);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 当黑色区域完全展开且用户继续向下滚动时，切换到黑色区域内部滚动
      if (scrollProgress >= 1 && e.deltaY > 0) {
        setIsBlackSectionActive(true);
        return; // 不拦截事件，让黑色区域处理
      }
      
      // 当在黑色区域滚动且滚动到顶部向上滚动时，返回白色区域
      if (isBlackSectionActive && e.deltaY < 0) {
        const blackSection = blackSectionRef.current;
        if (blackSection && blackSection.scrollTop <= 0) {
          setIsBlackSectionActive(false);
          e.preventDefault();
          setScrollProgress(prev => Math.max(0, prev + e.deltaY * 0.0008));
          return;
        }
        return; // 让黑色区域继续处理向上滚动
      }
      
      // 如果黑色区域激活，不拦截事件
      if (isBlackSectionActive) {
        return;
      }
      
      // 白色区域的滚动控制
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

  // Auto-activate black section when fully visible
  useEffect(() => {
    if (scrollProgress >= 1 && !isBlackSectionActive) {
      setIsBlackSectionActive(true);
    }
  }, [scrollProgress, isBlackSectionActive]);

  // 计算黑色页面的位置 - 从scrollProgress 0.7开始从底部滑入
  const blackPageProgress = scrollProgress > 0.7 
    ? (scrollProgress - 0.7) / 0.3  // 0到1的进度
    : 0;

  // translateY: 100%（完全在底部）到 0%（完全覆盖）
  const blackPageTranslateY = (1 - blackPageProgress) * 100;

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Hero Section with Cube */}
      <div 
        className="relative h-screen bg-cube-background"
        style={{
          opacity: scrollProgress > 0.9 ? 1 - (scrollProgress - 0.9) / 0.1 : 1,
          transform: `translateY(${scrollProgress > 0.85 ? -(scrollProgress - 0.85) * 500 : 0}px)`,
          zIndex: 10
        }}
      >
        <HeroSection scrollProgress={scrollProgress} />
        <RotatingCube scrollProgress={scrollProgress} />
      </div>
      
{/* Next Section - 从底部滑入 */}
      <div 
        ref={blackSectionRef}
        className="fixed inset-x-0 bottom-0"
        style={{
          height: isBlackSectionActive ? '100vh' : '100vh',
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

      {/* 黑色背景层 - 在线框正方体之下 */}
      <div 
        className="fixed inset-0 bg-[#0a0a0a] pointer-events-none"
        style={{
          zIndex: 11,
          opacity: isBlackSectionActive ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* 线框正方体 - 固定在视口中央，在背景之上、内容之下 */}
      <WireframeCube 
        scrollProgress={blackSectionProgress} 
        opacity={isBlackSectionActive ? 1 : 0} 
      />
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-1 h-24 bg-border rounded-full overflow-hidden">
          <div 
            className="w-full bg-foreground rounded-full transition-all duration-150"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
