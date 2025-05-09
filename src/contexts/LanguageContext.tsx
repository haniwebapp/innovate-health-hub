
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { enTranslations } from '@/translations/en';
import { arTranslations } from '@/translations/ar';

// Define available languages
export type Language = 'en' | 'ar';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation data combining imports
const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  ar: arTranslations
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem('language');
    return (storedLanguage === 'ar' ? 'ar' : 'en') as Language;
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
