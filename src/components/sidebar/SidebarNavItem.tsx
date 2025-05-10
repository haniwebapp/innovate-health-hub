
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
            "flex items-center flex-col rounded-md px-2 py-3 text-xs transition-all duration-200",
            "overflow-hidden",
            isActive
              ? "bg-moh-green/10 text-moh-green font-medium shadow-sm"
              : "text-slate-600 hover:bg-moh-green/5 hover:text-moh-green",
            isCollapsed && "justify-center p-2",
            className
          )}
          end={to === "/dashboard"}
        >
          <div className="flex min-w-[24px] items-center justify-center mb-1">
            {icon}
          </div>
          
          {!isCollapsed && (
            <>
              <span className="truncate">{text}</span>
              {badge && (
                <span className="ml-auto mt-1 text-[9px] bg-moh-gold/20 text-moh-darkGold px-1.5 py-0.5 rounded-sm font-medium">
                  {badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="font-medium bg-white">
        {text}
        {badge && <span className="ml-2 text-[10px] bg-moh-gold/20 text-moh-darkGold px-1.5 py-0.5 rounded-md">{badge}</span>}
      </TooltipContent>
    </Tooltip>
  );
}
