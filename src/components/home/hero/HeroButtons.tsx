
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRTLClasses } from "@/utils/rtlUtils";

export function HeroButtons() {
  const { t, language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };
  
  // Handle icon placement based on language
  const iconPosition = language === 'ar' ? 'ml-2' : 'mr-2';
  const motionDirection = language === 'ar' ? [-5, 0, -5] : [0, 5, 0];
  const arrowRotation = language === 'ar' ? 'rotate-180' : '';
  
  return (
    <motion.div 
      className={`flex flex-col sm:flex-row justify-center gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen text-white shadow-md group" asChild>
          <Link to="/innovations">
            {language === 'ar' && (
              <motion.div 
                animate={{ x: motionDirection }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
              >
                <ArrowRight className={`${iconPosition} h-4 w-4 ${arrowRotation}`} />
              </motion.div>
            )}
            {t('home.hero.exploreButton')}
            {language === 'en' && (
              <motion.div 
                animate={{ x: motionDirection }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
              >
                <ArrowRight className={`${iconPosition} h-4 w-4`} />
              </motion.div>
            )}
          </Link>
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button size="lg" variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold hover:text-moh-darkGold/90 shadow-sm group" asChild>
          <Link to="/challenges">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className={iconPosition} size={16} />
            </motion.div>
            {t('home.hero.joinButton')}
          </Link>
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen shadow-sm" asChild>
          <Link to="/investment">
            <Award className={iconPosition} size={16} />
            {t('home.hero.investmentButton')}
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
