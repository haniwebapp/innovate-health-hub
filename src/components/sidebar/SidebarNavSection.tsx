
import { cn } from "@/lib/utils";
import { NavItem, NavItemProps } from "./SidebarNavItem";

type NavSectionProps = {
  title: string;
  isCollapsed: boolean;
  items: Array<Omit<NavItemProps, "isCollapsed">>;
};

export function NavSection({ title, isCollapsed, items }: NavSectionProps) {
  return (
    <div className="py-2">
      {!isCollapsed && (
        <h3 className="px-3 mb-2 text-xs uppercase text-slate-400 font-medium tracking-wider">
          {title}
        </h3>
      )}
      <nav className="space-y-1.5">
        {items.map(item => (
          <NavItem
            key={item.text}
            to={item.to}
            icon={item.icon}
            text={item.text}
            isCollapsed={isCollapsed}
            badge={item.badge}
            className={item.className}
          />
        ))}
      </nav>
    </div>
  );
}
