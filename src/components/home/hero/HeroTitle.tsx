
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/animations/TextReveal";
import { motion } from "framer-motion";

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
      <motion.div 
        className="flex flex-col gap-4 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TextReveal 
          text="Empowering"
          className="text-moh-darkGreen block"
          delay={1}
          staggerDelay={0}
          splitBy="words"
        />
        <TextReveal 
          text="Health"
          className="text-moh-darkGreen block"
          delay={1.5}
          staggerDelay={0}
          splitBy="words"
        />
        <TextReveal 
          text="Innovation"
          className="text-moh-darkGreen block"
          delay={2}
          staggerDelay={0}
          splitBy="words"
        />
      </motion.div>
    </h1>
  );
};
