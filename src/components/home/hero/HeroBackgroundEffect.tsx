
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Dna, Atom, TestTube, Microscope, Heart, Stethoscope, Pill, Thermometer, Activity } from "lucide-react";

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
  const geneticParticles = Array.from({ length: 25 }, (_, i) => ({
    letter: geneticLetters[Math.floor(Math.random() * geneticLetters.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.2 // Increased opacity for better visibility
  }));

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

  // Animated medical models (DNA, cells, heartbeat)
  const models = [
    {
      id: 'dna-helix',
      x: 15,
      y: 30,
      elements: Array.from({ length: 8 }, (_, i) => ({
        left: i % 2 === 0,
        index: i
      }))
    },
    {
      id: 'heartbeat',
      x: 75,
      y: 65,
      points: [0, 0, 10, -20, 20, 0, 30, 40, 40, 0, 50, -10, 60, 0]
    }
  ];

  useEffect(() => {
    // Generate random particles with higher visibility
    const colors = [
      'rgba(0, 129, 74, 0.3)',    // moh-green with increased opacity
      'rgba(195, 168, 107, 0.3)',  // moh-gold with increased opacity
      'rgba(0, 107, 62, 0.25)',    // moh-darkGreen with increased opacity
      'rgba(163, 138, 86, 0.25)',  // moh-darkGold with increased opacity
    ];
    
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 10, // Larger particles
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* DNA pattern overlay - increased opacity */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.12] bg-repeat"></div>
      
      {/* Animated DNA double helix - increased opacity */}
      <div className="absolute inset-0 bg-[url('/dna-pattern-circle.svg')] opacity-[0.12] bg-repeat-y bg-center"></div>

      {/* Floating particles with improved visibility */}
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
            opacity: [0.3, 0.9, 0.5, 0.3] // Increased opacity for better visibility
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

      {/* Animated genetic code letters - with increased visibility */}
      {geneticParticles.map((particle, index) => (
        <motion.div
          key={`genetic-${index}`}
          className="absolute font-mono font-bold"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            color: index % 2 === 0 ? 'rgba(0, 129, 74, 0.6)' : 'rgba(195, 168, 107, 0.6)', // Alternating colors with higher opacity
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.1, 1],
            rotate: [0, index % 2 === 0 ? 5 : -5, 0], // Slight rotation for more dynamism
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
      
      {/* Animated medical icons with enhanced visibility */}
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

      {/* DNA Helix Animation - more visible */}
      {models.map((model) => 
        model.id === 'dna-helix' && (
          <div 
            key={model.id} 
            className="absolute" 
            style={{ left: `${model.x}%`, top: `${model.y}%` }}
          >
            {model.elements.map((el, idx) => (
              <motion.div 
                key={`dna-${idx}`}
                className={`absolute h-3 w-8 rounded-full ${idx % 2 === 0 ? 'bg-moh-green/50' : 'bg-moh-gold/50'}`}
                style={{ 
                  left: el.left ? -20 : 20, 
                  top: el.index * 15
                }}
                animate={{
                  left: el.left ? [-20, 20, -20] : [20, -20, 20],
                  opacity: [0.7, 1, 0.7],
                  scaleX: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: el.index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )
      )}

      {/* Heartbeat Line Animation */}
      {models.map((model) => 
        model.id === 'heartbeat' && (
          <div 
            key={model.id}
            className="absolute" 
            style={{ left: `${model.x}%`, top: `${model.y}%` }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60">
              <motion.path
                d="M0,30 L10,30 L20,10 L30,50 L40,30 L50,20 L60,30"
                fill="none"
                stroke="rgba(0, 129, 74, 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: 1
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>
        )
      )}

      {/* Enhanced gradient orbs with more vibrant colors */}
      <motion.div
        className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-gradient-to-br from-moh-lightGreen to-moh-green/30 opacity-30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] bg-gradient-to-tl from-moh-lightGold to-moh-gold/30 opacity-30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2,
        }}
      />
      
      {/* Digital health circuit pattern - more visible */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.1]">
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
              strokeWidth="1.2"
            />
            <path
              d="M0 25L25 25M25 25L25 0"
              fill="none"
              stroke="#C3A86B"
              strokeWidth="1.2"
            />
            <path 
              d="M50 0L50 25M50 25L75 25"
              fill="none"
              stroke="#00814A"
              strokeWidth="1.2"
            />
            <path
              d="M0 75L25 75"
              fill="none"
              stroke="#C3A86B"
              strokeWidth="1.2"
            />
            <circle cx="25" cy="25" r="3" fill="#00814A" opacity="0.7" />
            <circle cx="75" cy="25" r="3" fill="#C3A86B" opacity="0.7" />
            <circle cx="25" cy="75" r="3" fill="#C3A86B" opacity="0.7" />
            <circle cx="50" cy="75" r="3" fill="#00814A" opacity="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#health-circuit-pattern)" />
      </svg>
      
      {/* New: Cell Division Animation */}
      <div className="absolute left-[30%] top-[45%]">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-16 h-16 rounded-full border-4 border-moh-green/40"
            animate={{ 
              scale: [1, 1.5, 2, 0],
              opacity: [0.8, 0.6, 0.4, 0] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut" 
            }}
          />
          
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-moh-green/30"
            animate={{ 
              x: [0, 30],
              y: [0, -30],
              scale: [0, 1],
              opacity: [0, 0.7]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeOut"
            }}
          />
          
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-moh-green/30"
            animate={{ 
              x: [0, -30],
              y: [0, 30],
              scale: [0, 1],
              opacity: [0, 0.7]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* New: Medical Cross Pulse */}
      <div className="absolute right-[25%] top-[35%]">
        <motion.div
          className="relative"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="absolute w-8 h-24 bg-moh-gold/40 rounded-md"
            style={{ left: '8px', top: '-8px' }}
          />
          <motion.div 
            className="absolute w-24 h-8 bg-moh-gold/40 rounded-md"
            style={{ left: '-8px', top: '8px' }}
          />
          
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`cross-pulse-${i}`}
              className="absolute rounded-md border-2 border-moh-gold/20"
              style={{
                width: 40,
                height: 40,
                left: 0,
                top: 0,
              }}
              animate={{ 
                width: [40, 100],
                height: [40, 100],
                x: [-20, -50],
                y: [-20, -50],
                opacity: [0.4, 0],
                borderRadius: ['0.375rem', '1rem'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* New: Microscope View Animation */}
      <div className="absolute left-[60%] top-[20%]">
        <motion.div
          className="w-32 h-32 rounded-full border-4 border-moh-green/30 overflow-hidden"
          animate={{ scale: [1, 1.05, 1], borderColor: ['rgba(0,129,74,0.3)', 'rgba(0,129,74,0.5)', 'rgba(0,129,74,0.3)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full bg-gradient-to-br from-moh-lightGreen/10 to-transparent relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Cell structures */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`cell-${i}`}
                className="absolute rounded-full bg-moh-green/40"
                style={{
                  width: 10 + (i * 3),
                  height: 10 + (i * 3),
                  left: 40 + (i * 6) * Math.cos(i),
                  top: 40 + (i * 6) * Math.sin(i),
                }}
                animate={{ 
                  x: [0, Math.sin(i) * 10],
                  y: [0, Math.cos(i) * 10],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ 
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated glowing circles - more visible */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2 border-moh-green/20"
          style={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          initial={{ width: 50, height: 50, opacity: 0 }}
          animate={{ 
            width: [50, 600],
            height: [50, 600],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
