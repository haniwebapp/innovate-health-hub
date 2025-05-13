
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
import { useEffect, useState } from "react";

interface HeroBackgroundEffectProps {
  isInteracting?: boolean;
}

export function HeroBackgroundEffect({ isInteracting = false }: HeroBackgroundEffectProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for interactive effects
  useEffect(() => {
    if (!isInteracting) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInteracting]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* DNA pattern overlay */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.07] bg-repeat"></div>
      
      {/* Animated DNA double helix - with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-[url('/dna-pattern-circle.svg')] opacity-[0.07] bg-repeat-y bg-center"
        animate={isInteracting ? {
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01
        } : {}}
        transition={{ type: "spring", damping: 25, stiffness: 100 }}
      />

      {/* Enhanced floating particles with multi-shape variations */}
      <FloatingParticles interactionFactor={isInteracting ? 2 : 1} />

      {/* Animated genetic code letters */}
      <GeneticLetters />
      
      {/* Animated medical icons */}
      <MedicalIcons />

      {/* Enhanced gradient orbs */}
      <GradientOrbs mousePosition={isInteracting ? mousePosition : undefined} />
      
      {/* Digital health circuit pattern */}
      <CircuitPattern />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-white/10"
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: isInteracting ? [1, 1.05, 1] : [1, 1.02, 1]
        }}
        transition={{ 
          duration: isInteracting ? 4 : 8, 
          repeat: Infinity, 
          repeatType: "mirror" 
        }}
      />
      
      {/* DNA helix animations - enhanced with interaction */}
      <DNAHelixAnimations isInteracting={isInteracting} />
      
      {/* Medical data stream effect */}
      <DataStreamEffect speed={isInteracting ? "fast" : "normal"} />
      
      {/* Animated pulse rings */}
      <PulseRings position={isInteracting ? mousePosition : undefined} />
      
      {/* Medical sparkles effect */}
      <Sparkles density={isInteracting ? "high" : "normal"} />

      {/* Interactive wave animation */}
      <InteractiveWave mousePosition={isInteracting ? mousePosition : undefined} />
      
      {/* Glowing dots animation */}
      <GlowingDots intensity={isInteracting ? "high" : "normal"} />

      {/* Dynamic noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay"></div>
    </div>
  );
}
