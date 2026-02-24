
import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40 opacity-70">
      <div className="w-[14px] h-[60px] border border-gray-200 rounded-full flex justify-center p-1.5 overflow-hidden">
        <div className="w-[4px] h-[12px] bg-black rounded-full animate-bounce"></div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium whitespace-nowrap">
        scroll to explore
      </span>
    </div>
  );
};

export default ScrollIndicator;
