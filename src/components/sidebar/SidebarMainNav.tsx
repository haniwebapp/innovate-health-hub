
import React from "react";
import { useLocation } from "react-router-dom";
import { Home, LineChart, FileText, Send, MessageCircle, HelpCircle, CalendarDays } from "lucide-react";
import { SidebarNavSection } from "./SidebarNavSection";
import { SidebarNavItem } from "./SidebarNavItem";

interface SidebarMainNavProps {
  isCollapsed: boolean;
}

export function SidebarMainNav({ isCollapsed }: SidebarMainNavProps) {
  const { pathname } = useLocation();
  
  // Convert the isActive function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  // Create an array of navigation items to map through
  const navItems = [
    {
      to: "/dashboard",
      icon: <Home className="h-[1.2rem] w-[1.2rem]" />,
      text: "Dashboard"
    },
    {
      to: "/dashboard/challenges",
      icon: <LineChart className="h-[1.2rem] w-[1.2rem]" />,
      text: "Challenges"
    },
    {
      to: "/dashboard/submissions",
      icon: <Send className="h-[1.2rem] w-[1.2rem]" />,
      text: "Submissions"
    },
    {
      to: "/dashboard/activity",
      icon: <FileText className="h-[1.2rem] w-[1.2rem]" />,
      text: "Activity"
    },
    {
      to: "/dashboard/events",
      icon: <CalendarDays className="h-[1.2rem] w-[1.2rem]" />,
      text: "Events"
    },
    {
      to: "/dashboard/support",
      icon: <HelpCircle className="h-[1.2rem] w-[1.2rem]" />,
      text: "Support"
    }
  ];
  
  return (
    <SidebarNavSection 
      title="Main Navigation" 
      isCollapsed={isCollapsed} 
      items={navItems.map(item => ({
        ...item,
        badge: undefined
      }))}
    />
  );
}
