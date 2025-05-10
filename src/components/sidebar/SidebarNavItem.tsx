
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
    "group relative overflow-hidden",
    isActive 
      ? "text-moh-green font-medium" 
      : "text-slate-600 hover:text-moh-green"
  );
  
  // Animated background for active state
  const BackgroundHighlight = () => {
    if (!isActive) return null;
    
    return (
      <motion.div
        layoutId={`sidebar-highlight-${to.replace('/', '-')}`}
        className="absolute inset-0 bg-moh-lightGreen/40 rounded-lg -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    );
  };
  
  const item = (
    <Link
      to={to}
      onClick={onClick}
      className={baseItemClasses}
    >
      <BackgroundHighlight />
      
      <span className={cn(
        "flex items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110",
        isActive ? "text-moh-green" : "text-slate-500 group-hover:text-moh-green"
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
      
      {isActive && !isCollapsed && (
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-moh-green rounded-r-full"
          layoutId={`sidebar-indicator-${to.replace('/', '-')}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
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
