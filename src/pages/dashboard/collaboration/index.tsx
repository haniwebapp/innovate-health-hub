
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { CollaborationDashboard } from "@/components/collaboration/CollaborationDashboard";

export default function DashboardCollaborationPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Collaboration" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <CollaborationDashboard />
    </div>
  );
}
