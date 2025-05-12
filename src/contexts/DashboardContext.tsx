
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface DashboardContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  breadcrumbs: { label: string; href: string }[];
  setBreadcrumbs: (breadcrumbs: { label: string; href: string }[]) => void;
  expandedSidebarItems: string[];
  toggleSidebarItem: (item: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [pageTitle, setPageTitle] = useState<string>('Dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([
    { label: 'Dashboard', href: '/dashboard' }
  ]);
  const [expandedSidebarItems, setExpandedSidebarItems] = useState<string[]>([]);
  const location = useLocation();
  
  // Update active page based on location
  React.useEffect(() => {
    const path = location.pathname;
    
    // Set default breadcrumbs
    const newBreadcrumbs = [{ label: 'Dashboard', href: '/dashboard' }];
    
    // Dashboard landing page
    if (path === '/dashboard') {
      setActivePage('dashboard');
      setPageTitle('Dashboard');
      setBreadcrumbs(newBreadcrumbs);
      return;
    }
    
    // Extract the section from path (e.g., /dashboard/investment/portfolio -> investment)
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      const section = pathParts[1];
      setActivePage(section);
      
      // Capitalize first letter for page title
      const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
      setPageTitle(sectionTitle);
      
      // Set breadcrumbs based on path
      if (pathParts.length >= 3) {
        newBreadcrumbs.push({ 
          label: sectionTitle, 
          href: `/dashboard/${section}` 
        });
        
        const subsection = pathParts[2];
        const subsectionTitle = subsection.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        newBreadcrumbs.push({
          label: subsectionTitle,
          href: `/dashboard/${section}/${subsection}`
        });
      } else {
        newBreadcrumbs.push({ 
          label: sectionTitle, 
          href: `/dashboard/${section}` 
        });
      }
      
      setBreadcrumbs(newBreadcrumbs);
    }
  }, [location.pathname]);
  
  const toggleSidebarItem = (item: string) => {
    setExpandedSidebarItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };
  
  return (
    <DashboardContext.Provider
      value={{
        activePage,
        setActivePage,
        pageTitle,
        setPageTitle,
        breadcrumbs,
        setBreadcrumbs,
        expandedSidebarItems,
        toggleSidebarItem
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
