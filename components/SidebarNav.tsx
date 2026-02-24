
import React from 'react';

type Section = 'home' | 'about' | 'work' | 'contact';

interface SidebarNavProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  invert?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeSection, setActiveSection, invert = false }) => {
  const sections: Section[] = ['home', 'about', 'work', 'contact'];

  const textColorClass = invert ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-700';
  const activeColorClass = invert ? 'text-white' : 'text-black';
  const barBgClass = invert ? 'bg-white/20' : 'bg-gray-200';
  const activeBarBgClass = invert ? 'bg-white' : 'bg-black';

  return (
    <nav className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1.5 z-40">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 py-1 ${
            activeSection === section 
              ? `${activeColorClass} font-semibold translate-x-[-4px]` 
              : textColorClass
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}

      <div className="flex flex-col gap-1.5 mt-8 mr-1">
        {sections.map((section) => (
          <div
            key={`bar-${section}`}
            className={`transition-all duration-500 rounded-full ${
              activeSection === section
                ? `w-[2px] h-12 ${activeBarBgClass}`
                : `w-[1px] h-8 ${barBgClass}`
            }`}
          />
        ))}
      </div>
    </nav>
  );
};

export default SidebarNav;
