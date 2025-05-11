
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SystemHealthCardProps {
  refreshInterval?: number; // In milliseconds
}

export default function SystemHealthCard({ refreshInterval = 60000 }: SystemHealthCardProps) {
  const [healthStatus, setHealthStatus] = useState<{
    overallStatus: "healthy" | "issues" | "critical";
    servicesOnline: number;
    servicesTotal: number;
    lastIncident: string | null;
  }>({
    overallStatus: "healthy",
    servicesOnline: 4,
    servicesTotal: 4,
    lastIncident: null,
  });

  // In a real app, this would fetch actual system health data
  useEffect(() => {
    const fetchHealthStatus = async () => {
      // Mock data - in a real app this would be an API call
      const mockStatus = {
        overallStatus: Math.random() > 0.9 ? "issues" : "healthy",
        servicesOnline: 4,
        servicesTotal: 4,
        lastIncident: Math.random() > 0.8 ? "2025-05-10T10:30:00Z" : null,
      } as const;
      
      setHealthStatus(mockStatus);
    };

    fetchHealthStatus();
    
    // Set up the refresh interval
    const intervalId = setInterval(fetchHealthStatus, refreshInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [refreshInterval]);

  const getStatusColor = (status: "healthy" | "issues" | "critical") => {
    switch (status) {
      case "healthy": 
        return "bg-green-50 text-green-700 border-green-200";
      case "issues": 
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "critical": 
        return "bg-red-50 text-red-700 border-red-200";
      default: 
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusText = (status: "healthy" | "issues" | "critical") => {
    switch (status) {
      case "healthy": return "All Systems Operational";
      case "issues": return "Minor Issues Detected";
      case "critical": return "Major Issues Detected";
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-slate-50 border-b">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-moh-green" />
            System Health
          </div>
        </CardTitle>
        <Badge 
          variant="outline"
          className={getStatusColor(healthStatus.overallStatus)}
        >
          {getStatusText(healthStatus.overallStatus)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Services online:</span>
            <span className="font-semibold">{healthStatus.servicesOnline}/{healthStatus.servicesTotal}</span>
          </div>
          
          {healthStatus.lastIncident && (
            <div className="text-xs text-amber-600 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Last incident: {new Date(healthStatus.lastIncident).toLocaleDateString()}
            </div>
          )}

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
              <Link to="/dashboard/admin/system-health">
                View System Health
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
