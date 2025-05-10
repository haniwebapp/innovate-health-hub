import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/use-window-size";

interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbNavItem[];
  currentPage: string;
  className?: string;
  showHomeIcon?: boolean;
  maxItems?: number;
}

export default function BreadcrumbNav({
  items = [],
  currentPage,
  className,
  showHomeIcon = true,
  maxItems = 3,
}: BreadcrumbNavProps) {
  const location = useLocation();
  const { isMobile } = useWindowSize();
  
  // Generate breadcrumb items based on current path if not provided
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbItems(location.pathname);
  
  // If on mobile and we have more items than maxItems, limit what we show
  const displayItems = isMobile && breadcrumbItems.length > maxItems
    ? [
        // Always show first item
        breadcrumbItems[0],
        // Show ellipsis if we have more than maxItems
        ...(breadcrumbItems.length > maxItems ? [{ label: '...' }] : []),
        // Show the last item
        breadcrumbItems[breadcrumbItems.length - 1],
      ]
    : breadcrumbItems;

  return (
    <Breadcrumb className={cn("mb-4", className)}>
      <BreadcrumbList>
        {showHomeIcon && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        
        {displayItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.label === '...' ? (
                <BreadcrumbEllipsis />
              ) : item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < displayItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
        
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{isMobile && currentPage.length > 20 
            ? `${currentPage.substring(0, 20)}...` 
            : currentPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function generateBreadcrumbItems(path: string): BreadcrumbNavItem[] {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbNavItem[] = [];
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    // Skip the last segment as it represents the current page
    if (index === segments.length - 1) return;
    
    currentPath += `/${segment}`;
    
    // Format segment name (replace hyphens with spaces, capitalize)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      label,
      href: currentPath
    });
  });
  
  return breadcrumbs;
}
