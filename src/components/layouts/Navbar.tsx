
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { NavbarMainLinks } from "./NavbarMainLinks";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isDashboardPage = location.pathname.includes('/dashboard');

  // Function to check if a route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Don't render the navbar on dashboard pages
  if (isDashboardPage) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png"
              alt="MOH Logo"
              className="h-10"
            />
            <span
              className={`ml-2 font-semibold text-xl ${
                isScrolled ? "text-moh-darkGreen" : "text-moh-darkGreen"
              }`}
            >
              Healthcare Innovation
            </span>
          </Link>

          {/* Desktop Navigation - Main Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavbarMainLinks isRouteActive={isRouteActive} />
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button asChild className="ml-2 bg-moh-green hover:bg-moh-darkGreen">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-moh-darkGreen">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-moh-green/30 text-moh-darkGreen hover:bg-moh-lightGreen/20" asChild>
                  <Link to="/auth/register">Register</Link>
                </Button>
                <Button asChild className="ml-2 bg-moh-green hover:bg-moh-darkGreen">
                  <Link to="/auth/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${
                isScrolled ? "text-moh-darkGreen" : "text-moh-darkGreen"
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/innovations" onClick={() => setMobileMenuOpen(false)}>
                Innovations
              </MobileNavLink>
              <MobileNavLink to="/challenges" onClick={() => setMobileMenuOpen(false)}>
                Challenges
              </MobileNavLink>
              <MobileNavLink to="/marketplace" onClick={() => setMobileMenuOpen(false)}>
                Marketplace
              </MobileNavLink>
              <MobileNavLink to="/regulatory" onClick={() => setMobileMenuOpen(false)}>
                Regulatory
              </MobileNavLink>
              <MobileNavLink to="/knowledge-hub" onClick={() => setMobileMenuOpen(false)}>
                Knowledge Hub
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </MobileNavLink>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-moh-darkGreen w-full justify-start px-3"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="border-moh-green/30 w-full"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link to="/auth/register">Register</Link>
                  </Button>
                  <Button
                    className="bg-moh-green hover:bg-moh-darkGreen w-full"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link to="/auth/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Mobile Nav Link component
function MobileNavLink({ children, to, onClick }: { children: React.ReactNode; to: string; onClick: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 ${
        isActive
          ? "text-moh-darkGreen font-medium bg-moh-lightGreen/20 rounded-md"
          : "text-gray-700 hover:text-moh-darkGreen hover:bg-moh-lightGreen/10 rounded-md"
      }`}
    >
      {children}
    </Link>
  );
}
