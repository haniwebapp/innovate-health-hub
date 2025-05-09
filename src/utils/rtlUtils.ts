
import { useEffect } from "react";
import { type Language } from "@/contexts/LanguageContext";

export function getRTLClasses(language: Language) {
  return {
    flex: language === 'ar' ? 'flex-row-reverse' : '',
    text: language === 'ar' ? 'text-right' : 'text-left',
    margin: language === 'ar' ? 'ml-auto' : 'mr-auto',
    float: language === 'ar' ? 'float-right' : 'float-left',
    align: language === 'ar' ? 'items-end' : 'items-start',
  };
}

// Hook to update document direction based on language
export function useRTLDirection(language: Language) {
  useEffect(() => {
    // Update the HTML dir attribute based on language
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    // Optional: add a global class to handle specific RTL/LTR styling
    if (language === 'ar') {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
    
    // Clean up on unmount
    return () => {
      document.documentElement.removeAttribute('dir');
      document.documentElement.classList.remove('rtl', 'ltr');
    };
  }, [language]);
}
