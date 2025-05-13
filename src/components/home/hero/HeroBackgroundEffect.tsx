
import { GradientBlobs } from "./animations/GradientBlobs";
import { GradientOrbs } from "./animations/GradientOrbs";
import { BackgroundParticles } from "./animations/BackgroundParticles";
import { FloatingParticles } from "./animations/FloatingParticles";
import { GeneticLetters } from "./animations/GeneticLetters";
import { DNAHelixAnimations } from "./animations/DNAHelixAnimations";
import { DataStreamEffect } from "./animations/DataStreamEffect";
import { PulseRings } from "./animations/PulseRings";
import { SparkleIcons } from "./animations/SparkleIcons";
import { MedicalIcons } from "./animations/MedicalIcons";

export function HeroBackgroundEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient blobs */}
      <GradientBlobs />
      
      {/* Large gradient orbs */}
      <GradientOrbs />
      
      {/* Animated particles */}
      <BackgroundParticles />
      
      {/* Floating colored particles */}
      <FloatingParticles />
      
      {/* DNA-based letter animations */}
      <GeneticLetters />
      
      {/* DNA helix visual elements */}
      <DNAHelixAnimations />
      
      {/* Data stream effect for tech feel */}
      <DataStreamEffect />
      
      {/* Pulse rings animation */}
      <PulseRings />
      
      {/* Sparkling icon animations */}
      <SparkleIcons />
      
      {/* Medical themed icons */}
      <MedicalIcons />
    </div>
  );
}
