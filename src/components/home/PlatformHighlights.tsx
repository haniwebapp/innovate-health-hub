
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import { 
  FeatureCard, 
  HighlightsSectionHeader, 
  HighlightsCallToAction,
  BackgroundDecorations,
  getFeatures
} from "./platform-highlights";

export default function PlatformHighlights() {
  const { t, language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  // State to track the active feature card
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);
  
  // Get features with translations
  const features = getFeatures(t);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-moh-lightGreen/20 relative overflow-hidden">
      <BackgroundDecorations language={language} />
      
      <div className="container mx-auto px-4 relative z-10">
        <HighlightsSectionHeader
          tag={t('home.features.tag') || "Platform Features"}
          title={t('home.features.title') || "Advancing Healthcare Innovation"}
          subtitle={t('home.features.subtitle') || "Our platform provides comprehensive tools and resources to support healthcare innovations from concept to implementation."}
        />
        
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
        
        <HighlightsCallToAction 
          ctaText={t('home.features.cta') || "Explore All Features"}
          learnMoreText={t('home.features.learnMore') || "Learn About Our Mission"}
        />
      </div>
    </section>
  );
}
