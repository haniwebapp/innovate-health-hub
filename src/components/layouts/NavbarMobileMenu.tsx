
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { LogOut, User, Settings } from "lucide-react";
import { User as UserType } from "@/integrations/supabase/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "../ui/separator";

interface NavbarMobileMenuProps {
  isRouteActive: (path: string) => boolean;
  setMobileMenuOpen: (open: boolean) => void;
  user: UserType | null;
  navigate: ReturnType<typeof useNavigate>;
}

export function NavbarMobileMenu({
  isRouteActive,
  setMobileMenuOpen,
  user,
  navigate,
}: NavbarMobileMenuProps) {
  const { t, language } = useLanguage();
  
  // Main navigation links
  const navigationLinks = [
    { path: "/about", label: t('nav.about') },
    { path: "/challenges", label: t('nav.challenges') },
    { path: "/innovations", label: t('nav.innovations') },
    { path: "/investment", label: "Investment" },
    { path: "/regulatory", label: "Regulatory" },
    { path: "/knowledge-hub", label: t('nav.knowledgeHub') },
  ];
  
  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="md:hidden shadow-lg"
    >
      <div className="bg-white border-t border-gray-200 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col p-4">
            {navigationLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className={`justify-start text-left mb-1 ${
                  isRouteActive(link.path)
                    ? "bg-gray-50 text-moh-green font-medium"
                    : "text-moh-darkGreen hover:text-moh-green"
                } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                onClick={() => handleLinkClick(link.path)}
              >
                {link.label}
              </Button>
            ))}
            
            <Separator className="my-4" />
            
            {user ? (
              <>
                <div className="flex items-center justify-between p-2 mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-moh-green/10 flex items-center justify-center text-moh-green">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="ml-2 font-medium">{user.email}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  className="justify-start text-left mb-1"
                  onClick={() => handleLinkClick("/dashboard")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t('nav.dashboard')}
                </Button>
                
                <Button
                  variant="ghost"
                  className="justify-start text-left mb-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleLinkClick("/auth/logout")}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-moh-green hover:bg-moh-darkGreen w-full mb-2" onClick={() => handleLinkClick("/auth/login")}>
                  {t('nav.login')}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleLinkClick("/auth/register")}>
                  {t('nav.register')}
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
