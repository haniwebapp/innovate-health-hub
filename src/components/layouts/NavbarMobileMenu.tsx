
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { WebsitePage } from '@/types/pageTypes';

interface NavbarMobileMenuProps {
  cmsPages?: WebsitePage[];
}

const NavbarMobileMenu = ({ cmsPages = [] }: NavbarMobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3">
          <Link to="/" className="py-2 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="py-2 hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/challenges" className="py-2 hover:text-primary transition-colors">
            Challenges
          </Link>
          <Link to="/innovations" className="py-2 hover:text-primary transition-colors">
            Innovations
          </Link>
          <Link to="/investment" className="py-2 hover:text-primary transition-colors">
            Investment
          </Link>
          <Link to="/regulatory" className="py-2 hover:text-primary transition-colors">
            Regulatory
          </Link>
          <Link to="/knowledge-hub" className="py-2 hover:text-primary transition-colors">
            Knowledge Hub
          </Link>
          
          {/* CMS Pages */}
          {cmsPages.length > 0 && (
            <>
              <div className="border-t my-2 pt-2">
                <p className="text-sm text-muted-foreground mb-2">Custom Pages</p>
                {cmsPages.map(page => (
                  <Link
                    key={page.id}
                    to={`/pages/${page.slug}`}
                    className="py-2 block hover:text-primary transition-colors"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </>
          )}
          
          <Link
            to="/dashboard"
            className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded text-center mt-4"
          >
            Dashboard
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;
