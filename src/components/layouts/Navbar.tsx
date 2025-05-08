
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Search, Globe, Moon, Sun, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
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
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-moh-darkGreen/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} w-auto object-contain ${theme === 'dark' ? 'brightness-150' : ''}`} 
              />
              <span className={`${language === 'ar' ? 'mr-3' : 'ml-3'} font-medium ${
                scrolled ? 'text-base' : 'text-lg'} ${
                theme === 'dark' ? 'text-white' : 'text-moh-darkGreen'
              }`}>
                {language === 'en' ? 'Innovation Platform' : 'منصة الابتكار'}
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Link to="/about" className={`${theme === 'dark' ? 'text-white hover:text-moh-lightGreen' : 'text-moh-darkGreen hover:text-moh-green'} transition-colors flex items-center`}>
              {t('nav.about')}
            </Link>
            <Link to="/challenges" className={`${theme === 'dark' ? 'text-white hover:text-moh-lightGreen' : 'text-moh-darkGreen hover:text-moh-green'} transition-colors flex items-center gap-1`}>
              {t('nav.challenges')}
              <ChevronDown className="h-4 w-4" />
            </Link>
            <Link to="/innovations" className={`${theme === 'dark' ? 'text-white hover:text-moh-lightGreen' : 'text-moh-darkGreen hover:text-moh-green'} transition-colors`}>
              {t('nav.innovations')}
            </Link>
            <Link to="/knowledge-hub" className={`${theme === 'dark' ? 'text-white hover:text-moh-lightGreen' : 'text-moh-darkGreen hover:text-moh-green'} transition-colors`}>
              {t('nav.knowledgeHub')}
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green'} rounded-full`}
              onClick={() => toggleTheme()}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`${theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green'} rounded-full`}
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English {language === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية {language === 'ar' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className={`${
              theme === 'dark' 
                ? 'border-white text-white hover:bg-white/10' 
                : 'border-moh-green text-moh-green hover:bg-moh-lightGreen'
            }`}>
              {t('nav.signin')}
            </Button>
            <Button className={`${
              theme === 'dark'
                ? 'bg-moh-lightGreen hover:bg-moh-lightGreen/90 text-moh-darkGreen'
                : 'bg-moh-green hover:bg-moh-darkGreen text-white'
            }`}>
              {t('nav.register')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              type="button" 
              className={`inline-flex items-center justify-center rounded-md p-2 ${
                theme === 'dark' ? 'text-white' : 'text-moh-darkGreen'
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
        <div className={`md:hidden ${theme === 'dark' ? 'bg-moh-darkGreen' : 'bg-white'} shadow-lg animate-fade-in`}>
          <div className="px-4 pt-4 pb-6 space-y-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Link 
              to="/about" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-moh-darkGreen hover:bg-moh-lightGreen'
              }`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/challenges" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-moh-darkGreen hover:bg-moh-lightGreen'
              }`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.challenges')}
            </Link>
            <Link 
              to="/innovations" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-moh-darkGreen hover:bg-moh-lightGreen'
              }`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.innovations')}
            </Link>
            <Link 
              to="/knowledge-hub" 
              className={`block px-4 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-moh-darkGreen hover:bg-moh-lightGreen'
              }`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.knowledgeHub')}
            </Link>
            
            <div className="flex items-center justify-between pt-3 pb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex-1 justify-center ${
                  theme === 'dark' 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green'
                }`}
                onClick={() => toggleTheme()}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex-1 justify-center ${
                      theme === 'dark' 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green'
                    }`}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'English' : 'العربية'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English {language === 'en' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('ar')}>
                    العربية {language === 'ar' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className={`w-full ${
                theme === 'dark' 
                  ? 'border-white text-white hover:bg-white/10' 
                  : 'border-moh-green text-moh-green hover:bg-moh-lightGreen'
              }`}>
                {t('nav.signin')}
              </Button>
              <Button className={`w-full ${
                theme === 'dark'
                  ? 'bg-moh-lightGreen hover:bg-moh-lightGreen/90 text-moh-darkGreen'
                  : 'bg-moh-green hover:bg-moh-darkGreen text-white'
              }`}>
                {t('nav.register')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
