
import React from "react";

export function DNAPattern() {
  return (
    <>
      {/* DNA pattern overlay - increased opacity */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.12] bg-repeat"></div>
      
      {/* Animated DNA double helix - increased opacity */}
      <div className="absolute inset-0 bg-[url('/dna-pattern-circle.svg')] opacity-[0.12] bg-repeat-y bg-center"></div>
    </>
  );
}
