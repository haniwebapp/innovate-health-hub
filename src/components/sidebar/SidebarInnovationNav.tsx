
import { SidebarNavSection } from "./SidebarNavSection";
import { FileText, Lightbulb, PlusCircle, Award } from "lucide-react";

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
          icon: <Award size={18} className="text-moh-green" />, 
          text: "Challenges"
        },
        { 
          to: "/dashboard/innovations", 
          icon: <Lightbulb size={18} className="text-moh-green" />, 
          text: "Innovations"
        },
        { 
          to: "/dashboard/submissions", 
          icon: <FileText size={18} className="text-moh-green" />, 
          text: "Submissions"
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
