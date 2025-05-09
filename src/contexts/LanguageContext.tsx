
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
    'nav.investment': 'Investment',
    'nav.regulatory': 'Regulatory',
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
    'login.invalidCredentials': 'Invalid email or password. Please check your credentials and try again.',
    'login.genericError': 'An error occurred during login. Please try again.',
    'login.signingIn': 'Signing In...',
    'login.dontHaveAccount': 'Don\'t have an account?',
    
    // Registration page
    'register.title': 'Create an Account',
    'register.description': 'Join the Saudi Ministry of Health Innovation Platform',
    'register.firstName': 'First Name',
    'register.lastName': 'Last Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.createAccount': 'Create Account',
    'register.alreadyHaveAccount': 'Already have an account?',
    'register.signin': 'Sign in',
    'register.termsAgree': 'By registering, you agree to our Terms of Service and Privacy Policy',
    'register.userType': 'User Type',
    'register.individual': 'Individual',
    'register.healthcareProfessional': 'Healthcare Professional',
    'register.innovator': 'Innovator',
    'register.investor': 'Investor',
    'register.organization': 'Organization',
    'register.organizationName': 'Organization Name',
    'register.selectUserType': 'Select user type',
    'register.creatingAccount': 'Creating Account...',
    
    // Verification page
    'verification.title': 'Verify Your Email',
    'verification.description': 'We\'ve sent you a verification email',
    'verification.checkInbox': 'Please check your inbox and click the verification link to complete your registration.',
    'verification.notReceived': 'Didn\'t receive the email?',
    'verification.resendEmail': 'Resend verification email',
    'verification.goToLogin': 'Back to login',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.description': 'Manage your activities on the Ministry of Health Innovation Platform.',
    'dashboard.overview': 'Overview',
    'dashboard.myInnovations': 'My Innovations',
    'dashboard.myChallenges': 'My Challenges',
    'dashboard.activeChallenges': 'Active Challenges',
    'dashboard.currentChallenges': 'Current challenges you can participate in',
    'dashboard.yourInnovations': 'Your Innovations',
    'dashboard.submittedInnovations': 'Innovations you\'ve submitted',
    'dashboard.knowledgeHub': 'Knowledge Hub',
    'dashboard.articlesResources': 'Articles and resources',
    'dashboard.gettingStarted': 'Getting Started',
    'dashboard.quickLinks': 'Quick links to help you navigate the platform',
    'dashboard.submitInnovation': 'Submit an Innovation',
    'dashboard.shareInnovation': 'Share your healthcare innovation with the Ministry of Health.',
    'dashboard.getStarted': 'Get Started',
    'dashboard.joinChallenge': 'Join a Challenge',
    'dashboard.participateChallenges': 'Participate in healthcare innovation challenges.',
    'dashboard.viewChallenges': 'View Challenges',
    'dashboard.completeProfile': 'Complete Your Profile',
    'dashboard.updateInfo': 'Update your information to get personalized opportunities.',
    'dashboard.updateProfile': 'Update Profile',
    'dashboard.exploreResources': 'Explore Resources',
    'dashboard.accessResources': 'Access healthcare innovation resources and guides.',
    'dashboard.browseResources': 'Browse Resources',
    'dashboard.noInnovations': 'You haven\'t submitted any innovations yet.',
    'dashboard.submitFirst': 'Submit your first innovation',
    'dashboard.noChallenges': 'You haven\'t joined any challenges yet.',
    'dashboard.browseAvailable': 'Browse available challenges',
    
    // Profile page
    'profile.title': 'Profile',
    'profile.description': 'Manage your account settings and profile information.',
    'profile.accountSettings': 'Account Settings',
    'profile.preferences': 'Manage your account preferences and security.',
    'profile.emailNotifications': 'Email Notifications',
    'profile.notificationsDesc': 'We\'ll notify you about important updates related to your activities on the platform.',
    'profile.changeSettings': 'To change your notification settings, please contact support.',
    'profile.password': 'Password',
    'profile.passwordDesc': 'Make sure to use a strong, unique password to secure your account.',
    'profile.passwordChange': 'Password changes are handled through the Supabase authentication system.',
    
    // About page
    'about.title': 'About Our Health Innovation Platform',
    'about.description': 'Transforming healthcare delivery through innovation, collaboration, and strategic partnerships across Saudi Arabia\'s healthcare ecosystem.',
    'about.innovators': 'Innovators',
    'about.challenges': 'Challenges',
    'about.impact': 'National Impact',
    'about.vision': 'Our Vision',
    'about.visionText': 'To establish Saudi Arabia as a global leader in healthcare innovation, fostering a dynamic ecosystem that addresses national health priorities and improves the quality of life for all citizens in line with Vision 2030.',
    'about.mission': 'Our Mission',
    'about.missionText': 'We connect innovators, healthcare providers, regulators, and investors to accelerate the development and deployment of transformative healthcare solutions, creating a seamless pathway from idea to implementation across the Kingdom.',
    'about.focusAreas': 'Our Key Focus Areas',
    'about.focusDescription': 'We are committed to addressing Saudi Arabia\'s most pressing healthcare challenges through innovation and collaboration.',
    'about.preventative': 'Preventative Healthcare',
    'about.preventativeDesc': 'Shifting from treatment to prevention with innovative solutions for early detection and monitoring.',
    'about.infrastructure': 'Healthcare Infrastructure',
    'about.infrastructureDesc': 'Building resilient healthcare infrastructure that efficiently delivers services across the Kingdom.',
    'about.digital': 'Digital Health',
    'about.digitalDesc': 'Leveraging technology to provide accessible, personalized, and efficient healthcare services.',
    'about.partners': 'Our Strategic Partners',
    'about.joinCommunity': 'Join Our Innovation Community',
    'about.joinDescription': 'Be part of Saudi Arabia\'s healthcare transformation. Whether you\'re an innovator, investor, or healthcare provider, there\'s a place for you in our growing community.',
    'about.registerNow': 'Register Now',
    'about.learnMore': 'Learn More',
    
    // Challenge detail page
    'challenge.backToChallenges': 'Back to Challenges',
    'challenge.overview': 'Overview',
    'challenge.requirements': 'Requirements',
    'challenge.timeline': 'Timeline',
    'challenge.notFound': 'Challenge Not Found',
    'challenge.notFoundDesc': 'The challenge you\'re looking for doesn\'t exist or has been removed.',
    
    // 404 Not Found page
    'notFound.title': '404',
    'notFound.description': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
    
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
    'nav.investment': 'الاستثمار',
    'nav.regulatory': 'التنظيم',
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
    'nav.login': 'تسجيل الدخول',
    
    // Login page
    'login.title': 'منصة الابتكار',
    'login.description': 'أدخل بيانات الاعتماد للوصول إلى نظام الابتكار الصحي',
    'login.signIn': 'تسجيل الدخول',
    'login.accessAccount': 'الوصول إلى حسابك لإدارة الابتكارات والتحديات',
    'login.termsAndPrivacy': 'بتسجيل الدخول، فإنك توافق على شروط الخدمة وسياسة الخصوصية',
    'login.invalidCredentials': 'بريد إلكتروني أو كلمة مرور غير صالحة. يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى.',
    'login.genericError': 'حدث خطأ أثناء تسجيل الدخول. الرجاء معاودة المحاولة في وقت لاحق.',
    'login.signingIn': 'جاري تسجيل الدخول...',
    'login.dontHaveAccount': 'ليس لديك حساب؟',
    
    // Registration page
    'register.title': 'إنشاء حساب',
    'register.description': 'انضم إلى منصة الابتكار لوزارة الصحة السعودية',
    'register.firstName': 'الاسم الأول',
    'register.lastName': 'اسم العائلة',
    'register.email': 'البريد الإلكتروني',
    'register.password': 'كلمة المرور',
    'register.confirmPassword': 'تأكيد كلمة المرور',
    'register.createAccount': 'إنشاء حساب',
    'register.alreadyHaveAccount': 'هل لديك حساب بالفعل؟',
    'register.signin': 'تسجيل الدخول',
    'register.termsAgree': 'بالتسجيل، فإنك توافق على شروط الخدمة وسياسة الخصوصية',
    'register.userType': 'نوع المستخدم',
    'register.individual': 'فرد',
    'register.healthcareProfessional': 'متخصص رعاية صحية',
    'register.innovator': 'مبتكر',
    'register.investor': 'مستثمر',
    'register.organization': 'مؤسسة',
    'register.organizationName': 'اسم المؤسسة',
    'register.selectUserType': 'اختر نوع المستخدم',
    'register.creatingAccount': 'جاري إنشاء الحساب...',
    
    // Verification page
    'verification.title': 'تحقق من بريدك الإلكتروني',
    'verification.description': 'لقد أرسلنا إليك بريدًا إلكترونيًا للتحقق',
    'verification.checkInbox': 'يرجى التحقق من صندوق الوارد الخاص بك والنقر على رابط التحقق لإكمال التسجيل.',
    'verification.notReceived': 'لم تستلم البريد الإلكتروني؟',
    'verification.resendEmail': 'إعادة إرسال البريد الإلكتروني للتحقق',
    'verification.goToLogin': 'العودة لتسجيل الدخول',
    
    // Dashboard
    'dashboard.welcome': 'مرحبًا',
    'dashboard.description': 'إدارة أنشطتك على منصة الابتكار لوزارة الصحة.',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.myInnovations': 'ابتكاراتي',
    'dashboard.myChallenges': 'تحدياتي',
    'dashboard.activeChallenges': 'التحديات النشطة',
    'dashboard.currentChallenges': 'التحديات الحالية التي يمكنك المشاركة فيها',
    'dashboard.yourInnovations': 'ابتكاراتك',
    'dashboard.submittedInnovations': 'الابتكارات التي قدمتها',
    'dashboard.knowledgeHub': 'مركز المعرفة',
    'dashboard.articlesResources': 'المقالات والموارد',
    'dashboard.gettingStarted': 'البدء',
    'dashboard.quickLinks': 'روابط سريعة لمساعدتك في استخدام المنصة',
    'dashboard.submitInnovation': 'تقديم ابتكار',
    'dashboard.shareInnovation': 'شارك ابتكارك الصحي مع وزارة الصحة.',
    'dashboard.getStarted': 'ابدأ الآن',
    'dashboard.joinChallenge': 'الانضمام إلى تحدي',
    'dashboard.participateChallenges': 'المشاركة في تحديات الابتكار الصحي.',
    'dashboard.viewChallenges': 'عرض التحديات',
    'dashboard.completeProfile': 'إكمال ملفك الشخصي',
    'dashboard.updateInfo': 'قم بتحديث معلوماتك للحصول على فرص مخصصة.',
    'dashboard.updateProfile': 'تحديث الملف الشخصي',
    'dashboard.exploreResources': 'استكشاف الموارد',
    'dashboard.accessResources': 'الوصول إلى موارد وأدلة الابتكار الصحي.',
    'dashboard.browseResources': 'تصفح الموارد',
    'dashboard.noInnovations': 'لم تقدم أي ابتكارات حتى الآن.',
    'dashboard.submitFirst': 'قدم أول ابتكار لك',
    'dashboard.noChallenges': 'لم تنضم إلى أي تحديات حتى الآن.',
    'dashboard.browseAvailable': 'تصفح التحديات المتاحة',
    
    // Profile page
    'profile.title': 'الملف الشخصي',
    'profile.description': 'إدارة إعدادات حسابك ومعلومات ملفك الشخصي.',
    'profile.accountSettings': 'إعدادات الحساب',
    'profile.preferences': 'إدارة تفضيلات وأمان حسابك.',
    'profile.emailNotifications': 'إشعارات البريد الإلكتروني',
    'profile.notificationsDesc': 'سنخطرك بالتحديثات المهمة المتعلقة بأنشطتك على المنصة.',
    'profile.changeSettings': 'لتغيير إعدادات الإشعارات، يرجى الاتصال بالدعم.',
    'profile.password': 'كلمة المرور',
    'profile.passwordDesc': 'تأكد من استخدام كلمة مرور قوية وفريدة لتأمين حسابك.',
    'profile.passwordChange': 'يتم التعامل مع تغييرات كلمة المرور من خلال نظام المصادقة سوبابيس.',
    
    // About page
    'about.title': 'عن منصة الابتكار الصحي',
    'about.description': 'تحويل تقديم الرعاية الصحية من خلال الابتكار والتعاون والشراكات الاستراتيجية عبر النظام البيئي للرعاية الصحية في المملكة العربية السعودية.',
    'about.innovators': 'المبتكرون',
    'about.innovatorsDescription': 'مبتكرون نشطون على المنصة',
    'about.challenges': 'التحديات',
    'about.challengesDescription': 'تحديات الابتكار المكتملة',
    'about.solutions': 'الحلول',
    'about.solutionsDescription': 'حلول مبتكرة تم تطويرها',
    'about.patientsBenefited': 'المستفيدون',
    'about.patientsBenefitedDescription': 'مرضى استفادوا من حلولنا',
    'about.ourTeam': 'فريقنا',
    'about.teamDescription': 'يعمل فريق متخصص من الخبراء على دفع مبادرات الابتكار الصحي في المملكة',
    'about.chiefInnovationOfficer': 'رئيس قسم الابتكار',
    'about.headOfResearch': 'رئيس قسم البحث والتطوير',
    'about.digitalTransformationLead': 'قائد التحول الرقمي',
    'about.healthcareAdvisor': 'مستشار الرعاية الصحية',
    'about.ourImpact': 'تأثيرنا',
    'about.impactDescription': 'منذ انطلاقتها، أحدثت منصة الابتكار الصحي تأثيرًا كبيرًا في قطاع الرعاية الصحية بالمملكة',
    'about.impact': 'التأثير الوطني',
    'about.vision': 'رؤيتنا',
    'about.visionText': 'أن تكون المملكة العربية السعودية رائدة عالمياً في مجال الابتكار الصحي، وتعزيز نظام بيئي ديناميكي يعالج أولويات الصحة الوطنية ويحسن جودة الحياة لجميع المواطنين بما يتماشى مع رؤية 2030.',
    'about.mission': 'مهمتنا',
    'about.missionText': 'نحن نربط المبتكرين ومقدمي الرعاية الصحية والمنظمين والمستثمرين لتسريع تطوير وتنفيذ حلول الرعاية الصحية التحويلية، وإنشاء مسار سلس من الفكرة إلى التنفيذ عبر المملكة.',
    'about.focusAreas': 'مجالات التركيز الرئيسية',
    'about.focusDescription': 'نحن ملتزمو بمعالجة أكثر تحديات الرعاية الصحية إلحاحًا في المملكة العربية السعودية من خلال الابتكار والتعاون.',
    'about.preventative': 'الرعاية الصحية الوقائية',
    'about.preventativeDesc': 'التحول من العلاج إلى الوقاية مع حلول مبتكرة للكشف المبكر والمراقبة.',
    'about.infrastructure': 'البنية التحتية للرعاية الصحية',
    'about.infrastructureDesc': 'بناء بنية تحتية مرنة للرعاية الصحية تقدم الخدمات بكفاءة في جميع أنحاء المملكة.',
    'about.digital': 'الصحة الرقمية',
    'about.digitalDesc': 'الاستفادة من التكنولوجيا لتوفير خدمات رعاية صحية يسهل الوصول إليها وشخصية وفعالة.',
    'about.partners': 'شركاؤنا الاستراتيجيون',
    'about.joinCommunity': 'انضم إلى مجتمع الابتكار لدينا',
    'about.joinDescription': 'كن جزءًا من تحول الرعاية الصحية في المملكة العربية السعودية. سواء كنت مبتكرًا أو مستثمرًا أو مقدم رعاية صحية، هناك مكان لك في مجتمعنا المتنامي.',
    'about.registerNow': 'سجل الآن',
    'about.learnMore': 'اعرف المزيد',
    
    // Challenge detail page
    'challenge.backToChallenges': 'العودة إلى التحديات',
    'challenge.overview': 'نظرة عامة',
    'challenge.requirements': 'المتطلبات',
    'challenge.timeline': 'الجدول الزمني',
    'challenge.notFound': 'التحدي غير موجود',
    'challenge.notFoundDesc': 'التحدي الذي تبحث عنه غير موجود أو تمت إزالته.',
    
    // 404 Not Found page
    'notFound.title': '404',
    'notFound.description': 'عذراً! الصفحة غير موجودة',
    'notFound.returnHome': 'العودة إلى الصفحة الرئيسية',
    
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
    'home.challenges.challenge1.description': 'تصميم حلول مبتكرة لمراقبة المرضى الذين يعانون من أمراض مزمنة في المناطق النائية من المملكة.',
    'home.challenges.challenge1.deadline': '30 يونيو 2025',
    'home.challenges.challenge1.category': 'الصحة الرقمية',
    'home.challenges.challenge2.title': 'الذكاء الاصطناعي للكشف المبكر عن الأمراض',
    'home.challenges.challenge2.description': 'تطوير خوارزميات الذكاء الاصطناعي للكشف عن العلامات المبكرة للأمراض باستخدام البيانات الصحية الموجودة من منشآت وزارة الصحة.',
    'home.challenges.challenge2.deadline': '15 يوليو 2025',
    'home.challenges.challenge2.category': 'الذكاء الاصطناعي والتعلم الآلي',
    'home.challenges.challenge3.title': 'تحسين سلسلة إمداد الرعاية الصحية',
    'home.challenges.challenge3.description': 'إنشاء حلول لتحسين كفاءة ومرونة سلاسل الإمداد الطبي عبر المملكة العربية السعودية.',
    'home.challenges.challenge3.deadline': '22 أغسطس 2025',
    'home.challenges.challenge3.category': 'الخدمات اللوجستية',
    
    // Footer Section
    'footer.mohLogo': 'شعار وزارة الصحة',
    'footer.description': 'مبادرة من وزارة الصحة لدعم الابتكار الصحي في جميع أنحاء المملكة العربية السعودية.',
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
    'footer.contactSupport': 'الاتصال بالدعم',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribeText': 'اشترك للبقاء على اطلاع بأحدث الابتكارات والفرص.',
    'footer.emailPlaceholder': 'البريد الإلكتروني',
    'footer.subscribe': 'اشتراك',
    'footer.copyright': 'وزارة الصحة، المملكة العربية السعودية. جميع الحقوق محفوظة.',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.accessibility': 'إمكانية الوصول'
  }
};

// Define props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Create the provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get language from local storage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('moh-language') as Language;
      return savedLanguage === 'ar' ? 'ar' : 'en'; // Default to 'en' if not saved or invalid
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  
  // Update HTML dir and lang attributes when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      localStorage.setItem('moh-language', language);
      
      // Add or remove the .lang-ar class on the body based on language
      if (language === 'ar') {
        document.body.classList.add('lang-ar');
      } else {
        document.body.classList.remove('lang-ar');
      }
    }
  }, [language]);

  // Create a wrapper for setLanguage to also update localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
