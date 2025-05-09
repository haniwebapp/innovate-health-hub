
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/animations/TextReveal";

export const HeroTitle = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
      <TextReveal 
        text={t('home.hero.titleGradient')}
        className="text-gradient block"
        delay={0.6}
        staggerDelay={0.05}
        splitBy="chars"
      />
      <TextReveal 
        text="Empowering"
        className="text-moh-darkGreen block mt-2"
        delay={1}
        staggerDelay={0.04}
        splitBy="words"
      />
      <TextReveal 
        text="Health"
        className="text-moh-darkGreen block mt-1"
        delay={1.2}
        staggerDelay={0.04}
        splitBy="words"
      />
      <TextReveal 
        text="Innovation"
        className="text-moh-darkGreen block mt-1"
        delay={1.4}
        staggerDelay={0.04}
        splitBy="words"
      />
    </h1>
  );
};
