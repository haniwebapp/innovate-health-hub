
import React, { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

export function HeroHeading() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t, language } = useLanguage();
  
  return (
    <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
      <div className="flex flex-row justify-center items-start py-0">
        {language === 'ar' && <ArabicVerticalText text="2030" className="text-moh-gold opacity-40 text-6xl font-extrabold" />}
        
        <div className={language === 'ar' ? 'mr-4' : 'ml-4'}>
          <TextReveal text={t('home.hero.titleGradient')} className="text-gradient block" delay={0.6} staggerDelay={0.05} splitBy="words" />
          <TextReveal text={t('home.hero.titleDark')} className="text-moh-darkGreen block mt-2" delay={1} staggerDelay={0.04} splitBy="words" />
        </div>
        
        {language === 'en' && <ArabicVerticalText text="2030" className="text-moh-gold opacity-40 text-6xl font-extrabold" />}
      </div>
    </h1>
  );
}
