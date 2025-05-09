
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

export function HeroHeading() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t, language } = useLanguage();
  
  // Dynamic tagline text based on language
  const taglineGradient = t('home.hero.titleGradient') || "Empowering Health";
  const taglineDark = t('home.hero.titleDark') || "Innovation for a Better Tomorrow";
  
  return (
    <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
      <div className="flex flex-row justify-center items-start py-0">
        {language === 'ar' && (
          <ArabicVerticalText text="2030" className="ml-4" delay={0.5} />
        )}
        
        <div className={language === 'ar' ? 'ml-4' : 'mr-4'}>
          <TextReveal 
            text={taglineGradient} 
            className="text-gradient bg-gradient-to-r from-moh-green to-moh-gold bg-clip-text text-transparent block" 
            delay={0.6} 
            staggerDelay={0.05} 
            splitBy="words" 
          />
          <TextReveal 
            text={taglineDark} 
            className="text-moh-darkGreen block mt-2" 
            delay={1} 
            staggerDelay={0.04} 
            splitBy="words" 
          />
        </div>
        
        {language === 'en' && (
          <ArabicVerticalText text="2030" className="mr-4" delay={0.5} />
        )}
      </div>
    </h1>
  );
}
