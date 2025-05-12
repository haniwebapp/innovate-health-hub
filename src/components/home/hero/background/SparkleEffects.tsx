
import { motion } from "framer-motion";
import { Sparkle, Sparkles } from "lucide-react";
import { useRandomPositions } from "../hooks/useRandomPositions";
import { cn } from "@/lib/utils";

export function SparkleEffects() {
  // Generate random positions for the sparkles
  const sparklePositions = useRandomPositions(8, { width: 100, height: 100 });

  return (
    <>
      {/* Sparkle 1: Top left with green tint */}
      <motion.div
        className="absolute top-[10%] left-[15%] hidden lg:block"
        animate={{
          y: [-10, 5, -10],
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles className="text-moh-green/40 w-6 h-6" />
      </motion.div>
      
      {/* Sparkle 2: Top right with gold tint */}
      <motion.div
        className="absolute top-[12%] right-[20%] hidden lg:block"
        animate={{
          y: [5, -10, 5],
          opacity: [0.7, 1, 0.7],
          scale: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 0.5 }}
      >
        <Sparkles className="text-moh-gold/35 w-8 h-8" />
      </motion.div>

      {/* Sparkle 3: Mid-left with mixed animation */}
      <motion.div
        className="absolute top-[35%] left-[8%] hidden lg:block"
        animate={{
          y: [-8, 8, -8],
          x: [5, -5, 5],
          opacity: [0.5, 0.8, 0.5],
          scale: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 6.5, repeat: Infinity, delay: 1.2 }}
      >
        <Sparkle className="text-moh-darkGreen/30 w-5 h-5" />
      </motion.div>

      {/* Sparkle 4: Bottom right with rotation */}
      <motion.div
        className="absolute bottom-[25%] right-[12%] hidden md:block"
        animate={{
          rotate: [0, 15, 0, -15, 0],
          opacity: [0.6, 0.9, 0.7, 0.9, 0.6],
          scale: [0.7, 1, 0.9, 1, 0.7],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <Sparkles className="text-moh-darkGold/30 w-7 h-7" />
      </motion.div>

      {/* Sparkle 5: Center-ish with subtle pulse */}
      <motion.div
        className="absolute top-[45%] right-[40%] hidden md:block"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.85, 1, 0.85],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle className="text-moh-green/25 w-10 h-10" />
      </motion.div>

      {/* Sparkle 6: Bottom left with unique path */}
      <motion.div
        className="absolute bottom-[15%] left-[25%] hidden md:block"
        animate={{
          y: [-5, 10, -5],
          x: [8, -8, 8],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1.5 }}
      >
        <Sparkles className="text-moh-gold/40 w-5 h-5" />
      </motion.div>

      {/* Sparkle 7: Upper-mid with slow animation */}
      <motion.div
        className="absolute top-[20%] left-[45%] hidden lg:block"
        animate={{
          y: [-12, 12, -12],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 3 }}
      >
        <Sparkle className="text-moh-darkGreen/20 w-9 h-9 rotate-45" />
      </motion.div>

      {/* Sparkle 8: Right side with custom animation */}
      <motion.div
        className="absolute top-[60%] right-[10%] hidden lg:block"
        animate={{
          y: [0, -15, 0],
          x: [-5, 5, -5],
          opacity: [0.4, 0.7, 0.4],
          scale: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 7.5, repeat: Infinity, delay: 0.8 }}
      >
        <Sparkles className="text-moh-darkGold/35 w-6 h-6" />
      </motion.div>

      {/* CSS-based animated sparkles for additional effect */}
      <div className="absolute top-[15%] right-[35%] hidden md:block">
        <div className={cn(
          "w-4 h-4 bg-moh-gold/20 rounded-full",
          "animate-pulse-soft animate-float"
        )} />
      </div>
      
      <div className="absolute bottom-[35%] left-[18%] hidden md:block">
        <div className={cn(
          "w-3 h-3 bg-moh-green/15 rounded-full",
          "animate-pulse-soft"
        )} style={{ animationDelay: "1.5s" }} />
      </div>
    </>
  );
}
