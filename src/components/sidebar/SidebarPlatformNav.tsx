
import { SidebarNavSection } from "./SidebarNavSection";
import { DollarSign, BookOpen, ShieldCheck, Users } from "lucide-react";

interface SidebarPlatformNavProps {
  isCollapsed: boolean;
}

export function SidebarPlatformNav({ isCollapsed }: SidebarPlatformNavProps) {
  return (
    <SidebarNavSection 
      title="Platform" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/investment", 
          icon: <DollarSign size={18} className="text-moh-green" />, 
          text: "Investment" 
        },
        { 
          to: "/dashboard/knowledge", 
          icon: <BookOpen size={18} className="text-moh-green" />, 
          text: "Knowledge Hub" 
        },
        { 
          to: "/dashboard/regulatory", 
          icon: <ShieldCheck size={18} className="text-moh-green" />, 
          text: "Regulatory" 
        },
        { 
          to: "/dashboard/collaboration", 
          icon: <Users size={18} className="text-moh-green" />, 
          text: "Collaboration" 
        }
      ]}
    />
  );
}
