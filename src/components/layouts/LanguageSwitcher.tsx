
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  
  // Animation when language changes
  useEffect(() => {
    if (isChangingLanguage) {
      const timer = setTimeout(() => {
        setIsChangingLanguage(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);
  
  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== language) {
      setIsChangingLanguage(true);
      setLanguage(newLanguage);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isChangingLanguage ? 'changing' : 'static'}
              initial={{ rotate: 0 }}
              animate={isChangingLanguage ? { rotate: 360 } : {}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Globe className="h-5 w-5" />
            </motion.div>
          </AnimatePresence>
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-moh-gold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px] bg-white">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')} 
          className={`${language === 'en' ? 'bg-moh-lightGreen' : ''} cursor-pointer flex items-center justify-between px-4 py-2`}
        >
          <span className="flex items-center">
            <span className={language === 'ar' ? 'ml-2' : 'mr-2'}>🇬🇧</span>
            {t('general.english')}
          </span>
          {language === 'en' && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }} 
              className="w-2 h-2 bg-moh-green rounded-full"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ar')} 
          className={`${language === 'ar' ? 'bg-moh-lightGreen' : ''} cursor-pointer flex items-center justify-between px-4 py-2`}
        >
          <span className="flex items-center">
            <span className={language === 'ar' ? 'ml-2' : 'mr-2'}>🇸🇦</span>
            {t('general.arabic')}
          </span>
          {language === 'ar' && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }} 
              className="w-2 h-2 bg-moh-green rounded-full"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
