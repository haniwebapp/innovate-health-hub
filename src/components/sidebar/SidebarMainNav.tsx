
import { NavSection } from "./SidebarNavSection";
import { LayoutDashboard, Users } from "lucide-react";

interface SidebarMainNavProps {
  isCollapsed: boolean;
}

export function SidebarMainNav({ isCollapsed }: SidebarMainNavProps) {
  return (
    <NavSection 
      title="Main" 
      isCollapsed={isCollapsed} 
      items={[
        { to: "/dashboard", icon: <LayoutDashboard size={20} />, text: "Dashboard" },
        { to: "/dashboard/profile", icon: <Users size={20} />, text: "Profile" }
      ]}
    />
  );
}
