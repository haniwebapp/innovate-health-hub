
import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Microscope, Stethoscope, Tablets, HeartPulse, Dna, Pill } from "lucide-react";
import { FloatingIcon } from "../healthcare/FloatingIcon";

export function HealthcareIconsCluster() {
  return (
    <div className="relative h-[400px] w-full">
      {/* Central innovation visualization */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          {/* Central pulsing circle */}
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-moh-green to-moh-gold flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(195, 168, 107, 0.4)",
                "0 0 0 20px rgba(195, 168, 107, 0)",
                "0 0 0 0 rgba(195, 168, 107, 0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <BrainCircuit className="text-white h-12 w-12" />
          </motion.div>
          
          {/* Animated rings */}
          <motion.div
            className="absolute -inset-3 rounded-full border border-moh-gold/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-6 rounded-full border border-moh-gold/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute -inset-9 rounded-full border border-moh-gold/10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.div>
      
      {/* Connection lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-transparent via-moh-gold/40 to-transparent z-0"
          style={{
            width: "120px",
            transformOrigin: "0 0",
            transform: `rotate(${i * 45}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
        />
      ))}
      
      {/* Surrounding healthcare icons */}
      <FloatingIcon
        icon={Microscope}
        color="#C3A86B"
        position={{ top: "5%", left: "30%", transform: "translate(-50%, -50%)" }}
        animationDelay={0.3}
        isVisible={true}
        pulseIntensity="medium"
      />
      
      <FloatingIcon
        icon={Stethoscope}
        color="#00814A"
        position={{ top: "20%", right: "15%", transform: "translate(50%, -50%)" }}
        animationDelay={0.6}
        isVisible={true}
        pulseIntensity="medium"
      />
      
      <FloatingIcon
        icon={Pill}
        color="#C3A86B"
        position={{ bottom: "10%", left: "20%", transform: "translate(-50%, 50%)" }}
        animationDelay={0.9}
        isVisible={true}
        pulseIntensity="high"
      />
      
      <FloatingIcon
        icon={Tablets}
        color="#00814A"
        position={{ bottom: "25%", right: "10%", transform: "translate(50%, 50%)" }}
        animationDelay={1.2}
        isVisible={true}
        pulseIntensity="medium"
      />
      
      <FloatingIcon
        icon={HeartPulse}
        color="#C3A86B"
        position={{ top: "60%", left: "5%", transform: "translate(-50%, -50%)" }}
        animationDelay={1.5}
        isVisible={true}
        pulseIntensity="low"
      />
      
      <FloatingIcon
        icon={Dna}
        color="#00814A"
        position={{ top: "75%", right: "25%", transform: "translate(50%, -50%)" }}
        animationDelay={1.8}
        isVisible={true}
        pulseIntensity="medium"
      />
      
      <FloatingIcon
        icon={Pill}
        color="#C3A86B"
        position={{ bottom: "60%", right: "5%", transform: "translate(50%, 50%)" }}
        animationDelay={2.1}
        isVisible={true}
        pulseIntensity="low"
      />
      
      {/* Data flow visualization */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-moh-gold/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 80],
              y: [0, (Math.random() - 0.5) * 80],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
