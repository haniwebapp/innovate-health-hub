
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Dna, Atom, TestTube, Microscope } from "lucide-react";

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

  // DNA and genetic icons with positions
  const geneticIcons = [
    { Icon: Dna, x: 15, y: 20, size: 24, color: 'rgba(0, 129, 74, 0.2)', duration: 18 },
    { Icon: Atom, x: 80, y: 35, size: 30, color: 'rgba(195, 168, 107, 0.2)', duration: 20 },
    { Icon: TestTube, x: 25, y: 70, size: 28, color: 'rgba(0, 129, 74, 0.25)', duration: 22 },
    { Icon: Microscope, x: 70, y: 75, size: 32, color: 'rgba(195, 168, 107, 0.25)', duration: 24 },
    { Icon: Dna, x: 45, y: 30, size: 20, color: 'rgba(0, 129, 74, 0.15)', duration: 25 },
    { Icon: Atom, x: 60, y: 60, size: 22, color: 'rgba(195, 168, 107, 0.15)', duration: 19 }
  ];

  useEffect(() => {
    // Generate random particles
    const colors = [
      'rgba(0, 129, 74, 0.15)',  // moh-green
      'rgba(195, 168, 107, 0.15)', // moh-gold
      'rgba(0, 107, 62, 0.1)',   // moh-darkGreen
      'rgba(163, 138, 86, 0.1)',  // moh-darkGold
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
      
      {/* Animated genetic icons */}
      {geneticIcons.map((item, index) => {
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
              opacity: [0.5, 0.8, 0.5],
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
      
      {/* Animated glowing circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2 border-moh-green/10"
          style={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          initial={{ width: 50, height: 50, opacity: 0 }}
          animate={{ 
            width: [50, 500],
            height: [50, 500],
            opacity: [0.7, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
