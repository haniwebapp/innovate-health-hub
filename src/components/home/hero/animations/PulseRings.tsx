
import { motion } from "framer-motion";

export function PulseRings() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`pulse-ring-${i}`}
          className="absolute hidden lg:block"
          style={{
            top: `${15 + (i * 25)}%`,
            left: `${20 + (i * 20)}%`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
        >
          {[...Array(3)].map((_, j) => (
            <motion.div
              key={`ring-${i}-${j}`}
              className="absolute rounded-full border-2"
              style={{
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                borderColor: i % 2 === 0 ? 'rgba(0, 129, 74, 0.3)' : 'rgba(195, 168, 107, 0.3)',
              }}
              animate={{
                scale: [1, 4],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: j * 1 + i * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      ))}
    </>
  );
}
