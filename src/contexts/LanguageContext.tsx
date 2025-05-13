import { createContext, useContext, useState, useEffect } from 'react';

// Define supported languages - removing Arabic
type Language = 'en';

// Context type definition
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLoading: true,
});

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Translation data - keeping only English
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
    
    // Profile page
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
};

// Provider component
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Always use English as the language
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Update language - now only supports English
  const setLanguage = (newLanguage: Language) => {
    setLanguageState('en'); // Always set to English regardless of input
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Set initial state on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {!isLoading && children}
    </LanguageContext.Provider>
  );
};
