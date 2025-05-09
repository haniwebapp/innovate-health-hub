
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Define the provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.challenges': 'Challenges',
    'nav.innovations': 'Innovations',
    'nav.investment': 'Investment',
    'nav.regulatory': 'Regulatory',
    'nav.knowledgeHub': 'Knowledge Hub',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
    // General
    'general.english': 'English',
    'general.arabic': 'Arabic',
    'general.readMore': 'Read More',
    'general.viewAll': 'View All',
    'general.learnMore': 'Learn More',
    'general.getStarted': 'Get Started',
    'general.seeMore': 'See More',
    'general.back': 'Back',
    'general.next': 'Next',
    'general.previous': 'Previous',
    'general.or': 'or',
    
    // Hero section
    'home.hero.titleGradient': 'Health Innovation Platform',
    'home.hero.titleDark': 'Empowering Health Innovation for a Better Tomorrow',
    'home.hero.description': 'A one-stop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.',
    'home.hero.exploreButton': 'Explore Innovations',
    'home.hero.joinButton': 'Join a Challenge',
    'home.hero.investmentButton': 'Access Investment',
    'home.hero.stats.innovators': 'Registered Innovators',
    'home.hero.stats.investments': 'Investments (SAR)',
    'home.hero.stats.challenges': 'Active Challenges',
    
    // About section
    'home.about.title': 'Transforming Saudi Healthcare',
    'home.about.subtitle': 'Aligned with Vision 2030',
    'home.about.description': 'The Health Innovation Platform supports the digital transformation of healthcare delivery in Saudi Arabia, in line with the goals of Vision 2030 and the Ministry of Health's strategic objectives.',
    'home.about.videoCaption': 'Discover how our platform streamlines the innovation journey',
    'home.about.statTitle1': 'Faster Innovation',
    'home.about.statDescription1': 'Reduce time to market by connecting innovators with regulators and investors',
    'home.about.statTitle2': 'Better Access',
    'home.about.statDescription2': 'Improve healthcare accessibility through technologies that reach more patients',
    'home.about.statTitle3': 'Lower Costs',
    'home.about.statDescription3': 'Drive efficiency and reduce healthcare delivery costs through innovation',
    
    // Platform highlights
    'home.highlights.tag': 'Platform Features',
    'home.highlights.title': 'A Complete Health Innovation Ecosystem',
    'home.highlights.description': 'Our platform brings together all elements of the healthcare innovation ecosystem in one integrated environment.',
    'home.highlights.feature1.title': 'AI-Powered Innovation Matching',
    'home.highlights.feature1.description': 'Advanced algorithms match innovations with the right investors, regulators, and healthcare providers.',
    'home.highlights.feature2.title': 'Regulatory Sandbox Access',
    'home.highlights.feature2.description': 'Streamlined access to regulatory testing environments for faster approval and implementation.',
    'home.highlights.feature3.title': 'Investment Marketplace',
    'home.highlights.feature3.description': 'Connect with public and private investors interested in healthcare innovation.',
    'home.highlights.feature4.title': 'Knowledge Hub',
    'home.highlights.feature4.description': 'Access resources, research, and best practices to inform your innovation journey.',
    'home.highlights.feature5.title': 'Challenge Submission Platform',
    'home.highlights.feature5.description': 'Participate in challenges from the Ministry of Health and healthcare providers.',
    'home.highlights.feature6.title': 'Global Collaboration Network',
    'home.highlights.feature6.description': 'Connect with international healthcare innovators and experts.',
    
    // AI-driven section
    'home.ai.title': 'AI-Driven Innovation',
    'home.ai.subtitle': 'Powering the Future of Healthcare',
    'home.ai.description': 'Our platform leverages artificial intelligence to accelerate innovation, improve matching, and provide predictive insights.',
    'home.ai.feature1': 'Personalized Recommendations',
    'home.ai.feature2': 'Predictive Success Modeling',
    'home.ai.feature3': 'Trend Analysis',
    'home.ai.feature4': 'Automated Documentation',
    
    // Featured section
    'home.featured.title': 'Success Stories',
    'home.featured.description': 'Discover innovations that have successfully navigated the healthcare ecosystem through our platform.',
    'home.featured.readMore': 'Read the full story',
    'home.featured.stats.innovators': 'Registered Innovators',
    'home.featured.stats.investments': 'Total Investment (SAR)',
    'home.featured.stats.launched': 'Solutions Launched',
    'home.featured.stats.success': 'Success Rate',
    'home.featured.stories.title': 'Featured Success Stories',
    'home.featured.story1.title': 'AI-Powered Diagnostic Tool',
    'home.featured.story1.category': 'Artificial Intelligence',
    'home.featured.story1.description': 'A machine learning algorithm that improves early cancer detection by analyzing medical imaging data.',
    'home.featured.story2.title': 'Remote Patient Monitoring System',
    'home.featured.story2.category': 'Digital Health',
    'home.featured.story2.description': 'IoT-enabled remote monitoring system for chronic disease management, reducing hospital readmissions by 35%.',
    'home.featured.story3.title': 'Healthcare Supply Chain Platform',
    'home.featured.story3.category': 'Infrastructure',
    'home.featured.story3.description': 'Blockchain-based platform improving medical supply chain transparency and efficiency across Saudi hospitals.',
    
    // Challenges section
    'home.challenges.title': 'Current Innovation Challenges',
    'home.challenges.description': 'Join these healthcare challenges and contribute your innovations to solving critical issues.',
    'home.challenges.viewAllButton': 'View All Challenges',
    'home.challenges.daysLeft': 'days left',
    'home.challenges.challenge1.title': 'Diabetes Management Solutions',
    'home.challenges.challenge1.description': 'Seeking innovative technologies to improve diabetes management and patient outcomes.',
    'home.challenges.challenge1.deadline': 'June 30, 2025',
    'home.challenges.challenge1.category': 'Chronic Disease Management',
    'home.challenges.challenge2.title': 'Medical Imaging AI',
    'home.challenges.challenge2.description': 'AI solutions to enhance diagnostic accuracy and efficiency in medical imaging.',
    'home.challenges.challenge2.deadline': 'July 15, 2025',
    'home.challenges.challenge2.category': 'AI & Machine Learning',
    'home.challenges.challenge3.title': 'Healthcare Supply Chain Optimization',
    'home.challenges.challenge3.description': 'Create solutions to improve efficiency and resilience of medical supply chains across Saudi Arabia.',
    'home.challenges.challenge3.deadline': 'August 22, 2025',
    'home.challenges.challenge3.category': 'Logistics',
    
    // Innovation Gallery
    'home.innovations.tag': 'Featured Innovations',
    'home.innovations.title': 'Discover Healthcare Innovations',
    'home.innovations.description': 'Explore cutting-edge solutions transforming healthcare delivery in Saudi Arabia and beyond.',
    'home.innovations.viewAllButton': 'View All Innovations',
    'home.innovations.filters.all': 'All',
    'home.innovations.filters.featured': 'Featured',
    'home.innovations.filters.highTRL': 'Market-Ready',
    'home.innovations.filters.digitalHealth': 'Digital Health',
    'home.innovations.filters.ai': 'AI & ML',
    'home.innovations.filters.devices': 'Devices',
    
    // Testimonials section
    'home.testimonials.tag': 'Testimonials',
    'home.testimonials.title': 'What Our Users Say',
    'home.partners.title': 'Our Strategic Partners',
    'home.partners.subtitle': 'Collaborating to transform healthcare innovation across Saudi Arabia',
    
    // Footer
    'footer.mohLogo': 'Ministry of Health Logo',
    'footer.description': 'The Health Innovation Platform connects healthcare innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.newsletter': 'Newsletter',
    'footer.subscribeText': 'Stay updated with the latest innovations and challenges',
    'footer.emailPlaceholder': 'Your email',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': 'Ministry of Health, Kingdom of Saudi Arabia. All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
    'footer.aboutPlatform': 'About the Platform',
    'footer.innovationChallenges': 'Innovation Challenges',
    'footer.investmentOpportunities': 'Investment Opportunities',
    'footer.regulatorySandbox': 'Regulatory Sandbox',
    'footer.knowledgeHub': 'Knowledge Hub',
    'footer.vision2030': 'Vision 2030',
    'footer.mohStrategy': 'MoH Strategy',
    'footer.policies': 'Healthcare Policies',
    'footer.successStories': 'Success Stories',
    'footer.contactSupport': 'Contact Support',
    
    // About page
    'about.title': 'About the Health Innovation Platform',
    'about.subtitle': 'Accelerating Healthcare Transformation',
    'about.description': 'The Health Innovation Platform is a Ministry of Health initiative designed to connect healthcare innovators with the resources, partners, and pathways they need to succeed.',
    'about.vision': 'Our Vision',
    'about.visionText': 'To create the leading healthcare innovation ecosystem in the Middle East, fostering solutions that improve health outcomes, enhance patient experience, and optimize healthcare delivery.',
    'about.mission': 'Our Mission',
    'about.missionText': 'To accelerate healthcare innovation by connecting innovators, investors, and regulators in a streamlined environment that supports rapid development and implementation of transformative healthcare solutions.',
    'about.focusAreas': 'Our Focus Areas',
    'about.prevention': 'Preventive Care',
    'about.preventionDesc': 'Technologies and approaches that shift the focus from treatment to prevention.',
    'about.access': 'Healthcare Access',
    'about.accessDesc': 'Solutions that improve healthcare accessibility across all regions of Saudi Arabia.',
    'about.quality': 'Quality Improvement',
    'about.qualityDesc': 'Innovations that enhance the quality and safety of healthcare services.',
    'about.efficiency': 'Operational Efficiency',
    'about.efficiencyDesc': 'Technologies that optimize healthcare operations and resource utilization.',
    'about.infrastructure': 'Healthcare Infrastructure',
    'about.infrastructureDesc': 'Building resilient healthcare infrastructure that delivers services efficiently across the Kingdom.',
    'about.digital': 'Digital Health',
    'about.digitalDesc': 'Leveraging technology to provide accessible, personalized, and effective healthcare services.',
    'about.partners': 'Our Strategic Partners',
    'about.joinCommunity': 'Join Our Innovation Community',
    'about.joinDescription': 'Be part of the healthcare transformation in Saudi Arabia. Whether you're an innovator, investor, or healthcare provider, there's a place for you in our growing community.',
    'about.registerNow': 'Register Now',
    'about.contactUs': 'Contact Us',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن المنصة',
    'nav.challenges': 'التحديات',
    'nav.innovations': 'الابتكارات',
    'nav.investment': 'الاستثمار',
    'nav.regulatory': 'التنظيم',
    'nav.knowledgeHub': 'مركز المعرفة',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',
    
    // General
    'general.english': 'English',
    'general.arabic': 'العربية',
    'general.readMore': 'اقرأ المزيد',
    'general.viewAll': 'عرض الكل',
    'general.learnMore': 'تعرّف على المزيد',
    'general.getStarted': 'ابدأ الآن',
    'general.seeMore': 'شاهد المزيد',
    'general.back': 'رجوع',
    'general.next': 'التالي',
    'general.previous': 'السابق',
    'general.or': 'أو',
    
    // Hero section
    'home.hero.titleGradient': 'منصة الابتكار الصحي',
    'home.hero.titleDark': 'تمكين الابتكار الصحي لغد أفضل',
    'home.hero.description': 'منصة شاملة تربط بين مبتكري الرعاية الصحية والمستثمرين والمنظمين لتحويل تقديم الرعاية الصحية في جميع أنحاء المملكة العربية السعودية.',
    'home.hero.exploreButton': 'استكشاف الابتكارات',
    'home.hero.joinButton': 'انضم إلى تحدي',
    'home.hero.investmentButton': 'الوصول للاستثمار',
    'home.hero.stats.innovators': 'المبتكرون',
    'home.hero.stats.investments': 'الاستثمارات (ريال)',
    'home.hero.stats.challenges': 'التحديات النشطة',
    
    // About section
    'home.about.title': 'تحويل الرعاية الصحية في السعودية',
    'home.about.subtitle': 'متوافق مع رؤية 2030',
    'home.about.description': 'تدعم منصة الابتكار الصحي التحول الرقمي في تقديم الرعاية الصحية في المملكة العربية السعودية، بما يتماشى مع أهداف رؤية 2030 والأهداف الاستراتيجية لوزارة الصحة.',
    'home.about.videoCaption': 'اكتشف كيف تقوم منصتنا بتبسيط رحلة الابتكار',
    'home.about.statTitle1': 'ابتكار أسرع',
    'home.about.statDescription1': 'تقليل الوقت اللازم للوصول إلى السوق من خلال ربط المبتكرين بالجهات التنظيمية والمستثمرين',
    'home.about.statTitle2': 'وصول أفضل',
    'home.about.statDescription2': 'تحسين إمكانية الوصول إلى الرعاية الصحية من خلال التقنيات التي تصل إلى المزيد من المرضى',
    'home.about.statTitle3': 'تكاليف أقل',
    'home.about.statDescription3': 'تعزيز الكفاءة وتقليل تكاليف تقديم الرعاية الصحية من خلال الابتكار',
    
    // Platform highlights
    'home.highlights.tag': 'ميزات المنصة',
    'home.highlights.title': 'نظام متكامل للابتكار الصحي',
    'home.highlights.description': 'تجمع منصتنا جميع عناصر نظام ابتكار الرعاية الصحية في بيئة متكاملة واحدة.',
    'home.highlights.feature1.title': 'مطابقة الابتكارات بالذكاء الاصطناعي',
    'home.highlights.feature1.description': 'خوارزميات متقدمة تطابق الابتكارات مع المستثمرين والمنظمين ومقدمي الرعاية الصحية المناسبين.',
    'home.highlights.feature2.title': 'الوصول إلى بيئة تجريبية تنظيمية',
    'home.highlights.feature2.description': 'وصول مبسط إلى بيئات الاختبار التنظيمية للحصول على موافقة وتنفيذ أسرع.',
    'home.highlights.feature3.title': 'سوق الاستثمار',
    'home.highlights.feature3.description': 'التواصل مع المستثمرين من القطاعين العام والخاص المهتمين بابتكار الرعاية الصحية.',
    'home.highlights.feature4.title': 'مركز المعرفة',
    'home.highlights.feature4.description': 'الوصول إلى الموارد والأبحاث وأفضل الممارسات لإثراء رحلتك في الابتكار.',
    'home.highlights.feature5.title': 'منصة تقديم التحديات',
    'home.highlights.feature5.description': 'المشاركة في التحديات من وزارة الصحة ومقدمي الرعاية الصحية.',
    'home.highlights.feature6.title': 'شبكة تعاون عالمية',
    'home.highlights.feature6.description': 'التواصل مع مبتكري وخبراء الرعاية الصحية الدوليين.',
    
    // AI-driven section
    'home.ai.title': 'الابتكار القائم على الذكاء الاصطناعي',
    'home.ai.subtitle': 'تمكين مستقبل الرعاية الصحية',
    'home.ai.description': 'تستخدم منصتنا الذكاء الاصطناعي لتسريع الابتكار، وتحسين المطابقة، وتقديم رؤى تنبؤية.',
    'home.ai.feature1': 'توصيات شخصية',
    'home.ai.feature2': 'نمذجة النجاح التنبؤية',
    'home.ai.feature3': 'تحليل الاتجاهات',
    'home.ai.feature4': 'التوثيق الآلي',
    
    // Featured section
    'home.featured.title': 'قصص نجاح',
    'home.featured.description': 'اكتشف الابتكارات التي نجحت في التنقل في نظام الرعاية الصحية من خلال منصتنا.',
    'home.featured.readMore': 'اقرأ القصة كاملة',
    'home.featured.stats.innovators': 'المبتكرون المسجلون',
    'home.featured.stats.investments': 'إجمالي الاستثمار (ريال)',
    'home.featured.stats.launched': 'الحلول المطلقة',
    'home.featured.stats.success': 'معدل النجاح',
    'home.featured.stories.title': 'قصص نجاح بارزة',
    'home.featured.story1.title': 'أداة تشخيصية تعمل بالذكاء الاصطناعي',
    'home.featured.story1.category': 'الذكاء الاصطناعي',
    'home.featured.story1.description': 'خوارزمية تعلم آلي تحسن الكشف المبكر عن السرطان من خلال تحليل بيانات التصوير الطبي.',
    'home.featured.story2.title': 'نظام مراقبة المرضى عن بعد',
    'home.featured.story2.category': 'الصحة الرقمية',
    'home.featured.story2.description': 'نظام مراقبة عن بعد يعمل بإنترنت الأشياء لإدارة الأمراض المزمنة، مما يقلل من إعادة دخول المستشفى بنسبة 35٪.',
    'home.featured.story3.title': 'منصة سلسلة توريد الرعاية الصحية',
    'home.featured.story3.category': 'البنية التحتية',
    'home.featured.story3.description': 'منصة تعتمد على تقنية البلوك تشين لتحسين شفافية وكفاءة سلسلة التوريد الطبية عبر المستشفيات السعودية.',
    
    // Challenges section
    'home.challenges.title': 'تحديات الابتكار الحالية',
    'home.challenges.description': 'انضم إلى هذه التحديات الصحية وساهم بابتكاراتك في حل القضايا الحرجة.',
    'home.challenges.viewAllButton': 'عرض جميع التحديات',
    'home.challenges.daysLeft': 'يوم متبقي',
    'home.challenges.challenge1.title': 'حلول إدارة مرض السكري',
    'home.challenges.challenge1.description': 'البحث عن تقنيات مبتكرة لتحسين إدارة مرض السكري ونتائج المرضى.',
    'home.challenges.challenge1.deadline': '30 يونيو 2025',
    'home.challenges.challenge1.category': 'إدارة الأمراض المزمنة',
    'home.challenges.challenge2.title': 'الذكاء الاصطناعي للتصوير الطبي',
    'home.challenges.challenge2.description': 'حلول الذكاء الاصطناعي لتعزيز الدقة والكفاءة التشخيصية في التصوير الطبي.',
    'home.challenges.challenge2.deadline': '15 يوليو 2025',
    'home.challenges.challenge2.category': 'الذكاء الاصطناعي والتعلم الآلي',
    'home.challenges.challenge3.title': 'تحسين سلسلة إمداد الرعاية الصحية',
    'home.challenges.challenge3.description': 'إنشاء حلول لتحسين كفاءة ومرونة سلاسل الإمداد الطبي across Saudi Arabia.',
    'home.challenges.challenge3.deadline': '22 أغسطس 2025',
    'home.challenges.challenge3.category': 'الخدمات اللوجستية',
    
    // Innovation Gallery
    'home.innovations.tag': 'الابتكارات المميزة',
    'home.innovations.title': 'اكتشف ابتكارات الرعاية الصحية',
    'home.innovations.description': 'استكشف الحلول المتطورة التي تحول تقديم الرعاية الصحية في المملكة العربية السعودية وخارجها.',
    'home.innovations.viewAllButton': 'عرض جميع الابتكارات',
    'home.innovations.filters.all': 'الكل',
    'home.innovations.filters.featured': 'مميزة',
    'home.innovations.filters.highTRL': 'جاهزة للسوق',
    'home.innovations.filters.digitalHealth': 'الصحة الرقمية',
    'home.innovations.filters.ai': 'الذكاء الاصطناعي والتعلم الآلي',
    'home.innovations.filters.devices': 'الأجهزة',
    
    // Testimonials section
    'home.testimonials.tag': 'آراء المستخدمين',
    'home.testimonials.title': 'ماذا يقول مستخدمونا',
    'home.partners.title': 'شركاؤنا الاستراتيجيين',
    'home.partners.subtitle': 'نتعاون لتحويل ابتكار الرعاية الصحية في جميع أنحاء المملكة العربية السعودية',
    
    // Footer
    'footer.mohLogo': 'شعار وزارة الصحة',
    'footer.description': 'تربط منصة الابتكار الصحي بين مبتكري الرعاية الصحية والمستثمرين والمنظمين لتحويل تقديم الرعاية الصحية في جميع أنحاء المملكة العربية السعودية.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.resources': 'موارد',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.subscribeText': 'ابق على اطلاع بأحدث الابتكارات والتحديات',
    'footer.emailPlaceholder': 'بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.copyright': 'وزارة الصحة، المملكة العربية السعودية. جميع الحقوق محفوظة.',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.accessibility': 'إمكانية الوصول',
    'footer.aboutPlatform': 'عن المنصة',
    'footer.innovationChallenges': 'تحديات الابتكار',
    'footer.investmentOpportunities': 'فرص الاستثمار',
    'footer.regulatorySandbox': 'البيئة التنظيمية التجريبية',
    'footer.knowledgeHub': 'مركز المعرفة',
    'footer.vision2030': 'رؤية 2030',
    'footer.mohStrategy': 'استراتيجية وزارة الصحة',
    'footer.policies': 'سياسات الرعاية الصحية',
    'footer.successStories': 'قصص النجاح',
    'footer.contactSupport': 'اتصل بالدعم',
    
    // About page
    'about.title': 'عن منصة الابتكار الصحي',
    'about.subtitle': 'تسريع تحول الرعاية الصحية',
    'about.description': 'منصة الابتكار الصحي هي مبادرة من وزارة الصحة مصممة لربط مبتكري الرعاية الصحية بالموارد والشركاء والمسارات التي يحتاجونها للنجاح.',
    'about.vision': 'رؤيتنا',
    'about.visionText': 'إنشاء نظام ابتكار رائد للرعاية الصحية في الشرق الأوسط، ورعاية الحلول التي تحسن النتائج الصحية، وتعزز تجربة المريض، وتحسن تقديم الرعاية الصحية.',
    'about.mission': 'مهمتنا',
    'about.missionText': 'تسريع ابتكار الرعاية الصحية من خلال ربط المبتكرين والمستثمرين والمنظمين في بيئة مبسطة تدعم التطوير السريع وتنفيذ حلول الرعاية الصحية التحويلية.',
    'about.focusAreas': 'مجالات تركيزنا',
    'about.prevention': 'الرعاية الوقائية',
    'about.preventionDesc': 'التقنيات والنهج التي تحول التركيز من العلاج إلى الوقاية.',
    'about.access': 'الوصول للرعاية الصحية',
    'about.accessDesc': 'الحلول التي تحسن إمكانية الوصول إلى الرعاية الصحية في جميع مناطق المملكة العربية السعودية.',
    'about.quality': 'تحسين الجودة',
    'about.qualityDesc': 'الابتكارات التي تعزز جودة وسلامة خدمات الرعاية الصحية.',
    'about.efficiency': 'الكفاءة التشغيلية',
    'about.efficiencyDesc': 'التقنيات التي تحسن عمليات الرعاية الصحية واستخدام الموارد.',
    'about.infrastructure': 'البنية التحتية للرعاية الصحية',
    'about.infrastructureDesc': 'بناء بنية تحتية مرنة للرعاية الصحية تقدم الخدمات بكفاءة في جميع أنحاء المملكة.',
    'about.digital': 'الصحة الرقمية',
    'about.digitalDesc': 'الاستفادة من التكنولوجيا لتوفير خدمات رعاية صحية يسهل الوصول إليها وشخصية وفعالة.',
    'about.partners': 'شركاؤنا الاستراتيجيين',
    'about.joinCommunity': 'انضم إلى مجتمع الابتكار لدينا',
    'about.joinDescription': 'كن جزءًا من تحول الرعاية الصحية في المملكة العربية السعودية. سواء كنت مبتكرًا أو مستثمرًا أو مقدم رعاية صحية، هناك مكان لك في مجتمعنا المتنامي.',
    'about.registerNow': 'سجل الآن',
    'about.contactUs': 'اتصل بنا',
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  // Function to translate keys
  const t = (key: string): string => {
    if (translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English if the key doesn't exist in the current language
    if (translations['en'][key]) {
      return translations['en'][key];
    }
    
    // If the key doesn't exist at all, return the key itself
    console.warn(`Translation key not found: ${key}`);
    return key;
  };
  
  // Use effect to set the document language and direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add a CSS class to the body for easier targeting
    if (language === 'ar') {
      document.body.classList.add('lang-ar');
    } else {
      document.body.classList.remove('lang-ar');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
