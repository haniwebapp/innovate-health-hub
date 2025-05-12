
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageService } from '@/services/page/PageService';
import { WebsitePage } from '@/types/pageTypes';
import NavbarMainLinks from './NavbarMainLinks';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarUserMenu from './NavbarUserMenu';
import SearchDialog from './SearchDialog';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cmsPages, setCmsPages] = useState<WebsitePage[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const loadCmsPages = async () => {
      try {
        const pages = await PageService.getPublishedPages();
        setCmsPages(pages);
      } catch (error) {
        console.error("Error loading CMS pages:", error);
      }
    };
    
    loadCmsPages();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/dna-pattern-circle.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-primary hidden md:inline-block">
              HealthTech Innovate
            </span>
          </Link>
          <NavbarMainLinks />
          
          {/* CMS Pages in Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {cmsPages.map(page => (
              <Link 
                key={page.id}
                to={`/pages/${page.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <SearchDialog />
          <NavbarUserMenu />
          <NavbarMobileMenu cmsPages={cmsPages} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
