
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

export const MedicalBackgroundEffect = () => {
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
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* DNA Helix Pattern - Subtle background effect */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.svg')]"></div>
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-gradient-to-br from-moh-green/10 via-transparent to-moh-gold/10"
        style={{
          transform: `rotate(${mousePosition.x * 5}deg)`,
          transition: 'transform 4s ease-out'
        }}
      ></div>
      
      {/* Medical Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
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
      
      {/* Radial gradients */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full radial-gradient-green opacity-30"
        style={{ 
          top: `${mousePosition.y * 100 - 40}%`,
          left: `${mousePosition.x * 100 - 40}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'top 4s ease-out, left 4s ease-out'
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full radial-gradient-gold opacity-20"
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
