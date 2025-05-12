
import { 
  FloatingParticles, 
  GeneticLetters, 
  GeneticIcons, 
  BackgroundPatterns,
  GradientOrbs,
  GlowingCircles,
  SparkleEffects
} from './background';

export function HeroBackgroundEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background patterns (DNA pattern, circuit patterns) */}
      <BackgroundPatterns />
      
      {/* Moving particles */}
      <FloatingParticles />
      
      {/* Genetic code letters (A, T, G, C) */}
      <GeneticLetters />
      
      {/* Icons (DNA, Atom, etc) */}
      <GeneticIcons />
      
      {/* Gradient orbs/blobs */}
      <GradientOrbs />
      
      {/* Glowing circles and overlays */}
      <GlowingCircles />
      
      {/* Enhanced sparkle effects (8 different sparkles) */}
      <SparkleEffects />
    </div>
  );
}
