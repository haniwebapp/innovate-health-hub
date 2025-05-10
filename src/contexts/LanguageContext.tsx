import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available language (English only)
export type Language = 'en';

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
  'home.journey.description': 'Our structured approach to healthcare innovation ensures ideas are properly vetted, developed, and implemented across Saudi Arabia\'s healthcare system.',
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
  
  // Login page translations
  'login.welcomeBack': 'Welcome Back',
  'login.platformDescription': 'Access the Ministry of Health innovation platform to collaborate, innovate, and transform healthcare.',
  'login.signIn': 'Sign In',
  'login.accessAccount': 'Access your account to manage your innovations',
  'login.forgotPassword': 'Forgot Password?',
  'login.invalidCredentials': 'Invalid email or password',
  'login.genericError': 'Something went wrong. Please try again.',
  'login.signingIn': 'Signing In...',
  'login.dontHaveAccount': 'Don\'t have an account?',
  'login.termsAndPrivacy': 'By signing in, you agree to our Terms of Service and Privacy Policy.',

  // Registration page translations
  'register.title': 'Create an Account',
  'register.description': 'Join our platform to explore innovation opportunities',
  'register.joinPlatform': 'Join Our Healthcare Innovation Platform',
  'register.platformBenefits': 'Connect with healthcare stakeholders, access funding opportunities, and contribute to transforming healthcare delivery across Saudi Arabia.',
  'register.email': 'Email Address',
  'register.password': 'Password',
  'register.confirmPassword': 'Confirm Password',
  'register.firstName': 'First Name',
  'register.lastName': 'Last Name',
  'register.userType': 'User Type',
  'register.organization': 'Organization',
  'register.organizationPlaceholder': 'Enter your organization name',
  'register.termsAndConditions': 'I agree to the Terms of Service and Privacy Policy',
  'register.alreadyHaveAccount': 'Already have an account?',
  'register.creatingAccount': 'Creating Account...',
  'register.createAccount': 'Create Account',
  'register.emailAlreadyInUse': 'This email is already registered',
  'register.weakPassword': 'Password should be at least 6 characters',
  'register.genericError': 'Failed to create account',
  
  // New registration translations
  'register.personalInfo': 'Personal Info',
  'register.security': 'Security',
  'register.profile': 'Profile',
  'register.next': 'Next',
  'register.back': 'Back',
  'register.passwordStrength': 'Password Strength',
  'register.selectUserType': 'Select user type',
  'register.individual': 'Individual',
  'register.healthcareProfessional': 'Healthcare Professional',
  'register.innovator': 'Innovator',
  'register.investor': 'Investor',
  'register.organization': 'Organization',
  'register.organizationName': 'Organization Name',
  'register.agreeTerms': 'I agree to the Terms of Service and Privacy Policy',

  // Verification page translations
  'verification.title': 'Email Verification',
  'verification.description': 'Please verify your email to continue',
  'verification.checkInbox': 'Check Your Inbox',
  'verification.goToLogin': 'Go to Login',
  'verification.notReceived': 'Didn\'t receive the email?',
  'verification.resendEmail': 'Resend Verification Email',
  'verification.resending': 'Resending Email...',
  'verification.emailResent': 'Email Sent Successfully!',

  // Dashboard translations
  'dashboard.welcome': 'Welcome,',
  'dashboard.subtitle': 'Here\'s what\'s happening with your account',
  'dashboard.completionRate': 'Profile Completion Rate',
  'dashboard.activeInnovations': 'Active Innovations',
  'dashboard.challenges': 'Open Challenges',
  'dashboard.messages': 'Unread Messages',
  'dashboard.upcomingEvents': 'Upcoming Events',
  'dashboard.recentActivity': 'Recent Activity',
  'dashboard.suggestions': 'Recommended For You',
  'dashboard.viewAll': 'View All',
  'dashboard.exploreButton': 'Explore Challenges',

  // Admin dashboard translations
  'admin.users': 'User Management',
  'admin.usersDescription': 'View and manage platform users',
  'admin.addUser': 'Add User',
  'admin.refreshUsers': 'Refresh Users',
  'admin.searchUsers': 'Search users...',
  'admin.allUsers': 'All Users',
  'admin.activeUsers': 'Active',
  'admin.inactiveUsers': 'Inactive',
  'admin.userStats': 'User Statistics',
  'admin.totalUsers': 'Total Users',
  'admin.newUsers': 'New Users',
  'admin.activeThisMonth': 'Active This Month',
  'admin.userInsights': 'User Insights',
  'admin.userTypes': 'User Types',
  'admin.organizations': 'Organizations',

  // Profile page translations
  'profile.title': 'Your Profile',
  'profile.description': 'Manage your personal information and preferences',
  'profile.profileInformation': 'Profile Information',
  'profile.updateDetails': 'Update your account profile details here',
  'profile.uploadPhoto': 'Upload Photo',
  'profile.uploading': 'Uploading...',
  'profile.memberSince': 'Member since',
  'profile.firstName': 'First Name',
  'profile.lastName': 'Last Name',
  'profile.userType': 'User Type',
  'profile.organization': 'Organization Name',
  'profile.saveChanges': 'Save Changes',
  'profile.updating': 'Updating...',
  'profile.saved': 'Saved!',
  'profile.updateSuccess': 'Your profile has been updated successfully.',
  'profile.updateError': 'Failed to update profile:',
  'profile.avatarSuccess': 'Your profile picture has been updated.',
  'profile.avatarError': 'Failed to upload avatar:',
  'profile.accountSettings': 'Account Settings',
  'profile.preferences': 'Manage your account preferences',
  'profile.emailNotifications': 'Email Notifications',
  'profile.password': 'Password',
  'profile.passwordDesc': 'Change your password to keep your account secure',
  'profile.passwordChange': 'Change Password',
  
  // Investment page translations
  'investment.title': 'Investment Opportunities',
  'investment.subtitle': 'Explore funding options for your healthcare innovations',
  'investment.overview': 'Overview',
  'investment.apply': 'Apply Now',
  'investment.viewDetails': 'View Details',
  'investment.fundingType': 'Funding Type',
  'investment.fundingAmount': 'Funding Amount',
  'investment.deadline': 'Application Deadline',
  'investment.eligibilityCriteria': 'Eligibility Criteria',
  'investment.applicationProcess': 'Application Process',
  'investment.successStories': 'Success Stories',
  'investment.faqs': 'Frequently Asked Questions',
  'investment.contact': 'Contact Investment Team',

  // Knowledge Hub translations
  'knowledgeHub.title': 'Knowledge Hub',
  'knowledgeHub.subtitle': 'Resources and insights to accelerate your healthcare innovations',
  'knowledgeHub.latestResearch': 'Latest Research',
  'knowledgeHub.guidelines': 'Regulatory Guidelines',
  'knowledgeHub.marketReports': 'Market Reports',
  'knowledgeHub.webinars': 'Webinars & Events',
  'knowledgeHub.toolkits': 'Innovation Toolkits',
  'knowledgeHub.readMore': 'Read More',
  'knowledgeHub.watchNow': 'Watch Now',
  'knowledgeHub.download': 'Download',
  'knowledgeHub.searchResources': 'Search resources...',

  // Collaboration page translations
  'collaboration.title': 'Collaboration',
  'collaboration.subtitle': 'Connect with other users, join discussions and webinars',
  'collaboration.messages': 'Messages',
  'collaboration.forums': 'Forums',
  'collaboration.webinars': 'Webinars',
  'collaboration.meetings': 'Meetings',
  'collaboration.directMessages': 'Direct messages with other users',
  'collaboration.findUsers': 'Find Users',
  'collaboration.comingSoon': 'Coming in Phase 2',

  // Activity page translations
  'activity.title': 'Activity History',
  'activity.subtitle': 'Track your activity across the platform',
  'activity.all': 'All Activity',
  'activity.innovations': 'Innovations',
  'activity.challenges': 'Challenges',
  'activity.investment': 'Investment',
  'activity.allActivities': 'All Activities',
  'activity.timeline': 'Your complete activity timeline',
  
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
  t: (key: string) => string;
  setLanguage: (lang: Language) => void; // Add this even though we'll only use English
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: (key: string) => key,
  setLanguage: () => {}, // No-op function
});

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en'); // Always English

  // Translation function that returns translations based on the key
  const t = (key: string): string => {
    // Check if the key exists in our translations object
    if (translations[key]) {
      return translations[key];
    }
    // If the key doesn't exist, return the key itself to make missing translations obvious
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
