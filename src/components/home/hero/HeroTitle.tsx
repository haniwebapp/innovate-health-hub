
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TextReveal } from "@/components/animations/TextReveal";
import { motion } from "framer-motion";
import { Heart, Brain, Lightbulb } from "lucide-react";

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
      
      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center mb-3">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mr-3"
          >
            <Heart className="h-6 w-6 text-moh-green" />
          </motion.div>
          <TextReveal 
            text="E m p o w e r i n g"
            className="text-moh-darkGreen tracking-wider"
            delay={1}
            staggerDelay={0.08}
            splitBy="chars"
          />
        </div>
        
        <div className="flex items-center mb-3">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mr-3"
          >
            <Brain className="h-6 w-6 text-moh-darkGold" />
          </motion.div>
          <TextReveal 
            text="H e a l t h"
            className="text-moh-darkGreen tracking-wider"
            delay={1.2}
            staggerDelay={0.08}
            splitBy="chars"
          />
        </div>
        
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mr-3"
          >
            <Lightbulb className="h-6 w-6 text-moh-gold" />
          </motion.div>
          <TextReveal 
            text="I n n o v a t i o n"
            className="text-moh-darkGreen tracking-wider"
            delay={1.4}
            staggerDelay={0.08}
            splitBy="chars"
          />
        </div>
      </div>
    </h1>
  );
};
