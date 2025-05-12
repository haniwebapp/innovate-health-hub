
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { debouncedResize } from '@/utils/uiUtils';

interface UIContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  screenWidth: number;
  screenHeight: number;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [isDarkMode, setIsDarkMode] = useState(false); // Setting initial value to false for light mode
  
  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    
    handleResize(); // Set initial size
    
    const debouncedHandleResize = () => debouncedResize(handleResize);
    window.addEventListener('resize', debouncedHandleResize);
    
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);
  
  // Modified to NOT check for system dark mode preference
  useEffect(() => {
    // Force light mode on initial load
    document.documentElement.classList.remove('dark');
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  // Apply dark mode class to html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const value = {
    isMobile: screenWidth < 768,
    isTablet: screenWidth >= 768 && screenWidth < 1024,
    isDesktop: screenWidth >= 1024,
    isDarkMode,
    toggleDarkMode,
    screenWidth,
    screenHeight,
  };
  
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
