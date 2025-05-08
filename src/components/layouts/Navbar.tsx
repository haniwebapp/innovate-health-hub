
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/public/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                alt="Ministry of Health Logo" 
                className="h-10 w-auto object-contain" 
              />
              <span className="ml-3 text-lg font-semibold text-moh-darkGreen hidden md:block">
                Health Innovation Platform
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-moh-darkGreen hover:text-moh-green transition-colors">
              About
            </Link>
            <Link to="/challenges" className="text-moh-darkGreen hover:text-moh-green transition-colors">
              Challenges
            </Link>
            <Link to="/innovations" className="text-moh-darkGreen hover:text-moh-green transition-colors">
              Innovations
            </Link>
            <Link to="/knowledge-hub" className="text-moh-darkGreen hover:text-moh-green transition-colors">
              Knowledge Hub
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen">
              Sign In
            </Button>
            <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
              Register
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-moh-darkGreen"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/challenges" 
              className="block px-3 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen"
              onClick={() => setMobileMenuOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/innovations" 
              className="block px-3 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen"
              onClick={() => setMobileMenuOpen(false)}
            >
              Innovations
            </Link>
            <Link 
              to="/knowledge-hub" 
              className="block px-3 py-2 rounded-md text-base font-medium text-moh-darkGreen hover:bg-moh-lightGreen"
              onClick={() => setMobileMenuOpen(false)}
            >
              Knowledge Hub
            </Link>
            <div className="flex flex-col space-y-2 pt-4 pb-2">
              <Button variant="outline" className="w-full border-moh-green text-moh-green hover:bg-moh-lightGreen">
                Sign In
              </Button>
              <Button className="w-full bg-moh-green hover:bg-moh-darkGreen text-white">
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
