
import { motion } from "framer-motion";

export function DataStreamEffect() {
  return (
    <div className="absolute top-0 right-0 h-full w-1/4 overflow-hidden opacity-20 hidden lg:block">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`data-stream-${i}`}
          className="absolute h-1 rounded-full"
          style={{
            right: `${(i % 3) * 15}%`,
            top: `${i * 8}%`,
            width: `${Math.random() * 30 + 20}px`,
            backgroundColor: i % 2 === 0 ? 'rgba(0, 129, 74, 0.5)' : 'rgba(195, 168, 107, 0.5)',
          }}
          animate={{
            width: [20, 80, 20],
            opacity: [0.2, 0.6, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
