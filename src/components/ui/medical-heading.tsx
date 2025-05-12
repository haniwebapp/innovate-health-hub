
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      gradient: "text-transparent bg-clip-text bg-gradient-to-r from-moh-green to-moh-darkGreen",
      goldGradient: "text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-darkGold",
      accent: "text-moh-green",
      gold: "text-moh-gold"
    },
    size: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      h4: "text-xl md:text-2xl",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "h2",
    weight: "bold",
    align: "left",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    animated?: boolean;
}

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Combine React heading props with Framer Motion props, more carefully typed
type CombinedHeadingProps = Omit<HeadingProps, keyof HTMLMotionProps<HeadingElement>> & 
  HTMLMotionProps<HeadingElement>;

const MedicalHeading = React.forwardRef<HTMLHeadingElement, CombinedHeadingProps>(
  ({ className, variant, size, weight, align, as = "h2", animated = true, children, ...props }, ref) => {
    const headingAnimationVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          ease: "easeOut"
        } 
      }
    };

    // Map size to appropriate heading element if not specified
    const getDefaultElement = (): HeadingElement => {
      switch (size) {
        case "h1": return "h1";
        case "h2": return "h2";
        case "h3": return "h3";
        case "h4": return "h4";
        case "h5": return "h5";
        case "h6": return "h6";
        default: return "h2";
      }
    };

    const Element = as || getDefaultElement();
    
    // Instead of accessing the motion element directly, create a component
    const MotionHeading = motion[Element];

    // Cast children to React.ReactNode to fix type compatibility issue
    const safeChildren = children as React.ReactNode;

    return (
      <MotionHeading
        ref={ref}
        className={cn(headingVariants({ variant, size, weight, align, className }))}
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : false}
        variants={headingAnimationVariants}
        {...props}
      >
        {safeChildren}
      </MotionHeading>
    );
  }
);

MedicalHeading.displayName = "MedicalHeading";

export { MedicalHeading, headingVariants };
