
import { useEffect } from "react";

/**
 * Sets document direction and related styles based on language
 * @param language Current language code ('en' or 'ar')
 */
export const applyRTLDirection = (language: string): void => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
  
  // Add special RTL class to document for global RTL styles
  if (language === 'ar') {
    document.documentElement.classList.add('rtl-layout');
  } else {
    document.documentElement.classList.remove('rtl-layout');
  }
  
  // Add global inline override for alignment in RTL mode
  document.documentElement.style.textAlign = language === 'ar' ? 'right' : 'left';
};

/**
 * Hook to automatically apply RTL direction when language changes
 * @param language Current language code ('en' or 'ar')
 */
export const useRTLDirection = (language: string): void => {
  useEffect(() => {
    applyRTLDirection(language);
  }, [language]);
};
