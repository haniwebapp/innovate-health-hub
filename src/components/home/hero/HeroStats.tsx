
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroStats() {
  const { t, language } = useLanguage();
  
  const stats = [
    { 
      value: 250, 
      label: t('home.hero.stats.innovators'),
      suffix: "+"
    },
    { 
      value: 125, 
      label: t('home.hero.stats.investments'),
      suffix: "M"
    },
    { 
      value: 15, 
      label: t('home.hero.stats.challenges'),
      suffix: ""
    }
  ];
  
  return (
    <motion.div
      className={`flex ${language === 'ar' ? 'flex-row-reverse' : ''} justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.7 }}
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 1.7 + index * 0.2, 
            duration: 0.5
          }}
        >
          <div className="text-2xl md:text-3xl font-bold text-moh-darkGreen flex items-center justify-center">
            <AnimatedCounter 
              value={stat.value} 
              suffix={stat.suffix} 
              duration={2} 
              delay={2 + index * 0.2} 
            />
          </div>
          <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
