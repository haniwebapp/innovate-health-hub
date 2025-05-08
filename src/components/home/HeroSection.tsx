
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-fade-in');
    }
  }, []);
  
  return (
    <section className={`pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-moh-darkGreen via-moh-darkGreen/90 to-moh-darkGold/20'
        : 'bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold'
    } relative overflow-hidden`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <div className={`w-28 h-28 mx-auto mb-8 ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white'
          } rounded-full shadow-xl flex items-center justify-center animate-float`}>
            <div className="w-20 h-20 bg-gradient-to-r from-moh-green to-moh-darkGreen rounded-full flex items-center justify-center">
              <img 
                alt="MOH Innovation Logo" 
                className="w-18 h-18 object-contain" 
                src="/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png" 
              />
            </div>
          </div>
          
          <h1 
            ref={titleRef} 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 opacity-0 tracking-tight"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <span className={theme === 'dark' ? 'text-gradient-light' : 'text-gradient'}>
              {t('hero.title')}
            </span>
            <br />
            <span className={theme === 'dark' ? 'text-white' : 'text-moh-darkGreen'}>
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in animation-delay-300">
            <Button size="lg" className={`${
              theme === 'dark'
                ? 'bg-moh-lightGreen hover:bg-moh-lightGreen/90 text-moh-darkGreen'
                : 'bg-moh-green hover:bg-moh-darkGreen text-white'
            } shadow-md`}>
              {t('hero.explore')}
              <ArrowRight className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
            </Button>
            <Button size="lg" variant="outline" className={`${
              theme === 'dark'
                ? 'border-moh-gold/80 text-moh-lightGold hover:bg-moh-gold/10'
                : 'border-moh-gold text-moh-darkGold hover:bg-moh-lightGold'
            } shadow-sm`}>
              <Sparkles className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('hero.join')}
            </Button>
            <Button size="lg" variant="outline" className={`${
              theme === 'dark'
                ? 'border-moh-lightGreen text-moh-lightGreen hover:bg-moh-green/10'
                : 'border-moh-green text-moh-green hover:bg-moh-lightGreen'
            } shadow-sm`}>
              <Award className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('hero.access')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 opacity-0 animate-fade-in animation-delay-500">
            <div className="text-center">
              <div className={`font-bold text-2xl ${
                theme === 'dark' ? 'text-moh-lightGreen' : 'text-moh-green'
              }`}>500+</div>
              <div className={theme === 'dark' ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>
                {t('hero.stats.innovators')}
              </div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-2xl ${
                theme === 'dark' ? 'text-moh-lightGold' : 'text-moh-darkGold'
              }`}>250M+</div>
              <div className={theme === 'dark' ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>
                {t('hero.stats.investments')}
              </div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-2xl ${
                theme === 'dark' ? 'text-moh-lightGreen' : 'text-moh-green'
              }`}>40+</div>
              <div className={theme === 'dark' ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>
                {t('hero.stats.challenges')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t ${
        theme === 'dark' ? 'from-moh-darkGreen' : 'from-white'
      } to-transparent`}></div>
      <div className="hidden md:block absolute -bottom-16 -right-16 w-64 h-64 bg-moh-green/10 rounded-full opacity-30 blur-xl"></div>
      <div className="hidden md:block absolute -top-16 -left-16 w-48 h-48 bg-moh-gold/10 rounded-full opacity-30 blur-xl"></div>
      <div className="hidden lg:block absolute top-1/4 right-16 w-24 h-24 bg-moh-gold/20 rounded-full opacity-20 blur-md"></div>
      <div className="hidden lg:block absolute bottom-1/4 left-16 w-24 h-24 bg-moh-green/20 rounded-full opacity-20 blur-md"></div>
    </section>
  );
}
