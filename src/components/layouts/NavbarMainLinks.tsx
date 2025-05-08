
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
    <nav className="hidden md:flex items-center space-x-8">
      {mainLinks.map((link) => (
        link.hasDropdown ? (
          <NavigationMenu key={link.path}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "bg-transparent hover:bg-transparent",
                    isRouteActive(link.path) 
                      ? 'text-moh-green font-medium' 
                      : 'text-moh-darkGreen hover:text-moh-green'
                  )}
                >
                  {link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.path}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-moh-lightGreen hover:text-moh-green focus:bg-moh-lightGreen focus:text-moh-green"
                        >
                          <div className="text-sm font-medium leading-none">All Resources</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {link.dropdownItems?.map((item) => (
                      <li key={item.path} className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-moh-lightGreen hover:text-moh-green focus:bg-moh-lightGreen focus:text-moh-green"
                          >
                            <div className="text-sm font-medium leading-none">{item.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link
            key={link.path}
            to={link.path}
            className={`transition-colors flex items-center ${
              isRouteActive(link.path) 
                ? 'text-moh-green font-medium' 
                : 'text-moh-darkGreen hover:text-moh-green'
            }`}
          >
            {link.label}
          </Link>
        )
      ))}
    </nav>
  );
}
