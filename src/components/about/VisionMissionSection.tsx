
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function VisionMissionSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.vision')}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t('about.visionText')}
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.mission')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('about.missionText')}
            </p>
          </motion.div>
          
          <motion.div 
            className={`rounded-lg overflow-hidden shadow-xl order-2 ${language === 'ar' ? 'md:order-1' : 'md:order-2'}`}
            initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt={language === 'ar' ? "الابتكار في مجال الرعاية الصحية" : "Healthcare innovation"}
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
