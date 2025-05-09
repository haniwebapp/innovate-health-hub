
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIconByName } from "./features";

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
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      onHoverStart={onHover}
      className={`flex flex-col items-center bg-white rounded-xl p-6 shadow-md border ${
        isActive ? 'border-moh-green border-2' : 'border-gray-100'
      } hover:border-moh-lightGreen transition-all duration-300 h-full relative overflow-hidden group`}
    >
      {/* Subtle background highlight on active */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-moh-lightGreen/10 via-transparent to-moh-lightGold/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-moh-lightGreen to-moh-lightGold/30 group-hover:from-moh-green group-hover:to-moh-lightGold/50 transition-all duration-300">
        <div className="text-moh-green group-hover:text-white transition-colors duration-300">
          {getIconByName(iconName, "h-6 w-6")}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-center text-moh-darkGreen group-hover:text-moh-green transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-5">
        {description}
      </p>
      
      <div className="mt-auto pt-4 w-full">
        {/* Animated underline */}
        <motion.div 
          className="mb-4 pt-4 border-t border-dashed border-moh-lightGreen/40 w-1/3 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: "33%" }}
          transition={{ duration: 1, delay: delay * 0.2 + 0.5 }}
          viewport={{ once: true }}
        />
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full border-moh-lightGreen text-moh-green hover:bg-moh-lightGreen hover:text-white transition-all group-hover:border-moh-green"
          asChild
        >
          <a href={ctaLink} className="flex items-center justify-center">
            <span>Learn More</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
      
      {/* Animated corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-moh-lightGreen/0 group-hover:border-r-moh-green/20 transition-colors duration-300"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.2 + 0.8, duration: 0.4 }}
      />
    </motion.div>
  );
}
