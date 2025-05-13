
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BackgroundParticles } from "@/components/home/hero/animations/BackgroundParticles";
import { GradientOrbs } from "@/components/home/hero/animations/GradientOrbs";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon: ReactNode;
    text: string;
  };
  description?: string;
  actionButtons?: ReactNode;
  rightContent?: ReactNode;
  backgroundEffect?: "light" | "medium" | "dark";
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  badge,
  description,
  actionButtons,
  rightContent,
  backgroundEffect = "light",
  className,
}: HeroSectionProps) {
  const bgGradients = {
    light: "bg-gradient-to-b from-moh-lightGreen/10 to-white",
    medium: "bg-gradient-to-b from-moh-lightGreen/20 to-white",
    dark: "bg-gradient-to-b from-moh-lightGreen/30 to-white",
  };
  
  return (
    <section className={`pt-28 pb-16 relative overflow-hidden ${bgGradients[backgroundEffect]} ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundParticles />
        <GradientOrbs />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content - Left Side */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {badge && (
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="bg-moh-lightGreen/70 rounded-lg p-2 inline-flex items-center">
                  {badge.icon}
                  <span className="text-moh-darkGreen font-medium">
                    {badge.text}
                  </span>
                </div>
              </div>
            )}
            
            {subtitle && (
              <motion.div
                className="text-moh-gold mb-2 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {subtitle}
              </motion.div>
            )}
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-moh-darkGreen leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h1>
            
            {description && (
              <motion.p 
                className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {description}
              </motion.p>
            )}
            
            {actionButtons && (
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {actionButtons}
              </motion.div>
            )}
          </motion.div>
          
          {/* Right Side Content */}
          {rightContent && (
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {rightContent}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
