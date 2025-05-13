
import { useEffect, useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

import { NetworkVisualization } from "../healthcare/NetworkVisualization";
import { FloatingIcon } from "../healthcare/FloatingIcon";
import { DataParticle } from "../healthcare/DataParticle";
import { StatisticDisplay } from "../healthcare/StatisticDisplay";
import { SectionHeading } from "../healthcare/SectionHeading";
import { useHealthcareAnimation } from "./useHealthcareAnimation";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { DataActivityIndicator } from "./DataActivityIndicator";

export default function HealthcareAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isVisible, networkData, statistics, iconColors } = useHealthcareAnimation(containerRef);
  
  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-white overflow-hidden relative"
    >
      <BackgroundDecorations isVisible={isVisible} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Revolutionizing Healthcare with"
          description="Our platform connects innovators, healthcare providers, and patients to create a healthier future for all through technology, collaboration, and breakthrough innovations."
          isVisible={isVisible}
        />
        
        <div className="relative h-80 md:h-96 lg:h-[28rem] mb-16 max-w-4xl mx-auto">
          {/* Data-driven network visualization */}
          <NetworkVisualization 
            isVisible={isVisible} 
            nodes={networkData.nodes}
            connections={networkData.connections}
            activityLevel={networkData.activityLevel}
          />
          
          <FloatingIcon 
            icon={iconColors.heart.icon}
            color={iconColors.heart.color}
            position={{
              top: "10%",
              left: "25%",
              transform: "translateX(-50%)"
            }}
            animationDelay={0}
            isVisible={isVisible}
            pulseIntensity="high"
          />
          
          <FloatingIcon 
            icon={iconColors.pill.icon}
            color={iconColors.pill.color}
            position={{
              top: "25%",
              right: "25%",
              transform: "translateX(50%)"
            }}
            animationDelay={0.5}
            isVisible={isVisible}
            pulseIntensity="medium"
          />
          
          <FloatingIcon 
            icon={iconColors.beaker.icon}
            color={iconColors.beaker.color}
            position={{
              bottom: "25%",
              left: "30%",
              transform: "translateX(-50%)"
            }}
            animationDelay={1}
            isVisible={isVisible}
            pulseIntensity="high"
          />
          
          <FloatingIcon 
            icon={iconColors.thermometer.icon}
            color={iconColors.thermometer.color}
            position={{
              bottom: "15%",
              right: "30%",
              transform: "translateX(50%)"
            }}
            animationDelay={1.5}
            isVisible={isVisible}
            pulseIntensity="medium"
          />
          
          {/* Data particles with increased count and varied speeds */}
          {Array.from({ length: 12 }).map((_, index) => (
            <DataParticle 
              key={index} 
              index={index} 
              isVisible={isVisible} 
              speed={index % 3 === 0 ? 'fast' : index % 3 === 1 ? 'normal' : 'slow'}
              size={index % 3 === 0 ? 'small' : index % 3 === 1 ? 'normal' : 'large'}
            />
          ))}
        </div>
        
        {/* Data-driven statistics */}
        <StatisticDisplay statistics={statistics} isVisible={isVisible} />
        
        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-moh-green to-moh-darkGreen text-white rounded-md font-medium flex items-center gap-2 mx-auto"
            onClick={() => {
              toast({
                title: "Explore Healthcare Innovations",
                description: "Redirecting to our innovation showcase",
                duration: 3000,
              });
            }}
          >
            Explore Healthcare Solutions
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
        
        <DataActivityIndicator activityLevel={networkData.activityLevel} isVisible={isVisible} />
      </div>
    </section>
  );
}
