
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroButtons() {
  const { t, language } = useLanguage();
  
  const buttonClasses = `flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`;
  
  return (
    <motion.div
      className="flex flex-col sm:flex-row justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
    >
      <Button 
        asChild 
        size="lg" 
        className="bg-moh-green hover:bg-moh-darkGreen group"
      >
        <Link to="/innovations" className={buttonClasses}>
          <Rocket className={`w-4 h-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          {t('home.hero.exploreButton')}
        </Link>
      </Button>
      
      <Button 
        asChild 
        size="lg" 
        variant="outline" 
        className="border-moh-green text-moh-green hover:bg-moh-lightGreen group"
      >
        <Link to="/challenges" className={buttonClasses}>
          <Users className={`w-4 h-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          {t('home.hero.joinButton')}
        </Link>
      </Button>
      
      <Button 
        asChild 
        size="lg" 
        variant="outline" 
        className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold group"
      >
        <Link to="/investment" className={buttonClasses}>
          <BarChart3 className={`w-4 h-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          {t('home.hero.investmentButton')}
        </Link>
      </Button>
    </motion.div>
  );
}
