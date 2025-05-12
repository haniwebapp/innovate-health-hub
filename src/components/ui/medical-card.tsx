
import React from 'react';
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface MedicalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  hoverEffect?: boolean;
  glassEffect?: boolean;
}

// Combine React div props with Framer Motion props
type CombinedCardProps = Omit<MedicalCardProps, keyof HTMLMotionProps<"div">> & 
  HTMLMotionProps<"div">;

const MedicalCard = React.forwardRef<HTMLDivElement, CombinedCardProps>(
  ({ className, gradient = false, elevation = 'medium', hoverEffect = false, glassEffect = false, children, ...props }, ref) => {
    const elevationClasses = {
      flat: 'shadow-none',
      low: 'shadow-sm',
      medium: 'shadow-md',
      high: 'shadow-lg'
    };

    // Animation variants
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4,
          ease: "easeOut"
        } 
      },
      hover: hoverEffect ? {
        y: -5,
        boxShadow: "0 10px 30px -15px rgba(0, 129, 74, 0.2)",
        transition: { duration: 0.2 }
      } : {}
    };

    // Cast children to React.ReactNode to fix type compatibility issue
    const safeChildren = children as React.ReactNode;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground overflow-hidden",
          elevationClasses[elevation],
          gradient && "bg-gradient-to-br from-moh-lightGreen/30 to-white",
          glassEffect && "backdrop-blur-sm bg-white/80 border-moh-green/10",
          hoverEffect && "transition-all duration-300",
          className
        )}
        initial="hidden"
        animate="visible"
        whileHover={hoverEffect ? "hover" : undefined}
        variants={cardVariants}
        {...props}
      >
        {safeChildren}
      </motion.div>
    );
  }
);

MedicalCard.displayName = "MedicalCard";

export { MedicalCard };
