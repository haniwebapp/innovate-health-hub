
import { motion } from "framer-motion";
import { Dna } from "lucide-react";
import { useSequences } from "../hooks/useSequences";

export function DNASequences() {
  // DNA genetic code letters
  const geneticLetters = ['A', 'T', 'G', 'C'];
  // Generate sequences for DNA animations
  const dnaSequences = useSequences(15, geneticLetters);
  
  return (
    <>
      {/* DNA sequence flowing animations */}
      {dnaSequences.map((sequence, index) => (
        <motion.div
          key={`dna-${index}`}
          className="absolute hidden md:flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${sequence.x}%`,
            top: `${sequence.y}%`,
            fontSize: `${sequence.size}px`,
            opacity: sequence.opacity,
            color: 'rgba(0, 129, 74, 0.6)',
          }}
          initial={{ x: sequence.direction > 0 ? -100 : 100 }}
          animate={{
            x: sequence.direction > 0 ? "100vw" : "-100vw",
          }}
          transition={{
            duration: sequence.duration,
            repeat: Infinity,
            delay: sequence.delay,
            ease: "linear",
          }}
        >
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-1 rounded-md">
            <Dna className="mr-1 opacity-70" size={sequence.size} strokeWidth={1} />
            <span>{sequence.symbol}</span>
          </div>
        </motion.div>
      ))}
    </>
  );
}
