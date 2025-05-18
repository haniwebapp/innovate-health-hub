
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarNavItem } from "./SidebarNavItem";

interface BadgeProps {
  variant?: "default" | "outline";
  content: React.ReactNode;
}

interface NavItem {
  to: string;
  icon: React.ReactNode;
  text: string;
  badge?: BadgeProps;
}

interface SidebarNavSectionProps {
  title: string;
  isCollapsed: boolean;
  items: NavItem[];
}

export function SidebarNavSection({
  title,
  isCollapsed,
  items,
}: SidebarNavSectionProps) {
  // Default the section to open
  const [isOpen, setIsOpen] = React.useState(true);

  if (isCollapsed) {
    return (
      <div className="px-2">
        <div className="h-0.5 bg-gray-100 my-2" />
        {items.map((item, index) => (
          <SidebarNavItem
            key={index}
            to={item.to}
            icon={item.icon}
            text={item.text}
            isCollapsed={isCollapsed}
            badge={item.badge}
          />
        ))}
      </div>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-1"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 rounded">
        {title}
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-1">
        {items.map((item, index) => (
          <SidebarNavItem
            key={index}
            to={item.to}
            icon={item.icon}
            text={item.text}
            isCollapsed={isCollapsed}
            badge={item.badge}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
