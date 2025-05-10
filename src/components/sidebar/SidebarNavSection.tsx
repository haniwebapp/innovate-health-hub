
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "./SidebarNavItem";

interface NavItem {
  to: string;
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

interface SidebarNavSectionProps {
  title: string;
  isCollapsed: boolean;
  items: NavItem[];
}

export function SidebarNavSection({ title, isCollapsed, items }: SidebarNavSectionProps) {
  return (
    <div className="py-2">
      {!isCollapsed && (
        <h3 className={cn(
          "mb-2 px-4 text-xs font-semibold tracking-wider",
          "text-moh-gold uppercase"
        )}>
          {title}
        </h3>
      )}
      <div className={cn(
        "space-y-1",
        isCollapsed ? "px-2" : "px-3"
      )}>
        {items.map((item) => (
          <SidebarNavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            text={item.text}
            isCollapsed={isCollapsed}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
}
