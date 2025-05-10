
import { SidebarNavSection } from "./SidebarNavSection";
import { FileText, Lightbulb, PlusCircle } from "lucide-react";

interface SidebarInnovationNavProps {
  isCollapsed: boolean;
}

export function SidebarInnovationNav({ isCollapsed }: SidebarInnovationNavProps) {
  return (
    <SidebarNavSection 
      title="Innovation" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/challenges", 
          icon: <FileText size={18} className="text-moh-green" />, 
          text: "Challenges",
          badge: 3,
          badgeVariant: "secondary"
        },
        { 
          to: "/dashboard/innovations", 
          icon: <Lightbulb size={18} className="text-moh-green" />, 
          text: "Innovations",
          badge: "New",
          badgeVariant: "secondary" 
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
