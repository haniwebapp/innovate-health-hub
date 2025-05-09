
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroDescription = () => {
  const { t } = useLanguage();

  return (
    <motion.p 
      className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.4 }}
    >
      {t('home.hero.description')}
    </motion.p>
  );
};
