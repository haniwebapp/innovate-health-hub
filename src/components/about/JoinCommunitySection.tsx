
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinCommunitySection() {
  const { t, language } = useLanguage();
  
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;
  
  return (
    <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('about.joinCommunity')}
        </motion.h2>
        <motion.p 
          className="max-w-2xl mx-auto mb-8 text-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t('about.joinDescription')}
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/auth/register">
            <motion.button 
              className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('about.registerNow')} 
              <ChevronIcon className={`${language === 'ar' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </motion.button>
          </Link>
          <Link to="/challenges">
            <motion.button 
              className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-6 py-3 rounded-md font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('about.learnMore')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
