
import { motion } from "framer-motion";
import { Sparkle, Sparkles, Stethoscope, Pill, TestTube, Dna, Microscope, Syringe, CrossIcon } from "lucide-react";
import { useRandomPositions } from "../hooks/useRandomPositions";
import { cn } from "@/lib/utils";

export function SparkleEffects() {
  // Generate random positions for the medical effects
  const sparklePositions = useRandomPositions(15, { width: 100, height: 100 });

  return (
    <>
      {/* Medical Effect 1: Top left with green tint */}
      <motion.div
        className="absolute top-[10%] left-[15%] hidden lg:block"
        animate={{
          y: [-10, 5, -10],
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Stethoscope className="text-moh-green/40 w-6 h-6" />
      </motion.div>
      
      {/* Medical Effect 2: Top right with gold tint */}
      <motion.div
        className="absolute top-[12%] right-[20%] hidden lg:block"
        animate={{
          y: [5, -10, 5],
          opacity: [0.7, 1, 0.7],
          scale: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 0.5 }}
      >
        <Pill className="text-moh-gold/35 w-8 h-8" />
      </motion.div>

      {/* Medical Effect 3: Mid-left with mixed animation */}
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
        <Dna className="text-moh-darkGreen/30 w-5 h-5" />
      </motion.div>

      {/* Medical Effect 4: Bottom right with rotation */}
      <motion.div
        className="absolute bottom-[25%] right-[12%] hidden md:block"
        animate={{
          rotate: [0, 15, 0, -15, 0],
          opacity: [0.6, 0.9, 0.7, 0.9, 0.6],
          scale: [0.7, 1, 0.9, 1, 0.7],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <TestTube className="text-moh-darkGold/30 w-7 h-7" />
      </motion.div>

      {/* Medical Effect 5: Center-ish with subtle pulse */}
      <motion.div
        className="absolute top-[45%] right-[40%] hidden md:block"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.85, 1, 0.85],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Microscope className="text-moh-green/25 w-10 h-10" />
      </motion.div>

      {/* Medical Effect 6: Bottom left with unique path */}
      <motion.div
        className="absolute bottom-[15%] left-[25%] hidden md:block"
        animate={{
          y: [-5, 10, -5],
          x: [8, -8, 8],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1.5 }}
      >
        <Syringe className="text-moh-gold/40 w-5 h-5" />
      </motion.div>

      {/* Medical Effect 7: Upper-mid with slow animation */}
      <motion.div
        className="absolute top-[20%] left-[45%] hidden lg:block"
        animate={{
          y: [-12, 12, -12],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 3 }}
      >
        <CrossIcon className="text-moh-darkGreen/20 w-9 h-9 rotate-45" />
      </motion.div>

      {/* Medical Effect 8: Right side with custom animation */}
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
        <TestTube className="text-moh-darkGold/35 w-6 h-6" />
      </motion.div>
      
      {/* Medical Effect 9: Top center with pulse and rotation */}
      <motion.div
        className="absolute top-[8%] left-[50%] hidden md:block"
        animate={{
          rotate: [0, 360],
          opacity: [0.5, 0.8, 0.5],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2.2 }}
      >
        <Dna className="text-moh-green/30 w-7 h-7" />
      </motion.div>
      
      {/* Medical Effect 10: Bottom center with floating effect */}
      <motion.div
        className="absolute bottom-[10%] left-[45%] hidden lg:block"
        animate={{
          y: [-8, 8, -8],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.8 }}
      >
        <Pill className="text-moh-gold/25 w-8 h-8" />
      </motion.div>
      
      {/* Medical Effect 11: Mid right with bouncing effect */}
      <motion.div
        className="absolute top-[30%] right-[5%] hidden lg:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.9, 0.5],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.2 }}
      >
        <Stethoscope className="text-moh-darkGreen/35 w-5 h-5" />
      </motion.div>
      
      {/* Medical Effect 12: Lower left corner with fade in-out */}
      <motion.div
        className="absolute bottom-[5%] left-[8%] hidden md:block"
        animate={{
          opacity: [0.1, 0.6, 0.1],
          scale: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2.5 }}
      >
        <Syringe className="text-moh-darkGold/20 w-9 h-9" />
      </motion.div>
      
      {/* Medical Effect 13: Upper right corner with zigzag motion */}
      <motion.div
        className="absolute top-[15%] right-[8%] hidden md:block"
        animate={{
          y: [0, 10, -10, 0],
          x: [0, 10, -10, 0],
          opacity: [0.3, 0.7, 0.5, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 1.2 }}
      >
        <Microscope className="text-moh-green/30 w-6 h-6" />
      </motion.div>
      
      {/* Medical Effect 14: Mid left with spiral motion */}
      <motion.div
        className="absolute top-[50%] left-[15%] hidden md:block"
        animate={{
          rotate: [0, 720],
          opacity: [0.4, 0.8, 0.4],
          scale: [0.6, 1, 0.6],
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 0.5 }}
      >
        <CrossIcon className="text-moh-gold/25 w-8 h-8" />
      </motion.div>
      
      {/* Medical Effect 15: Bottom right corner with gentle pulse */}
      <motion.div
        className="absolute bottom-[18%] right-[25%] hidden md:block"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.8 }}
      >
        <TestTube className="text-moh-darkGreen/25 w-7 h-7" />
      </motion.div>

      {/* CSS-based animated medical icons for additional effect */}
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
      
      <div className="absolute top-[40%] right-[20%] hidden md:block">
        <div className={cn(
          "w-5 h-5 bg-moh-darkGold/10 rounded-full",
          "animate-pulse-soft animate-float"
        )} style={{ animationDelay: "2.3s" }} />
      </div>
    </>
  );
}
