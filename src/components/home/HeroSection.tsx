
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { HeroLogo } from "./hero/HeroLogo";
import { HeroHeading } from "./hero/HeroHeading";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroStats } from "./hero/HeroStats";
import { HeroDecorations } from "./hero/HeroDecorations";
import { getRTLClasses } from "@/utils/rtlUtils";

export default function HeroSection() {
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  return (
    <section 
      className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl mx-auto text-center ${rtlClasses.container}`}>
          <HeroLogo />
          <HeroHeading />
          
          <motion.p 
            className={`text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed ${rtlClasses.text}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            {language === 'ar' ? 
              'منصة متكاملة تربط بين المبتكرين والمستثمرين والمنظمين في مجال الصحة لتحويل تقديم الرعاية الصحية في جميع أنحاء المملكة العربية السعودية.' : 
              'A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.'
            }
          </motion.p>
          
          <HeroButtons />
          <HeroStats />
        </div>
      </div>
      
      <HeroDecorations />
    </section>
  );
}
