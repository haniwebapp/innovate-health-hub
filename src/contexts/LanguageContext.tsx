
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
    
    // Home Hero Section
    'home.hero.titleGradient': 'Empowering Health Innovation',
    'home.hero.titleDark': 'for a Better Tomorrow',
    'home.hero.description': 'A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.',
    'home.hero.exploreButton': 'Explore Innovations',
    'home.hero.joinButton': 'Join a Challenge',
    'home.hero.investmentButton': 'Access Investment',
    'home.hero.stats.innovators': 'Innovators',
    'home.hero.stats.investments': 'Investments (SAR)',
    'home.hero.stats.challenges': 'Active Challenges',
    
    // About Section
    'home.about.tag': 'About the Platform',
    'home.about.title': 'Transforming Healthcare Through Innovation',
    'home.about.paragraph1': 'The Health Innovation Platform is a key initiative aligned with Saudi Arabia\'s Vision 2030 and the Ministry of Health\'s strategic goals to transform healthcare delivery across the Kingdom.',
    'home.about.paragraph2': 'Our platform serves as a comprehensive ecosystem connecting innovators, investors, and regulators, streamlining the journey from idea to implementation.',
    'home.about.vision2030Button': 'Learn About Vision 2030',
    'home.about.strategyButton': 'Ministry Strategy',
    'home.about.videoOverlay': 'Overview Video',
    'home.about.videoDuration': '2:45',
    
    // Platform Highlights
    'home.highlights.tag': 'Platform Highlights',
    'home.highlights.title': 'Your Complete Innovation Ecosystem',
    'home.highlights.description': 'Our comprehensive suite of tools and services designed to support healthcare innovators at every stage of development.',
    'home.highlights.feature1.title': 'AI-Powered Innovation Matching',
    'home.highlights.feature1.description': 'Our advanced AI algorithms connect innovators with the right investors, mentors, and resources.',
    'home.highlights.feature2.title': 'Regulatory Sandbox Access',
    'home.highlights.feature2.description': 'Test your innovations in a controlled environment with direct access to MOH regulatory guidance.',
    'home.highlights.feature3.title': 'Investment Marketplace',
    'home.highlights.feature3.description': 'Connect with qualified investors seeking to fund the next breakthrough in healthcare innovation.',
    'home.highlights.feature4.title': 'Knowledge Hub',
    'home.highlights.feature4.description': 'Access resources, case studies, and best practices to accelerate your innovation journey.',
    'home.highlights.feature5.title': 'Challenge Submissions',
    'home.highlights.feature5.description': 'Participate in MOH-sponsored innovation challenges to solve critical healthcare problems.',
    'home.highlights.feature6.title': 'Global Health Network',
    'home.highlights.feature6.description': 'Connect with international partners and access global health innovation trends and insights.',
    
    // Featured Section
    'home.featured.title': 'Platform Impact',
    'home.featured.description': 'Driving real-world healthcare transformation through innovation and collaboration.',
    'home.featured.stats.innovators': 'Registered Innovators',
    'home.featured.stats.investments': 'Investment Deals Closed',
    'home.featured.stats.launched': 'Solutions Launched',
    'home.featured.stats.success': 'Success Rate',
    'home.featured.stories.title': 'Success Stories',
    'home.featured.readMore': 'Read More',
    'home.featured.story1.title': 'AI Diagnostic Platform',
    'home.featured.story1.category': 'Healthcare Tech',
    'home.featured.story1.description': 'An innovative AI platform that helps diagnose respiratory conditions with 97% accuracy, now deployed in 12 MOH hospitals.',
    'home.featured.story2.title': 'Portable Dialysis Device',
    'home.featured.story2.category': 'Medical Device',
    'home.featured.story2.description': 'Revolutionary portable dialysis technology making treatment accessible to remote communities across Saudi Arabia.',
    'home.featured.story3.title': 'Healthcare Data Platform',
    'home.featured.story3.category': 'Digital Health',
    'home.featured.story3.description': 'Secure patient data platform enabling seamless communication between providers while maintaining strict privacy standards.',
    
    // Challenges Section
    'home.challenges.tag': 'Innovation Challenges',
    'home.challenges.title': 'Upcoming Opportunities',
    'home.challenges.description': 'Join MOH-sponsored challenges to solve critical healthcare issues and unlock funding opportunities.',
    'home.challenges.viewAll': 'View All Challenges',
    'home.challenges.viewChallenge': 'View Challenge',
    'home.challenges.deadline': 'Deadline',
    'home.challenges.participants': 'Participants',
    'home.challenges.prize': 'Prize',
    'home.challenges.nextDeadline': 'Next challenge submission deadline',
    'home.challenges.challenge1.title': 'Remote Patient Monitoring Solutions',
    'home.challenges.challenge1.description': 'Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.',
    'home.challenges.challenge1.deadline': 'June 30, 2025',
    'home.challenges.challenge1.category': 'Digital Health',
    'home.challenges.challenge2.title': 'AI for Early Disease Detection',
    'home.challenges.challenge2.description': 'Develop AI algorithms to detect early signs of diseases using existing health data from MOH facilities.',
    'home.challenges.challenge2.deadline': 'July 15, 2025',
    'home.challenges.challenge2.category': 'AI & Machine Learning',
    'home.challenges.challenge3.title': 'Healthcare Supply Chain Optimization',
    'home.challenges.challenge3.description': 'Create solutions to improve the efficiency and resilience of medical supply chains across Saudi Arabia.',
    'home.challenges.challenge3.deadline': 'August 22, 2025',
    'home.challenges.challenge3.category': 'Logistics',
    
    // Footer Section
    'footer.mohLogo': 'Ministry of Health Logo',
    'footer.description': 'A Ministry of Health initiative supporting healthcare innovation across Saudi Arabia.',
    'footer.quickLinks': 'Quick Links',
    'footer.aboutPlatform': 'About the Platform',
    'footer.innovationChallenges': 'Innovation Challenges',
    'footer.investmentOpportunities': 'Investment Opportunities',
    'footer.regulatorySandbox': 'Regulatory Sandbox',
    'footer.knowledgeHub': 'Knowledge Hub',
    'footer.resources': 'Resources',
    'footer.vision2030': 'Vision 2030',
    'footer.mohStrategy': 'MOH Strategy',
    'footer.policies': 'Policies & Guidelines',
    'footer.successStories': 'Success Stories',
    'footer.contactSupport': 'Contact Support',
    'footer.newsletter': 'Newsletter',
    'footer.subscribeText': 'Subscribe to stay updated with the latest innovations and opportunities.',
    'footer.emailPlaceholder': 'Email address',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': 'Ministry of Health, Kingdom of Saudi Arabia. All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
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
    
    // Home Hero Section
    'home.hero.titleGradient': 'تمكين الابتكار الصحي',
    'home.hero.titleDark': 'لغد أفضل',
    'home.hero.description': 'منصة متكاملة تربط بين المبتكرين والمستثمرين والمنظمين في مجال الصحة لتحويل تقديم الرعاية الصحية في جميع أنحاء المملكة العربية السعودية.',
    'home.hero.exploreButton': 'استكشاف الابتكارات',
    'home.hero.joinButton': 'انضم إلى تحدي',
    'home.hero.investmentButton': 'الوصول للاستثمار',
    'home.hero.stats.innovators': 'المبتكرون',
    'home.hero.stats.investments': 'الاستثمارات (ريال)',
    'home.hero.stats.challenges': 'التحديات النشطة',
    
    // About Section
    'home.about.tag': 'عن المنصة',
    'home.about.title': 'تحويل الرعاية الصحية من خلال الابتكار',
    'home.about.paragraph1': 'تعد منصة الابتكار الصحي مبادرة رئيسية تتماشى مع رؤية المملكة 2030 والأهداف الاستراتيجية لوزارة الصحة لتحويل تقديم الرعاية الصحية في جميع أنحاء المملكة.',
    'home.about.paragraph2': 'تعمل منصتنا كنظام بيئي شامل يربط المبتكرين والمستثمرين والمنظمين، مما يسهل الرحلة من الفكرة إلى التنفيذ.',
    'home.about.vision2030Button': 'تعرف على رؤية 2030',
    'home.about.strategyButton': 'استراتيجية الوزارة',
    'home.about.videoOverlay': 'فيديو تعريفي',
    'home.about.videoDuration': '2:45',
    
    // Platform Highlights
    'home.highlights.tag': 'مميزات المنصة',
    'home.highlights.title': 'نظام الابتكار المتكامل الخاص بك',
    'home.highlights.description': 'مجموعة شاملة من الأدوات والخدمات المصممة لدعم مبتكري الرعاية الصحية في كل مرحلة من مراحل التطوير.',
    'home.highlights.feature1.title': 'مطابقة الابتكار المدعومة بالذكاء الاصطناعي',
    'home.highlights.feature1.description': 'خوارزمياتنا المتطورة للذكاء الاصطناعي تربط المبتكرين بالمستثمرين والموجهين والموارد المناسبة.',
    'home.highlights.feature2.title': 'الوصول إلى البيئة التنظيمية التجريبية',
    'home.highlights.feature2.description': 'اختبر ابتكاراتك في بيئة خاضعة للرقابة مع إمكانية الوصول المباشر إلى التوجيهات التنظيمية من وزارة الصحة.',
    'home.highlights.feature3.title': 'سوق الاستثمار',
    'home.highlights.feature3.description': 'تواصل مع مستثمرين مؤهلين يسعون لتمويل الابتكارات المستقبلية في الرعاية الصحية.',
    'home.highlights.feature4.title': 'مركز المعرفة',
    'home.highlights.feature4.description': 'الوصول إلى الموارد ودراسات الحالة وأفضل الممارسات لتسريع رحلة الابتكار الخاصة بك.',
    'home.highlights.feature5.title': 'المشاركة في التحديات',
    'home.highlights.feature5.description': 'شارك في تحديات الابتكار التي ترعاها وزارة الصحة لحل مشكلات الرعاية الصحية الحرجة.',
    'home.highlights.feature6.title': 'شبكة الصحة العالمية',
    'home.highlights.feature6.description': 'تواصل مع شركاء دوليين واطلع على اتجاهات ورؤى الابتكار الصحي العالمية.',
    
    // Featured Section
    'home.featured.title': 'تأثير المنصة',
    'home.featured.description': 'دفع التحول الواقعي للرعاية الصحية من خلال الابتكار والتعاون.',
    'home.featured.stats.innovators': 'المبتكرون المسجلون',
    'home.featured.stats.investments': 'صفقات الاستثمار المغلقة',
    'home.featured.stats.launched': 'الحلول المطلقة',
    'home.featured.stats.success': 'معدل النجاح',
    'home.featured.stories.title': 'قصص النجاح',
    'home.featured.readMore': 'قراءة المزيد',
    'home.featured.story1.title': 'منصة التشخيص بالذكاء الاصطناعي',
    'home.featured.story1.category': 'تقنية الرعاية الصحية',
    'home.featured.story1.description': 'منصة ذكاء اصطناعي مبتكرة تساعد في تشخيص حالات الجهاز التنفسي بدقة 97٪، وتم نشرها الآن في 12 مستشفى تابع لوزارة الصحة.',
    'home.featured.story2.title': 'جهاز غسيل كلى محمول',
    'home.featured.story2.category': 'الأجهزة الطبية',
    'home.featured.story2.description': 'تقنية غسيل الكلى المحمولة الثورية التي تجعل العلاج في متناول المجتمعات النائية في جميع أنحاء المملكة العربية السعودية.',
    'home.featured.story3.title': 'منصة بيانات الرعاية الصحية',
    'home.featured.story3.category': 'الصحة الرقمية',
    'home.featured.story3.description': 'منصة بيانات المرضى الآمنة التي تمكن من التواصل السلس بين مقدمي الخدمة مع الحفاظ على معايير الخصوصية الصارمة.',
    
    // Challenges Section
    'home.challenges.tag': 'تحديات الابتكار',
    'home.challenges.title': 'الفرص القادمة',
    'home.challenges.description': 'انضم إلى التحديات التي ترعاها وزارة الصحة لحل قضايا الرعاية الصحية الحرجة وفتح فرص التمويل.',
    'home.challenges.viewAll': 'عرض جميع التحديات',
    'home.challenges.viewChallenge': 'عرض التحدي',
    'home.challenges.deadline': 'الموعد النهائي',
    'home.challenges.participants': 'المشاركون',
    'home.challenges.prize': 'الجائزة',
    'home.challenges.nextDeadline': 'الموعد النهائي للتحدي القادم',
    'home.challenges.challenge1.title': 'حلول مراقبة المرضى عن بعد',
    'home.challenges.challenge1.description': 'تصميم حلول مبتكرة لمراقبة المرضى الذين يعانون من حالات مزمنة في المناطق النائية من المملكة.',
    'home.challenges.challenge1.deadline': '30 يونيو 2025',
    'home.challenges.challenge1.category': 'الصحة الرقمية',
    'home.challenges.challenge2.title': 'الذكاء الاصطناعي للكشف المبكر عن الأمراض',
    'home.challenges.challenge2.description': 'تطوير خوارزميات الذكاء الاصطناعي للكشف عن العلامات المبكرة للأمراض باستخدام البيانات الصحية الموجودة من مرافق وزارة الصحة.',
    'home.challenges.challenge2.deadline': '15 يوليو 2025',
    'home.challenges.challenge2.category': 'الذكاء الاصطناعي وتعلم الآلة',
    'home.challenges.challenge3.title': 'تحسين سلسلة التوريد الصحية',
    'home.challenges.challenge3.description': 'إنشاء حلول لتحسين كفاءة ومرونة سلاسل التوريد الطبية في جميع أنحاء المملكة العربية السعودية.',
    'home.challenges.challenge3.deadline': '22 أغسطس 2025',
    'home.challenges.challenge3.category': 'اللوجستيات',
    
    // Footer Section
    'footer.mohLogo': 'شعار وزارة الصحة',
    'footer.description': 'مبادرة من وزارة الصحة لدعم الابتكار في مجال الرعاية الصحية في المملكة العربية السعودية.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.aboutPlatform': 'عن المنصة',
    'footer.innovationChallenges': 'تحديات الابتكار',
    'footer.investmentOpportunities': 'فرص الاستثمار',
    'footer.regulatorySandbox': 'البيئة التنظيمية التجريبية',
    'footer.knowledgeHub': 'مركز المعرفة',
    'footer.resources': 'الموارد',
    'footer.vision2030': 'رؤية 2030',
    'footer.mohStrategy': 'استراتيجية وزارة الصحة',
    'footer.policies': 'السياسات والإرشادات',
    'footer.successStories': 'قصص النجاح',
    'footer.contactSupport': 'التواصل مع الدعم',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribeText': 'اشترك للبقاء على اطلاع بأحدث الابتكارات والفرص.',
    'footer.emailPlaceholder': 'البريد الإلكتروني',
    'footer.subscribe': 'اشتراك',
    'footer.copyright': 'وزارة الصحة، المملكة العربية السعودية. جميع الحقوق محفوظة.',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.accessibility': 'إمكانية الوصول',
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
