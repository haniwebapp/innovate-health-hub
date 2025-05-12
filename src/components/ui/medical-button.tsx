
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface MedicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const MedicalButton: React.FC<MedicalButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  // Define styling for different variants
  const variantClasses = {
    primary: 'bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white shadow-md',
    secondary: 'bg-gradient-to-r from-moh-gold to-moh-darkGold hover:from-moh-darkGold hover:to-moh-gold text-white shadow-md',
    outline: 'bg-transparent border-2 border-moh-green text-moh-darkGreen hover:bg-moh-green/10',
    ghost: 'bg-transparent hover:bg-moh-green/10 text-moh-darkGreen',
    link: 'bg-transparent text-moh-darkGreen hover:underline p-0',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-md',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md'
  };

  // Define sizing
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 rounded',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-md',
    xl: 'text-lg px-8 py-4 rounded-lg'
  };

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
    disabled: { opacity: 0.6 }
  };

  return (
    <motion.button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        isLoading && 'opacity-80 cursor-wait',
        fullWidth && 'w-full',
        className
      )}
      initial="initial"
      whileHover={!props.disabled && !isLoading ? "hover" : "disabled"}
      whileTap={!props.disabled && !isLoading ? "tap" : "disabled"}
      variants={buttonVariants}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={cn('flex items-center', isLoading && 'opacity-0')}>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </span>
    </motion.button>
  );
};
