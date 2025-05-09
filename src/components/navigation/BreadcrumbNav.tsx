
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbNavItem[];
  currentPage: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, currentPage }) => {
  return (
    <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.href ? (
                <Link to={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className="text-muted-foreground">{item.label}</span>
              )}
            </li>
            <li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </li>
          </React.Fragment>
        ))}
        <li>
          <span className="font-medium">{currentPage}</span>
        </li>
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
