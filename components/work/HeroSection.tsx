import { motion } from "framer-motion";

interface HeroSectionProps {
  scrollProgress: number;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const opacity = scrollProgress > 0.6 ? Math.max(0, 1 - (scrollProgress - 0.6) / 0.2) : 1;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-between py-16 pointer-events-none z-10"
      style={{ opacity }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1
          className="font-display font-semibold leading-none tracking-tight text-gray-950"
          style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
        >
          MY WORK
        </h1>
      </motion.div>
    </div>
  );
}

export default HeroSection;
