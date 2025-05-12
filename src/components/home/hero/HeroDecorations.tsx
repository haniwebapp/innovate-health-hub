
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
  const particles = generateRandomPositions(12, { width: 100, height: 100 });

  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Main gradient blobs */}
      <motion.div 
        className="hidden md:block absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tl from-moh-lightGreen via-moh-green to-moh-darkGreen rounded-full opacity-20 blur-xl" 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.2, 0.25, 0.2],
          x: [0, -10, 0],
          y: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="hidden md:block absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-moh-lightGold via-moh-gold to-moh-darkGold rounded-full opacity-20 blur-xl" 
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.2, 0.25, 0.2],
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Secondary floating orbs */}
      <motion.div 
        className="hidden lg:block absolute top-1/3 right-16 w-24 h-24 bg-moh-gold rounded-full opacity-10 blur-md" 
        animate={{ 
          x: [0, 15, 0, -15, 0], 
          y: [0, -10, -20, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />
      
      <motion.div 
        className="hidden lg:block absolute bottom-1/3 left-16 w-32 h-32 bg-moh-green rounded-full opacity-10 blur-md" 
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
          className="absolute rounded-full bg-moh-green hidden lg:block"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Sparkle icon animations */}
      <motion.div
        className="absolute top-1/4 left-1/5 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.7, 1, 0.7],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="text-moh-gold/30 w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/5 hidden lg:block"
        animate={{
          y: [10, -10, 10],
          opacity: [0.7, 1, 0.7],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        <Sparkles className="text-moh-green/30 w-6 h-6" />
      </motion.div>
      
      {/* Pulse rings */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-moh-green/5"
            initial={{ 
              width: 50, 
              height: 50, 
              opacity: 0.8,
              x: "-50%",
              y: "-50%",
            }}
            animate={{ 
              width: [50, 300], 
              height: [50, 300], 
              opacity: [0.3, 0],
              x: "-50%",
              y: "-50%",
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity, 
              delay: i * 1.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </>
  );
}
