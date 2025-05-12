
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
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Combine React button props with Framer Motion props
type MedicalButtonProps = Omit<ButtonProps, keyof HTMLMotionProps<"button">> & 
  HTMLMotionProps<"button">;

const MedicalButton = React.forwardRef<HTMLButtonElement, MedicalButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    );
  }
);

MedicalButton.displayName = "MedicalButton";

export { MedicalButton, buttonVariants };
