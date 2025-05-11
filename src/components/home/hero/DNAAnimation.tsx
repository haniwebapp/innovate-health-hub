
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Dna, AtomIcon, TestTube, Microscope } from "lucide-react";

interface DNAStrand {
  id: number;
  x: number;
  y: number;
  opacity: number;
  rotation: number;
  delay: number;
}

export function DNAAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [dnaStrands, setDnaStrands] = useState<DNAStrand[]>([]);
  
  // Generate DNA strands on component mount
  useEffect(() => {
    const strandsCount = 12; // Number of DNA strand pairs
    
    const newStrands = Array.from({ length: strandsCount }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() * 20 - 10), // Around center X with some variation
      y: (i * 100) / strandsCount, // Distribute across height
      opacity: Math.random() * 0.4 + 0.4, // Random opacity
      rotation: Math.random() * 30 - 15, // Random rotation
      delay: i * 0.1, // Staggered animation delay
    }));
    
    setDnaStrands(newStrands);
  }, []);
  
  // Icons with their properties for animation
  const geneticIcons = [
    { 
      Icon: Dna, 
      size: 24, 
      color: "rgba(0, 129, 74, 0.7)", 
      position: { x: 70, y: 20 },
      animation: { 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 0.95, 1],
        y: [0, -5, 5, 0]
      }
    },
    { 
      Icon: AtomIcon, 
      size: 28, 
      color: "rgba(195, 168, 107, 0.7)", 
      position: { x: 30, y: 60 },
      animation: { 
        rotate: [0, -5, 5, 0],
        scale: [1, 0.95, 1.1, 1],
        y: [0, 5, -5, 0]
      }
    },
    { 
      Icon: TestTube, 
      size: 20, 
      color: "rgba(0, 129, 74, 0.6)", 
      position: { x: 85, y: 70 },
      animation: { 
        rotate: [0, 10, -10, 0],
        scale: [1, 1.05, 0.98, 1],
        x: [0, -3, 3, 0]
      }
    },
    { 
      Icon: Microscope, 
      size: 26, 
      color: "rgba(195, 168, 107, 0.6)", 
      position: { x: 20, y: 40 },
      animation: { 
        rotate: [0, -8, 8, 0],
        scale: [1, 0.98, 1.05, 1],
        x: [0, 3, -3, 0]
      }
    },
  ];
  
  // Genetic code letters for floating animation
  const geneticLetters = ['A', 'T', 'G', 'C'];
  
  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      {/* DNA Double Helix */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-[10%] top-[15%] h-[70%] w-20"
      >
        {/* Vertical line representing the DNA backbone */}
        <motion.div 
          className="absolute h-full w-0.5 left-[45%] bg-gradient-to-b from-moh-green/20 via-moh-green/40 to-moh-green/20"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        <motion.div 
          className="absolute h-full w-0.5 left-[55%] bg-gradient-to-b from-moh-gold/20 via-moh-gold/40 to-moh-gold/20"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
        
        {/* DNA basepairs connecting the backbones */}
        {dnaStrands.map((strand) => (
          <motion.div
            key={strand.id}
            className="absolute left-0 right-0"
            style={{ top: `${strand.y}%` }}
            initial={{ opacity: 0, rotateZ: strand.rotation - 10 }}
            animate={isInView ? { 
              opacity: strand.opacity,
              rotateZ: strand.rotation
            } : { 
              opacity: 0,
              rotateZ: strand.rotation - 10
            }}
            transition={{
              duration: 0.7,
              delay: strand.delay + 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 2 + 2
            }}
          >
            <div className="h-1 rounded-full w-full bg-gradient-to-r from-moh-green/60 to-moh-gold/60" />
          </motion.div>
        ))}
      </motion.div>
      
      {/* DNA strand on left side */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-[5%] top-[25%] h-[50%] w-20"
      >
        {/* Vertical line representing the DNA backbone */}
        <motion.div 
          className="absolute h-full w-0.5 left-[45%] bg-gradient-to-b from-moh-green/10 via-moh-green/30 to-moh-green/10"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        
        <motion.div 
          className="absolute h-full w-0.5 left-[55%] bg-gradient-to-b from-moh-gold/10 via-moh-gold/30 to-moh-gold/10"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* DNA basepairs connecting the backbones */}
        {dnaStrands.slice(0, 8).map((strand) => (
          <motion.div
            key={`left-${strand.id}`}
            className="absolute left-0 right-0"
            style={{ top: `${strand.y}%` }}
            initial={{ opacity: 0, rotateZ: -strand.rotation }}
            animate={isInView ? { 
              opacity: strand.opacity * 0.6,
              rotateZ: -strand.rotation
            } : { 
              opacity: 0,
              rotateZ: -strand.rotation + 10
            }}
            transition={{
              duration: 0.7,
              delay: strand.delay + 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 2 + 3
            }}
          >
            <div className="h-1 rounded-full w-full bg-gradient-to-r from-moh-gold/40 to-moh-green/40" />
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Genetic Icons */}
      {geneticIcons.map((item, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute"
          style={{
            left: `${item.position.x}%`,
            top: `${item.position.y}%`,
            opacity: 0
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { 
            opacity: 1,
            scale: 1,
            rotate: item.animation.rotate,
            y: item.animation.y,
            x: item.animation?.x || [0, 0, 0, 0]
          } : { opacity: 0 }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.7,
          }}
        >
          <item.Icon size={item.size} color={item.color} strokeWidth={1.5} />
        </motion.div>
      ))}
      
      {/* Floating genetic code particles with enhanced animation */}
      {Array.from({ length: 30 }).map((_, i) => {
        const geneticCode = geneticLetters[i % geneticLetters.length];
        const delay = Math.random() * 10;
        const duration = Math.random() * 5 + 3;
        const size = Math.random() * 8 + 10;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full flex items-center justify-center font-mono font-bold"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              fontSize: `${size}px`,
              opacity: 0,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
            } : { opacity: 0 }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          >
            <div className={`${i % 2 === 0 ? 'text-moh-green/70' : 'text-moh-gold/70'}`}>
              {geneticCode}
            </div>
          </motion.div>
        );
      })}
      
      {/* DNA helix circular pattern */}
      <motion.div 
        className="absolute right-[20%] bottom-[20%] w-32 h-32 rounded-full border border-moh-green/20 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={isInView ? { 
          opacity: 0.4, 
          scale: 1,
          rotate: 340,
        } : { opacity: 0 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <div className="absolute w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M20,50 C35,25 65,75 80,50" stroke="rgba(0, 129, 74, 0.3)" fill="none" strokeWidth="1" />
            <path d="M20,40 C35,15 65,65 80,40" stroke="rgba(0, 129, 74, 0.2)" fill="none" strokeWidth="1" />
            <path d="M20,60 C35,35 65,85 80,60" stroke="rgba(0, 129, 74, 0.2)" fill="none" strokeWidth="1" />
            <circle cx="35" cy="30" r="2" fill="rgba(195, 168, 107, 0.5)" />
            <circle cx="65" cy="70" r="2" fill="rgba(0, 129, 74, 0.5)" />
            <circle cx="35" cy="70" r="2" fill="rgba(195, 168, 107, 0.5)" />
            <circle cx="65" cy="30" r="2" fill="rgba(0, 129, 74, 0.5)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
