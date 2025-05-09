
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
  
  // Main links without dropdown, using direct text instead of translation keys
  const mainLinks = [
    { path: "/about", label: "About" },
    { path: "/challenges", label: "Challenges" },
    { path: "/innovations", label: "Innovations" },
    { path: "/investment", label: "Investment" },
    { path: "/regulatory", label: "Regulatory" },
    { path: "/knowledge-hub", label: "Knowledge Hub" },
  ];

  const MotionLink = motion(Link);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-6">
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
