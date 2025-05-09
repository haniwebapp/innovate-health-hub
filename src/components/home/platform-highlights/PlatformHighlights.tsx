
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import { Button } from "@/components/ui/button";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
import { FeatureCard } from "./FeatureCard";
import { HighlightsSectionHeader } from "./HighlightsSectionHeader";
import { HighlightsCallToAction } from "./HighlightsCallToAction";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { features } from "./features";

export default function PlatformHighlights() {
  const { language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  // State to track the active feature card
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);
  
  // For vertical text display (decorative)
  const verticalTexts = language === 'en' 
    ? ["INNOVATE", "CONNECT", "TRANSFORM"] 
    : ["ابتكار", "تواصل", "تحول"];
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-moh-lightGreen/20 relative overflow-hidden">
      <BackgroundDecorations verticalTexts={verticalTexts} />
      
      <div className="container mx-auto px-4 relative z-10">
        <HighlightsSectionHeader />
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 ${rtlClasses.container}`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
              ctaLink={feature.ctaLink}
              onHover={() => setActiveFeatureIndex(index)}
              isActive={activeFeatureIndex === index}
            />
          ))}
        </div>
        
        <HighlightsCallToAction />
      </div>
    </section>
  );
}
