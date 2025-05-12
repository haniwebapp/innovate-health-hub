
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md' | 'lg';

interface MedicalBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  animate?: boolean;
}

export const MedicalBadge: React.FC<MedicalBadgeProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  animate = false
}) => {
  // Define styling for different variants
  const variantClasses = {
    primary: 'bg-moh-green text-white border-moh-green/20',
    secondary: 'bg-moh-gold text-white border-moh-gold/20',
    outline: 'bg-transparent text-moh-green border-moh-green',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200'
  };

  // Define sizing
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  // Animation variants
  const badgeVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold border',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      initial="initial"
      animate={animate ? "animate" : "initial"}
      variants={badgeVariants}
    >
      {children}
    </motion.span>
  );
};
