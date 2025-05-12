
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SparkleEffects() {
  return (
    <>
      {/* Sparkle icon animations */}
      <motion.div
        className="absolute top-1/4 left-1/5 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.7, 1, 0.7],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="text-moh-gold/30 w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/5 hidden lg:block"
        animate={{
          y: [10, -10, 10],
          opacity: [0.7, 1, 0.7],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        <Sparkles className="text-moh-green/30 w-6 h-6" />
      </motion.div>

      {/* Additional sparkle for more effect */}
      <motion.div
        className="absolute top-2/3 left-1/3 hidden lg:block"
        animate={{
          y: [-5, 8, -5],
          opacity: [0.6, 0.9, 0.6],
          scale: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="text-moh-gold/20 w-5 h-5" />
      </motion.div>
    </>
  );
}
