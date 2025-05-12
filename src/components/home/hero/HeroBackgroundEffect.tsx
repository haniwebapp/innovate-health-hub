
import React from "react";
import {
  FloatingParticles,
  GeneticLetters,
  MedicalIcons,
  DNAPattern,
  GradientOrbs,
  CircuitPattern,
  CellAnimation,
  HeartbeatGraph,
  PulseCircles,
  MedicalCrossEffect,
  MicroscopeView
} from "./background";

export function HeroBackgroundEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* DNA pattern overlays */}
      <DNAPattern />
      
      {/* Digital health circuit pattern */}
      <CircuitPattern />
      
      {/* Bottom fade-out gradient */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* DNA genetic code letters */}
      <GeneticLetters />
      
      {/* Animated medical icons */}
      <MedicalIcons />
      
      {/* Gradient orbs */}
      <GradientOrbs />
      
      {/* Cell division animation */}
      <CellAnimation />
      
      {/* Medical cross pulse */}
      <MedicalCrossEffect />
      
      {/* Microscope view animation */}
      <MicroscopeView />
      
      {/* Heartbeat line animation */}
      <HeartbeatGraph />
      
      {/* Pulse circles */}
      <PulseCircles />
    </div>
  );
}
