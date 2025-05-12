
import React from 'react';
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-moh-green text-white hover:bg-moh-darkGreen",
        secondary: "bg-moh-lightGreen text-moh-darkGreen hover:bg-moh-lightGreen/80",
        outline: "border border-moh-green text-moh-green hover:bg-moh-lightGreen/10",
        gold: "bg-moh-gold text-white hover:bg-moh-darkGold",
        ghost: "hover:bg-moh-lightGreen hover:text-moh-darkGreen",
        link: "text-moh-green underline-offset-4 hover:underline",
        glass: "backdrop-blur-sm bg-white/80 border border-moh-green/10 text-moh-darkGreen hover:bg-moh-lightGreen/50",
        gradient: "bg-gradient-to-r from-moh-green to-moh-darkGreen text-white hover:from-moh-darkGreen hover:to-moh-green",
        goldGradient: "bg-gradient-to-r from-moh-gold to-moh-darkGold text-white hover:from-moh-darkGold hover:to-moh-gold"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        pill: "rounded-full px-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
      iconLeft?: React.ReactNode;
      iconRight?: React.ReactNode;
      loading?: boolean;
    }

// Combine React button props with Framer Motion props
type MedicalButtonProps = Omit<ButtonProps, keyof HTMLMotionProps<"button">> & 
  HTMLMotionProps<"button">;

const MedicalButton = React.forwardRef<HTMLButtonElement, MedicalButtonProps>(
  ({ className, variant, size, rounded, iconLeft, iconRight, loading, children, ...props }, ref) => {
    // Animation variants
    const buttonVariant = {
      initial: {
        scale: 1,
      },
      hover: {
        scale: 1.02,
        transition: {
          duration: 0.2,
        },
      },
      tap: {
        scale: 0.98,
        transition: {
          duration: 0.1,
        },
      },
    };
    
    // Cast children to React.ReactNode to fix type compatibility issue
    const safeChildren = children as React.ReactNode;
    
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariant}
        {...props}
      >
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {iconLeft && <span className="mr-1">{iconLeft}</span>}
            {safeChildren}
            {iconRight && <span className="ml-1">{iconRight}</span>}
          </div>
        )}
      </motion.button>
    );
  }
);

MedicalButton.displayName = "MedicalButton";

export { MedicalButton, buttonVariants };
