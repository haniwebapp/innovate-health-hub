
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarNavItemProps {
  to: string;
  icon: ReactNode;
  text: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

export function SidebarNavItem({
  to,
  icon,
  text,
  isCollapsed,
  onClick
}: SidebarNavItemProps) {
  const { pathname } = useLocation();
  
  // Check if the current path matches this nav item
  const isActive = pathname === to || pathname.startsWith(`${to}/`);
  
  const baseItemClasses = cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
    "hover:bg-slate-100 hover:text-moh-green",
    "focus:bg-slate-100 focus:text-moh-green focus:outline-none",
    isActive 
      ? "bg-slate-100 text-moh-green font-medium" 
      : "text-slate-600 hover:text-moh-green"
  );
  
  const item = (
    <Link
      to={to}
      onClick={onClick}
      className={baseItemClasses}
    >
      <span className={cn(
        "flex items-center justify-center rounded-md",
        isActive ? "text-moh-green" : "text-slate-500"
      )}>
        {icon}
      </span>
      
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 truncate"
        >
          {text}
        </motion.span>
      )}
    </Link>
  );
  
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            {item}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return item;
}
