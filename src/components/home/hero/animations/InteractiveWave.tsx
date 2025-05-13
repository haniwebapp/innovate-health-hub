
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface InteractiveWaveProps {
  mousePosition?: { x: number; y: number };
}

export function InteractiveWave({ mousePosition }: InteractiveWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get the display size of the canvas
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Set the canvas size to match its display size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Wave properties
    const waves = [
      {
        frequency: 0.001,
        amplitude: height * 0.05,
        speed: 0.05,
        color: 'rgba(0, 129, 74, 0.03)',
        offset: 0,
      },
      {
        frequency: 0.002,
        amplitude: height * 0.03,
        speed: 0.07,
        color: 'rgba(195, 168, 107, 0.02)',
        offset: Math.PI * 0.5,
      },
      {
        frequency: 0.003,
        amplitude: height * 0.04,
        speed: 0.03,
        color: 'rgba(0, 129, 74, 0.02)',
        offset: Math.PI,
      }
    ];
    
    // Wave distortion based on mouse position
    let distortionX = width * 0.5;
    let distortionY = height * 0.5;
    let distortionRadius = width * 0.2;
    let distortionStrength = 20;
    
    let time = 0;
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update distortion position based on mouse
      if (mousePosition) {
        distortionX = mousePosition.x;
        distortionY = mousePosition.y;
        distortionStrength = 40;
      } else {
        distortionStrength = 20;
      }
      
      // Draw each wave
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.fillStyle = wave.color;
        
        for (let x = 0; x <= width; x += 5) {
          // Calculate distance from mouse position
          const dx = x - distortionX;
          const dy = height * 0.5 - distortionY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply distortion based on distance
          const distortionFactor = Math.max(0, 1 - distance / distortionRadius);
          const extraHeight = distortionFactor * distortionStrength * Math.sin(time + x * 0.01);
          
          // Calculate wave height
          const y = height * 0.5 + 
            wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed + wave.offset) + 
            extraHeight;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the wave shape
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      });
      
      time += 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
