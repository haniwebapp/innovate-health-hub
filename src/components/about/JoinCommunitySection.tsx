
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function JoinCommunitySection() {
  const { t, language } = useLanguage();
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const DirectionalChevron = language === 'ar' ? ChevronLeft : ChevronRight;
  
  return (
    <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.joinCommunity')}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            {t('about.joinDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'ar' ? (
                <>
                  <ChevronLeft className="ml-2 h-5 w-5" />
                  {t('about.registerNow')}
                </>
              ) : (
                <>
                  {t('about.registerNow')}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </motion.button>
            <motion.button 
              className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-6 py-3 rounded-md font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('about.learnMore')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
