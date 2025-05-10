
import { NavSection } from "./SidebarNavSection";
import { Users, BarChart3, Settings, Plug } from "lucide-react";

interface SidebarAdminNavProps {
  isCollapsed: boolean;
}

export function SidebarAdminNav({ isCollapsed }: SidebarAdminNavProps) {
  return (
    <NavSection 
      title="Administration" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/admin/users", 
          icon: <Users size={20} className="text-moh-gold" />, 
          text: "Users",
          badge: "Admin"
        },
        { 
          to: "/dashboard/admin/analytics", 
          icon: <BarChart3 size={20} className="text-moh-gold" />, 
          text: "Analytics",
          badge: "Admin"
        },
        { 
          to: "/dashboard/admin/settings", 
          icon: <Settings size={20} className="text-moh-gold" />, 
          text: "Settings",
          badge: "Admin"
        },
        { 
          to: "/dashboard/admin/integrations", 
          icon: <Plug size={20} className="text-moh-gold" />, 
          text: "Integrations",
          badge: "Admin"
        }
      ]}
    />
  );
}
