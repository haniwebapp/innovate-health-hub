
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-moh-green text-white hover:bg-moh-darkGreen",
        secondary: "border-transparent bg-moh-lightGreen text-moh-darkGreen hover:bg-moh-lightGreen/80",
        outline: "border-moh-green text-moh-green hover:bg-moh-lightGreen/10",
        gold: "border-transparent bg-moh-gold text-white hover:bg-moh-darkGold",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        danger: "border-transparent bg-red-500 text-white hover:bg-red-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        glass: "backdrop-blur-sm bg-white/80 border-moh-green/10 text-moh-darkGreen",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-xs",
        lg: "px-3 py-0.75 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
    pulsate?: boolean;
    animated?: boolean;
}

// Combine React div props with Framer Motion props
type MedicalBadgeProps = Omit<BadgeProps, keyof HTMLMotionProps<"div">> & 
  HTMLMotionProps<"div">;

const MedicalBadge = React.forwardRef<HTMLDivElement, MedicalBadgeProps>(
  ({ className, variant, size, icon, pulsate, animated = true, children, ...props }, ref) => {
    const badgeAnimationVariants = {
      initial: { scale: 0.8, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: { duration: 0.3 } 
      },
      pulsate: pulsate ? {
        scale: [1, 1.05, 1],
        transition: { 
          repeat: Infinity, 
          repeatType: "loop" as const,
          duration: 2,
          ease: "easeInOut"
        }
      } : {}
    };

    return (
      <motion.div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        initial={animated ? "initial" : false}
        animate={animated ? (pulsate ? ["animate", "pulsate"] : "animate") : false}
        variants={badgeAnimationVariants}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </motion.div>
    );
  }
);

MedicalBadge.displayName = "MedicalBadge";

export { MedicalBadge, badgeVariants };
