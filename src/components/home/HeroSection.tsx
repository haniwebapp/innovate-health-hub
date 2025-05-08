
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t, direction } = useLanguage();
  
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-fade-in');
    }
  }, []);
  
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold dark:from-moh-darkGreen/50 dark:via-moh-darkGreen/30 dark:to-moh-darkGreen relative overflow-hidden" dir={direction}>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <div className="w-28 h-28 mx-auto mb-8 bg-white dark:bg-moh-darkGreen/40 rounded-full shadow-xl flex items-center justify-center animate-float">
            <div className="w-20 h-20 bg-gradient-to-r from-moh-green to-moh-darkGreen dark:from-moh-gold dark:to-moh-darkGold rounded-full flex items-center justify-center">
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
          >
            <span className="text-gradient dark:text-white">{t('hero.title1')}</span>
            <br />
            <span className="text-moh-darkGreen dark:text-moh-gold">{t('hero.title2')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200 leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in animation-delay-300">
            <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen text-white dark:bg-moh-gold dark:hover:bg-moh-darkGold dark:text-moh-darkGreen shadow-md">
              {t('hero.exploreInnovations')}
              <ArrowRight className={`${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
            </Button>
            <Button size="lg" variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold hover:text-moh-darkGold/90 dark:border-moh-gold dark:text-moh-gold dark:hover:bg-moh-darkGold/20 shadow-sm">
              <Sparkles className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('hero.joinChallenge')}
            </Button>
            <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen dark:border-moh-lightGreen dark:text-moh-lightGreen dark:hover:bg-moh-green/20 shadow-sm">
              <Award className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('hero.accessInvestment')}
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 opacity-0 animate-fade-in animation-delay-500">
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-green dark:text-moh-lightGreen">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.innovators')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-darkGold dark:text-moh-gold">250M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.investments')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-green dark:text-moh-lightGreen">40+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.challenges')}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-moh-darkGreen to-transparent"></div>
      <div className="hidden md:block absolute -bottom-16 -right-16 w-64 h-64 bg-moh-lightGreen dark:bg-moh-green/20 rounded-full opacity-30 blur-xl"></div>
      <div className="hidden md:block absolute -top-16 -left-16 w-48 h-48 bg-moh-lightGold dark:bg-moh-gold/20 rounded-full opacity-30 blur-xl"></div>
      <div className="hidden lg:block absolute top-1/4 right-16 w-24 h-24 bg-moh-gold dark:bg-moh-gold/30 rounded-full opacity-20 blur-md"></div>
      <div className="hidden lg:block absolute bottom-1/4 left-16 w-24 h-24 bg-moh-green dark:bg-moh-green/30 rounded-full opacity-20 blur-md"></div>
    </section>
  );
}
