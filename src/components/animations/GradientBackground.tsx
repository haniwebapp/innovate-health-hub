
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "green-gold" | "light-green" | "light-gold" | "subtle";
  animate?: boolean;
}

export const GradientBackground = ({
  className,
  children,
  variant = "green-gold",
  animate = true,
}: GradientBackgroundProps) => {
  const variantClassMap = {
    "green-gold": "bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold",
    "light-green": "bg-gradient-to-br from-moh-lightGreen via-white to-white",
    "light-gold": "bg-gradient-to-br from-white via-white to-moh-lightGold",
    "subtle": "bg-gradient-to-br from-white via-moh-lightGreen/10 to-moh-lightGold/10",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background gradient */}
      <div className={cn("absolute inset-0", variantClassMap[variant])} />
      
      {/* Animated overlay */}
      {animate && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-transparent"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: [1.1, 1], 
              opacity: [0, 0.5, 0.2] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-moh-green/5 to-moh-gold/5"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </>
      )}
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
