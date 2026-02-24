
import React from 'react';

interface HeaderProps {
  invert?: boolean;
}

const Header: React.FC<HeaderProps> = ({ invert = false }) => {
  const textColorClass = invert ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-50';

  return (
    <header className="fixed top-8 right-8 z-50">
      <button className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${textColorClass}`}>
        <span className="text-xs font-medium uppercase tracking-wider">En</span>
        <span className="material-symbols-outlined text-[18px]">expand_more</span>
      </button>
    </header>
  );
};

export default Header;
