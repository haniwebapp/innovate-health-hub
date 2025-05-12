
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

export const MedicalBackgroundEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* DNA Helix Pattern - Subtle background effect */}
      <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-[0.03] bg-repeat"></div>
      
      {/* Medical grid pattern */}
      <div 
        className="absolute inset-0 bg-[url('/medical-grid.svg')] opacity-[0.025] bg-repeat"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      ></div>
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-gradient-to-br from-moh-green/10 via-transparent to-moh-gold/10"
        style={{
          transform: `rotate(${mousePosition.x * 5}deg)`,
          transition: 'transform 4s ease-out'
        }}
      ></div>
      
      {/* Medical Particles - Green */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`green-${i}`}
          className="absolute w-4 h-4 rounded-full bg-moh-green/10"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 20 + (i * 5),
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Gold Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`gold-${i}`}
          className="absolute w-3 h-3 rounded-full bg-moh-gold/10"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 25 + (i * 7),
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* DNA Strand animation */}
      <div className="absolute right-0 h-full w-20 overflow-hidden opacity-20">
        <motion.div 
          className="absolute h-[6000px] w-16 bg-[url('/dna-strand.svg')] bg-repeat-y"
          initial={{ y: 0 }}
          animate={{ y: -3000 }}
          transition={{ 
            duration: 180,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Radial gradients */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-moh-green/5 to-transparent opacity-30"
        style={{ 
          top: `${mousePosition.y * 100 - 40}%`,
          left: `${mousePosition.x * 100 - 40}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'top 4s ease-out, left 4s ease-out'
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-moh-gold/5 to-transparent opacity-20"
        style={{ 
          bottom: `${(1 - mousePosition.y) * 100 - 40}%`,
          right: `${(1 - mousePosition.x) * 100 - 40}%`,
          transform: 'translate(50%, 50%)',
          transition: 'bottom 4s ease-out, right 4s ease-out'
        }}
      />
    </div>
  );
};
