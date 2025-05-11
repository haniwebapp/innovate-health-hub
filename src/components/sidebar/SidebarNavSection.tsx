
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "./SidebarNavItem";

export interface NavItemProps {
  to: string;
  icon: ReactNode;
  text: string;
  exact?: boolean;
}

export interface SidebarNavSectionProps {
  children?: ReactNode;
  title?: string;
  isCollapsed?: boolean;
  items?: NavItemProps[];
}

export function SidebarNavSection({ children, title, isCollapsed, items }: SidebarNavSectionProps) {
  return (
    <div className="px-2 py-2">
      {title && (
        <h2 className={cn("mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground", 
          isCollapsed && "text-center")}>
          {isCollapsed ? title.charAt(0) : title}
        </h2>
      )}
      <nav className="space-y-1">
        {items ? (
          items.map((item, index) => (
            <SidebarNavItem
              key={item.to}
              href={item.to}
              icon={item.icon}
              label={item.text}
              isCollapsed={isCollapsed}
              isActive={item.exact !== undefined ? item.exact : false}
            />
          ))
        ) : (
          children
        )}
      </nav>
    </div>
  );
}
