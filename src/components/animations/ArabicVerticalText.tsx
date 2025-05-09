
import React, { useEffect } from "react";
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
  const {
    language
  } = useLanguage();

  // Split text into characters
  const characters = text.split("");

  // Words grouping by spaces to create "snap" effect by words
  const wordsGroups: string[][] = [];
  let currentGroup: string[] = [];
  characters.forEach(char => {
    if (char === " ") {
      if (currentGroup.length > 0) {
        wordsGroups.push([...currentGroup]);
        currentGroup = [];
      }
      // Adding space as a separate character in its own group
      wordsGroups.push([char]);
    } else {
      currentGroup.push(char);
    }
  });

  // Push the final group if it exists
  if (currentGroup.length > 0) {
    wordsGroups.push(currentGroup);
  }

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
  
  const itemVariants = {
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

  // Special animation for word groups - this creates the "snap" effect
  const wordGroupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + 0.2 + i * 0.15,
        // Staggered delay between word groups
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
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
  
  const defaultClasses = "text-3xl md:text-4xl lg:text-5xl font-bold text-moh-green";
  
  return (
    <motion.div 
      className={`inline-flex flex-col items-center justify-center mx-2 ${className} ${language === 'ar' ? 'rtl-content' : ''}`} 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {wordsGroups.map((group, groupIndex) => (
        <motion.div
          key={`group-${groupIndex}`}
          custom={groupIndex}
          variants={wordGroupVariants}
          className="group relative"
        >
          {group.map((char, charIndex) => (
            <motion.span
              key={`${groupIndex}-${charIndex}`}
              variants={itemVariants}
              className={`block ${defaultClasses} ${char === " " ? "mb-2" : ""}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
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
