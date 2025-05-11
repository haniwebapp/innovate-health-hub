
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { RegulatoryDashboard } from "@/components/regulatory/dashboard/RegulatoryDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardRegulatoryPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Regulatory" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <RegulatoryDashboard />
    </div>
  );
}
