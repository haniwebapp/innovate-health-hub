
import { DNAHelixAnimations } from "./animations/DNAHelixAnimations";
import { DataStreamEffect } from "./animations/DataStreamEffect";
import { FloatingParticles } from "./animations/FloatingParticles";
import { GeneticLetters } from "./animations/GeneticLetters";
import { GradientOrbs } from "./animations/GradientOrbs";
import { MedicalIcons } from "./animations/MedicalIcons";
import { PulseRings } from "./animations/PulseRings";
import { Sparkles } from "./animations/Sparkles";
import { CircuitPattern } from "./animations/CircuitPattern";

export function HeroBackgroundEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* DNA pattern overlay */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.07] bg-repeat"></div>
      
      {/* Animated DNA double helix */}
      <div className="absolute inset-0 bg-[url('/dna-pattern-circle.svg')] opacity-[0.07] bg-repeat-y bg-center"></div>

      {/* Floating particles with improved effects */}
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      
      {/* DNA helix animations */}
      <DNAHelixAnimations />
      
      {/* Medical data stream effect */}
      <DataStreamEffect />
      
      {/* Animated pulse rings */}
      <PulseRings />
      
      {/* Medical sparkles effect */}
      <Sparkles />
    </div>
  );
}
