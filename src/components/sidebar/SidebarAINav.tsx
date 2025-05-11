
import { SidebarNavSection } from "./SidebarNavSection";
import { 
  Cpu, 
  BrainCircuit, 
  LineChart, 
  UserRound, 
  ServerCog,
  Layers
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarAINavProps {
  isCollapsed: boolean;
}

export function SidebarAINav({ isCollapsed }: SidebarAINavProps) {
  const { isAdmin } = useAuth();
  
  return (
    <SidebarNavSection 
      title="AI Features" 
      isCollapsed={isCollapsed} 
      items={[
        { 
          to: "/dashboard/ai/overview", 
          icon: <Cpu size={18} className="text-purple-600" />, 
          text: "AI Overview" 
        },
        { 
          to: "/ai/capabilities", 
          icon: <Layers size={18} className="text-purple-600" />, 
          text: "AI Roadmap" 
        },
        { 
          to: "/dashboard/ai/recommendations", 
          icon: <BrainCircuit size={18} className="text-purple-600" />, 
          text: "Recommendations" 
        },
        { 
          to: "/dashboard/ai/analytics", 
          icon: <LineChart size={18} className="text-purple-600" />, 
          text: "AI Analytics" 
        },
        { 
          to: "/dashboard/ai/insights", 
          icon: <UserRound size={18} className="text-purple-600" />, 
          text: "Personalized Insights" 
        },
        ...(isAdmin ? [
          {
            to: "/dashboard/admin/ai",
            icon: <ServerCog size={18} className="text-purple-600" />,
            text: "AI Administration"
          }
        ] : [])
      ]}
    />
  );
}
