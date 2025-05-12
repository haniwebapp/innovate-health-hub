
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MedicalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    gradient?: boolean;
    hoverEffect?: boolean; 
    glassEffect?: boolean;
  }
>(({ className, gradient, hoverEffect, glassEffect, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      gradient && "bg-gradient-to-br from-white to-moh-lightGreen/40 dark:from-gray-800 dark:to-gray-900",
      glassEffect && "bg-white/80 backdrop-blur-sm border-white/20 dark:bg-gray-800/80",
      className
    )}
    {...props}
  />
));
MedicalCard.displayName = "MedicalCard";

const MedicalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
MedicalCardHeader.displayName = "MedicalCardHeader";

const MedicalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-moh-darkGreen",
      className
    )}
    {...props}
  />
));
MedicalCardTitle.displayName = "MedicalCardTitle";

const MedicalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MedicalCardDescription.displayName = "MedicalCardDescription";

const MedicalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
MedicalCardContent.displayName = "MedicalCardContent";

const MedicalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
MedicalCardFooter.displayName = "MedicalCardFooter";

export { MedicalCard, MedicalCardHeader, MedicalCardFooter, MedicalCardTitle, MedicalCardDescription, MedicalCardContent };
