
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  const { t, language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  // Main links without dropdown
  const mainLinks = [
    { path: "/about", label: t('nav.about') },
    { path: "/challenges", label: t('nav.challenges') },
    { path: "/innovations", label: t('nav.innovations') },
    { path: "/investment", label: t('nav.investment') },
    { path: "/regulatory", label: t('nav.regulatory') },
    { path: "/knowledge-hub", label: t('nav.knowledgeHub') },
  ];

  const MotionLink = motion(Link);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className={`space-x-6 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {mainLinks.map((link) => (
          <NavigationMenuItem key={link.path}>
            <MotionLink
              to={link.path}
              className={cn(
                "text-lg transition-colors px-3 py-2 rounded-md",
                isRouteActive(link.path) 
                  ? 'text-moh-green font-medium' 
                  : 'text-moh-darkGreen hover:text-moh-green hover:bg-gray-50'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {link.label}
            </MotionLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
