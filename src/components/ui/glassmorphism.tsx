
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardVariant = "green" | "gold" | "white" | "subtle";

interface GlassCardProps {
  variant?: GlassCardVariant;
  bordered?: boolean;
  hover?: boolean;
  intensity?: "low" | "medium" | "high";
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // Allow any other props from motion.div
}

export const GlassCard = ({
  children,
  className,
  variant = "white",
  bordered = true,
  hover = true,
  intensity = "medium",
  ...props
}: GlassCardProps) => {
  // Background and border configurations based on variant
  const variantStyles: Record<GlassCardVariant, { bg: string; border: string }> = {
    green: {
      bg: "bg-moh-glassGreen backdrop-blur-md",
      border: "border-moh-green/20"
    },
    gold: {
      bg: "bg-moh-glassGold backdrop-blur-md",
      border: "border-moh-gold/20"
    },
    white: {
      bg: "bg-white/70 backdrop-blur-md",
      border: "border-white/30"
    },
    subtle: {
      bg: "bg-white/50 backdrop-blur-sm",
      border: "border-white/20"
    }
  };

  // Intensity configurations
  const intensityStyles = {
    low: "shadow-sm",
    medium: "shadow-md",
    high: "shadow-lg"
  };

  // Hover animation styles
  const hoverStyles = hover
    ? "transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
    : "";

  return (
    <motion.div
      className={cn(
        "rounded-xl",
        variantStyles[variant].bg,
        bordered ? `border ${variantStyles[variant].border}` : "",
        intensityStyles[intensity],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "green" | "gold";
  [key: string]: any; // Allow any other props from motion.button
}

export const GlassButton = ({
  children,
  className,
  variant = "green",
  ...props
}: GlassButtonProps) => {
  const variantStyles = {
    green: "bg-moh-glassGreen text-moh-darkGreen border-moh-green/20 hover:bg-moh-green/20",
    gold: "bg-moh-glassGold text-moh-darkGold border-moh-gold/20 hover:bg-moh-gold/20"
  };

  return (
    <motion.button
      className={cn(
        "px-4 py-2 rounded-lg backdrop-blur-sm border",
        "font-medium transition-colors duration-300",
        variantStyles[variant],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
