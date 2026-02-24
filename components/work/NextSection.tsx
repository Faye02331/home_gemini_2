import { useEffect } from 'react';
import { PROJECTS } from "@/constants/portfolio";
import IntroSection from "@/components/work/IntroSection";
import ProjectSection from "@/components/work/ProjectSection";

interface NextSectionProps {
  isFullyVisible?: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  onScrollProgress?: (progress: number) => void;
}

export function NextSection({ isFullyVisible = false, scrollContainerRef, onScrollProgress }: NextSectionProps) {
  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      onScrollProgress?.(progress);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, onScrollProgress]);

  return (
    <div className="bg-transparent text-white relative">
      <div className="relative z-20">
        <IntroSection />
        
        {PROJECTS.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

export default NextSection;
