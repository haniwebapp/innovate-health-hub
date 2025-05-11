
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export function SidebarNavItem({ icon, label, href, isActive, isCollapsed }: SidebarNavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-muted text-primary hover:bg-muted hover:text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-primary"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}
