
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIconByName } from "./features";
import { ParallaxCard } from "@/components/animations/ParallaxCard";

interface FeatureCardProps {
  iconName: string;
  title: string;
  description: string;
  delay: number;
  ctaLink: string;
  onHover: () => void;
  isActive: boolean;
}

export function FeatureCard({
  iconName,
  title,
  description,
  delay,
  ctaLink,
  onHover,
  isActive
}: FeatureCardProps) {
  // Item animation variant
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: delay * 0.2 }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={onHover}
      className="h-full"
    >
      <ParallaxCard
        className="h-full"
        interactive={true}
        tiltFactor={10}
        perspective={1200}
        scale={1.03}
        priority={isActive ? 'high' : 'medium'}
      >
        <div className={`flex flex-col items-center bg-white rounded-xl p-6 shadow-md border ${
          isActive ? 'border-moh-green border-2' : 'border-gray-100'
        } hover:border-moh-lightGreen transition-all duration-300 h-full relative overflow-hidden`}>
          {/* Subtle background highlight on active */}
          {isActive && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-moh-lightGreen/10 via-transparent to-moh-lightGold/5 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-moh-lightGreen to-moh-lightGold/30 group-hover:from-moh-green group-hover:to-moh-lightGold/50 transition-all duration-300 relative">
            <motion.div 
              className="text-moh-green"
              animate={isActive ? {
                rotate: [0, 10, -10, 0],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: isActive ? Infinity : 0,
                repeatDelay: 3
              }}
            >
              {getIconByName(iconName, "h-6 w-6")}
            </motion.div>
            
            {/* Pulsing effect when active */}
            {isActive && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-moh-green/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            )}
          </div>
          
          <motion.h3 
            className="text-xl font-bold mb-3 text-center text-moh-darkGreen group-hover:text-moh-green transition-colors duration-300"
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
          >
            {title}
          </motion.h3>
          
          <p className="text-gray-600 text-center mb-5">
            {description}
          </p>
          
          <div className="mt-auto pt-4 w-full">
            {/* Animated underline */}
            <motion.div 
              className="mb-4 pt-4 border-t border-dashed border-moh-lightGreen/40 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "33%" }}
              transition={{ duration: 1, delay: delay * 0.2 + 0.5 }}
              viewport={{ once: true }}
            />
            
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-moh-lightGreen text-moh-green hover:bg-moh-lightGreen hover:text-white transition-all group"
              asChild
            >
              <a href={ctaLink}>
                <span>Learn More</span>
                <motion.div
                  animate={isActive ? { x: [0, 5, 0] } : {}}
                  transition={{ 
                    duration: 1,
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                    repeatDelay: 1
                  }}
                >
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              </a>
            </Button>
          </div>
          
          {/* Floating particles for visual interest when active */}
          {isActive && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-moh-gold/60"
                  initial={{ 
                    x: '50%', 
                    y: '50%', 
                    opacity: 0 
                  }}
                  animate={{ 
                    x: `${50 + (Math.random() * 40 - 20)}%`,
                    y: `${50 + (Math.random() * 40 - 20)}%`,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.2
                  }}
                />
              ))}
            </>
          )}
          
          {/* Animated corner accent */}
          <motion.div 
            className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-moh-lightGreen/0 group-hover:border-r-moh-green/20 transition-colors duration-300"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay * 0.2 + 0.8, duration: 0.4 }}
          />
        </div>
      </ParallaxCard>
    </motion.div>
  );
}
