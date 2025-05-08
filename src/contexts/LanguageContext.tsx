
import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.about': 'About',
    'nav.challenges': 'Challenges',
    'nav.innovations': 'Innovations',
    'nav.knowledgeHub': 'Knowledge Hub',
    'nav.signIn': 'Sign In',
    'nav.register': 'Register',
    
    // Hero section
    'hero.title1': 'Empowering Health Innovation',
    'hero.title2': 'for a Better Tomorrow',
    'hero.description': 'A one-stop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.',
    'hero.exploreInnovations': 'Explore Innovations',
    'hero.joinChallenge': 'Join a Challenge',
    'hero.accessInvestment': 'Access Investment',
    'hero.innovators': 'Innovators',
    'hero.investments': 'Investments (SAR)',
    'hero.challenges': 'Active Challenges',
    
    // Footer
    'footer.description': 'A Ministry of Health initiative supporting healthcare innovation across Saudi Arabia.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.newsletter': 'Newsletter',
    'footer.subscribe': 'Subscribe',
    'footer.emailPlaceholder': 'Email address',
    'footer.newsletterText': 'Subscribe to stay updated with the latest innovations and opportunities.',
    'footer.rights': '© 2025 Ministry of Health, Kingdom of Saudi Arabia. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
  },
  ar: {
    // Navbar
    'nav.about': 'نبذة عنا',
    'nav.challenges': 'التحديات',
    'nav.innovations': 'الابتكارات',
    'nav.knowledgeHub': 'مركز المعرفة',
    'nav.signIn': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    
    // Hero section
    'hero.title1': 'تمكين الابتكار الصحي',
    'hero.title2': 'لمستقبل أفضل',
    'hero.description': 'منصة شاملة تربط المبتكرين الصحيين والمستثمرين والمنظمين لتحويل تقديم الرعاية الصحية في جميع أنحاء المملكة العربية السعودية.',
    'hero.exploreInnovations': 'استكشف الابتكارات',
    'hero.joinChallenge': 'انضم إلى تحدي',
    'hero.accessInvestment': 'الوصول للاستثمار',
    'hero.innovators': 'مبتكرون',
    'hero.investments': 'الاستثمارات (ر.س)',
    'hero.challenges': 'تحديات نشطة',
    
    // Footer
    'footer.description': 'مبادرة من وزارة الصحة لدعم الابتكار الصحي في جميع أنحاء المملكة العربية السعودية.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.resources': 'الموارد',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribe': 'اشتراك',
    'footer.emailPlaceholder': 'البريد الإلكتروني',
    'footer.newsletterText': 'اشترك للبقاء على اطلاع بأحدث الابتكارات والفرص.',
    'footer.rights': '© 2025 وزارة الصحة، المملكة العربية السعودية. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.accessibility': 'إمكانية الوصول',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };
  
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
