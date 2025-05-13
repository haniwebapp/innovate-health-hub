
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, ClipboardList } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
import { Application } from "./types";
import { mockApplications } from "./mockData";

interface ApplicationListProps {
  applications: Application[];
  showEmptyState?: boolean;
}

export function ApplicationList({ applications, showEmptyState = true }: ApplicationListProps) {
  const hasApplications = applications && applications.length > 0;
  
  // Use provided applications or fall back to mock data if explicitly showing empty state
  const displayApplications = hasApplications 
    ? applications 
    : (showEmptyState ? [] : mockApplications);
  
  if (showEmptyState && !hasApplications) {
    return (
      <div className="text-center py-10">
        <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You haven't submitted any regulatory applications yet. Start by creating your first application.
        </p>
        <Button asChild>
          <Link to="/dashboard/regulatory/applications/new">
            <Plus className="w-4 h-4 mr-1" />
            New Application
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {displayApplications.map(application => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
        />
      ))}
      
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/dashboard/regulatory/applications/new">
            <Plus className="w-4 h-4 mr-1" />
            New Application
          </Link>
        </Button>
      </div>
    </div>
  );
}
