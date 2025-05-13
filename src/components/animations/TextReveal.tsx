
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAnimation } from "@/components/animations/AnimationProvider";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: "chars" | "words";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "chars",
}: TextRevealProps) {
  const [parts, setParts] = useState<string[]>([]);
  const { animationsEnabled, prefersReducedMotion } = useAnimation();
  
  // Split text based on splitBy prop
  useEffect(() => {
    if (splitBy === "chars") {
      setParts(text.split(""));
    } else {
      setParts(text.split(" "));
    }
  }, [text, splitBy]);
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };
  
  // Item variants
  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0, 
      filter: "blur(4px)", 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 100 
      } 
    },
  };
  
  // If reduced motion is preferred or animations are disabled, render text directly
  if (prefersReducedMotion || !animationsEnabled) {
    return <span className={className}>{text}</span>;
  }
  
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("inline-block", className)}
    >
      {parts.map((part, index) => (
        <motion.span
          key={`${part}-${index}`}
          variants={itemVariants}
          className="inline-block"
          style={{ 
            marginRight: splitBy === "words" ? "0.3em" : undefined,
            marginLeft: splitBy === "words" && index === 0 ? "0" : undefined,
          }}
        >
          {part}
          {splitBy === "words" && index < parts.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
