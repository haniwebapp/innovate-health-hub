
import { NavSection } from "./SidebarNavSection";
import { DollarSign, BookOpen, MessageSquare, Clock } from "lucide-react";

interface SidebarPlatformNavProps {
  isCollapsed: boolean;
}

export function SidebarPlatformNav({ isCollapsed }: SidebarPlatformNavProps) {
  return (
    <NavSection 
      title="Platform" 
      isCollapsed={isCollapsed} 
      items={[
        { to: "/dashboard/investment", icon: <DollarSign size={20} />, text: "Investment Hub" },
        { to: "/dashboard/regulatory", icon: <BookOpen size={20} />, text: "Regulatory Sandbox" },
        { to: "/dashboard/knowledge", icon: <BookOpen size={20} />, text: "Knowledge Hub" },
        { to: "/dashboard/collaboration", icon: <MessageSquare size={20} />, text: "Collaboration" },
        { to: "/dashboard/activity", icon: <Clock size={20} />, text: "Activity History" }
      ]}
    />
  );
}
