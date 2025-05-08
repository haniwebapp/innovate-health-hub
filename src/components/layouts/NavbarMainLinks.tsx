
import { Link } from "react-router-dom";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  const mainLinks = [
    { path: "/about", label: "About" },
    { path: "/challenges", label: "Challenges" },
    { path: "/innovations", label: "Innovations" },
    { path: "/knowledge-hub", label: "Knowledge Hub" }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {mainLinks.map((link) => (
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
      ))}
    </nav>
  );
}
