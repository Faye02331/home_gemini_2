interface ScrollIndicatorProps {
  currentIndex: number;
  total: number;
}

export function ScrollIndicator({ currentIndex, total }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-1 transition-all duration-300 ${
            index === currentIndex 
              ? 'h-12 bg-white' 
              : 'h-8 bg-white/10 hover:bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

export default ScrollIndicator;
