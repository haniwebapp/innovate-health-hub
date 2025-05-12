
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Dna, Atom, TestTube, Microscope, Pill, Syringe, Stethoscope, Hospital, Cross, Briefcase, Biohazard, HeartPulse } from "lucide-react";

export function HeroBackgroundEffect() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
  }>>([]);

  // DNA genetic code letters
  const geneticLetters = ['A', 'T', 'G', 'C'];
  
  // Generate genetic code particles
  const geneticParticles = Array.from({ length: 20 }, (_, i) => ({
    letter: geneticLetters[Math.floor(Math.random() * geneticLetters.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1
  }));

  // Medical icons with positions - expanded to 50 different effects
  const medicalEffects = [
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
  ];

  useEffect(() => {
    // Generate random particles
    const colors = [
      'rgba(0, 129, 74, 0.15)',   // moh-green
      'rgba(195, 168, 107, 0.15)', // moh-gold
      'rgba(0, 107, 62, 0.1)',    // moh-darkGreen
      'rgba(163, 138, 86, 0.1)',   // moh-darkGold
    ];
    
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* DNA pattern overlay */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.07] bg-repeat"></div>
      
      {/* Animated DNA double helix */}
      <div className="absolute inset-0 bg-[url('/dna-pattern-circle.svg')] opacity-[0.07] bg-repeat-y bg-center"></div>

      {/* Floating particles with improved effects */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [
              0,
              Math.random() * 120 - 60,
              Math.random() * 120 - 60,
              0
            ],
            y: [
              0,
              Math.random() * 120 - 60,
              Math.random() * 120 - 60, 
              0
            ],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.2, 0.8, 0.4, 0.2]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Animated genetic code letters */}
      {geneticParticles.map((particle, index) => (
        <motion.div
          key={`genetic-${index}`}
          className="absolute font-mono font-bold text-moh-green/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        >
          {particle.letter}
        </motion.div>
      ))}
      
      {/* 50 Animated medical icons */}
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

      {/* Enhanced gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-gradient-to-br from-moh-lightGreen to-moh-green/20 opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-gradient-to-tl from-moh-lightGold to-moh-gold/20 opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2,
        }}
      />
      
      {/* Digital health circuit pattern */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05]">
        <defs>
          <pattern
            id="health-circuit-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 50L25 50M25 50L25 75M25 75L50 75M50 75L50 50M50 50L75 50M75 50L75 25M75 25L100 25"
              fill="none"
              stroke="#00814A"
              strokeWidth="0.7"
            />
            <path
              d="M0 25L25 25M25 25L25 0"
              fill="none"
              stroke="#C3A86B"
              strokeWidth="0.7"
            />
            <path 
              d="M50 0L50 25M50 25L75 25"
              fill="none"
              stroke="#00814A"
              strokeWidth="0.7"
            />
            <path
              d="M0 75L25 75"
              fill="none"
              stroke="#C3A86B"
              strokeWidth="0.7"
            />
            <circle cx="25" cy="25" r="2" fill="#00814A" opacity="0.5" />
            <circle cx="75" cy="25" r="2" fill="#C3A86B" opacity="0.5" />
            <circle cx="25" cy="75" r="2" fill="#C3A86B" opacity="0.5" />
            <circle cx="50" cy="75" r="2" fill="#00814A" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#health-circuit-pattern)" />
      </svg>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      
      {/* DNA helix animations */}
      <div className="absolute h-full w-1/3 left-10 opacity-10 overflow-hidden hidden lg:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`dna-strand-${i}`}
            className="absolute w-12 h-2 bg-moh-green/30 rounded-full"
            style={{
              left: i % 2 === 0 ? '0%' : '33%',
              top: `${i * 12}%`,
            }}
            animate={{
              x: i % 2 === 0 ? [0, 40, 0] : [0, -40, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Medical data stream effect */}
      <div className="absolute top-0 right-0 h-full w-1/4 overflow-hidden opacity-20 hidden lg:block">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`data-stream-${i}`}
            className="absolute h-1 rounded-full"
            style={{
              right: `${(i % 3) * 15}%`,
              top: `${i * 8}%`,
              width: `${Math.random() * 30 + 20}px`,
              backgroundColor: i % 2 === 0 ? 'rgba(0, 129, 74, 0.5)' : 'rgba(195, 168, 107, 0.5)',
            }}
            animate={{
              width: [20, 80, 20],
              opacity: [0.2, 0.6, 0.2],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Animated pulse rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`pulse-ring-${i}`}
          className="absolute hidden lg:block"
          style={{
            top: `${15 + (i * 25)}%`,
            left: `${20 + (i * 20)}%`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
        >
          {[...Array(3)].map((_, j) => (
            <motion.div
              key={`ring-${i}-${j}`}
              className="absolute rounded-full border-2"
              style={{
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                borderColor: i % 2 === 0 ? 'rgba(0, 129, 74, 0.3)' : 'rgba(195, 168, 107, 0.3)',
              }}
              animate={{
                scale: [1, 4],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: j * 1 + i * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      ))}
      
      {/* Medical sparkles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-moh-gold/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              delay: i * 0.3,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
