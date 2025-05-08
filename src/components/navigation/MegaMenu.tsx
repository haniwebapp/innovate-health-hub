
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useWindowSize } from "@/hooks/useWindowSize";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categoryLinks: {
    category: string;
    items: Array<{
      title: string;
      description?: string;
      to: string;
      icon?: React.ReactNode;
    }>;
  }[];
  featuredLinks?: Array<{
    title: string;
    description?: string;
    to: string;
    image?: string;
  }>;
}

export default function MegaMenu({
  isOpen,
  onClose,
  categoryLinks,
  featuredLinks,
}: MegaMenuProps) {
  const { width } = useWindowSize();
  
  // Close menu if user clicks outside or presses escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mega-menu') && !target.closest('.mega-menu-trigger')) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Mobile version
  if (width < 1024) {
    return (
      <div className="fixed inset-0 z-50 bg-white shadow-lg animate-fade-in mega-menu">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-end mb-4">
            <button 
              onClick={onClose}
              className="text-moh-darkGreen hover:text-moh-green transition-colors"
            >
              Close
            </button>
          </div>
          
          <div className="space-y-6">
            {categoryLinks.map((category, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-medium text-lg text-moh-darkGreen">{category.category}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {category.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      onClick={onClose}
                      className="block p-3 rounded-lg hover:bg-moh-lightGreen transition-colors"
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        <div>
                          <h4 className="font-medium text-moh-green">{item.title}</h4>
                          {item.description && (
                            <p className="text-sm text-moh-darkGreen mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {featuredLinks && featuredLinks.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium text-lg text-moh-darkGreen mb-3">Featured</h3>
                <div className="space-y-3">
                  {featuredLinks.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      onClick={onClose}
                      className="block p-3 rounded-lg hover:bg-moh-lightGreen transition-colors"
                    >
                      <div className="flex items-center">
                        {item.image && (
                          <div className="mr-3 w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-moh-green">{item.title}</h4>
                          {item.description && (
                            <p className="text-sm text-moh-darkGreen mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Desktop version
  return (
    <div 
      className={cn(
        "absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl z-50 mega-menu",
        "transform transition-all duration-200 ease-in-out",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      )}
    >
      <div className="container mx-auto py-8 px-6">
        <div className="flex">
          {/* Categories and links */}
          <div className="flex-grow grid grid-cols-3 gap-6">
            {categoryLinks.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-medium text-lg text-moh-darkGreen">{category.category}</h3>
                <div className="space-y-2">
                  {category.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      onClick={onClose}
                      className="block p-2 rounded-lg hover:bg-moh-lightGreen transition-colors"
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        <div>
                          <h4 className="font-medium text-moh-green">{item.title}</h4>
                          {item.description && (
                            <p className="text-sm text-moh-darkGreen mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured content */}
          {featuredLinks && featuredLinks.length > 0 && (
            <div className="w-1/3 pl-6 border-l">
              <h3 className="font-medium text-lg text-moh-darkGreen mb-4">Featured</h3>
              <div className="space-y-4">
                {featuredLinks.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="flex flex-col">
                      {item.image && (
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-moh-green group-hover:text-moh-darkGreen transition-colors">{item.title}</h4>
                        {item.description && (
                          <p className="text-sm text-moh-darkGreen mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
