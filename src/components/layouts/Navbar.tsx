
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Moon, Sun, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, direction, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-white/95 dark:bg-moh-darkGreen/90 backdrop-blur-md shadow-md py-2' 
      : isHomePage 
        ? 'bg-transparent py-4' 
        : 'bg-white dark:bg-moh-darkGreen py-4'
  }`;
  
  return (
    <header className={navbarClass} dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain`} 
              />
              <span className={`ml-3 font-medium ${
                scrolled ? 'text-base' : 'text-lg'
              } ${isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'}`}>
                Innovation Platform
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:text-moh-green dark:hover:text-moh-lightGreen transition-colors flex items-center`}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/challenges" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:text-moh-green dark:hover:text-moh-lightGreen transition-colors flex items-center gap-1`}
            >
              {t('nav.challenges')}
            </Link>
            <Link 
              to="/innovations" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:text-moh-green dark:hover:text-moh-lightGreen transition-colors`}
            >
              {t('nav.innovations')}
            </Link>
            <Link 
              to="/knowledge-hub" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:text-moh-green dark:hover:text-moh-lightGreen transition-colors`}
            >
              {t('nav.knowledgeHub')}
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:bg-moh-lightGreen dark:hover:bg-moh-darkGreen/50 hover:text-moh-green dark:hover:text-white rounded-full`}
              onClick={toggleLanguage}
            >
              <Languages className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:bg-moh-lightGreen dark:hover:bg-moh-darkGreen/50 hover:text-moh-green dark:hover:text-white rounded-full`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              } hover:bg-moh-lightGreen dark:hover:bg-moh-darkGreen/50 hover:text-moh-green dark:hover:text-white rounded-full`}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-moh-green text-moh-green hover:bg-moh-lightGreen dark:border-moh-lightGreen dark:text-white dark:hover:bg-moh-darkGreen/50"
            >
              {t('nav.signIn')}
            </Button>
            <Button 
              className="bg-moh-green hover:bg-moh-darkGreen text-white dark:bg-moh-gold dark:hover:bg-moh-darkGold"
            >
              {t('nav.register')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              type="button" 
              className={`inline-flex items-center justify-center rounded-md p-2 ${
                isHomePage && !scrolled ? 'text-moh-darkGreen dark:text-white' : 'text-moh-darkGreen dark:text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 
                <X className="block h-6 w-6" aria-hidden="true" /> : 
                <Menu className="block h-6 w-6" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-moh-darkGreen shadow-lg animate-fade-in" dir={direction}>
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link 
              to="/about" 
              className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen dark:text-white hover:bg-moh-lightGreen dark:hover:bg-moh-green/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/challenges" 
              className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen dark:text-white hover:bg-moh-lightGreen dark:hover:bg-moh-green/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.challenges')}
            </Link>
            <Link 
              to="/innovations" 
              className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen dark:text-white hover:bg-moh-lightGreen dark:hover:bg-moh-green/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.innovations')}
            </Link>
            <Link 
              to="/knowledge-hub" 
              className="block px-4 py-2 rounded-md text-base font-medium text-moh-darkGreen dark:text-white hover:bg-moh-lightGreen dark:hover:bg-moh-green/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.knowledgeHub')}
            </Link>
            
            <div className="flex items-center justify-between pt-3 pb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 justify-center text-moh-darkGreen dark:text-white hover:bg-moh-lightGreen dark:hover:bg-moh-green/20"
                onClick={toggleLanguage}
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 justify-center text-moh-darkGreen dark:text-white hover:bg-moh-lightGreen dark:hover:bg-moh-green/20"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className="w-full border-moh-green text-moh-green hover:bg-moh-lightGreen dark:border-moh-lightGreen dark:text-white dark:hover:bg-moh-darkGreen/50">
                {t('nav.signIn')}
              </Button>
              <Button className="w-full bg-moh-green hover:bg-moh-darkGreen text-white dark:bg-moh-gold dark:hover:bg-moh-darkGold">
                {t('nav.register')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
