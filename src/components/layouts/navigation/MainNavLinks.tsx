
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavItemVariants } from "./NavAnimations";
import { mainNavLinks } from "./navLinks";

interface MainNavLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function MainNavLinks({ isRouteActive }: MainNavLinksProps) {
  const { language } = useLanguage();
  const MotionLink = motion(Link);
  
  return (
    <NavigationMenu className="hidden md:flex">
      <motion.div
        variants={NavItemVariants.containerVariants}
        initial="hidden"
        animate="visible"
        className="flex"
      >
        <NavigationMenuList className="flex justify-center space-x-2 lg:space-x-4">
          {mainNavLinks.map((link) => (
            <NavigationMenuItem key={link.path}>
              <motion.div variants={NavItemVariants.itemVariants}>
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
