
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { useSequences } from "../hooks/useSequences";

export function MedicalSequences() {
  // Medical terms and symbols
  const medicalSymbols = ['+', 'Rx', 'Hz', 'mg', 'DNA', 'RNA'];
  // Generate sequences for medical animations
  const medicalSequences = useSequences(10, medicalSymbols);
  
  return (
    <>
      {/* Medical sequence flowing animations */}
      {medicalSequences.map((sequence, index) => (
        <motion.div
          key={`med-${index}`}
          className="absolute hidden md:flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${sequence.x}%`,
            top: `${sequence.y}%`,
            fontSize: `${sequence.size}px`,
            opacity: sequence.opacity,
            color: sequence.direction > 0 ? 'rgba(0, 129, 74, 0.6)' : 'rgba(195, 168, 107, 0.6)',
          }}
          initial={{ 
            x: sequence.direction > 0 ? -100 : 100,
            y: sequence.direction > 0 ? -50 : 50
          }}
          animate={{
            x: sequence.direction > 0 ? "100vw" : "-100vw",
            y: sequence.direction > 0 ? "50vh" : "-50vh"
          }}
          transition={{
            duration: sequence.duration,
            repeat: Infinity,
            delay: sequence.delay,
            ease: "linear",
          }}
        >
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-1 rounded-md">
            <Stethoscope className="mr-1 opacity-70" size={sequence.size} strokeWidth={1} />
            <span>{sequence.symbol}</span>
          </div>
        </motion.div>
      ))}
    </>
  );
}
