
import React from "react";
import { format } from "date-fns";
import { SandboxApplication } from "@/utils/regulatoryUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface SandboxApplicationListProps {
  applications: SandboxApplication[];
  showViewAll?: boolean;
  viewAllUrl?: string;
}

export function SandboxApplicationList({ 
  applications, 
  showViewAll = false, 
  viewAllUrl = "/dashboard/regulatory/applications" 
}: SandboxApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No applications found</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id} className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{app.name}</h3>
                {getStatusBadge(app.status)}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{app.description}</p>
              <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                <span>Submitted: {format(new Date(app.submitted_at), 'MMM d, yyyy')}</span>
                <span>Type: {app.innovation_type.replace('-', ' ')}</span>
                {app.start_date && <span>Started: {format(new Date(app.start_date), 'MMM d, yyyy')}</span>}
              </div>
            </div>
            
            <div className="flex items-center md:self-end">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/dashboard/regulatory/applications/${app.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      {showViewAll && applications.length > 0 && (
        <div className="text-center pt-2">
          <Button variant="outline" size="sm" className="text-moh-green" asChild>
            <Link to={viewAllUrl}>
              View All Applications
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
