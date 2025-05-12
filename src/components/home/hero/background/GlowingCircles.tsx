
import { motion } from "framer-motion";

export function GlowingCircles() {
  return (
    <>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      
      {/* Animated glowing circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2 border-moh-green/10"
          style={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          initial={{ width: 50, height: 50, opacity: 0 }}
          animate={{ 
            width: [50, 500],
            height: [50, 500],
            opacity: [0.7, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut"
          }}
        />
      ))}
    </>
  );
}
