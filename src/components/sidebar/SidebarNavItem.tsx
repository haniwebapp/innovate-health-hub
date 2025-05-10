
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

export type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  badge?: string;
  className?: string;
};

export function NavItem({ to, icon, text, isCollapsed, badge, className }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            "flex items-center px-4 py-2.5 text-sm transition-colors rounded-md",
            "relative overflow-hidden w-full",
            isActive
              ? "bg-moh-green/20 text-white font-medium"
              : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
            isCollapsed && "justify-center px-2",
            className
          )}
          end={to === "/dashboard"}
        >
          <div className={cn(
            "flex items-center justify-center",
            isCollapsed ? "w-full" : "mr-3"
          )}>
            {icon}
          </div>
          
          {!isCollapsed && (
            <>
              <span className="truncate">{text}</span>
              {badge && (
                <span className="ml-auto flex items-center justify-center min-w-[22px] h-5 bg-moh-gold/20 text-moh-gold px-1.5 text-xs rounded-full font-medium">
                  {badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="font-medium bg-slate-800 text-white border-slate-700">
        {text}
        {badge && <span className="ml-2 text-[10px] bg-moh-gold/20 text-moh-gold px-1.5 py-0.5 rounded-md">{badge}</span>}
      </TooltipContent>
    </Tooltip>
  );
}
