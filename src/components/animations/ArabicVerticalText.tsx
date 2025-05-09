
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArabicVerticalTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function ArabicVerticalText({
  text,
  className = "",
  delay = 0
}: ArabicVerticalTextProps) {
  const { language } = useLanguage();

  // Split text into characters
  const characters = text.split("");

  // Animation variants for characters
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay + 0.3
      }
    }
  };
  
  const charVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Shimmer effect for highlighting
  const shimmerEffect = {
    initial: {
      backgroundPosition: "-200px 0"
    },
    animate: {
      backgroundPosition: "200px 0",
      transition: {
        repeat: Infinity,
        repeatType: "mirror" as const,
        duration: 2,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      className={`inline-flex flex-col items-center justify-center mx-2 ${className} ${language === 'ar' ? 'rtl-content' : ''}`} 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {characters.map((char, index) => (
        <motion.span 
          key={`char-${index}`} 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-moh-green"
          variants={charVariants}
        >
          {char}
        </motion.span>
      ))}
      
      {/* Special shimmer highlight effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 pointer-events-none" 
        initial="initial" 
        animate="animate" 
        variants={shimmerEffect} 
      />
    </motion.div>
  );
}
