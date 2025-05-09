
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  const { t, language } = useLanguage();
  
  // Main links with dropdown options for Knowledge Hub
  const mainLinks = [
    { path: "/about", label: t('nav.about') },
    { path: "/challenges", label: t('nav.challenges') },
    { path: "/innovations", label: t('nav.innovations') },
    { 
      path: "/knowledge-hub", 
      label: t('nav.knowledgeHub'),
      hasDropdown: true,
      dropdownItems: [
        { label: t('nav.articles'), path: "/knowledge-hub?category=article" },
        { label: t('nav.videos'), path: "/knowledge-hub?category=video" },
        { label: t('nav.guides'), path: "/knowledge-hub?category=guide" },
        { label: t('nav.researchPapers'), path: "/knowledge-hub?category=research" },
      ]
    }
  ];

  const MotionLink = motion(Link);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className={`space-x-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        {mainLinks.map((link) => (
          link.hasDropdown ? (
            <NavigationMenuItem key={link.path}>
              <NavigationMenuTrigger className={cn(
                "bg-transparent hover:bg-gray-50 text-lg px-0",
                isRouteActive(link.path) 
                  ? 'text-moh-green font-medium' 
                  : 'text-moh-darkGreen hover:text-moh-green'
              )}>
                {link.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[220px] gap-1 p-3 bg-white shadow-lg rounded-lg border border-gray-100">
                  <li className="row-span-1">
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.path}
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-moh-green focus:bg-gray-50 focus:text-moh-green"
                      >
                        <div className="text-sm font-medium">{t('nav.allResources')}</div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {link.dropdownItems?.map((item) => (
                    <li key={item.path} className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.path}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-moh-green focus:bg-gray-50 focus:text-moh-green"
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
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
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
