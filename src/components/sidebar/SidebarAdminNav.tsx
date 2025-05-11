
import { SidebarNavSection } from "./SidebarNavSection";
import { 
  BarChart3,
  Users, 
  Settings, 
  Plug, 
  FileText, 
  Lightbulb, 
  DollarSign, 
  Shield, 
  BookOpen, 
  Bell, 
  Award,
  Stethoscope,
  ScrollText,
  Database,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

interface SidebarAdminNavProps {
  isCollapsed: boolean;
}

export function SidebarAdminNav({ isCollapsed }: SidebarAdminNavProps) {
  const { isAdmin } = useAuth();
  const location = useLocation();
  
  // Don't show admin nav if user is not admin
  if (!isAdmin) {
    return null;
  }
  
  const adminItems = [
    { 
      to: "/dashboard/admin", 
      icon: <BarChart3 size={18} className="text-moh-gold" />, 
      text: "Admin Dashboard",
      exact: true
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
      to: "/dashboard/admin/sandbox", 
      icon: <Shield size={18} className="text-moh-gold" />, 
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
    // New admin routes
    { 
      to: "/dashboard/admin/clinical", 
      icon: <Stethoscope size={18} className="text-moh-gold" />, 
      text: "Clinical Data"
    },
    { 
      to: "/dashboard/admin/logs", 
      icon: <ScrollText size={18} className="text-moh-gold" />, 
      text: "System Logs"
    },
    { 
      to: "/dashboard/admin/analytics", 
      icon: <Database size={18} className="text-moh-gold" />, 
      text: "Analytics"
    },
    { 
      to: "/dashboard/admin/reports", 
      icon: <BarChart3 size={18} className="text-moh-gold" />, 
      text: "Reports"
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
  ];
  
  return (
    <SidebarNavSection 
      title="Administration" 
      isCollapsed={isCollapsed} 
      items={adminItems}
    />
  );
}
