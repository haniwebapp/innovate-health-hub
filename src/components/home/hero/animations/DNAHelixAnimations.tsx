
import { motion } from "framer-motion";

export function DNAHelixAnimations() {
  return (
    <div className="absolute h-full w-1/3 left-10 opacity-10 overflow-hidden hidden lg:block">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dna-strand-${i}`}
          className="absolute w-12 h-2 bg-moh-green/30 rounded-full"
          style={{
            left: i % 2 === 0 ? '0%' : '33%',
            top: `${i * 12}%`,
          }}
          animate={{
            x: i % 2 === 0 ? [0, 40, 0] : [0, -40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
