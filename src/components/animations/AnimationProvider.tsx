
import React, { createContext, useContext, useState, useEffect } from 'react';

type AnimationContextType = {
  prefersReducedMotion: boolean;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
};

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  animationsEnabled: true,
  toggleAnimations: () => {},
});

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Allow users to toggle animations (stored in local storage)
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Check if user has previously set a preference
    const storedPreference = localStorage.getItem('animations-enabled');
    if (storedPreference !== null) {
      setAnimationsEnabled(storedPreference === 'true');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleAnimations = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem('animations-enabled', String(newValue));
  };

  return (
    <AnimationContext.Provider value={{ 
      prefersReducedMotion, 
      animationsEnabled, 
      toggleAnimations 
    }}>
      {children}
    </AnimationContext.Provider>
  );
};
