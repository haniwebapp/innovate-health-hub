
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, FileCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Application } from "./types";

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'in-review':
        return <Badge className="bg-amber-500">In Review</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  return (
    <Card key={application.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{application.name}</CardTitle>
            <CardDescription>Framework: {application.framework}</CardDescription>
          </div>
          <div>
            {getStatusBadge(application.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Submitted: {application.submittedDate}
            </span>
            <span className="font-medium">
              {application.status === "approved" ? 
                "Testing period: " + application.testingPeriod : 
                "Application progress"}
            </span>
          </div>
          
          <Progress 
            value={application.progress} 
            className="h-2"
          />
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dashboard/regulatory/applications/${application.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Link>
          </Button>
          
          {application.status === "approved" && (
            <Button size="sm" asChild>
              <Link to={`/dashboard/regulatory/testing/${application.id}`}>
                <FileCheck className="h-4 w-4 mr-1" />
                Submit Test Results
              </Link>
            </Button>
          )}
          
          {application.status === "in-review" && (
            <Button size="sm" asChild>
              <Link to={`/dashboard/regulatory/applications/${application.id}/edit`}>
                <FileText className="h-4 w-4 mr-1" />
                Edit Application
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
