import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages (keeping just for RTL support)
export type Language = 'en' | 'ar';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Keep the function signature but it will return hardcoded text
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key, // Just return the key itself as fallback
});

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

  // Simplified t function that just returns the provided text
  // We're no longer using translations, but keeping the function for compatibility
  const t = (key: string): string => {
    return key;
  };

  // Save language to localStorage whenever it changes (for RTL support)
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
