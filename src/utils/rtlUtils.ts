
import { useEffect } from "react";

/**
 * Enhanced RTL utility to set document direction and related styles based on language
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
    document.documentElement.style.setProperty('--dir', 'rtl');
    document.documentElement.style.setProperty('--flex-direction', 'row-reverse');
    document.documentElement.style.setProperty('--transform-direction', 'scaleX(-1)');
  } else {
    document.documentElement.style.setProperty('--text-align', 'left');
    document.documentElement.style.setProperty('--float', 'left');
    document.documentElement.style.setProperty('--start', 'left');
    document.documentElement.style.setProperty('--end', 'right');
    document.documentElement.style.setProperty('--dir', 'ltr');
    document.documentElement.style.setProperty('--flex-direction', 'row');
    document.documentElement.style.setProperty('--transform-direction', 'none');
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
        
        // Fix any additional elements that need special treatment
        document.querySelectorAll('.rtl-icon-rotate').forEach((el) => {
          (el as HTMLElement).style.transform = 'scaleX(-1)';
        });
      } else {
        // Reset any specific adjustments
        document.querySelectorAll('.reversed-in-rtl').forEach((el) => {
          (el as HTMLElement).style.flexDirection = 'row';
        });
        
        document.querySelectorAll('.rtl-icon-rotate').forEach((el) => {
          (el as HTMLElement).style.transform = 'none';
        });
      }
    };
    
    // Execute with a slight delay to ensure DOM is updated
    setTimeout(handleRTLTransition, 100);
    
    // Create/add global stylesheet for RTL-specific CSS
    const addRTLStyles = () => {
      const styleId = 'rtl-dynamic-styles';
      let styleEl = document.getElementById(styleId);
      
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      
      if (language === 'ar') {
        styleEl.textContent = `
          .rtl-flip-icon { transform: scaleX(-1); }
          .rtl-margin-flip { margin-right: 0.5rem; margin-left: 0 !important; }
          .rtl-padding-flip { padding-right: 0.5rem; padding-left: 0 !important; }
          .rtl-text-align { text-align: right !important; }
          .rtl-float { float: right !important; }
        `;
      } else {
        styleEl.textContent = '';
      }
    };
    
    addRTLStyles();
    
    // Cleanup function
    return () => {
      const styleId = document.getElementById('rtl-dynamic-styles');
      if (styleId) styleId.textContent = '';
    };
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
    justify: language === 'ar' ? 'justify-end' : 'justify-start',
    alignEnd: language === 'ar' ? 'items-start' : 'items-end',
    flipIcon: language === 'ar' ? 'rtl-flip-icon' : '',
  };
};

/**
 * Returns the appropriate placement for popovers and tooltips based on RTL
 * @param language Current language code
 * @param ltrPlacement The placement to use in LTR mode
 * @returns The appropriate placement considering RTL
 */
export const getRTLPlacement = (language: string, ltrPlacement: string): string => {
  if (language !== 'ar') return ltrPlacement;
  
  // Map of LTR placements to their RTL equivalents
  const placementMap: Record<string, string> = {
    'left': 'right',
    'left-start': 'right-start',
    'left-end': 'right-end',
    'right': 'left',
    'right-start': 'left-start',
    'right-end': 'left-end',
  };
  
  return placementMap[ltrPlacement] || ltrPlacement;
};
