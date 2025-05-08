
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  // Main links with dropdown options for Knowledge Hub
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
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-6">
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
                <ul className="grid w-[200px] gap-1 p-2 bg-white">
                  <li className="row-span-1">
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.path}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-moh-green focus:bg-gray-50 focus:text-moh-green"
                      >
                        <div className="text-sm font-medium">All Resources</div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {link.dropdownItems?.map((item) => (
                    <li key={item.path} className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.path}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-moh-green focus:bg-gray-50 focus:text-moh-green"
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
              <Link
                to={link.path}
                className={cn(
                  "text-lg transition-colors px-3 py-2 rounded-md",
                  isRouteActive(link.path) 
                    ? 'text-moh-green font-medium' 
                    : 'text-moh-darkGreen hover:text-moh-green hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            </NavigationMenuItem>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
