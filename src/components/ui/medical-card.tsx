
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MedicalCardProps {
  children: ReactNode;
  className?: string;
  highlight?: 'green' | 'gold' | 'none';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const MedicalCard: React.FC<MedicalCardProps> = ({
  children,
  className,
  highlight = 'none',
  hoverEffect = false,
  onClick
}) => {
  // Define highlight styling based on prop
  const highlightStyles = {
    green: 'before:bg-moh-green/80',
    gold: 'before:bg-moh-gold/80',
    none: ''
  };
  
  // Hover animation variants
  const hoverVariants = {
    initial: { y: 0 },
    hover: { y: -6 }
  };

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'relative bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg overflow-hidden shadow-md transition-all',
        'before:absolute before:h-1 before:w-full before:top-0 before:left-0',
        highlightStyles[highlight],
        hoverEffect ? 'cursor-pointer hover:shadow-lg' : '',
        className
      )}
      initial="initial"
      whileHover={hoverEffect ? "hover" : "initial"}
      variants={hoverVariants}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

interface MedicalCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const MedicalCardHeader: React.FC<MedicalCardHeaderProps> = ({
  children,
  className
}) => (
  <div className={cn('p-4 border-b border-gray-100/50', className)}>
    {children}
  </div>
);

interface MedicalCardTitleProps {
  children: ReactNode;
  className?: string;
}

export const MedicalCardTitle: React.FC<MedicalCardTitleProps> = ({
  children,
  className
}) => (
  <h3 className={cn('text-lg font-medium text-moh-darkGreen font-playfair', className)}>
    {children}
  </h3>
);

interface MedicalCardContentProps {
  children: ReactNode;
  className?: string;
}

export const MedicalCardContent: React.FC<MedicalCardContentProps> = ({
  children,
  className
}) => (
  <div className={cn('p-4', className)}>
    {children}
  </div>
);

interface MedicalCardFooterProps {
  children: ReactNode;
  className?: string;
}

export const MedicalCardFooter: React.FC<MedicalCardFooterProps> = ({
  children,
  className
}) => (
  <div className={cn('p-4 pt-0 flex justify-between items-center', className)}>
    {children}
  </div>
);
