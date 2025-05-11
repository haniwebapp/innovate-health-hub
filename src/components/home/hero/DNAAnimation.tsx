
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
      
      {/* Floating genetic code particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full flex items-center justify-center"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            opacity: 0,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? {
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          } : { opacity: 0 }}
          transition={{
            duration: Math.random() * 3 + 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          <div className={`text-xs font-mono ${i % 2 === 0 ? 'text-moh-green/40' : 'text-moh-gold/40'}`}>
            {["A", "T", "G", "C"][Math.floor(Math.random() * 4)]}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
