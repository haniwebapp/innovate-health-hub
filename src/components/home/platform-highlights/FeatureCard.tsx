
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
  color?: string;
}

export function FeatureCard({
  iconName,
  title,
  description,
  delay,
  ctaLink,
  onHover,
  isActive,
  color = "green"
}: FeatureCardProps) {
  // Get icon component from name
  const IconComponent = getIconByName(iconName);

  // Determine color classes based on the color prop
  const getColorClasses = () => {
    const colorMap: {[key: string]: {bg: string, text: string, border: string, hover: string}} = {
      green: {
        bg: "bg-moh-lightGreen/50",
        text: "text-moh-green",
        border: "border-moh-green/20",
        hover: "hover:bg-moh-lightGreen/80"
      },
      gold: {
        bg: "bg-moh-lightGold/50",
        text: "text-moh-darkGold",
        border: "border-moh-gold/20",
        hover: "hover:bg-moh-lightGold/80"
      },
      darkGreen: {
        bg: "bg-moh-lightGreen/60",
        text: "text-moh-darkGreen",
        border: "border-moh-darkGreen/20",
        hover: "hover:bg-moh-lightGreen/90"
      },
      darkGold: {
        bg: "bg-moh-lightGold/60",
        text: "text-moh-darkGold",
        border: "border-moh-darkGold/20",
        hover: "hover:bg-moh-lightGold/90"
      }
    };
    
    return colorMap[color] || colorMap.green;
  };
  
  const colorClasses = getColorClasses();
  
  // Item animation variant
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1 * delay
      }
    }
  };

  return (
    <motion.div
      className="xl:col-span-1"
      variants={itemVariants}
      onHoverStart={onHover}
    >
      <ParallaxCard 
        onHover={onHover}
        depth={15}
        className={`h-full bg-white/60 backdrop-blur-sm rounded-xl border ${colorClasses.border} shadow-sm overflow-hidden transition-all duration-300 ${isActive ? 'ring-2 ring-moh-green/20 shadow-lg' : ''}`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Icon container with dynamic background */}
          <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} ${colorClasses.hover} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
            <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
          </div>
          
          <h3 className={`text-lg font-semibold mb-2 ${colorClasses.text}`}>
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
          
          <div className="mt-auto">
            <Button
              asChild
              variant="ghost"
              className={`${colorClasses.text} hover:bg-transparent hover:opacity-80 p-0 h-auto font-medium text-sm group`}
            >
              <a href={ctaLink}>
                Learn More
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-3 -top-3 w-16 h-16 opacity-10">
            <IconComponent className={`w-full h-full ${colorClasses.text}`} />
          </div>
        </div>
      </ParallaxCard>
    </motion.div>
  );
}
