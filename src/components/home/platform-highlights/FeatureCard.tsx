
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, HeartPulse, Lightbulb, Stethoscope, Coins, GraduationCap } from "lucide-react";

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
  color
}: FeatureCardProps) {
  // Map icon name to component
  const getIcon = () => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="h-5 w-5" />;
      case "Lightbulb":
        return <Lightbulb className="h-5 w-5" />;
      case "Stethoscope":
        return <Stethoscope className="h-5 w-5" />;
      case "Coins":
        return <Coins className="h-5 w-5" />;
      case "GraduationCap":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2 + (delay * 0.1),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`group rounded-xl bg-white/70 backdrop-blur-md border border-white/60 shadow-md p-6 transition-all duration-500 hover:shadow-xl hover:bg-white/90 hover:-translate-y-1 relative overflow-hidden ${isActive ? "ring-2 ring-moh-gold/30" : ""}`}
      onMouseEnter={onHover}
    >
      {/* Card content */}
      <div className="flex flex-col h-full">
        <div className={`w-12 h-12 rounded-lg ${isActive ? "bg-gradient-to-br from-moh-green to-moh-darkGreen" : "bg-moh-green/10"} flex items-center justify-center transition-colors duration-300`}>
          <motion.div
            className={`${isActive ? "text-white" : "text-moh-green"} transition-colors duration-300`}
            animate={{ 
              rotate: isActive ? [0, 5, -5, 0] : 0,
              scale: isActive ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {getIcon()}
          </motion.div>
        </div>
        
        <h3 className="mt-4 text-lg font-medium text-moh-darkGreen">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 flex-grow">{description}</p>
        
        <Link 
          to={ctaLink} 
          className="mt-4 inline-flex items-center text-sm font-medium text-moh-green hover:text-moh-darkGreen group-hover:underline transition-colors"
        >
          Learn more
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-moh-lightGreen/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top decoration line */}
      <motion.div 
        className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${isActive ? "from-moh-green to-moh-gold" : "from-transparent to-transparent"} transition-all duration-500`}
        initial={{ width: "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
