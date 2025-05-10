
import { SidebarNavSection } from "./SidebarNavSection";
import { DollarSign, BookOpen, ShieldCheck, Users, BarChart3, LineChart, ChartPieIcon } from "lucide-react";

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
          icon: <DollarSign size={18} className="text-purple-600" />, 
          text: "Investment Hub" 
        },
        { 
          to: "/dashboard/regulatory", 
          icon: <ShieldCheck size={18} className="text-moh-green" />, 
          text: "Regulatory Sandbox" 
        },
        { 
          to: "/dashboard/knowledge", 
          icon: <BookOpen size={18} className="text-moh-green" />, 
          text: "Knowledge Hub" 
        },
        { 
          to: "/dashboard/collaboration", 
          icon: <Users size={18} className="text-moh-green" />, 
          text: "Collaboration" 
        },
        {
          to: "/dashboard/investment/analyze",
          icon: <BarChart3 size={18} className="text-purple-600" />,
          text: "Market Analysis"
        },
        {
          to: "/dashboard/investment/portfolio",
          icon: <ChartPieIcon size={18} className="text-purple-600" />,
          text: "Portfolio"
        },
        {
          to: "/dashboard/investment/trends",
          icon: <LineChart size={18} className="text-purple-600" />,
          text: "Investment Trends"
        }
      ]}
    />
  );
}
