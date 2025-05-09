
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { LogOut, User, Settings, FileUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "../ui/separator";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarMobileMenuProps {
  isRouteActive: (path: string) => boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function NavbarMobileMenu({
  isRouteActive,
  setMobileMenuOpen,
}: NavbarMobileMenuProps) {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  
  // Reordered navigation links to match desktop navigation
  const navigationLinks = [
    { path: "/innovations", label: "Innovations" },
    { path: "/challenges", label: "Challenges" },
    { path: "/investment", label: "Investment" },
    { path: "/regulatory", label: "Regulatory" },
    { path: "/knowledge-hub", label: "Knowledge Hub" },
    { path: "/about", label: "About" },
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
    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="md:hidden shadow-lg"
      dir="ltr"
    >
      <div className="bg-white border-t border-gray-200 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col p-4">
            {/* Add prominent CTA for Submit Innovation */}
            <Button 
              className="bg-moh-green hover:bg-moh-darkGreen text-white w-full mb-4 flex items-center justify-center" 
              onClick={() => handleLinkClick("/innovations/submit")}
              asChild
            >
              <Link to="/innovations/submit">
                <FileUp className="mr-2 h-4 w-4" />
                Submit Innovation
              </Link>
            </Button>

            {navigationLinks.map((link) => (
              <div key={link.path} className="mb-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left mb-1 ${
                    isRouteActive(link.path)
                      ? "bg-gray-50 text-moh-green font-medium"
                      : "text-moh-darkGreen hover:text-moh-green"
                  }`}
                  onClick={() => handleLinkClick(link.path)}
                  asChild
                >
                  <Link to={link.path}>
                    {link.label}
                  </Link>
                </Button>
              </div>
            ))}
            
            <Separator className="my-4" />
            
            {user ? (
              <>
                <div className="flex items-center justify-between p-2 mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-moh-green/10 flex items-center justify-center text-moh-green">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="ml-2">{user.email}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  className="justify-start text-left mb-1"
                  onClick={() => handleLinkClick("/dashboard")}
                  asChild
                >
                  <Link to="/dashboard" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  className="justify-start text-left mb-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    handleLinkClick("/");
                    logout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="bg-moh-green hover:bg-moh-darkGreen w-full mb-2" 
                  onClick={() => handleLinkClick("/auth/login")}
                  asChild
                >
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleLinkClick("/auth/register")}
                  asChild
                >
                  <Link to="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
