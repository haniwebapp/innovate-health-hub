
import { SidebarNavSection } from "./SidebarNavSection";
import { BarChart3, Users, Settings, Plug, FileText, Lightbulb, DollarSign, ShieldCheck, BookOpen, Bell, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarAdminNavProps {
  isCollapsed: boolean;
}

export function SidebarAdminNav({ isCollapsed }: SidebarAdminNavProps) {
  const { isAdmin } = useAuth();
  
  // Don't show admin nav if user is not admin
  if (!isAdmin) {
    return null;
  }
  
  return (
    <SidebarNavSection 
      title="Administration" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/admin", 
          icon: <BarChart3 size={18} className="text-moh-gold" />, 
          text: "Admin Dashboard"
        },
        { 
          to: "/dashboard/admin/cms", 
          icon: <FileText size={18} className="text-moh-gold" />, 
          text: "CMS"
        },
        { 
          to: "/dashboard/admin/users", 
          icon: <Users size={18} className="text-moh-gold" />, 
          text: "Users"
        },
        { 
          to: "/dashboard/admin/challenges", 
          icon: <Award size={18} className="text-moh-gold" />, 
          text: "Challenges"
        },
        { 
          to: "/dashboard/admin/innovations", 
          icon: <Lightbulb size={18} className="text-moh-gold" />, 
          text: "Innovations"
        },
        { 
          to: "/dashboard/admin/investment", 
          icon: <DollarSign size={18} className="text-moh-gold" />, 
          text: "Investment"
        },
        { 
          to: "/dashboard/admin/regulatory", 
          icon: <ShieldCheck size={18} className="text-moh-gold" />, 
          text: "Regulatory"
        },
        { 
          to: "/dashboard/admin/knowledge", 
          icon: <BookOpen size={18} className="text-moh-gold" />, 
          text: "Knowledge"
        },
        { 
          to: "/dashboard/admin/notifications", 
          icon: <Bell size={18} className="text-moh-gold" />, 
          text: "Notifications"
        },
        { 
          to: "/dashboard/admin/integrations", 
          icon: <Plug size={18} className="text-moh-gold" />, 
          text: "Integrations"
        },
        { 
          to: "/dashboard/admin/settings", 
          icon: <Settings size={18} className="text-moh-gold" />, 
          text: "Settings"
        }
      ]}
    />
  );
}
