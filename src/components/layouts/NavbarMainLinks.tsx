
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  Lightbulb,
  Award,
  DollarSign,
  ShieldCheck,
  BookOpen,
  HelpCircle
} from "lucide-react";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  const { language } = useLanguage();
  
  // Main links with icons
  const mainLinks = [
    { path: "/innovations", label: "Innovations", icon: Lightbulb },
    { path: "/challenges", label: "Challenges", icon: Award },
    { path: "/investment", label: "Investment", icon: DollarSign },
    { path: "/regulatory", label: "Regulatory", icon: ShieldCheck },
    { path: "/knowledge-hub", label: "Knowledge Hub", icon: BookOpen },
    { path: "/about", label: "About", icon: HelpCircle },
  ];

  const MotionLink = motion(Link);
  
  // Enhanced animation variants for staggered menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -12, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex"
      >
        <NavigationMenuList className="flex justify-center space-x-2 lg:space-x-6">
          {mainLinks.map((link) => (
            <NavigationMenuItem key={link.path}>
              <motion.div variants={itemVariants}>
                <div className="flex items-center">
                  <MotionLink
                    to={link.path}
                    className={cn(
                      "text-[15px] transition-all px-3 py-2 rounded-full relative overflow-hidden flex items-center gap-2",
                      isRouteActive(link.path) 
                        ? 'text-white font-medium bg-gradient-to-r from-moh-green to-moh-darkGreen shadow-sm' 
                        : 'text-moh-darkGreen hover:bg-moh-lightGreen/50 hover:text-moh-green'
                    )}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                    
                    {isRouteActive(link.path) && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 z-[-1]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </MotionLink>
                </div>
              </motion.div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </motion.div>
    </NavigationMenu>
  );
}
