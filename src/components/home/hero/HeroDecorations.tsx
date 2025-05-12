import { motion } from "framer-motion";
import { Heart, Stethoscope, Pill, Microscope, Dna, HeartPulse, Syringe } from "lucide-react";
import {
  FloatingParticles,
  GradientBlobs,
  FloatingMedicalIcons,
  DNAHelix,
  SparkleEffects,
  HeartbeatLine,
  CellDivision,
  PulseRings,
  MedicalCross,
  AnimatedFlask
} from "./decorations";

export function HeroDecorations() {
  // Generate a set of random positions for animated elements
  const generateRandomPositions = (count: number, areaSize: { width: number, height: number }) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * areaSize.width,
      y: Math.random() * areaSize.height,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 10 + 5
    }));
  };

  // Background particles
  const particles = generateRandomPositions(15, { width: 100, height: 100 });
  
  // Medical icons for floating animations - Replaced Flask with Syringe
  const medicalIcons = [
    { Icon: Heart, position: { top: '22%', left: '18%' }, size: 24, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: Stethoscope, position: { top: '65%', right: '25%' }, size: 28, color: 'rgba(195, 168, 107, 0.6)' },
    { Icon: Pill, position: { top: '35%', right: '15%' }, size: 26, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: Syringe, position: { top: '70%', left: '22%' }, size: 24, color: 'rgba(195, 168, 107, 0.6)' }, // Replaced Flask with Syringe
    { Icon: Microscope, position: { top: '20%', right: '30%' }, size: 30, color: 'rgba(0, 129, 74, 0.6)' },
    { Icon: HeartPulse, position: { top: '50%', left: '28%' }, size: 26, color: 'rgba(0, 129, 74, 0.6)' }, // Added new icon
    { Icon: Dna, position: { top: '40%', right: '20%' }, size: 28, color: 'rgba(195, 168, 107, 0.6)' } // Added new icon
  ];

  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Main gradient blobs */}
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-moh-lightGreen via-moh-green to-moh-darkGreen rounded-full opacity-25 blur-xl" 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.25, 0.3, 0.25],
          x: [0, -10, 0],
          y: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-moh-lightGold via-moh-gold to-moh-darkGold rounded-full opacity-25 blur-xl" 
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.25, 0.3, 0.25],
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Secondary floating orbs */}
      <motion.div 
        className="absolute top-1/3 right-16 w-28 h-28 bg-moh-gold rounded-full opacity-15 blur-md" 
        animate={{ 
          x: [0, 15, 0, -15, 0], 
          y: [0, -10, -20, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-16 w-36 h-36 bg-moh-green rounded-full opacity-15 blur-md" 
        animate={{ 
          x: [0, -20, 0, 20, 0], 
          y: [0, 15, 30, 15, 0],
          scale: [1, 1.1, 1.2, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
      
      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-moh-green"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Animated Medical Icons - Updated to be more visible */}
      {medicalIcons.map((item, index) => (
        <motion.div 
          key={`medical-icon-${index}`}
          className="absolute md:block" // Removed 'hidden' to make icons visible on all screen sizes
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
      
      {/* DNA helix animated path - Made more visible */}
      <svg className="absolute top-1/4 left-1/5 w-16 h-32 lg:block" viewBox="0 0 60 120"> {/* Removed 'hidden' to make visible on all screen sizes */}
        <motion.path
          d="M30,10 C45,20 15,40 30,50 C45,60 15,80 30,90 C45,100 15,120 30,130"
          fill="none"
          stroke="rgba(0, 129, 74, 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M30,10 C15,20 45,40 30,50 C15,60 45,80 30,90 C15,100 45,120 30,130"
          fill="none"
          stroke="rgba(195, 168, 107, 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        
        {/* DNA Connectors */}
        {[20, 40, 60, 80, 100].map((y, i) => (
          <motion.line
            key={`dna-connector-${i}`}
            x1="20"
            y1={y}
            x2="40"
            y2={y}
            stroke={i % 2 === 0 ? "rgba(0, 129, 74, 0.4)" : "rgba(195, 168, 107, 0.4)"}
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 1 }}
          />
        ))}
      </svg>
      
      {/* Sparkle icon animations - enhanced visibility */}
      <motion.div
        className="absolute top-1/4 left-1/5 lg:block" // Removed 'hidden' to make visible on all screen sizes
        animate={{
          y: [-10, 10, -10],
          opacity: [0.8, 1, 0.8],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="text-moh-gold/60 w-8 h-8" /> {/* Increased opacity */}
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/5 lg:block" // Removed 'hidden' to make visible on all screen sizes
        animate={{
          y: [10, -10, 10],
          opacity: [0.8, 1, 0.8],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        <Sparkles className="text-moh-green/60 w-8 h-8" /> {/* Increased opacity */}
      </motion.div>
      
      {/* Heartbeat line animation - Enhanced visibility */}
      <div className="absolute bottom-1/3 right-1/4 w-40 lg:block"> {/* Removed 'hidden' to make visible on all screen sizes */}
        <svg width="100%" height="40" viewBox="0 0 200 40">
          <motion.path
            d="M0,20 L20,20 L40,20 L50,0 L60,40 L70,20 L80,20 L100,20 L110,20 L120,0 L130,40 L140,20 L160,20 L180,20 L200,20"
            fill="none"
            stroke="rgba(0, 129, 74, 0.7)" // Increased opacity for better visibility
            strokeWidth="2.5" // Increased stroke width
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 1, 0],
              x: [-100, 100],
            }}
            transition={{ 
              duration: 3, 
              times: [0, 0.4, 0.7, 1],
              repeat: Infinity, 
              repeatDelay: 1
            }}
          />
        </svg>
      </div>
      
      {/* Cell division animation - Enhanced visibility */}
      <div className="absolute top-2/3 left-1/4 lg:block"> {/* Removed 'hidden' to make visible on all screen sizes */}
        <motion.div
          className="relative w-12 h-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-moh-green/50" // Increased opacity
            animate={{ 
              scale: [1, 0.5, 0.5, 1],
              x: [0, -15, -15, 0],
              y: [0, -15, -15, 0]
            }}
            transition={{ 
              duration: 8, 
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity
            }}
          />
          
          <motion.div
            className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-moh-green/50" // Increased opacity
            animate={{ 
              scale: [1, 0.5, 0.5, 1],
              x: [0, 15, 15, 0],
              y: [0, 15, 15, 0]
            }}
            transition={{ 
              duration: 8, 
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity
            }}
          />
        </motion.div>
      </div>
      
      {/* Pulse rings - brighter and more visible - Enhanced visibility */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block"> {/* Removed 'hidden lg:' to make visible on all screen sizes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-moh-green/30" // Increased opacity
            initial={{ 
              width: 50, 
              height: 50, 
              opacity: 0.7,
              x: "-50%",
              y: "-50%",
            }}
            animate={{ 
              width: [50, 400], 
              height: [50, 400], 
              opacity: [0.6, 0], // Increased starting opacity
              x: "-50%",
              y: "-50%",
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity, 
              delay: i * 1.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Medical cross pulses - Enhanced visibility */}
      <div className="absolute bottom-1/4 left-1/6 lg:block"> {/* Removed 'hidden' to make visible on all screen sizes */}
        <div className="relative w-12 h-12">
          <motion.div
            className="absolute top-0 left-4 h-12 w-4 bg-moh-gold/40 rounded-sm" // Increased opacity
            animate={{ opacity: [0.4, 0.8, 0.4] }} // Increased opacity
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-4 left-0 h-4 w-12 bg-moh-gold/40 rounded-sm" // Increased opacity
            animate={{ opacity: [0.4, 0.8, 0.4] }} // Increased opacity
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`cross-pulse-${i}`}
              className="absolute rounded-sm"
              style={{
                top: 0,
                left: 0,
                width: 12,
                height: 12,
              }}
              animate={{ 
                width: [12, 36],
                height: [12, 36],
                x: [-6, -18],
                y: [-6, -18],
                opacity: [0.7, 0], // Increased starting opacity
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Animated Lab Flask with bubbling liquid */}
      <AnimatedFlask />
    </>
  );
}
