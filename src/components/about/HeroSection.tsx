
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users, Award, Globe } from "lucide-react";

export default function HeroSection() {
  const { t, language } = useLanguage();
  
  const badges = [
    {
      icon: <Users className="h-4 w-4 mr-1.5" />,
      text: `500+ ${t('about.innovators')}`
    },
    {
      icon: <Award className="h-4 w-4 mr-1.5" />,
      text: `40+ ${t('about.challenges')}`
    },
    {
      icon: <Globe className="h-4 w-4 mr-1.5" />,
      text: t('about.impact')
    }
  ];
  
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-moh-lightGreen to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/db2a212e-f181-4a0e-b1c6-e07fc39f3d49.png" 
              alt={t('footer.mohLogo')}
              className="h-12 mr-4" 
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-moh-darkGreen">
            {t('about.title')}
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t('about.description')}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {badges.map((badge, index) => (
              <motion.span 
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium"
                initial={{ opacity: 0, x: language === 'ar' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {language === 'ar' ? (
                  <>
                    {badge.text}
                    <span className="ml-1.5">{badge.icon}</span>
                  </>
                ) : (
                  <>
                    {badge.icon}
                    {badge.text}
                  </>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-0 right-0 opacity-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#00814A" strokeWidth="2" />
          <path d="M30,50 L45,65 L70,35" stroke="#00814A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
