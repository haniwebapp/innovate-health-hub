
import { GradientBlobs } from "./animations/GradientBlobs";
import { FloatingOrbs } from "./animations/FloatingOrbs";
import { BackgroundParticles } from "./animations/BackgroundParticles";
import { SparkleIcons } from "./animations/SparkleIcons";
import { AnimatedPulseRings } from "./animations/PulseRings";
import { GradientOverlay } from "./animations/GradientOverlay";

export function HeroDecorations() {
  return (
    <>
      {/* Bottom gradient overlay */}
      <GradientOverlay />
      
      {/* Main gradient blobs */}
      <GradientBlobs />
      
      {/* Secondary floating orbs */}
      <FloatingOrbs />
      
      {/* Background particles */}
      <BackgroundParticles />
      
      {/* Sparkle icon animations */}
      <SparkleIcons />
      
      {/* Pulse rings */}
      <AnimatedPulseRings />
    </>
  );
}
