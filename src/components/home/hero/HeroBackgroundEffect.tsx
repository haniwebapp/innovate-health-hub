
import { DNAHelixAnimations } from "./animations/DNAHelixAnimations";
import { DataStreamEffect } from "./animations/DataStreamEffect";
import { FloatingParticles } from "./animations/FloatingParticles";
import { GeneticLetters } from "./animations/GeneticLetters";
import { GradientOrbs } from "./animations/GradientOrbs";
import { MedicalIcons } from "./animations/MedicalIcons";
import { PulseRings } from "./animations/PulseRings";
import { Sparkles } from "./animations/Sparkles";
import { CircuitPattern } from "./animations/CircuitPattern";
import { InteractiveWave } from "./animations/InteractiveWave";
import { GlowingDots } from "./animations/GlowingDots";
import { motion } from "framer-motion";

export function HeroBackgroundEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* DNA pattern overlay */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.07] bg-repeat"></div>
      
      {/* Animated DNA double helix */}
      <div className="absolute inset-0 bg-[url('/dna-pattern-circle.svg')] opacity-[0.07] bg-repeat-y bg-center"></div>

      {/* Enhanced floating particles with multi-shape variations */}
      <FloatingParticles />

      {/* Animated genetic code letters */}
      <GeneticLetters />
      
      {/* 50 Animated medical icons */}
      <MedicalIcons />

      {/* Enhanced gradient orbs */}
      <GradientOrbs />
      
      {/* Digital health circuit pattern */}
      <CircuitPattern />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-white/10"
        animate={{ 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "mirror" 
        }}
      />
      
      {/* DNA helix animations */}
      <DNAHelixAnimations />
      
      {/* Medical data stream effect */}
      <DataStreamEffect />
      
      {/* Animated pulse rings */}
      <PulseRings />
      
      {/* Medical sparkles effect */}
      <Sparkles />

      {/* New wave animations */}
      <InteractiveWave />
      
      {/* Glowing dots animation */}
      <GlowingDots />

      {/* Dynamic noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay"></div>
    </div>
  );
}
