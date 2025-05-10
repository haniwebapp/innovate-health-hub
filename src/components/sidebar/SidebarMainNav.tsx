
import { NavSection } from "./SidebarNavSection";
import { LayoutDashboard, User } from "lucide-react";

interface SidebarMainNavProps {
  isCollapsed: boolean;
}

export function SidebarMainNav({ isCollapsed }: SidebarMainNavProps) {
  return (
    <NavSection 
      title="Main" 
      isCollapsed={isCollapsed} 
      items={[
        { to: "/dashboard", icon: <LayoutDashboard size={18} className="text-moh-green" />, text: "Dashboard" },
        { to: "/dashboard/profile", icon: <User size={18} className="text-moh-green" />, text: "Profile" }
      ]}
    />
  );
}
