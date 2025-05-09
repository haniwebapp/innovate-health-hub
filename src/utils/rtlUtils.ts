
import { useEffect } from "react";

/**
 * Sets document direction and related styles based on language
 * @param language Current language code ('en' or 'ar')
 */
export const applyRTLDirection = (language: string): void => {
  // Set document direction
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
  
  // Add special RTL classes to document for global RTL styles
  if (language === 'ar') {
    document.documentElement.classList.add('rtl-layout');
    document.documentElement.classList.add('lang-ar');
    document.body.classList.add('rtl-mode');
  } else {
    document.documentElement.classList.remove('rtl-layout');
    document.documentElement.classList.remove('lang-ar');
    document.body.classList.remove('rtl-mode');
  }
  
  // Apply RTL-specific CSS variables for layout control
  if (language === 'ar') {
    document.documentElement.style.setProperty('--text-align', 'right');
    document.documentElement.style.setProperty('--float', 'right');
    document.documentElement.style.setProperty('--start', 'right');
    document.documentElement.style.setProperty('--end', 'left');
  } else {
    document.documentElement.style.setProperty('--text-align', 'left');
    document.documentElement.style.setProperty('--float', 'left');
    document.documentElement.style.setProperty('--start', 'left');
    document.documentElement.style.setProperty('--end', 'right');
  }
  
  // Additional global style overrides
  document.documentElement.style.textAlign = language === 'ar' ? 'right' : 'left';
};

/**
 * Hook to automatically apply RTL direction when language changes
 * @param language Current language code ('en' or 'ar')
 */
export const useRTLDirection = (language: string): void => {
  useEffect(() => {
    applyRTLDirection(language);
    
    // Apply additional RTL-specific logic if needed
    const handleRTLTransition = () => {
      // Any additional logic needed after RTL transition
      if (language === 'ar') {
        // Specific adjustments for Arabic layout
        document.querySelectorAll('.reversed-in-rtl').forEach((el) => {
          (el as HTMLElement).style.flexDirection = 'row-reverse';
        });
      } else {
        // Reset any specific adjustments
        document.querySelectorAll('.reversed-in-rtl').forEach((el) => {
          (el as HTMLElement).style.flexDirection = 'row';
        });
      }
    };
    
    // Execute with a slight delay to ensure DOM is updated
    setTimeout(handleRTLTransition, 100);
    
  }, [language]);
};

/**
 * Provides RTL-aware CSS classes for component use
 * @param language Current language code ('en' or 'ar')
 * @returns Object with CSS class strings for RTL-aware styling
 */
export const getRTLClasses = (language: string) => {
  return {
    container: language === 'ar' ? 'rtl-container' : '',
    text: language === 'ar' ? 'text-right' : 'text-left',
    flex: language === 'ar' ? 'flex-row-reverse' : 'flex-row',
    margin: language === 'ar' ? 'mr-auto' : 'ml-auto',
    padding: language === 'ar' ? 'pr-4' : 'pl-4',
    iconMargin: language === 'ar' ? 'ml-2' : 'mr-2',
  };
};
