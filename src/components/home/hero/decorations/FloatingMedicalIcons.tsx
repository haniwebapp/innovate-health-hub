
import { motion } from "framer-motion";
import React from "react";
import { Heart, Stethoscope, Pill, Microscope, Dna, HeartPulse, Syringe } from "lucide-react";

export function FloatingMedicalIcons() {
  // Medical icons for floating animations
  const medicalIcons = [
    { Icon: Heart, position: { top: '22%', left: '18%' }, size: 24, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: Stethoscope, position: { top: '65%', right: '25%' }, size: 28, color: 'rgba(195, 168, 107, 0.6)' },
    { Icon: Pill, position: { top: '35%', right: '15%' }, size: 26, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: Syringe, position: { top: '70%', left: '22%' }, size: 24, color: 'rgba(195, 168, 107, 0.6)' },
    { Icon: Microscope, position: { top: '20%', right: '30%' }, size: 30, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: HeartPulse, position: { top: '50%', left: '28%' }, size: 26, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: Dna, position: { top: '40%', right: '20%' }, size: 28, color: 'rgba(195, 168, 107, 0.6)' }
  ];

  return (
    <>
      {/* Animated Medical Icons */}
      {medicalIcons.map((item, index) => (
        <motion.div 
          key={`medical-icon-${index}`}
          className="absolute md:block" 
          style={{
            ...item.position,
            color: item.color,
          }}
          animate={{
            y: [-5, 5, -5],
            rotate: [-3, 3, -3],
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <item.Icon size={item.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </>
  );
}
