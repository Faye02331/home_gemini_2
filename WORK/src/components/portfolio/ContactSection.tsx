export function ContactSection() {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-8 relative">
      <div className="text-center">
        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12">
          LET'S TALK
        </h2>
        
        <a 
          href="mailto:hello@faye.studio" 
          className="text-lg md:text-xl tracking-wider text-white/80 hover:text-white transition-colors"
        >
          hello@faye.studio
        </a>
        
        <div className="flex items-center justify-center gap-8 mt-12">
          <a 
            href="#" 
            className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            X
          </a>
          <a 
            href="#" 
            className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            IG
          </a>
          <a 
            href="#" 
            className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            BE
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs tracking-[0.2em] text-white/40">
          © 2025 FAYE PORTFOLIO
        </p>
      </div>
    </section>
  );
}

export default ContactSection;
