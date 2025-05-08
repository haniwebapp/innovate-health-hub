
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

interface DropdownItemProps {
  label: string;
  path: string;
}

// Fix for the type issue with NavigationMenuLink
const NavigationMenuLink = ({ 
  asChild, 
  children, 
  ...props 
}: { 
  asChild: boolean; 
  children: React.ReactNode;
  [key: string]: any;
}) => {
  if (asChild) {
    return children;
  }
  return <a {...props}>{children}</a>;
};

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
                "bg-transparent hover:bg-gray-100 text-lg px-0",
                isRouteActive(link.path) 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              )}>
                {link.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2 bg-white shadow-md rounded-md border border-gray-100">
                  <li className="row-span-1">
                    <Link
                      to={link.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                    >
                      <div className="text-sm font-medium">All Resources</div>
                    </Link>
                  </li>
                  {link.dropdownItems?.map((item: DropdownItemProps) => (
                    <li key={item.path} className="row-span-1">
                      <Link
                        to={item.path}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                      >
                        <div className="text-sm font-medium">{item.label}</div>
                      </Link>
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
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
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
