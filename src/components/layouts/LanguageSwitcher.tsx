
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // This ensures hydration matching by only rendering after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full">
      <Globe className="h-5 w-5" />
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === 'ar' ? "start" : "end"} className={language === 'ar' ? 'rtl-menu arabic-text' : ''}>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={`${language === 'en' ? 'bg-moh-lightGreen' : ''} flex items-center gap-2`}
        >
          <span className="flex items-center">
            <span className="mr-2">🇬🇧</span>
            {t('general.english')}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('ar')} 
          className={`${language === 'ar' ? 'bg-moh-lightGreen' : ''} flex items-center gap-2 arabic-text`}
        >
          <span className="flex items-center">
            <span className="mr-2">🇸🇦</span>
            {t('general.arabic')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
