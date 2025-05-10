
import { SidebarNavSection } from "./SidebarNavSection";
import { BarChart3, Users, Settings, Plug, FileText, Lightbulb, DollarSign, ShieldCheck, BookOpen, Bell } from "lucide-react";

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
          to: "/admin", 
          icon: <BarChart3 size={18} className="text-moh-gold" />, 
          text: "Dashboard"
        },
        { 
          to: "/admin/cms", 
          icon: <FileText size={18} className="text-moh-gold" />, 
          text: "CMS"
        },
        { 
          to: "/admin/users", 
          icon: <Users size={18} className="text-moh-gold" />, 
          text: "Users"
        },
        { 
          to: "/admin/challenges", 
          icon: <Award size={18} className="text-moh-gold" />, 
          text: "Challenges"
        },
        { 
          to: "/admin/innovations", 
          icon: <Lightbulb size={18} className="text-moh-gold" />, 
          text: "Innovations"
        },
        { 
          to: "/admin/investment", 
          icon: <DollarSign size={18} className="text-moh-gold" />, 
          text: "Investment"
        },
        { 
          to: "/admin/sandbox", 
          icon: <ShieldCheck size={18} className="text-moh-gold" />, 
          text: "Regulatory"
        },
        { 
          to: "/admin/knowledge", 
          icon: <BookOpen size={18} className="text-moh-gold" />, 
          text: "Knowledge"
        },
        { 
          to: "/admin/notifications", 
          icon: <Bell size={18} className="text-moh-gold" />, 
          text: "Notifications"
        },
        { 
          to: "/admin/integrations", 
          icon: <Plug size={18} className="text-moh-gold" />, 
          text: "Integrations"
        },
        { 
          to: "/admin/settings", 
          icon: <Settings size={18} className="text-moh-gold" />, 
          text: "Settings"
        }
      ]}
    />
  );
}
