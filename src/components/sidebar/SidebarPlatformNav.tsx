
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
        { to: "/dashboard/investment", icon: <DollarSign size={18} className="text-moh-green" />, text: "Investment" },
        { to: "/dashboard/regulatory", icon: <BookOpen size={18} className="text-moh-green" />, text: "Regulatory" },
        { to: "/dashboard/knowledge", icon: <BookOpen size={18} className="text-moh-green" />, text: "Knowledge" },
        { to: "/dashboard/collaboration", icon: <MessageSquare size={18} className="text-moh-green" />, text: "Collaborate", badge: "2" },
        { to: "/dashboard/activity", icon: <Clock size={18} className="text-moh-green" />, text: "Activity" }
      ]}
    />
  );
}
