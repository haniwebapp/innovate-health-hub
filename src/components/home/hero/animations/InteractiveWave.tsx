
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function InteractiveWave() {
  const [waves, setWaves] = useState<Array<{
    id: number;
    amplitude: number;
    frequency: number;
    speed: number;
    color: string;
    opacity: number;
    delay: number;
  }>>([]);
  
  useEffect(() => {
    // Create multiple wave patterns with different properties
    const waveTypes = [
      {
        amplitude: 20,
        frequency: 0.08,
        speed: 15,
        color: "rgba(0, 129, 74, 0.05)",
        opacity: 0.3,
        delay: 0
      },
      {
        amplitude: 15,
        frequency: 0.05,
        speed: 20,
        color: "rgba(195, 168, 107, 0.05)",
        opacity: 0.2,
        delay: 2
      },
      {
        amplitude: 25,
        frequency: 0.03,
        speed: 25,
        color: "rgba(0, 107, 62, 0.05)",
        opacity: 0.15,
        delay: 4
      }
    ];
    
    setWaves(waveTypes.map((wave, index) => ({ id: index, ...wave })));
  }, []);
  
  return (
    <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute bottom-0 left-0 w-full"
          initial={{ y: 0 }}
          style={{
            height: `${wave.amplitude * 2}px`,
            backgroundColor: "transparent",
            opacity: wave.opacity
          }}
        >
          <svg
            viewBox={`0 0 1440 ${wave.amplitude * 2}`}
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d={`M0,${wave.amplitude} 
                 C320,${-wave.amplitude} 
                 420,${wave.amplitude * 3} 
                 640,${wave.amplitude} 
                 C880,${-wave.amplitude} 
                 1120,${wave.amplitude * 3} 
                 1440,${wave.amplitude}`}
              fill={wave.color}
              animate={{
                d: [
                  `M0,${wave.amplitude} 
                   C320,${-wave.amplitude} 
                   420,${wave.amplitude * 3} 
                   640,${wave.amplitude} 
                   C880,${-wave.amplitude} 
                   1120,${wave.amplitude * 3} 
                   1440,${wave.amplitude}`,
                  
                  `M0,${wave.amplitude} 
                   C320,${wave.amplitude * 3} 
                   420,${-wave.amplitude} 
                   640,${wave.amplitude} 
                   C880,${wave.amplitude * 3} 
                   1120,${-wave.amplitude} 
                   1440,${wave.amplitude}`,
                   
                  `M0,${wave.amplitude} 
                   C320,${-wave.amplitude} 
                   420,${wave.amplitude * 3} 
                   640,${wave.amplitude} 
                   C880,${-wave.amplitude} 
                   1120,${wave.amplitude * 3} 
                   1440,${wave.amplitude}`
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: wave.speed,
                ease: "easeInOut",
                delay: wave.delay
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
