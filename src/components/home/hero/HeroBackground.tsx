
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"
        style={{
          backgroundSize: '30px 30px',
          backgroundPosition: `${mousePosition.x * 10}px ${mousePosition.y * 10}px`
        }}
      />
      
      {/* Modern gradient orbs with MOH colors */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[80px]"
        animate={{
          background: [
            'radial-gradient(circle, rgba(0,129,74,0.7) 0%, rgba(0,107,62,0.4) 100%)',
            'radial-gradient(circle, rgba(0,129,74,0.5) 0%, rgba(0,107,62,0.2) 100%)',
            'radial-gradient(circle, rgba(0,129,74,0.7) 0%, rgba(0,107,62,0.4) 100%)',
          ],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[70px]"
        animate={{
          background: [
            'radial-gradient(circle, rgba(195,168,107,0.7) 0%, rgba(163,138,86,0.4) 100%)',
            'radial-gradient(circle, rgba(195,168,107,0.5) 0%, rgba(163,138,86,0.2) 100%)',
            'radial-gradient(circle, rgba(195,168,107,0.7) 0%, rgba(163,138,86,0.4) 100%)',
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      
      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#00814A]/10 via-transparent to-[#00814A]/30 opacity-70"
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [0, -30],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
