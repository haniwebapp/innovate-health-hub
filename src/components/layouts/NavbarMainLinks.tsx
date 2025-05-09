
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  const { language } = useLanguage();
  
  // Reordered main links based on user journey priority
  const mainLinks = [
    { path: "/innovations", label: "Innovations" },
    { path: "/challenges", label: "Challenges" },
    { path: "/investment", label: "Investment" },
    { path: "/regulatory", label: "Regulatory" },
    { path: "/knowledge-hub", label: "Knowledge Hub" },
    { path: "/about", label: "About" },
  ];

  const MotionLink = motion(Link);
  
  // Animation variants for staggered menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <div className="flex">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <NavigationMenuList className="space-x-6">
            {mainLinks.map((link) => (
              <NavigationMenuItem key={link.path}>
                <motion.div variants={itemVariants}>
                  <MotionLink
                    to={link.path}
                    className={cn(
                      "text-lg transition-colors px-3 py-2 rounded-md relative overflow-hidden",
                      isRouteActive(link.path) 
                        ? 'text-moh-green font-medium' 
                        : 'text-moh-darkGreen hover:text-moh-green hover:bg-gray-50'
                    )}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active link indicator */}
                    {isRouteActive(link.path) && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-moh-green"
                        layoutId="activeNavIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {link.label}
                  </MotionLink>
                </motion.div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </motion.div>
      </div>
    </NavigationMenu>
  );
}
