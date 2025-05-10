
import { SidebarNavSection } from "./SidebarNavSection";
import { BarChart3, Users, Settings, Plug } from "lucide-react";

interface SidebarAdminNavProps {
  isCollapsed: boolean;
}

export function SidebarAdminNav({ isCollapsed }: SidebarAdminNavProps) {
  return (
    <SidebarNavSection 
      title="Administration" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/admin", 
          icon: <BarChart3 size={18} className="text-moh-gold" />, 
          text: "Dashboard",
          badge: "Admin"
        },
        { 
          to: "/dashboard/admin/users", 
          icon: <Users size={18} className="text-moh-gold" />, 
          text: "Users",
          badge: "Admin"
        },
        { 
          to: "/dashboard/admin/settings", 
          icon: <Settings size={18} className="text-moh-gold" />, 
          text: "Settings",
          badge: "Admin"
        },
        { 
          to: "/dashboard/admin/integrations", 
          icon: <Plug size={18} className="text-moh-gold" />, 
          text: "Integrations",
          badge: "Admin"
        }
      ]}
    />
  );
}
