
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Award, 
  LineChart, 
  ScrollText, 
  BookOpen, 
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "../ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { menuVariants, itemVariants } from "./mobile-menu/MobileMenuAnimations";
import { MobileMenuLinks } from "./mobile-menu/MobileMenuLinks";
import { MobileMenuUser } from "./mobile-menu/MobileMenuUser";
import { MobileMenuGuest } from "./mobile-menu/MobileMenuGuest";

interface NavbarMobileMenuProps {
  isRouteActive: (path: string) => boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function NavbarMobileMenu({
  isRouteActive,
  setMobileMenuOpen,
}: NavbarMobileMenuProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Navigation links for mobile menu with icons
  const navigationLinks = [
    { path: "/innovations", label: "Innovations", icon: Lightbulb },
    { path: "/challenges", label: "Challenges", icon: Award },
    { path: "/investment", label: "Investment", icon: LineChart },
    { path: "/regulatory", label: "Regulatory", icon: ScrollText },
    { path: "/knowledge-hub", label: "Knowledge Hub", icon: BookOpen },
    { path: "/about", label: "About", icon: AlertCircle },
  ];
  
  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="md:hidden fixed inset-0 bg-white/90 backdrop-blur-md z-40 overflow-hidden"
      dir="ltr"
    >
      <motion.div 
        className="h-full flex flex-col pt-24 pb-8"
        variants={itemVariants}
      >
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <MobileMenuLinks 
            navigationLinks={navigationLinks}
            isRouteActive={isRouteActive}
            handleLinkClick={handleLinkClick}
            itemVariants={itemVariants}
          />
        </div>
        
        <div className="px-4 mt-auto">
          <Separator className="mb-4 opacity-50" />
          
          {user ? (
            <MobileMenuUser 
              handleLinkClick={handleLinkClick} 
              itemVariants={itemVariants} 
            />
          ) : (
            <MobileMenuGuest 
              handleLinkClick={handleLinkClick}
              itemVariants={itemVariants}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
