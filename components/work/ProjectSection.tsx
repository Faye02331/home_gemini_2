import { Project } from "@/constants/portfolio";
import clockImage from "@/assets/work/clock.png";

interface ProjectSectionProps {
  project: Project;
  index: number;
}

export function ProjectSection({ project, index }: ProjectSectionProps) {
  const isEven = index % 2 === 0;
  const projectNumber = String(index + 1).padStart(2, '0');
  const backgroundWord = project.title.split(' ')[0];

  return (
    <section className="h-screen relative flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.05 }}
      >
        <span className="font-display text-[20vw] font-bold tracking-tighter whitespace-nowrap">
          {backgroundWord}
        </span>
      </div>

      <div className={`relative z-10 w-full h-full flex items-center px-8 md:px-16 lg:px-24 ${
        isEven ? 'flex-row' : 'flex-row-reverse'
      }`}>
        <div className={`flex-1 flex flex-col ${isEven ? 'items-start' : 'items-end text-right'}`}>
          <span className="text-xs tracking-[0.3em] text-white/50 mb-4">
            {projectNumber}/PROJECT
          </span>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
            {project.title}
          </h2>
          
          <p className="text-sm tracking-[0.2em] text-white/60 mb-8">
            {project.category}
          </p>
          
          <button className="group relative px-6 py-3 text-xs tracking-[0.2em] border border-white/30 hover:border-white transition-colors">
            VIEW CASE
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-square">
            <img 
              src={clockImage} 
              alt={project.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
