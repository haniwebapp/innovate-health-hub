
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users, Award, Globe } from "lucide-react";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
import { getRTLClasses } from "@/utils/rtlUtils";

export default function HeroSection() {
  const { t, language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Adjust icon placement based on language
  const iconPosition = language === 'ar' ? 'ml-1.5' : 'mr-1.5';
  
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-moh-lightGreen to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className={`max-w-3xl ${rtlClasses.margin}`}
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-moh-darkGreen ${rtlClasses.text}`}>
            {language === 'ar' ? (
              <div className="flex items-center">
                <ArabicVerticalText text="منصة الابتكار الصحي" />
                <span className="mr-4">{t('about.title')}</span>
              </div>
            ) : (
              <>
                {t('about.title')}
                <div className="inline-block ml-4">
                  <ArabicVerticalText text="منصة الابتكار الصحي" />
                </div>
              </>
            )}
          </h1>
          <motion.p 
            className={`text-lg text-gray-700 mb-8 leading-relaxed ${rtlClasses.text}`}
            variants={fadeInUpVariants}
          >
            {t('about.description')}
          </motion.p>
          
          <motion.div 
            className={`flex flex-wrap gap-3 ${language === 'ar' ? 'justify-end' : ''}`}
            variants={staggerVariants}
          >
            <motion.span 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Users className={iconPosition} size={16} />
              500+ {t('about.innovators')}
            </motion.span>
            <motion.span 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Award className={iconPosition} size={16} />
              40+ {t('about.challenges')}
            </motion.span>
            <motion.span 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Globe className={iconPosition} size={16} />
              {t('about.impact')}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#00814A" strokeWidth="2" />
          <path d="M30,50 L45,65 L70,35" stroke="#00814A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      {/* Additional Arabic decoration for Arabic mode */}
      {language === 'ar' && (
        <motion.div 
          className="absolute top-20 left-10 opacity-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 C28.95,10 12,26.95 12,48 C12,69.05 28.95,86 50,86 C71.05,86 88,69.05 88,48 C88,26.95 71.05,10 50,10 Z" stroke="#00814A" strokeWidth="2" fill="none" />
            <path d="M30,50 C40,30 60,30 70,50 M30,50 C40,70 60,70 70,50" stroke="#00814A" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      )}
    </section>
  );
}
