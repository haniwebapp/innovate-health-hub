
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full relative"
        >
          <Globe className="h-5 w-5" />
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-moh-gold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={`${language === 'en' ? 'bg-moh-lightGreen' : ''} cursor-pointer`}
        >
          <span className="flex items-center">
            <span className={language === 'ar' ? 'ml-2' : 'mr-2'}>🇬🇧</span>
            {t('general.english')}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('ar')} 
          className={`${language === 'ar' ? 'bg-moh-lightGreen' : ''} cursor-pointer`}
        >
          <span className="flex items-center">
            <span className={language === 'ar' ? 'ml-2' : 'mr-2'}>🇸🇦</span>
            {t('general.arabic')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
