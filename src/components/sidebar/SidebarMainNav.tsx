
import React from "react";
import { useLocation } from "react-router-dom";
import { Home, LineChart, FileText, Send, MessageCircle, HelpCircle } from "lucide-react";
import { SidebarNavSection } from "./SidebarNavSection";
import { SidebarNavItem } from "./SidebarNavItem";

interface SidebarMainNavProps {
  isCollapsed: boolean;
}

export function SidebarMainNav({ isCollapsed }: SidebarMainNavProps) {
  const { pathname } = useLocation();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  return (
    <SidebarNavSection>
      <SidebarNavItem
        isCollapsed={isCollapsed}
        active={isActive("/dashboard")}
        href="/dashboard"
        icon={<Home className="h-[1.2rem] w-[1.2rem]" />}
        label="Dashboard"
      />
      
      <SidebarNavItem
        isCollapsed={isCollapsed}
        active={isActive("/dashboard/challenges")}
        href="/dashboard/challenges"
        icon={<LineChart className="h-[1.2rem] w-[1.2rem]" />}
        label="Challenges"
      />
      
      <SidebarNavItem
        isCollapsed={isCollapsed}
        active={isActive("/dashboard/submissions")}
        href="/dashboard/submissions"
        icon={<Send className="h-[1.2rem] w-[1.2rem]" />}
        label="Submissions"
      />
      
      <SidebarNavItem
        isCollapsed={isCollapsed}
        active={isActive("/dashboard/activity")}
        href="/dashboard/activity"
        icon={<FileText className="h-[1.2rem] w-[1.2rem]" />}
        label="Activity"
      />
      
      <SidebarNavItem
        isCollapsed={isCollapsed}
        active={isActive("/dashboard/support")}
        href="/dashboard/support"
        icon={<HelpCircle className="h-[1.2rem] w-[1.2rem]" />}
        label="Support"
      />
    </SidebarNavSection>
  );
}
