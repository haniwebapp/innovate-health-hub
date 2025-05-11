
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
import { Application } from "./types";

interface ApplicationListProps {
  applications: Application[];
}

export function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <div className="space-y-4">
      {applications.map(application => (
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
