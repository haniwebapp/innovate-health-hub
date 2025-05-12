
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SparkleIcons() {
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
    </>
  );
}
