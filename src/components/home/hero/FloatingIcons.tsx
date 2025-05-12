
import { motion } from "framer-motion";
import { Dna, Atom } from "lucide-react";

export function FloatingIcons() {
  // DNA icon animation
  const dnaIconAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [0.8, 1.2, 1],
      opacity: [0, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <>
      {/* Floating DNA icon */}
      <motion.div
        className="absolute top-24 left-8 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={dnaIconAnimation.animate}
      >
        <Dna className="text-moh-green/30" size={36} strokeWidth={1} />
      </motion.div>
      
      {/* Floating Atom icon */}
      <motion.div
        className="absolute top-28 right-14 hidden md:block"
        initial={dnaIconAnimation.initial}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0, 0.7, 0],
          rotate: [0, 360],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }}
      >
        <Atom className="text-moh-gold/30" size={32} strokeWidth={1} />
      </motion.div>
    </>
  );
}
