
import React, { createContext, useState, useContext, ReactNode } from 'react';

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

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.challenges': 'Challenges',
    'nav.innovations': 'Innovations',
    'nav.knowledgeHub': 'Knowledge Hub',
    'nav.allResources': 'All Resources',
    'nav.articles': 'Articles',
    'nav.videos': 'Videos',
    'nav.guides': 'Guides',
    'nav.researchPapers': 'Research Papers',
    'nav.search': 'Search',
    'nav.language': 'Language',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'nav.signIn': 'Sign In',
    'nav.register': 'Register',
    
    // Login page
    'login.title': 'Innovation Platform',
    'login.description': 'Enter your credentials to access the healthcare innovation ecosystem',
    'login.signIn': 'Sign In',
    'login.accessAccount': 'Access your account to manage innovations and challenges',
    'login.termsAndPrivacy': 'By signing in, you agree to our Terms of Service and Privacy Policy',
    
    // General
    'general.english': 'English',
    'general.arabic': 'Arabic',
  },
  ar: {
    // Navigation
    'nav.about': 'نبذة عنا',
    'nav.challenges': 'التحديات',
    'nav.innovations': 'الابتكارات',
    'nav.knowledgeHub': 'مركز المعرفة',
    'nav.allResources': 'جميع الموارد',
    'nav.articles': 'المقالات',
    'nav.videos': 'الفيديوهات',
    'nav.guides': 'الأدلة',
    'nav.researchPapers': 'الأبحاث',
    'nav.search': 'بحث',
    'nav.language': 'اللغة',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    'nav.signIn': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    
    // Login page
    'login.title': 'منصة الابتكار',
    'login.description': 'أدخل بيانات الاعتماد للوصول إلى نظام الابتكار الصحي',
    'login.signIn': 'تسجيل الدخول',
    'login.accessAccount': 'الوصول إلى حسابك لإدارة الابتكارات والتحديات',
    'login.termsAndPrivacy': 'بتسجيل الدخول، فإنك توافق على شروط الخدمة وسياسة الخصوصية',
    
    // General
    'general.english': 'الإنجليزية',
    'general.arabic': 'العربية',
  }
};

// Create provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from localStorage or default to English
  const savedLanguage = localStorage.getItem('language') as Language;
  const [language, setLanguage] = useState<Language>(savedLanguage || 'en');

  // Update language and save to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Add language class to document for CSS adjustments
    document.documentElement.lang = lang;
    document.documentElement.classList.remove('lang-en', 'lang-ar');
    document.documentElement.classList.add(`lang-${lang}`);
  };

  // Translation function
  const translate = (key: string): string => {
    if (!translations[language][key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);
