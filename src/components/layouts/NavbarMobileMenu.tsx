
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { NavigateFunction } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavbarMobileMenuProps {
  isRouteActive: (path: string) => boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  user: any; // Using any for now, should be properly typed based on user context
  navigate: NavigateFunction;
}

export function NavbarMobileMenu({ 
  isRouteActive, 
  setMobileMenuOpen, 
  user, 
  navigate 
}: NavbarMobileMenuProps) {
  const { signOut } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  
  const mainLinks = [
    { path: "/about", label: t('nav.about') },
    { path: "/challenges", label: t('nav.challenges') },
    { path: "/innovations", label: t('nav.innovations') },
    { 
      path: "/knowledge-hub", 
      label: t('nav.knowledgeHub'),
      hasDropdown: true,
      dropdownItems: [
        { label: t('nav.articles'), path: "/knowledge-hub?category=article" },
        { label: t('nav.videos'), path: "/knowledge-hub?category=video" },
        { label: t('nav.guides'), path: "/knowledge-hub?category=guide" },
        { label: t('nav.researchPapers'), path: "/knowledge-hub?category=research" },
      ]
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/login');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 }
  };

  return (
    <motion.div 
      className="md:hidden bg-white shadow-lg overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="px-4 pt-4 pb-6 space-y-3">
        {mainLinks.map((link) => (
          <motion.div key={link.path} variants={itemVariants}>
            {link.hasDropdown ? (
              <Accordion type="single" collapsible className="border-none">
                <AccordionItem value="knowledge-hub" className="border-none">
                  <AccordionTrigger 
                    className={`${
                      isRouteActive(link.path) 
                        ? 'text-moh-green font-medium' 
                        : 'text-moh-darkGreen hover:text-moh-green'
                    } px-4 py-2 no-underline`}
                  >
                    {link.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <motion.div 
                      className="flex flex-col space-y-1 pl-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className="py-2 text-moh-darkGreen hover:text-moh-green"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.allResources')}
                      </Link>
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="py-2 text-moh-darkGreen hover:text-moh-green"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                to={link.path}
                className={`block px-4 py-2 rounded-md text-base font-medium ${
                  isRouteActive(link.path) 
                    ? 'text-moh-green bg-gray-50' 
                    : 'text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green'
                } transition-all duration-200`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )}
          </motion.div>
        ))}
        
        <motion.div variants={itemVariants} className="flex items-center justify-between pt-3 pb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-center text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green"
          >
            <Search className="h-4 w-4 mr-2" />
            {t('nav.search')}
          </Button>
        </motion.div>

        {/* Language Switcher */}
        <motion.div variants={itemVariants} className="flex items-center justify-between pt-2 pb-3 border-b border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-center text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green"
            onClick={() => setLanguage('en')}
          >
            <span className="mr-2">🇬🇧</span>
            {t('general.english')}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-center text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green"
            onClick={() => setLanguage('ar')}
          >
            <span className="mr-2">🇸🇦</span>
            {t('general.arabic')}
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col space-y-3 pt-2">
          {user ? (
            <>
              <Button 
                onClick={() => handleNavigate('/dashboard')} 
                className="w-full bg-moh-green hover:bg-moh-darkGreen text-white flex gap-2 items-center justify-center btn-hover"
              >
                <User className="h-4 w-4" />
                {t('nav.dashboard')}
              </Button>
              <Button 
                variant="outline"
                onClick={handleSignOut}
                className="w-full border-red-500 text-red-500 hover:bg-red-50 btn-hover"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => handleNavigate('/auth/login')} 
                className="w-full border-moh-green text-moh-green hover:bg-gray-50 flex gap-2 items-center justify-center btn-hover"
              >
                <LogIn className="h-4 w-4" />
                {t('nav.signIn')}
              </Button>
              <Button 
                onClick={() => handleNavigate('/auth/register')} 
                className="w-full bg-moh-green hover:bg-moh-darkGreen text-white flex gap-2 items-center justify-center btn-hover"
              >
                <UserPlus className="h-4 w-4" />
                {t('nav.register')}
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
