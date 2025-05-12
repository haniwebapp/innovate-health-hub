
import { motion } from "framer-motion";
import { Dna, Atom, TestTube, Microscope, Pill, Syringe, Stethoscope, Hospital, Cross, Briefcase, Biohazard, HeartPulse } from "lucide-react";
import { useMemo } from "react";

export function MedicalIcons() {
  // Medical icons with positions - 50 different effects
  const medicalEffects = useMemo(() => [
    // DNA icons
    { Icon: Dna, x: 15, y: 20, size: 24, color: 'rgba(0, 129, 74, 0.2)', duration: 18, rotation: true },
    { Icon: Dna, x: 45, y: 30, size: 20, color: 'rgba(0, 129, 74, 0.15)', duration: 25, rotation: false },
    { Icon: Dna, x: 75, y: 15, size: 16, color: 'rgba(0, 129, 74, 0.25)', duration: 22, rotation: true },
    { Icon: Dna, x: 10, y: 85, size: 28, color: 'rgba(0, 129, 74, 0.18)', duration: 20, rotation: false },
    { Icon: Dna, x: 90, y: 40, size: 18, color: 'rgba(0, 129, 74, 0.22)', duration: 19, rotation: true },
    
    // Atom icons
    { Icon: Atom, x: 80, y: 35, size: 30, color: 'rgba(195, 168, 107, 0.2)', duration: 20, rotation: true },
    { Icon: Atom, x: 60, y: 60, size: 22, color: 'rgba(195, 168, 107, 0.15)', duration: 19, rotation: false },
    { Icon: Atom, x: 25, y: 40, size: 26, color: 'rgba(195, 168, 107, 0.18)', duration: 24, rotation: true },
    { Icon: Atom, x: 70, y: 20, size: 16, color: 'rgba(195, 168, 107, 0.22)', duration: 17, rotation: false },
    { Icon: Atom, x: 35, y: 80, size: 20, color: 'rgba(195, 168, 107, 0.16)', duration: 23, rotation: true },
    
    // Test tube icons
    { Icon: TestTube, x: 25, y: 70, size: 28, color: 'rgba(0, 129, 74, 0.25)', duration: 22, rotation: false },
    { Icon: TestTube, x: 65, y: 45, size: 18, color: 'rgba(0, 129, 74, 0.18)', duration: 17, rotation: true },
    { Icon: TestTube, x: 30, y: 50, size: 22, color: 'rgba(0, 129, 74, 0.2)', duration: 19, rotation: false },
    { Icon: TestTube, x: 85, y: 65, size: 16, color: 'rgba(0, 129, 74, 0.15)', duration: 21, rotation: true },
    { Icon: TestTube, x: 5, y: 40, size: 24, color: 'rgba(0, 129, 74, 0.22)', duration: 18, rotation: false },
    
    // Microscope icons
    { Icon: Microscope, x: 70, y: 75, size: 32, color: 'rgba(195, 168, 107, 0.25)', duration: 24, rotation: false },
    { Icon: Microscope, x: 20, y: 30, size: 22, color: 'rgba(195, 168, 107, 0.18)', duration: 20, rotation: true },
    { Icon: Microscope, x: 55, y: 80, size: 18, color: 'rgba(195, 168, 107, 0.22)', duration: 19, rotation: false },
    { Icon: Microscope, x: 75, y: 35, size: 26, color: 'rgba(195, 168, 107, 0.16)', duration: 23, rotation: true },
    { Icon: Microscope, x: 40, y: 10, size: 20, color: 'rgba(195, 168, 107, 0.2)', duration: 21, rotation: false },
    
    // Pill icons
    { Icon: Pill, x: 50, y: 40, size: 16, color: 'rgba(0, 107, 62, 0.2)', duration: 15, rotation: true },
    { Icon: Pill, x: 15, y: 60, size: 22, color: 'rgba(0, 107, 62, 0.25)', duration: 17, rotation: false },
    { Icon: Pill, x: 80, y: 50, size: 14, color: 'rgba(0, 107, 62, 0.18)', duration: 19, rotation: true },
    { Icon: Pill, x: 35, y: 25, size: 18, color: 'rgba(0, 107, 62, 0.22)', duration: 16, rotation: false },
    { Icon: Pill, x: 60, y: 85, size: 20, color: 'rgba(0, 107, 62, 0.15)', duration: 18, rotation: true },
    
    // Syringe icons
    { Icon: Syringe, x: 40, y: 60, size: 24, color: 'rgba(163, 138, 86, 0.22)', duration: 16, rotation: false },
    { Icon: Syringe, x: 75, y: 30, size: 18, color: 'rgba(163, 138, 86, 0.18)', duration: 18, rotation: true },
    { Icon: Syringe, x: 20, y: 45, size: 22, color: 'rgba(163, 138, 86, 0.25)', duration: 20, rotation: false },
    { Icon: Syringe, x: 55, y: 15, size: 16, color: 'rgba(163, 138, 86, 0.16)', duration: 17, rotation: true },
    { Icon: Syringe, x: 90, y: 55, size: 20, color: 'rgba(163, 138, 86, 0.2)', duration: 19, rotation: false },
    
    // Stethoscope icons
    { Icon: Stethoscope, x: 30, y: 75, size: 26, color: 'rgba(0, 129, 74, 0.18)', duration: 21, rotation: true },
    { Icon: Stethoscope, x: 65, y: 25, size: 18, color: 'rgba(0, 129, 74, 0.25)', duration: 19, rotation: false },
    { Icon: Stethoscope, x: 10, y: 50, size: 24, color: 'rgba(0, 129, 74, 0.2)', duration: 23, rotation: true },
    { Icon: Stethoscope, x: 85, y: 80, size: 16, color: 'rgba(0, 129, 74, 0.15)', duration: 20, rotation: false },
    { Icon: Stethoscope, x: 45, y: 5, size: 22, color: 'rgba(0, 129, 74, 0.22)', duration: 18, rotation: true },
    
    // Hospital icons
    { Icon: Hospital, x: 25, y: 90, size: 28, color: 'rgba(195, 168, 107, 0.2)', duration: 22, rotation: false },
    { Icon: Hospital, x: 70, y: 10, size: 20, color: 'rgba(195, 168, 107, 0.15)', duration: 19, rotation: true },
    
    // Cross icons
    { Icon: Cross, x: 5, y: 25, size: 22, color: 'rgba(0, 107, 62, 0.22)', duration: 18, rotation: false },
    { Icon: Cross, x: 50, y: 95, size: 16, color: 'rgba(0, 107, 62, 0.18)', duration: 20, rotation: true },
    { Icon: Cross, x: 95, y: 30, size: 18, color: 'rgba(0, 107, 62, 0.25)', duration: 17, rotation: false },
    
    // Briefcase medical icons
    { Icon: Briefcase, x: 35, y: 65, size: 24, color: 'rgba(163, 138, 86, 0.18)', duration: 23, rotation: true },
    { Icon: Briefcase, x: 80, y: 95, size: 18, color: 'rgba(163, 138, 86, 0.22)', duration: 20, rotation: false },
    
    // Biohazard icons
    { Icon: Biohazard, x: 15, y: 35, size: 20, color: 'rgba(0, 129, 74, 0.15)', duration: 24, rotation: true },
    { Icon: Biohazard, x: 60, y: 70, size: 24, color: 'rgba(0, 129, 74, 0.2)', duration: 21, rotation: false },
    
    // HeartPulse icons
    { Icon: HeartPulse, x: 85, y: 5, size: 18, color: 'rgba(195, 168, 107, 0.22)', duration: 19, rotation: true },
    { Icon: HeartPulse, x: 40, y: 90, size: 22, color: 'rgba(195, 168, 107, 0.25)', duration: 17, rotation: false },
    { Icon: HeartPulse, x: 10, y: 65, size: 16, color: 'rgba(195, 168, 107, 0.18)', duration: 22, rotation: true }
  ], []);

  return (
    <>
      {medicalEffects.map((item, index) => {
        const { Icon, x, y, size, color, duration, rotation } = item;
        return (
          <motion.div
            key={`medical-icon-${index}`}
            className={`absolute hidden md:flex ${index % 3 === 0 ? 'hidden lg:flex' : ''}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: color,
            }}
            animate={rotation ? {
              y: [-5, 5, -5],
              rotate: [-15, 15, -15],
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            } : {
              y: [-8, 8, -8],
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.2 % 5,
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </>
  );
}
