
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export function GeneticSequence() {
  // DNA bases
  const bases = ['A', 'T', 'C', 'G'];
  const [sequence, setSequence] = useState<string[]>([]);
  
  // Generate a random DNA sequence
  useEffect(() => {
    const generateSequence = () => {
      return Array.from({ length: 40 }, () => 
        bases[Math.floor(Math.random() * bases.length)]
      );
    };
    
    setSequence(generateSequence());
    
    // Periodically update the sequence for a dynamic effect
    const interval = setInterval(() => {
      // Replace a few random positions in the sequence
      setSequence(prev => {
        const newSeq = [...prev];
        for (let i = 0; i < 5; i++) {
          const position = Math.floor(Math.random() * newSeq.length);
          newSeq[position] = bases[Math.floor(Math.random() * bases.length)];
        }
        return newSeq;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Horizontal flowing sequence across the top */}
      <div className="absolute top-[15%] w-full overflow-hidden">
        <div className="relative">
          {/* Background blur layer */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5 z-10"></div>
          
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ 
              repeat: Infinity,
              duration: 30,
              ease: "linear"
            }}
          >
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={`top-row-${rowIndex}`} className="flex">
                {sequence.map((base, i) => (
                  <motion.div
                    key={`top-${rowIndex}-${i}`}
                    className={`text-sm md:text-base font-mono mx-1 font-bold ${
                      base === 'A' || base === 'T' 
                        ? 'text-moh-gold/70' 
                        : 'text-moh-green/70'
                    }`}
                    initial={{ opacity: 0.4 }}
                    animate={{ 
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: i * 0.05 + rowIndex * 2,
                    }}
                  >
                    {base}
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Vertical flowing sequence on the right */}
      <div className="absolute right-[10%] h-full overflow-hidden">
        <div className="relative">
          {/* Background blur layer */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5 z-10"></div>
          
          <motion.div 
            className="flex flex-col"
            animate={{ y: [0, -800] }}
            transition={{ 
              repeat: Infinity,
              duration: 25,
              ease: "linear"
            }}
          >
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <div key={`right-col-${colIndex}`} className="flex flex-col">
                {sequence.map((base, i) => (
                  <motion.div
                    key={`right-${colIndex}-${i}`}
                    className={`text-sm md:text-base font-mono my-1 font-bold ${
                      base === 'C' || base === 'G' 
                        ? 'text-moh-gold/70' 
                        : 'text-moh-green/70'
                    }`}
                    initial={{ opacity: 0.4 }}
                    animate={{ 
                      opacity: [0.4, 0.9, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: i * 0.07 + colIndex * 1.5,
                    }}
                  >
                    {base}
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Diagonal flowing sequence */}
      <div className="absolute bottom-[20%] left-[15%] overflow-hidden">
        <div className="relative">
          {/* Background blur layer */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5 z-10"></div>
          
          <motion.div
            className="flex flex-wrap"
            initial={{ x: -200, y: 100 }}
            animate={{ x: 200, y: -100 }}
            transition={{ 
              repeat: Infinity,
              duration: 20,
              ease: "linear",
              repeatType: "reverse"
            }}
          >
            {Array.from({ length: 3 }).map((_, diagonalIndex) => (
              <div 
                key={`diagonal-${diagonalIndex}`}
                className="flex"
                style={{ 
                  transform: `rotate(${45}deg)`,
                  margin: `${diagonalIndex * 50}px`
                }}
              >
                {sequence.slice(0, 15).map((base, i) => (
                  <motion.div
                    key={`diagonal-${diagonalIndex}-${i}`}
                    className={`text-sm md:text-base font-mono mx-1 font-bold ${
                      (i % 2 === 0) 
                        ? 'text-moh-darkGreen/70' 
                        : 'text-moh-darkGold/70'
                    }`}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: i * 0.1 + diagonalIndex,
                    }}
                  >
                    {base}
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
