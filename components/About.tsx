
import React from 'react';
import mePhoto from '@/assets/work/me.jpg';
import polyuPhoto from '@/assets/work/polyu.png';
import bjfuPhoto from '@/assets/work/bjfu.png';

const AboutSection: React.FC<{ 
  title: string; 
  subtitle?: React.ReactNode; 
  children: React.ReactNode; 
}> = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full border-b border-white/5 last:border-0">
      {/* Sticky Left Column */}
      <div className="md:w-2/5 lg:w-1/3 p-8 md:p-16 lg:p-24 relative">
        <div className="md:sticky md:top-24 flex flex-col gap-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight uppercase">
            {title}
          </h2>
          {subtitle && (
            <div className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-sm">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Scrolling Right Column */}
      <div className="md:w-3/5 lg:w-2/3 p-8 md:p-16 lg:p-24 flex flex-col gap-16">
        {children}
      </div>
    </div>
  );
};

const ExperienceCard: React.FC<{ date: string; title: string; location: string }> = ({ date, title, location }) => (
  <div className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col gap-3 group hover:bg-[#222222] transition-colors border border-white/5">
    <span className="text-xs font-medium text-[#00E676] tracking-wider uppercase">{date}</span>
    <h3 className="text-2xl md:text-3xl font-light text-white">{title}</h3>
    <div className="flex items-center gap-2 text-sm text-gray-400 font-light">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
      {location}
    </div>
  </div>
);

const Tag: React.FC<{ children: string }> = ({ children }) => (
  <div className="px-6 py-2 rounded-full border border-white/20 text-sm font-light text-gray-300 hover:border-white/50 transition-colors whitespace-nowrap">
    {children}
  </div>
);

const SkillIcon: React.FC<{ name: string; iconUrl?: string; className?: string }> = ({ name, iconUrl, className }) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className={`w-20 h-32 md:w-24 md:h-40 rounded-2xl bg-[#141414] border border-white/5 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-300 ${className}`}>
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="w-full h-auto opacity-80 group-hover:opacity-100" />
      ) : (
        <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse" />
      )}
    </div>
    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      {name}
    </span>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="w-full bg-black text-white animate-in fade-in duration-1000">
      {/* 1. Intro Section */}
      <AboutSection 
        title="About Me" 
        subtitle={
          <p>
            I am a UI/UX designer, product designer, AI product manager, and Vibe coding practitioner. 
            I am passionate about using art to convey information and creating designs with warmth. 
            I am also a trendsetter in AI, eager to embrace it and put it into practice. 
            
          </p>
        }
      >
        {/* Profile Image Area */}
        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
          <img 
            src={mePhoto} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 flex flex-col gap-3">
             <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full inline-block self-start border border-white/10">
               <span className="text-sm">你好</span>
             </div>
             <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full inline-block border border-white/10">
               <span className="text-sm font-light">My name is 詹璐菲</span>
             </div>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-3">
          <Tag>China</Tag>
          <Tag>ESTP</Tag>
          <Tag>Aries</Tag>
          <Tag>Hongkong</Tag>
          <Tag>Mandarin, English</Tag>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          <ExperienceCard date="2025.02 - 2025.08" title="UI/UX Designer" location="Hong Kong Generative AI Research & Development Center" />
          <ExperienceCard date="2024.04 - 2024.07" title="User Researcher" location="Beijing NetEase, Inc" />
          <ExperienceCard date="2023.09 - 2023.12" title="User Research & Operations" location="Beijing MOMO, Inc" />
        </div>
      </AboutSection>

      {/* 2. Education Section */}
      <AboutSection title="Education">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6 group">
            <h3 className="text-2xl md:text-3xl font-light text-gray-200">Hong Kong Polytechnic University</h3>
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-gray-800">
               <img src={polyuPhoto} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="HKPU"/>
               <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-white/50">check</span>
               </div>
            </div>
            <p className="text-gray-500 font-light">Main course: Product Design, Programming, Virtual and Augmented Reality， Procedural Content Generation</p>
          </div>

          <div className="flex flex-col gap-6 group">
            <h3 className="text-2xl md:text-3xl font-light text-gray-200">Beijing Forestry University</h3>
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-gray-800">
               <img src={bjfuPhoto} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="BFU"/>
            </div>
            <p className="text-gray-500 font-light">Main course: Preliminary Design, Color Basics, Space Design</p>
          </div>
        </div>
      </AboutSection>

      {/* 3. Skills Section */}
      <AboutSection title="Skills">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 max-w-2xl">
          <SkillIcon name="Figma" iconUrl="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" />
          <SkillIcon name="Sketch" iconUrl="https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg" />
          <SkillIcon name="Photoshop" iconUrl="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" />
          <SkillIcon name="Illustrator" iconUrl="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" />
          <SkillIcon name="Unity" iconUrl="https://upload.wikimedia.org/wikipedia/commons/c/c4/Unity_2021.svg" className="invert" />
          <SkillIcon name="VS Code" iconUrl="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" />
          <SkillIcon name="Unreal" iconUrl="https://upload.wikimedia.org/wikipedia/commons/1/14/Unreal_Engine_Logo.svg" className="invert" />
          <SkillIcon name="After Effects" iconUrl="https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" />
        </div>
      </AboutSection>
    </div>
  );
};

export default About;
