
import { SidebarNavSection } from "./SidebarNavSection";
import { Layers, MonitorSmartphone, Brain, ShieldCheck } from "lucide-react";

interface SidebarPhasesNavProps {
  isCollapsed: boolean;
}

export function SidebarPhasesNav({ isCollapsed }: SidebarPhasesNavProps) {
  return (
    <SidebarNavSection 
      title="Phases" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/platform", 
          icon: <Layers size={18} className="text-blue-500" />, 
          text: "Platform Phase" 
        },
        { 
          to: "/dashboard/ai", 
          icon: <Brain size={18} className="text-purple-500" />, 
          text: "AI Phase" 
        },
        { 
          to: "/dashboard/admin", 
          icon: <ShieldCheck size={18} className="text-moh-gold" />, 
          text: "Admin Phase" 
        }
      ]}
    />
  );
}
