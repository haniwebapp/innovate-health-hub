
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useAnimation as useGlobalAnimation } from "@/components/animations/AnimationProvider";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  style?: React.CSSProperties;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
  once = true,
  style,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const mainControls = useAnimation();
  const { prefersReducedMotion, animationsEnabled } = useGlobalAnimation();
  const [isVisible, setIsVisible] = useState(false);

  // Map directions to transform values
  const directionMap = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
    none: "scale(0.95)"
  };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      setIsVisible(true);
    } else if (!once) {
      mainControls.start("hidden");
      setIsVisible(false);
    }
  }, [isInView, mainControls, once]);

  // Animation variants based on direction
  const variants: Variants = {
    hidden: {
      opacity: 0,
      transform: prefersReducedMotion || !animationsEnabled 
        ? "none" 
        : directionMap[direction],
    },
    visible: {
      opacity: 1,
      transform: "none",
      transition: {
        duration: prefersReducedMotion || !animationsEnabled ? 0 : duration,
        delay: prefersReducedMotion || !animationsEnabled ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mainControls}
      variants={variants}
      className={cn(className)}
      style={{ width, ...style }}
      aria-hidden={!isVisible}
    >
      {children}
    </motion.div>
  );
};

export const RevealGroup = ({
  children,
  className,
  delay = 0.1,
  staggerDelay = 0.1,
  direction = "up",
}: {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) => {
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child, i) => (
        <Reveal direction={direction} delay={delay + i * staggerDelay} key={i}>
          {child}
        </Reveal>
      ))}
    </div>
  );
};
