
import { motion } from "framer-motion";
import { Sparkles, Dna, BrainCircuit, Stethoscope } from "lucide-react";

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

  // DNA genetic code letters
  const geneticLetters = ['A', 'T', 'G', 'C'];
  
  // AI symbols and binary sequences
  const aiSymbols = ['01', '10', '00', '11', '{AI}', '{}', '<>', '[]'];
  
  // Medical terms and symbols
  const medicalSymbols = ['+', 'Rx', 'Hz', 'mg', 'DNA', 'RNA'];

  // Generate sequences for flowing animations
  const generateSequences = (count: number, symbols: string[]) => {
    return Array.from({ length: count }, () => ({
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 10,
      direction: Math.random() > 0.5 ? 1 : -1
    }));
  };

  const dnaSequences = generateSequences(15, geneticLetters);
  const aiSequences = generateSequences(12, aiSymbols);
  const medicalSequences = generateSequences(10, medicalSymbols);

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
      
      {/* DNA sequence flowing animations */}
      {dnaSequences.map((sequence, index) => (
        <motion.div
          key={`dna-${index}`}
          className="absolute hidden md:flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${sequence.x}%`,
            top: `${sequence.y}%`,
            fontSize: `${sequence.size}px`,
            opacity: sequence.opacity,
            color: 'rgba(0, 129, 74, 0.6)',
          }}
          initial={{ x: sequence.direction > 0 ? -100 : 100 }}
          animate={{
            x: sequence.direction > 0 ? "100vw" : "-100vw",
          }}
          transition={{
            duration: sequence.duration,
            repeat: Infinity,
            delay: sequence.delay,
            ease: "linear",
          }}
        >
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-1 rounded-md">
            <Dna className="mr-1 opacity-70" size={sequence.size} strokeWidth={1} />
            <span>{sequence.symbol}</span>
          </div>
        </motion.div>
      ))}
      
      {/* AI sequence flowing animations */}
      {aiSequences.map((sequence, index) => (
        <motion.div
          key={`ai-${index}`}
          className="absolute hidden md:flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${sequence.x}%`,
            top: `${sequence.y}%`,
            fontSize: `${sequence.size}px`,
            opacity: sequence.opacity,
            color: 'rgba(195, 168, 107, 0.6)',
          }}
          initial={{ 
            y: sequence.direction > 0 ? -100 : 100 
          }}
          animate={{
            y: sequence.direction > 0 ? "100vh" : "-100vh",
          }}
          transition={{
            duration: sequence.duration,
            repeat: Infinity,
            delay: sequence.delay,
            ease: "linear",
          }}
        >
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-1 rounded-md">
            <BrainCircuit className="mr-1 opacity-70" size={sequence.size} strokeWidth={1} />
            <span>{sequence.symbol}</span>
          </div>
        </motion.div>
      ))}
      
      {/* Medical sequence flowing animations */}
      {medicalSequences.map((sequence, index) => (
        <motion.div
          key={`med-${index}`}
          className="absolute hidden md:flex items-center justify-center backdrop-blur-sm"
          style={{
            left: `${sequence.x}%`,
            top: `${sequence.y}%`,
            fontSize: `${sequence.size}px`,
            opacity: sequence.opacity,
            color: sequence.direction > 0 ? 'rgba(0, 129, 74, 0.6)' : 'rgba(195, 168, 107, 0.6)',
          }}
          initial={{ 
            x: sequence.direction > 0 ? -100 : 100,
            y: sequence.direction > 0 ? -50 : 50
          }}
          animate={{
            x: sequence.direction > 0 ? "100vw" : "-100vw",
            y: sequence.direction > 0 ? "50vh" : "-50vh"
          }}
          transition={{
            duration: sequence.duration,
            repeat: Infinity,
            delay: sequence.delay,
            ease: "linear",
          }}
        >
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-1 rounded-md">
            <Stethoscope className="mr-1 opacity-70" size={sequence.size} strokeWidth={1} />
            <span>{sequence.symbol}</span>
          </div>
        </motion.div>
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
