
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import enTranslations from '@/languages/en.json';
import arTranslations from '@/languages/ar.json';

// Define supported languages
type Language = 'en' | 'ar';

// Context type definition
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  isRTL: boolean;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLoading: true,
  isRTL: false,
});

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Translation data
type Translations = Record<Language, Record<string, any>>;

const translations: Translations = {
  en: enTranslations,
  ar: arTranslations,
};

// Provider component
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedLanguage, setStoredLanguage] = useLocalStorage<Language>('language', 'en');
  const [language, setLanguageState] = useState<Language>(storedLanguage);
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = language === 'ar';

  // Update language
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setStoredLanguage(newLanguage);
    
    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
    
    // Add RTL class to body if Arabic
    if (newLanguage === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Set initial state on mount
  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add RTL class if Arabic
    if (language === 'ar') {
      document.body.classList.add('rtl');
    }
    
    setIsLoading(false);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, isRTL }}>
      {!isLoading && children}
    </LanguageContext.Provider>
  );
};
