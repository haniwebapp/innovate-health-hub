
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
import { getRTLClasses } from "@/utils/rtlUtils";

export function HeroHeading() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t, language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  return (
    <h1 ref={titleRef} className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight ${rtlClasses.text}`}>
      <div className={`flex items-start justify-center py-0 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
        {language === 'ar' && (
          <ArabicVerticalText text="صحي" className="ml-4" delay={0.5} />
        )}
        
        <div className={language === 'ar' ? 'ml-4' : 'mr-4'}>
          <TextReveal 
            text={t('home.hero.titleGradient')} 
            className="text-gradient block" 
            delay={0.6} 
            staggerDelay={0.05} 
            splitBy="words" 
          />
          <TextReveal 
            text={t('home.hero.titleDark')} 
            className="text-moh-darkGreen block mt-2" 
            delay={1} 
            staggerDelay={0.04} 
            splitBy="words" 
          />
        </div>
        
        {language === 'en' && (
          <ArabicVerticalText text="صحي" className="mr-4" delay={0.5} />
        )}
      </div>
    </h1>
  );
}
