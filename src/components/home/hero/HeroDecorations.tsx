
import { motion } from "framer-motion";

export function HeroDecorations() {
  return (
    <>
      {/* Background decorative circles */}
      <motion.div 
        className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-moh-green/5 mix-blend-multiply"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 -right-10 w-32 h-32 rounded-full bg-moh-gold/5 mix-blend-multiply"
        animate={{ 
          y: [0, 40, 0],
          x: [0, -30, 0],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* DNA strand */}
      <div className="absolute top-1/2 -left-4 hidden lg:block opacity-10">
        <svg width="100" height="400" viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[...Array(10)].map((_, i) => (
            <g key={i}>
              <motion.path 
                d={`M10,${i * 40 + 10} C40,${i * 40 + 30} 60,${i * 40 + 30} 90,${i * 40 + 10}`}
                stroke={i % 2 === 0 ? "#00814A" : "#C3A86B"}
                strokeWidth="2"
                animate={{ 
                  y: [0, 5, 0],
                  pathLength: [0.8, 1, 0.8],
                  pathOffset: [0, 0.2, 0]
                }}
                transition={{
                  duration: 10 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            </g>
          ))}
        </svg>
      </div>
      
      {/* Medical cross */}
      <motion.div 
        className="absolute bottom-20 right-10 w-16 h-16 hidden lg:flex items-center justify-center opacity-20"
        animate={{
          rotate: [0, 180],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute w-10 h-2 bg-moh-green rounded-full" />
        <div className="absolute w-2 h-10 bg-moh-green rounded-full" />
      </motion.div>
    </>
  );
}
