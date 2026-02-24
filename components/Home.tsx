
import React from 'react';
import Pill from './Pill';
import { Cover } from './ui/cover';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-6 md:gap-8 max-w-5xl w-full animate-in fade-in duration-1000">
      {/* Sidebar Info (Timeline only, Avatar removed) */}
      <div className="hidden lg:flex fixed left-12 top-1/4 flex-col items-start">
        <div className="text-[9px] text-gray-400 font-light tracking-[0.2em]">
          2020 - PRESENT
        </div>
      </div>

      {/* Main Hero Content */}
      <section className="flex flex-col gap-4 md:gap-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-relaxed">
        <div className="flex items-center gap-x-3 md:gap-x-4 flex-wrap gap-y-2">
          <span className="text-gray-900">Hi! I’m</span>
          <Pill variant="white" className="min-w-[120px] md:min-w-[150px] shadow-sm">Faye</Pill>
        </div>

        <div className="flex items-center gap-x-3 md:gap-x-4 flex-wrap gap-y-2">
          <span>a</span>
          <Cover className="font-normal">UX Designer</Cover>
          <span className="font-normal text-gray-400">from</span>
          <Pill variant="outline">China</Pill>
        </div>

        <div className="flex items-center gap-x-4 md:gap-x-8 font-chinese mt-2 flex-wrap gap-y-2">
          <span className="text-gray-800">你好，我是</span>
          <Pill variant="shadow" className="px-8 md:px-12">詹璐菲</Pill>
        </div>
      </section>
    </div>
  );
};

export default Home;
