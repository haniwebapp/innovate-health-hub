
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface BadgeProps {
  variant?: "default" | "outline";
  content: React.ReactNode;
}

interface SidebarNavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  badge?: BadgeProps;
}

export function SidebarNavItem({
  to,
  icon,
  text,
  isCollapsed,
  badge
}: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  // Determine active and hover styles
  const activeClass = isActive
    ? "bg-moh-lightGreen/15 text-moh-darkGreen font-medium"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50";

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors my-1",
              activeClass
            )}
          >
            {icon}
            {badge && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-moh-green" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {text}
          {badge && (
            <Badge 
              variant={badge.variant || "default"} 
              className="bg-moh-green text-white text-[10px] h-4 px-1.5"
            >
              {badge.content}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors my-0.5",
        activeClass
      )}
    >
      {icon}
      <span className="truncate">{text}</span>
      {badge && (
        <Badge 
          variant={badge.variant || "default"} 
          className="ml-auto bg-moh-green text-white text-[10px] h-4 px-1.5"
        >
          {badge.content}
        </Badge>
      )}
    </Link>
  );
}
