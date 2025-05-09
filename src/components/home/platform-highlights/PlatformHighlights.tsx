
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
import { FeatureCard } from "./FeatureCard";
import { HighlightsSectionHeader } from "./HighlightsSectionHeader";
import { HighlightsCallToAction } from "./HighlightsCallToAction";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { features } from "./features";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function PlatformHighlights() {
  // State to track the active feature card
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // For vertical text display (decorative)
  const verticalTexts = ["INNOVATE", "CONNECT", "TRANSFORM"];
  
  // Stagger animation for feature cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  return (
    <motion.section 
      ref={sectionRef}
      id="platform-highlights" 
      className="py-24 bg-gradient-to-b from-white to-moh-lightGreen/20 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.6 }
        }
      }}
    >
      <BackgroundDecorations verticalTexts={verticalTexts} />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollFadeIn>
          <HighlightsSectionHeader />
        </ScrollFadeIn>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
              delay={index}
              ctaLink={feature.ctaLink}
              onHover={() => setActiveFeatureIndex(index)}
              isActive={activeFeatureIndex === index}
            />
          ))}
        </motion.div>
        
        <ScrollFadeIn delay={0.5}>
          <HighlightsCallToAction />
        </ScrollFadeIn>
      </div>
      
      {/* Animated particles in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-moh-green/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}
