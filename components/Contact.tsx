
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center p-8 md:p-24 animate-in fade-in duration-1000">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">
        
        {/* Left Side: Typography & Email */}
        <div className="flex flex-col gap-12">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
            Let’s<br />work<br />together
          </h2>
          
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="rotate-45"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-light text-gray-300 hover:text-white transition-colors">
              13755594280@163.com
            </span>
          </div>
        </div>

        {/* Right Side: Form & Decorative Arrow */}
        <div className="flex flex-col items-end gap-6 relative">
          <div className="w-full">
            <textarea 
              placeholder="" 
              className="w-full h-64 bg-transparent border border-white/40 rounded-[2.5rem] p-8 text-xl font-light focus:outline-none focus:border-white transition-colors resize-none"
            ></textarea>
          </div>
          
          {/* Send Button */}
          <button className="bg-[#D1D1D1] hover:bg-white text-black px-10 py-3 rounded-2xl text-lg font-normal transition-all duration-300 active:scale-95">
            send
          </button>

          {/* Large Decorative Bottom Arrow */}
          <div className="absolute -bottom-48 right-0 opacity-100 hidden md:block pointer-events-none">
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              fill="none" 
              className="stroke-white stroke-[2]"
            >
              <line x1="20" y1="80" x2="80" y2="20" />
              <polyline points="40 20 80 20 80 60" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
