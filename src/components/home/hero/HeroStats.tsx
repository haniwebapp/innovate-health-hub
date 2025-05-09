
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

export function HeroStats() {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="mt-16 grid grid-cols-3 gap-4" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-center">
        <div className="font-bold text-2xl text-moh-green">
          <AnimatedCounter value={500} suffix="+" duration={2.5} />
        </div>
        <div className="text-sm text-gray-600">{t('home.hero.stats.innovators')}</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-2xl text-moh-darkGold">
          <AnimatedCounter value={250} suffix="M+" duration={2.5} delay={0.2} />
        </div>
        <div className="text-sm text-gray-600">{t('home.hero.stats.investments')}</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-2xl text-moh-green">
          <AnimatedCounter value={40} suffix="+" duration={2.5} delay={0.4} />
        </div>
        <div className="text-sm text-gray-600">{t('home.hero.stats.challenges')}</div>
      </div>
    </motion.div>
  );
}
