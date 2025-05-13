
import { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Check screen width on initial load and resize
  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    // Check on initial load
    checkScreenWidth();
    
    // Setup resize listener
    window.addEventListener("resize", checkScreenWidth);
    
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
