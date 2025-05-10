
import { cn } from "@/lib/utils";
import { NavItem, NavItemProps } from "./SidebarNavItem";

type NavSectionProps = {
  title: string;
  isCollapsed: boolean;
  items: Array<Omit<NavItemProps, "isCollapsed">>;
};

export function NavSection({ title, isCollapsed, items }: NavSectionProps) {
  return (
    <div className="py-1.5">
      {!isCollapsed && (
        <h3 className="px-2 mb-1 text-[10px] uppercase text-moh-gold/80 font-semibold tracking-wider">
          {title}
        </h3>
      )}
      <nav className="grid grid-cols-3 gap-1">
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
