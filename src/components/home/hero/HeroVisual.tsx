
import { motion } from "framer-motion";
import { Heart, Stethoscope, Dna, BrainCircuit, HeartPulse, Pill } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroVisual() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (autoRotate) {
      interval = window.setInterval(() => {
        setRotation(prev => (prev + 0.2) % 360);
      }, 50);
    }
    
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [autoRotate]);
  
  const iconPositions = [
    { icon: Dna, color: "#9b87f5", size: 24 },
    { icon: Heart, color: "#7E69AB", size: 24 },
    { icon: Stethoscope, color: "#0EA5E9", size: 24 },
    { icon: HeartPulse, color: "#D6BCFA", size: 24 },
    { icon: Pill, color: "#8B5CF6", size: 24 },
  ];
  
  return (
    <div 
      className="relative w-full max-w-md aspect-square mx-auto"
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
    >
      {/* Backdrop blur sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
        animate={{
          boxShadow: [
            "0 0 20px 10px rgba(155, 135, 245, 0.1)",
            "0 0 30px 15px rgba(155, 135, 245, 0.2)",
            "0 0 20px 10px rgba(155, 135, 245, 0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Central icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20"
        animate={{
          scale: [1, 1.05, 1],
          rotateY: [0, 10, 0, -10, 0]
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, repeatType: "reverse" },
          rotateY: { duration: 6, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl">
          <BrainCircuit className="h-10 w-10 text-white" />
        </div>
      </motion.div>
      
      {/* Orbital ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-full rounded-full border border-white/10"
        style={{ 
          transformOrigin: "center", 
          transform: `translate(-50%, -50%) rotate(${rotation}deg)` 
        }}
      >
        {iconPositions.map((item, index) => {
          const angle = (index * (360 / iconPositions.length)) * (Math.PI / 180);
          const x = Math.cos(angle) * 45;
          const y = Math.sin(angle) * 45;
          
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: `calc(50% + ${y}%)`,
                left: `calc(50% + ${x}%)`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 bg-[#1A1F2C]/60 backdrop-blur-md rounded-full border border-white/10"
                whileHover={{ scale: 1.2 }}
              >
                <IconComponent style={{ color: item.color }} size={item.size} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ transform: `rotate(${rotation}deg)` }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(155, 135, 245, 0.2)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.2)" />
          </linearGradient>
        </defs>
        
        {iconPositions.map((_, index) => {
          const nextIndex = (index + 1) % iconPositions.length;
          const angle1 = (index * (360 / iconPositions.length)) * (Math.PI / 180);
          const angle2 = (nextIndex * (360 / iconPositions.length)) * (Math.PI / 180);
          
          const x1 = Math.cos(angle1) * 45 + 50;
          const y1 = Math.sin(angle1) * 45 + 50;
          const x2 = Math.cos(angle2) * 45 + 50;
          const y2 = Math.sin(angle2) * 45 + 50;
          
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
              strokeLinecap="round"
              animate={{
                strokeDashoffset: [0, 100]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}
        
        {/* Lines to center */}
        {iconPositions.map((_, index) => {
          const angle = (index * (360 / iconPositions.length)) * (Math.PI / 180);
          const x1 = Math.cos(angle) * 45 + 50;
          const y1 = Math.sin(angle) * 45 + 50;
          
          return (
            <motion.line
              key={`center-line-${index}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2="50%"
              y2="50%"
              stroke="rgba(155, 135, 245, 0.15)"
              strokeWidth="1"
              strokeDasharray="3,3"
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5
              }}
            />
          );
        })}
      </svg>
      
      {/* Floating particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`floating-particle-${i}`}
          className="absolute rounded-full bg-white/40"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.random() * 10 - 5],
            y: [0, Math.random() * 10 - 5],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Data flow visualization */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`data-flow-${i}`}
          className="absolute h-1 w-1 rounded-full bg-blue-400/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30],
            y: [0, Math.random() * 60 - 30],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
