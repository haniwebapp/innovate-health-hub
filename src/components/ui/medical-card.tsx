
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MedicalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
}

const MedicalCard = React.forwardRef<HTMLDivElement, MedicalCardProps>(
  ({ className, gradient = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
          gradient && "bg-gradient-to-br from-moh-lightGreen/30 to-white",
          className
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
    );
  }
);

MedicalCard.displayName = "MedicalCard";

export { MedicalCard };
