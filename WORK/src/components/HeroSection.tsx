import { motion } from "framer-motion";

interface HeroSectionProps {
  scrollProgress: number;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  // 当滚动进度超过0.6时开始淡出
  const opacity = scrollProgress > 0.6 ? Math.max(0, 1 - (scrollProgress - 0.6) / 0.2) : 1;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-between py-16 pointer-events-none z-10"
      style={{ opacity }}
    >
      {/* Top section - Name */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-hero font-display tracking-hero text-foreground">MY WORK</h1>
      </motion.div>
    </div>
  );
}

export default HeroSection;
