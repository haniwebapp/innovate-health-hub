
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages (keeping just for RTL support)
export type Language = 'en' | 'ar';

// Simple translations mapping
const translations: Record<string, string> = {
  // Navigation items
  'nav.about': 'About',
  'nav.challenges': 'Challenges',
  'nav.innovations': 'Innovations',
  'nav.knowledgeHub': 'Knowledge Hub',
  'nav.signIn': 'Sign In',
  'nav.login': 'Login',
  'nav.register': 'Register',
  'nav.logout': 'Logout',
  'nav.dashboard': 'Dashboard',
  
  // Hero section
  'home.hero.title': 'Empowering Health Innovation',
  'home.hero.subtitle': 'for a Better Tomorrow',
  'home.hero.description': 'A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.',
  'home.hero.exploreButton': 'Explore Innovations',
  'home.hero.joinButton': 'Join a Challenge',
  'home.hero.investmentButton': 'Access Investment',
  
  // Challenge section
  'home.challenges.tag': 'Innovation Challenges',
  'home.challenges.title': 'Current Healthcare Challenges',
  'home.challenges.description': 'Join our innovation challenges to solve pressing healthcare problems and make a difference in the Kingdom.',
  'home.challenges.viewAll': 'View All Challenges',
  'home.challenges.deadline': 'Deadline',
  'home.challenges.participants': 'Participants',
  'home.challenges.prize': 'Prize',
  'home.challenges.viewChallenge': 'View Challenge',
  'home.challenges.nextDeadline': 'Next Deadline',
  
  // Challenge 1
  'home.challenges.challenge1.title': 'Remote Patient Monitoring Solutions',
  'home.challenges.challenge1.description': 'Develop innovative solutions for monitoring patients with chronic conditions remotely.',
  'home.challenges.challenge1.deadline': 'June 30, 2025',
  'home.challenges.challenge1.category': 'Digital Health',
  
  // Challenge 2
  'home.challenges.challenge2.title': 'Hospital Resource Optimization',
  'home.challenges.challenge2.description': 'Create AI-driven tools to optimize hospital resource allocation and improve operational efficiency.',
  'home.challenges.challenge2.deadline': 'August 15, 2025',
  'home.challenges.challenge2.category': 'Healthcare Operations',
  
  // Challenge 3
  'home.challenges.challenge3.title': 'Mental Health Applications',
  'home.challenges.challenge3.description': 'Design accessible mental health support applications tailored for Saudi citizens.',
  'home.challenges.challenge3.deadline': 'September 22, 2025',
  'home.challenges.challenge3.category': 'Mental Health',
  
  // Featured section
  'home.featured.title': 'Success Stories',
  'home.featured.description': 'Discover how innovations on our platform are transforming healthcare delivery across Saudi Arabia.',
  'home.featured.readMore': 'Read More',
  
  // Featured stats
  'home.featured.stats.innovators': 'Active Innovators',
  'home.featured.stats.investments': 'Total Investment (SAR)',
  'home.featured.stats.launched': 'Solutions Launched',
  'home.featured.stats.success': 'Implementation Success Rate',
  
  // Featured stories
  'home.featured.stories.title': 'Highlighted Success Stories',
  'home.featured.story1.title': 'AI-Powered Diagnostic Tool',
  'home.featured.story1.category': 'Digital Diagnostics',
  'home.featured.story1.description': 'An AI solution that helps radiologists detect abnormalities in medical images with 95% accuracy.',
  
  'home.featured.story2.title': 'Smart Hospital Management System',
  'home.featured.story2.category': 'Healthcare Operations',
  'home.featured.story2.description': 'A comprehensive system that reduced administrative workload by 40% in 15 hospitals across the Kingdom.',
  
  'home.featured.story3.title': 'Patient Engagement Platform',
  'home.featured.story3.category': 'Patient Experience',
  'home.featured.story3.description': 'A mobile platform that improved medication adherence by 60% for chronic disease patients.',
  
  // Innovation Journey section
  'home.journey.tag': 'Innovation Journey',
  'home.journey.title': 'Healthcare Innovation Roadmap',
  'home.journey.description': 'Our structured approach to healthcare innovation ensures ideas are properly vetted, developed, and implemented across Saudi Arabia's healthcare system.',
  'home.journey.currentPhase': 'Current Phase',
  
  // Innovation Journey phases
  'home.journey.ideation.title': 'Ideation',
  'home.journey.ideation.description': 'Identifying healthcare challenges and developing innovative solutions',
  'home.journey.development.title': 'Development',
  'home.journey.development.description': 'Building prototypes and testing with stakeholders',
  'home.journey.validation.title': 'Validation',
  'home.journey.validation.description': 'Ensuring solutions meet clinical and regulatory standards',
  'home.journey.implementation.title': 'Implementation',
  'home.journey.implementation.description': 'Scaling solutions across healthcare facilities',
  'home.journey.impact.title': 'Impact Measurement',
  'home.journey.impact.description': 'Evaluating outcomes and optimizing solutions',
  
  // Innovation gallery section
  'home.innovations.tag': 'Featured Innovations',
  'home.innovations.title': 'Healthcare Solutions Gallery',
  'home.innovations.subtitle': 'Discover innovative solutions transforming Saudi healthcare',
  
  // Footer
  'footer.mohLogo': 'Ministry of Health Logo',
  'footer.description': 'The official innovation platform of the Saudi Ministry of Health, connecting healthcare innovators with resources and opportunities.',
  'footer.quickLinks': 'Quick Links',
  'footer.resources': 'Resources',
  'footer.newsletter': 'Newsletter',
  'footer.subscribeText': 'Stay updated with the latest healthcare innovation news and opportunities.',
  'footer.emailPlaceholder': 'Your Email',
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
  'footer.mohStrategy': 'MOH Strategy',
  'footer.policies': 'Policies & Guidelines',
  'footer.successStories': 'Success Stories',
  'footer.contactSupport': 'Contact Support'
};

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

  // Translation function that returns translations based on the key
  const t = (key: string): string => {
    // Check if the key exists in our translations object
    if (translations[key]) {
      return translations[key];
    }
    // If the key doesn't exist, return the key itself to make missing translations obvious
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
