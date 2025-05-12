
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useSequences } from "../hooks/useSequences";

export function AISequences() {
  // AI symbols and binary sequences
  const aiSymbols = ['01', '10', '00', '11', '{AI}', '{}', '<>', '[]'];
  // Generate sequences for AI animations
  const aiSequences = useSequences(12, aiSymbols);
  
  return (
    <>
      {/* AI sequence flowing animations */}
      {aiSequences.map((sequence, index) => (
        <motion.div
          key={`ai-${index}`}
          className="absolute hidden md:flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${sequence.x}%`,
            top: `${sequence.y}%`,
            fontSize: `${sequence.size}px`,
            opacity: sequence.opacity,
            color: 'rgba(195, 168, 107, 0.6)',
          }}
          initial={{ 
            y: sequence.direction > 0 ? -100 : 100 
          }}
          animate={{
            y: sequence.direction > 0 ? "100vh" : "-100vh",
          }}
          transition={{
            duration: sequence.duration,
            repeat: Infinity,
            delay: sequence.delay,
            ease: "linear",
          }}
        >
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-1 rounded-md">
            <BrainCircuit className="mr-1 opacity-70" size={sequence.size} strokeWidth={1} />
            <span>{sequence.symbol}</span>
          </div>
        </motion.div>
      ))}
    </>
  );
}
