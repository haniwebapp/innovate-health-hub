
import { motion } from "framer-motion";
import { Dna, Atom } from "lucide-react";
import { 
  BackgroundGradients, 
  FloatingParticles, 
  DNASequences, 
  AISequences, 
  MedicalSequences,
  PulseRings
} from "./decorations";

export function HeroDecorations() {
  return (
    <>
      {/* Background gradients and floating orbs */}
      <BackgroundGradients />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* DNA sequence animations */}
      <DNASequences />
      
      {/* AI sequence animations */}
      <AISequences />
      
      {/* Medical sequence animations */}
      <MedicalSequences />
      
      {/* Pulse rings */}
      <PulseRings />
    </>
  );
}
