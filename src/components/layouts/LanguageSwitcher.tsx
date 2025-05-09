
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={`${language === 'en' ? 'bg-moh-lightGreen' : ''}`}
        >
          <span className="flex items-center">
            <span className="mr-2">🇬🇧</span>
            {t('general.english')}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('ar')} 
          className={`${language === 'ar' ? 'bg-moh-lightGreen' : ''}`}
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
