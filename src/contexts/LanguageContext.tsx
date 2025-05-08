
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.challenges': 'Challenges',
    'nav.innovations': 'Innovations',
    'nav.knowledgeHub': 'Knowledge Hub',
    'nav.signin': 'Sign In',
    'nav.register': 'Register',
    
    // Hero
    'hero.title': 'Empowering Health Innovation',
    'hero.subtitle': 'for a Better Tomorrow',
    'hero.description': 'A one-stop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.',
    'hero.explore': 'Explore Innovations',
    'hero.join': 'Join a Challenge',
    'hero.access': 'Access Investment',
    'hero.stats.innovators': 'Innovators',
    'hero.stats.investments': 'Investments (SAR)',
    'hero.stats.challenges': 'Active Challenges',
    
    // About
    'about.title': 'About the Platform',
    'about.heading': 'Transforming Healthcare Through Innovation',
    'about.description1': 'The Health Innovation Platform is a key initiative aligned with Saudi Arabia\'s Vision 2030 and the Ministry of Health\'s strategic goals to transform healthcare delivery across the Kingdom.',
    'about.description2': 'Our platform serves as a comprehensive ecosystem connecting innovators, investors, and regulators, streamlining the journey from idea to implementation.',
    'about.vision': 'Learn About Vision 2030',
    'about.strategy': 'Ministry Strategy',
    'about.video': 'Overview Video',
    
    // Platform Highlights
    'highlights.title': 'Platform Highlights',
    'highlights.heading': 'Your Complete Innovation Ecosystem',
    'highlights.description': 'Our comprehensive suite of tools and services designed to support healthcare innovators at every stage of development.',
    
    // Features
    'features.ai.title': 'AI-Powered Innovation Matching',
    'features.ai.description': 'Our advanced AI algorithms connect innovators with the right investors, mentors, and resources.',
    'features.regulatory.title': 'Regulatory Sandbox Access',
    'features.regulatory.description': 'Test your innovations in a controlled environment with direct access to MOH regulatory guidance.',
    'features.investment.title': 'Investment Marketplace',
    'features.investment.description': 'Connect with qualified investors seeking to fund the next breakthrough in healthcare innovation.',
    'features.knowledge.title': 'Knowledge Hub',
    'features.knowledge.description': 'Access resources, case studies, and best practices to accelerate your innovation journey.',
    'features.challenge.title': 'Challenge Submissions',
    'features.challenge.description': 'Participate in MOH-sponsored innovation challenges to solve critical healthcare problems.',
    'features.global.title': 'Global Health Network',
    'features.global.description': 'Connect with international partners and access global health innovation trends and insights.',
    
    // Featured
    'featured.title': 'Platform Impact',
    'featured.description': 'Driving real-world healthcare transformation through innovation and collaboration.',
    'featured.registeredInnovators': 'Registered Innovators',
    'featured.investmentDeals': 'Investment Deals Closed',
    'featured.solutionsLaunched': 'Solutions Launched',
    'featured.successRate': 'Success Rate',
    'featured.readMore': 'Read More',
    
    // Challenges
    'challenges.title': 'Innovation Challenges',
    'challenges.heading': 'Upcoming Opportunities',
    'challenges.description': 'Join MOH-sponsored challenges to solve critical healthcare issues and unlock funding opportunities.',
    'challenges.viewAll': 'View All Challenges',
    'challenges.viewChallenge': 'View Challenge',
    'challenges.deadline': 'Deadline',
    'challenges.participants': 'Participants',
    'challenges.prize': 'Prize',
    'challenges.nextDeadline': 'Next challenge submission deadline',
    
    // Footer
    'footer.about': 'A Ministry of Health initiative supporting healthcare innovation across Saudi Arabia.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.newsletter': 'Newsletter',
    'footer.subscribe': 'Subscribe to stay updated with the latest innovations and opportunities.',
    'footer.emailPlaceholder': 'Email address',
    'footer.subscribeButton': 'Subscribe',
    'footer.rights': 'Ministry of Health, Kingdom of Saudi Arabia. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
  },
  ar: {
    // Navigation
    'nav.about': 'عن المنصة',
    'nav.challenges': 'التحديات',
    'nav.innovations': 'الابتكارات',
    'nav.knowledgeHub': 'مركز المعرفة',
    'nav.signin': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    
    // Hero
    'hero.title': 'تمكين الابتكار الصحي',
    'hero.subtitle': 'لغد أفضل',
    'hero.description': 'منصة متكاملة تربط المبتكرين الصحيين والمستثمرين والمنظمين لتحويل تقديم الرعاية الصحية في المملكة العربية السعودية.',
    'hero.explore': 'استكشاف الابتكارات',
    'hero.join': 'الانضمام للتحديات',
    'hero.access': 'الوصول للاستثمار',
    'hero.stats.innovators': 'مبتكرين',
    'hero.stats.investments': 'استثمارات (ريال)',
    'hero.stats.challenges': 'تحديات نشطة',
    
    // About
    'about.title': 'عن المنصة',
    'about.heading': 'تحويل الرعاية الصحية من خلال الابتكار',
    'about.description1': 'منصة الابتكار الصحي هي مبادرة رئيسية متوافقة مع رؤية المملكة 2030 وأهداف وزارة الصحة الاستراتيجية لتحويل تقديم الرعاية الصحية في المملكة.',
    'about.description2': 'تعمل منصتنا كنظام بيئي شامل يربط المبتكرين والمستثمرين والمنظمين، وتبسيط الرحلة من الفكرة إلى التنفيذ.',
    'about.vision': 'تعرف على رؤية 2030',
    'about.strategy': 'استراتيجية الوزارة',
    'about.video': 'فيديو تعريفي',
    
    // Platform Highlights
    'highlights.title': 'مميزات المنصة',
    'highlights.heading': 'نظام الابتكار المتكامل',
    'highlights.description': 'مجموعة شاملة من الأدوات والخدمات المصممة لدعم مبتكري الرعاية الصحية في كل مرحلة من مراحل التطوير.',
    
    // Features
    'features.ai.title': 'مطابقة الابتكار بالذكاء الاصطناعي',
    'features.ai.description': 'خوارزميات الذكاء الاصطناعي المتقدمة تربط المبتكرين بالمستثمرين والموجهين والموارد المناسبة.',
    'features.regulatory.title': 'الوصول إلى المختبر التنظيمي',
    'features.regulatory.description': 'اختبر ابتكاراتك في بيئة محكمة مع إمكانية الوصول المباشر إلى التوجيه التنظيمي من وزارة الصحة.',
    'features.investment.title': 'سوق الاستثمار',
    'features.investment.description': 'تواصل مع المستثمرين المؤهلين الذين يسعون لتمويل الاختراقات القادمة في مجال الابتكار الصحي.',
    'features.knowledge.title': 'مركز المعرفة',
    'features.knowledge.description': 'الوصول إلى الموارد ودراسات الحالة وأفضل الممارسات لتسريع رحلة الابتكار الخاصة بك.',
    'features.challenge.title': 'تقديم التحديات',
    'features.challenge.description': 'المشاركة في تحديات الابتكار التي ترعاها وزارة الصحة لحل المشكلات الصحية الحرجة.',
    'features.global.title': 'شبكة الصحة العالمية',
    'features.global.description': 'التواصل مع شركاء دوليين والوصول إلى اتجاهات الابتكار الصحي العالمية ورؤى جديدة.',
    
    // Featured
    'featured.title': 'تأثير المنصة',
    'featured.description': 'دفع تحول الرعاية الصحية في العالم الواقعي من خلال الابتكار والتعاون.',
    'featured.registeredInnovators': 'المبتكرين المسجلين',
    'featured.investmentDeals': 'صفقات الاستثمار المغلقة',
    'featured.solutionsLaunched': 'الحلول المطلقة',
    'featured.successRate': 'معدل النجاح',
    'featured.readMore': 'قراءة المزيد',
    
    // Challenges
    'challenges.title': 'تحديات الابتكار',
    'challenges.heading': 'الفرص القادمة',
    'challenges.description': 'انضم إلى التحديات التي ترعاها وزارة الصحة لحل القضايا الصحية الحرجة وفتح فرص التمويل.',
    'challenges.viewAll': 'عرض جميع التحديات',
    'challenges.viewChallenge': 'عرض التحدي',
    'challenges.deadline': 'الموعد النهائي',
    'challenges.participants': 'المشاركين',
    'challenges.prize': 'الجائزة',
    'challenges.nextDeadline': 'الموعد النهائي للتقديم للتحدي القادم',
    
    // Footer
    'footer.about': 'مبادرة من وزارة الصحة لدعم الابتكار الصحي في جميع أنحاء المملكة العربية السعودية.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.resources': 'الموارد',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribe': 'اشترك للبقاء على اطلاع بأحدث الابتكارات والفرص.',
    'footer.emailPlaceholder': 'البريد الإلكتروني',
    'footer.subscribeButton': 'اشتراك',
    'footer.rights': 'وزارة الصحة، المملكة العربية السعودية. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.accessibility': 'إمكانية الوصول',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if localStorage is available (client-side)
  const isBrowser = typeof window !== 'undefined';
  
  // Determine if the browser prefers Arabic (ar) or default to English (en)
  const getBrowserLanguage = (): Language => {
    if (!isBrowser) return 'en';
    
    const browserLang = navigator.language;
    return browserLang.startsWith('ar') ? 'ar' : 'en';
  };
  
  const [language, setLanguageState] = useState<Language>(() => {
    if (!isBrowser) return 'en';
    
    // Try to get from localStorage or use browser preference
    const saved = localStorage.getItem('language') as Language;
    return saved ? saved : getBrowserLanguage();
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (isBrowser) {
      localStorage.setItem('language', newLanguage);
      
      // Update the dir attribute on the html element
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      
      // Add or remove the font class for Arabic
      if (newLanguage === 'ar') {
        document.documentElement.classList.add('font-arabic');
      } else {
        document.documentElement.classList.remove('font-arabic');
      }
    }
  };

  // Function to get translation by key
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Set the initial direction and font on mount
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      
      if (language === 'ar') {
        document.documentElement.classList.add('font-arabic');
      } else {
        document.documentElement.classList.remove('font-arabic');
      }
    }
  }, [language, isBrowser]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
