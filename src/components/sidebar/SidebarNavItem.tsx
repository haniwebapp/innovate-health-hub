
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
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
            "overflow-hidden whitespace-nowrap",
            isActive
              ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white font-medium shadow-sm"
              : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
            isCollapsed && "justify-center p-2",
            className
          )}
          end={to === "/dashboard"}
        >
          <div className="flex min-w-[24px] items-center justify-center">
            {icon}
          </div>
          
          {!isCollapsed && (
            <>
              <span className="truncate">{text}</span>
              {badge && (
                <span className="ml-auto text-[10px] bg-blue-900/70 text-blue-200 px-1.5 py-0.5 rounded-sm font-medium">
                  {badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="font-medium">
        {text}
        {badge && <span className="ml-2 text-[10px] bg-blue-900/50 text-blue-200 px-1.5 py-0.5 rounded-md">{badge}</span>}
      </TooltipContent>
    </Tooltip>
  );
}
