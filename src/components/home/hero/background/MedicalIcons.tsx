
import { motion } from "framer-motion";
import React from "react";
import { Dna, Atom, TestTube, Microscope, Heart, Stethoscope, Pill, Thermometer, Activity } from "lucide-react";

export function MedicalIcons() {
  // Medical icons with positions - increased size and quantity
  const medicalIcons = [
    { Icon: Dna, x: 15, y: 20, size: 32, color: 'rgba(0, 129, 74, 0.4)', duration: 18 },
    { Icon: Atom, x: 80, y: 35, size: 38, color: 'rgba(195, 168, 107, 0.4)', duration: 20 },
    { Icon: TestTube, x: 25, y: 70, size: 36, color: 'rgba(0, 129, 74, 0.45)', duration: 22 },
    { Icon: Microscope, x: 70, y: 75, size: 40, color: 'rgba(195, 168, 107, 0.45)', duration: 24 },
    { Icon: Dna, x: 45, y: 30, size: 28, color: 'rgba(0, 129, 74, 0.35)', duration: 25 },
    { Icon: Heart, x: 60, y: 60, size: 30, color: 'rgba(195, 168, 107, 0.35)', duration: 19 },
    { Icon: Stethoscope, x: 20, y: 40, size: 34, color: 'rgba(0, 129, 74, 0.4)', duration: 21 },
    { Icon: Pill, x: 75, y: 25, size: 30, color: 'rgba(195, 168, 107, 0.4)', duration: 23 },
    { Icon: Thermometer, x: 30, y: 85, size: 32, color: 'rgba(0, 129, 74, 0.35)', duration: 20 },
    { Icon: Activity, x: 85, y: 50, size: 36, color: 'rgba(195, 168, 107, 0.4)', duration: 22 }
  ];

  return (
    <>
      {medicalIcons.map((item, index) => {
        const { Icon, x, y, size, color, duration } = item;
        return (
          <motion.div
            key={`icon-${index}`}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: color,
            }}
            animate={{
              y: [-5, 5, -5],
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7], // Increased opacity range for better visibility
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </>
  );
}
