import { useState, useEffect } from 'react';
import { PROJECTS } from "@/constants/portfolio";
import IntroSection from "@/components/portfolio/IntroSection";
import ScrollIndicator from "@/components/portfolio/ScrollIndicator";
import ProjectSection from "@/components/ProjectSection";

interface NextSectionProps {
  isFullyVisible?: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  onScrollProgress?: (progress: number) => void;
}

export function NextSection({ isFullyVisible = false, scrollContainerRef, onScrollProgress }: NextSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const sectionHeight = window.innerHeight;
      
      // 计算局部滚动进度（用于线框正方体）
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      onScrollProgress?.(progress);
      
      // Skip intro section for indicator
      const adjustedScroll = Math.max(0, scrollTop - sectionHeight);
      const index = Math.floor(adjustedScroll / sectionHeight);
      setCurrentIndex(Math.min(index, PROJECTS.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, onScrollProgress]);

  return (
    <div className="bg-transparent text-white relative">
      {/* 主要内容 */}
      <div className="relative z-20">
        {/* Intro Section */}
        <IntroSection />
        
        {/* Project Sections */}
        {PROJECTS.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
      
      {/* Scroll Indicator - only show in project sections */}
      {isFullyVisible && (
        <ScrollIndicator 
          currentIndex={currentIndex} 
          total={PROJECTS.length} 
        />
      )}
    </div>
  );
}

export default NextSection;
