
import { createContext, useContext, useState, useEffect } from 'react';

// Define supported languages
type Language = 'en' | 'ar';

// Context type definition
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  isLoading: boolean;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  dir: 'ltr',
  t: (key) => key,
  isLoading: true,
});

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Translation data
type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
  en: {
    // Common
    'app.name': 'MOH Innovation Platform',
    'app.slogan': 'Empowering Healthcare Innovation',
    'app.lang': 'English',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.challenges': 'Challenges',
    'nav.innovations': 'Innovations',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    'nav.register': 'Register',
    
    // Home page
    'home.hero.title': 'Transforming Healthcare Through Innovation',
    'home.hero.subtitle': 'Join the Ministry of Health platform to collaborate, innovate, and transform the future of healthcare',
    'home.hero.cta.explore': 'Explore Challenges',
    'home.hero.cta.signup': 'Sign Up',
    
    // Innovations section
    'home.innovations.tag': 'Innovation Showcase',
    'home.innovations.title': 'Healthcare Solutions Gallery', 
    'home.innovations.subtitle': 'Discover innovative solutions transforming Saudi healthcare',
    
    // About page
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.mission.text': 'To create an open innovation platform that enables healthcare professionals, entrepreneurs, and innovators to collaborate and develop solutions that address critical healthcare challenges.',
    'about.vision.text': 'A thriving ecosystem where innovative ideas flourish into transformative healthcare solutions, improving patient care and health outcomes across the country.',
    
    // Challenge related
    'challenges.title': 'Innovation Challenges',
    'challenges.subtitle': 'Explore current challenges and opportunities to innovate in healthcare',
    'challenges.view': 'View Challenge',
    'challenges.apply': 'Apply Now',
    'challenges.deadline': 'Submission Deadline',
    'challenges.prize': 'Prize',
    'challenges.participants': 'Participants',
    
    // Auth related
    'auth.login': 'Login to Your Account',
    'auth.signup': 'Create an Account',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.forgot_password': 'Forgot Password?',
    'auth.already_have_account': 'Already have an account?',
    'auth.no_account': 'Don\'t have an account?',
    
    // Login specific
    'login.welcomeBack': 'Welcome Back',
    'login.platformDescription': 'The Ministry of Health platform connects innovators, healthcare professionals, and stakeholders to drive healthcare transformation.',
    'login.signIn': 'Sign In',
    'login.accessAccount': 'Access your account to manage innovations and participate in challenges.',
    'login.invalidCredentials': 'Invalid email or password. Please try again.',
    'login.genericError': 'An error occurred during login. Please try again.',
    'login.signingIn': 'Signing In...',
    'login.forgotPassword': 'Forgot Password?',
    'login.dontHaveAccount': 'Don\'t have an account yet?',
    'login.termsAndPrivacy': 'By signing in, you agree to our Terms of Service and Privacy Policy.',
    
    // Register specific
    'register.title': 'Create an Account',
    'register.description': 'Join our platform to collaborate on healthcare innovations.',
    'register.firstName': 'First Name',
    'register.lastName': 'Last Name',
    'register.email': 'Email Address',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.userType': 'User Type',
    'register.selectUserType': 'Select user type',
    'register.individual': 'Individual',
    'register.healthcareProfessional': 'Healthcare Professional',
    'register.innovator': 'Innovator',
    'register.investor': 'Investor',
    'register.organization': 'Organization',
    'register.organizationName': 'Organization Name',
    'register.platformBenefits': 'Join the Ministry of Health innovation platform to collaborate with healthcare professionals, discover opportunities, and transform ideas into solutions.',
    'register.joinPlatform': 'Join Our Innovation Platform',
    'register.agreeTerms': 'I agree to the Terms of Service and Privacy Policy',
    'register.next': 'Next',
    'register.back': 'Back',
    'register.createAccount': 'Create Account',
    'register.creatingAccount': 'Creating Account...',
    'register.alreadyHaveAccount': 'Already have an account?',
    'register.personalInfo': 'Personal Info',
    'register.security': 'Security',
    'register.profile': 'Profile',
    'register.passwordStrength': 'Password Strength',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to your Dashboard',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.my_challenges': 'My Challenges',
    'dashboard.my_innovations': 'My Innovations',
    'dashboard.upcoming_events': 'Upcoming Events',
    'dashboard.suggestions': 'Suggestions for You',
    
    // Form actions
    'action.submit': 'Submit',
    'action.cancel': 'Cancel',
    'action.save': 'Save',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.search': 'Search',
    
    // Notifications
    'notification.success': 'Success!',
    'notification.error': 'Error!',
    'notification.login_success': 'Successfully logged in!',
    'notification.login_error': 'Login failed. Please check your credentials.',
    'notification.signup_success': 'Account created successfully!',
    'notification.logout_success': 'You have been logged out.',
    
    // Validation
    'validation.required': 'This field is required.',
    'validation.email': 'Please enter a valid email address.',
    'validation.password_min': 'Password must be at least 8 characters.',
    'validation.password_match': 'Passwords do not match.',
    
    // Investment related
    'investment.title': 'Investment Hub',
    'investment.subtitle': 'Connect with investors and explore funding opportunities',
    
    // Footer
    'footer.emailPlaceholder': 'your@email.com',
    'footer.mohLogo': 'Ministry of Health Logo',
    
    // Profile page - Added missing translations
    'profile.title': 'Profile',
    'profile.description': 'Update your account profile details here.',
    'profile.accountSettings': 'Account Settings',
    'profile.preferences': 'Manage your account preferences',
    'profile.emailNotifications': 'Email Notifications',
    'profile.password': 'Password',
    'profile.passwordDesc': 'Change your password to keep your account secure.',
    'profile.passwordChange': 'Change Password',
    'profile.marketingEmails': 'Marketing emails',
    'profile.marketingEmailsDesc': 'Receive emails about new features and products',
    'profile.securityAlerts': 'Security alerts',
    'profile.securityAlertsDesc': 'Receive emails about your account security',
    'profile.serviceUpdates': 'Service updates',
    'profile.serviceUpdatesDesc': 'Receive emails about platform updates',
    'profile.syncSettings': 'These settings will be synced across all your devices.',
    'profile.retryLoading': 'Try Again',
    'profile.loadError': 'Failed to load user profile. Please try again.',
    'profile.profileInfo': 'Profile Information',
    'profile.profileInfoDesc': 'Update your account profile details here.',
    'profile.memberSince': 'Member since',
  },
  
  ar: {
    // Common
    'app.name': 'منصة وزارة الصحة للابتكار',
    'app.slogan': 'تمكين الابتكار في الرعاية الصحية',
    'app.lang': 'العربية',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن المنصة',
    'nav.challenges': 'التحديات',
    'nav.innovations': 'الابتكارات',
    'nav.dashboard': 'لوحة التحكم',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.logout': 'تسجيل الخروج',
    'nav.profile': 'الملف الشخصي',
    'nav.register': 'تسجيل',
    
    // Home page
    'home.hero.title': 'تحويل الرعاية الصحية من خلال الابتكار',
    'home.hero.subtitle': 'انضم إلى منصة وزارة الصحة للتعاون والابتكار وتحويل مستقبل الرعاية الصحية',
    'home.hero.cta.explore': 'استكشاف التحديات',
    'home.hero.cta.signup': 'إنشاء حساب',
    
    // Innovations section
    'home.innovations.tag': 'معرض الابتكارات',
    'home.innovations.title': 'معرض حلول الرعاية الصحية',
    'home.innovations.subtitle': 'اكتشف الحلول المبتكرة التي تحول الرعاية الصحية السعودية',
    
    // About page
    'about.title': 'عن المنصة',
    'about.mission': 'مهمتنا',
    'about.vision': 'رؤيتنا',
    'about.mission.text': 'إنشاء منصة ابتكار مفتوحة تمكن المتخصصين في الرعاية الصحية ورواد الأعمال والمبتكرين من التعاون وتطوير حلول تعالج تحديات الرعاية الصحية الحرجة.',
    'about.vision.text': 'نظام بيئي مزدهر حيث تزدهر الأفكار المبتكرة لتصبح حلولاً تحويلية للرعاية الصحية، وتحسين رعاية المرضى والنتائج الصحية في جميع أنحاء البلاد.',
    
    // Challenge related
    'challenges.title': 'تحديات الابتكار',
    'challenges.subtitle': 'استكشف التحديات والفرص الحالية للابتكار في الرعاية الصحية',
    'challenges.view': 'عرض التحدي',
    'challenges.apply': 'تقدم الآن',
    'challenges.deadline': 'الموعد النهائي للتقديم',
    'challenges.prize': 'الجائزة',
    'challenges.participants': 'المشاركون',
    
    // Auth related
    'auth.login': 'تسجيل الدخول إلى حسابك',
    'auth.signup': 'إنشاء حساب جديد',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirm_password': 'تأكيد كلمة المرور',
    'auth.forgot_password': 'نسيت كلمة المرور؟',
    'auth.already_have_account': 'لديك حساب بالفعل؟',
    'auth.no_account': 'ليس لديك حساب؟',
    
    // Login specific
    'login.welcomeBack': 'مرحبًا بعودتك',
    'login.platformDescription': 'منصة وزارة الصحة تربط المبتكرين والمتخصصين في الرعاية الصحية وأصحاب المصلحة لدفع تحول الرعاية الصحية.',
    'login.signIn': 'تسجيل الدخول',
    'login.accessAccount': 'الوصول إلى حسابك لإدارة الابتكارات والمشاركة في التحديات.',
    'login.invalidCredentials': 'بريد إلكتروني أو كلمة مرور غير صالحة. يرجى المحاولة مرة أخرى.',
    'login.genericError': 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.',
    'login.signingIn': 'جاري تسجيل الدخول...',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.dontHaveAccount': 'ليس لديك حساب بعد؟',
    'login.termsAndPrivacy': 'بتسجيل الدخول، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.',
    
    // Register specific
    'register.title': 'إنشاء حساب',
    'register.description': 'انضم إلى منصتنا للتعاون في ابتكارات الرعاية الصحية.',
    'register.firstName': 'الاسم الأول',
    'register.lastName': 'اسم العائلة',
    'register.email': 'البريد الإلكتروني',
    'register.password': 'كلمة المرور',
    'register.confirmPassword': 'تأكيد كلمة المرور',
    'register.userType': 'نوع المستخدم',
    'register.selectUserType': 'اختر نوع المستخدم',
    'register.individual': 'فرد',
    'register.healthcareProfessional': 'متخصص رعاية صحية',
    'register.innovator': 'مبتكر',
    'register.investor': 'مستثمر',
    'register.organization': 'منظمة',
    'register.organizationName': 'اسم المنظمة',
    'register.platformBenefits': 'انضم إلى منصة وزارة الصحة للابتكار للتعاون مع المتخصصين في الرعاية الصحية، واكتشاف الفرص، وتحويل الأفكار إلى حلول.',
    'register.joinPlatform': 'انضم إلى منصة الابتكار لدينا',
    'register.agreeTerms': 'أوافق على شروط الخدمة وسياسة الخصوصية',
    'register.next': 'التالي',
    'register.back': 'السابق',
    'register.createAccount': 'إنشاء حساب',
    'register.creatingAccount': 'جاري إنشاء الحساب...',
    'register.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'register.personalInfo': 'المعلومات الشخصية',
    'register.security': 'الأمان',
    'register.profile': 'الملف الشخصي',
    'register.passwordStrength': 'قوة كلمة المرور',
    
    // Dashboard
    'dashboard.welcome': 'مرحبا بك في لوحة التحكم',
    'dashboard.recent_activity': 'النشاطات الأخيرة',
    'dashboard.my_challenges': 'تحدياتي',
    'dashboard.my_innovations': 'ابتكاراتي',
    'dashboard.upcoming_events': 'الفعاليات القادمة',
    'dashboard.suggestions': 'اقتراحات لك',
    
    // Form actions
    'action.submit': 'إرسال',
    'action.cancel': 'إلغاء',
    'action.save': 'حفظ',
    'action.edit': 'تعديل',
    'action.delete': 'حذف',
    'action.search': 'بحث',
    
    // Notifications
    'notification.success': 'تم بنجاح!',
    'notification.error': 'خطأ!',
    'notification.login_success': 'تم تسجيل الدخول بنجاح!',
    'notification.login_error': 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.',
    'notification.signup_success': 'تم إنشاء الحساب بنجاح!',
    'notification.logout_success': 'تم تسجيل الخروج.',
    
    // Validation
    'validation.required': 'هذا الحقل مطلوب.',
    'validation.email': 'الرجاء إدخال عنوان بريد إلكتروني صالح.',
    'validation.password_min': 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.',
    'validation.password_match': 'كلمات المرور غير متطابقة.',
    
    // Investment related
    'investment.title': 'مركز الاستثمار',
    'investment.subtitle': 'تواصل مع المستثمرين واستكشف فرص التمويل',
    
    // Footer
    'footer.emailPlaceholder': 'your@email.com',
    'footer.mohLogo': 'Ministry of Health Logo',
    
    // Profile page - Added missing translations
    'profile.title': 'الملف الشخصي',
    'profile.description': 'تحديث تفاصيل ملفك الشخصي هنا',
    'profile.accountSettings': 'إعدادات الحساب',
    'profile.preferences': 'إدارة تفضيلات حسابك',
    'profile.emailNotifications': 'إشعارات البريد الإلكتروني',
    'profile.password': 'كلمة المرور',
    'profile.passwordDesc': 'تغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك.',
    'profile.passwordChange': 'تغيير كلمة المرور',
    'profile.marketingEmails': 'رسائل التسويق',
    'profile.marketingEmailsDesc': 'استلام رسائل البريد الإلكتروني حول الميزات والمنتجات الجديدة',
    'profile.securityAlerts': 'تنبيهات الأمان',
    'profile.securityAlertsDesc': 'استلام رسائل البريد الإلكتروني حول أمان حسابك',
    'profile.serviceUpdates': 'تحديثات الخدمة',
    'profile.serviceUpdatesDesc': 'استلام رسائل البريد الإلكتروني حول تحديثات المنصة',
    'profile.syncSettings': 'سيتم مزامنة هذه الإعدادات عبر جميع أجهزتك.',
    'profile.retryLoading': 'حاول مرة أخرى',
    'profile.loadError': 'فشل في تحميل الملف الشخصي للمستخدم. يرجى المحاولة مرة أخرى.',
    'profile.profileInfo': 'معلومات الملف الشخصي',
    'profile.profileInfoDesc': 'تحديث تفاصيل ملفك الشخصي هنا',
    'profile.memberSince': 'عضو منذ',
  },
};

// Provider component
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Get initial language from localStorage or default to 'en'
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      return savedLanguage === 'ar' || savedLanguage === 'en' ? savedLanguage : 'en';
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [isLoading, setIsLoading] = useState(true);

  // Set direction based on language
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // Update language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    // Update document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    if (newLanguage === 'ar') {
      document.documentElement.classList.add('lang-ar', 'rtl-mode');
    } else {
      document.documentElement.classList.remove('lang-ar', 'rtl-mode');
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Set initial direction on mount
  useEffect(() => {
    document.documentElement.dir = dir;
    
    if (language === 'ar') {
      document.documentElement.classList.add('lang-ar', 'rtl-mode');
    } else {
      document.documentElement.classList.remove('lang-ar', 'rtl-mode');
    }
    
    setIsLoading(false);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t, isLoading }}>
      {!isLoading && children}
    </LanguageContext.Provider>
  );
};
