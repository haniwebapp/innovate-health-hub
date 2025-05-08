
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  // Updated main links with dropdown options for Knowledge Hub
  const mainLinks = [
    { path: "/about", label: "About" },
    { path: "/challenges", label: "Challenges" },
    { path: "/innovations", label: "Innovations" },
    { 
      path: "/knowledge-hub", 
      label: "Knowledge Hub",
      hasDropdown: true,
      dropdownItems: [
        { label: "Articles", path: "/knowledge-hub?category=article" },
        { label: "Videos", path: "/knowledge-hub?category=video" },
        { label: "Guides", path: "/knowledge-hub?category=guide" },
        { label: "Research Papers", path: "/knowledge-hub?category=research" },
      ]
    }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-12">
      {mainLinks.map((link) => (
        link.hasDropdown ? (
          <div key={link.path} className="relative inline-block">
            <Link
              to={link.path}
              className={cn(
                "flex items-center text-lg transition-colors",
                isRouteActive(link.path) 
                  ? 'text-moh-green font-medium' 
                  : 'text-moh-darkGreen hover:text-moh-green'
              )}
            >
              {link.label}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <div className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
              <div className="py-1">
                {link.dropdownItems?.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-moh-darkGreen hover:bg-moh-lightGreen hover:text-moh-green"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "text-lg transition-colors",
              isRouteActive(link.path) 
                ? 'text-moh-green font-medium' 
                : 'text-moh-darkGreen hover:text-moh-green'
            )}
          >
            {link.label}
          </Link>
        )
      ))}
    </nav>
  );
}
