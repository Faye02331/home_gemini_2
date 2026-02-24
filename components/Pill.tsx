
import React from 'react';

interface PillProps {
  children: React.ReactNode;
  variant?: 'white' | 'black' | 'outline' | 'shadow';
  className?: string;
}

const Pill: React.FC<PillProps> = ({ children, variant = 'white', className = '' }) => {
  // Slightly reduced padding (py-1.5/py-2 instead of py-2/py-3)
  const baseStyles = "inline-flex items-center justify-center px-5 py-1.5 md:px-7 md:py-2 rounded-full font-light whitespace-nowrap transition-all duration-300 text-[0.9em]";
  
  const variants = {
    white: "bg-white border border-black/10 text-black",
    black: "bg-black text-white px-7 md:px-9",
    outline: "border border-gray-400 text-gray-600",
    shadow: "bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-50",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Pill;
