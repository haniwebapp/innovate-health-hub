
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SidebarNavSectionProps {
  children: ReactNode;
  title?: string;
  isCollapsed?: boolean;
}

export function SidebarNavSection({ children, title, isCollapsed }: SidebarNavSectionProps) {
  return (
    <div className="px-2 py-2">
      {title && (
        <h2 className={cn("mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground", 
          isCollapsed && "text-center")}>
          {isCollapsed ? title.charAt(0) : title}
        </h2>
      )}
      <nav className="space-y-1">{children}</nav>
    </div>
  );
}
