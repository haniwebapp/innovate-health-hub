
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users, Award, Globe } from "lucide-react";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

export default function HeroSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-moh-lightGreen to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-moh-darkGreen">
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
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t('about.description')}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
              <Users className="h-4 w-4 mr-1.5" />
              500+ {t('about.innovators')}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium">
              <Award className="h-4 w-4 mr-1.5" />
              40+ {t('about.challenges')}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
              <Globe className="h-4 w-4 mr-1.5" />
              {t('about.impact')}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#00814A" strokeWidth="2" />
          <path d="M30,50 L45,65 L70,35" stroke="#00814A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
