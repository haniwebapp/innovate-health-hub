
import { NavSection } from "./SidebarNavSection";
import { FileCheck, LightbulbIcon, PlusCircle } from "lucide-react";

interface SidebarInnovationNavProps {
  isCollapsed: boolean;
}

export function SidebarInnovationNav({ isCollapsed }: SidebarInnovationNavProps) {
  return (
    <NavSection 
      title="Innovation" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/submissions", 
          icon: <FileCheck size={18} className="text-moh-green" />, 
          text: "Challenges",
          badge: "3" 
        },
        { 
          to: "/dashboard/innovations", 
          icon: <LightbulbIcon size={18} className="text-moh-green" />, 
          text: "Innovations", 
          badge: "New"
        },
        { 
          to: "/dashboard/create-challenge", 
          icon: <PlusCircle size={18} className="text-moh-green" />, 
          text: "Create" 
        }
      ]}
    />
  );
}
