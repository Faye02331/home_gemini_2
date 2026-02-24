export function IntroSection() {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-8 relative">
      <div className="text-center">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
          <span className="block">REDEFINING</span>
          <span className="block">DIGITAL</span>
          <span 
            className="block"
            style={{
              WebkitTextStroke: '2px white',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SPACE
          </span>
        </h1>
        <p className="mt-12 text-sm md:text-base tracking-[0.3em] text-white/60 uppercase">
          Scroll down to explore
        </p>
      </div>
    </section>
  );
}

export default IntroSection;
