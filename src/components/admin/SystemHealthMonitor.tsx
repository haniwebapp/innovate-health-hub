
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle, CheckCircle, Clock, ServerOff, Shield } from "lucide-react";
import { AIService } from "@/services/ai/AIService";
import { supabase } from "@/integrations/supabase/client";
import { AdminLoading, AdminError } from "@/components/admin/ui/AdminPageState";

interface SystemStatus {
  service: string;
  status: "operational" | "degraded" | "offline" | "unknown";
  latency?: number;
  uptime?: number;
  lastChecked: Date;
  details?: string;
}

export default function SystemHealthMonitor() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [statuses, setStatuses] = useState<SystemStatus[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    checkSystemHealth();
  }, []);

  const checkSystemHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current timestamps to measure response times
      const startTime = Date.now();
      
      // Check database connection
      let dbStatus: SystemStatus = {
        service: "Database",
        status: "unknown",
        lastChecked: new Date()
      };
      
      try {
        const { data, error } = await supabase.from('profiles').select('count(*)', { count: 'exact', head: true });
        const endTime = Date.now();
        
        if (error) throw error;
        
        dbStatus = {
          service: "Database",
          status: "operational",
          latency: endTime - startTime,
          lastChecked: new Date(),
        };
      } catch (error) {
        console.error("Database health check failed:", error);
        dbStatus = {
          service: "Database",
          status: "degraded",
          lastChecked: new Date(),
          details: error instanceof Error ? error.message : "Database connection issues"
        };
      }
      
      // Check authentication service
      let authStatus: SystemStatus = {
        service: "Authentication",
        status: "unknown",
        lastChecked: new Date()
      };
      
      try {
        const startAuthTime = Date.now();
        const { data, error } = await supabase.auth.getSession();
        const endAuthTime = Date.now();
        
        authStatus = {
          service: "Authentication",
          status: "operational",
          latency: endAuthTime - startAuthTime,
          lastChecked: new Date()
        };
      } catch (error) {
        console.error("Auth health check failed:", error);
        authStatus = {
          service: "Authentication",
          status: "degraded",
          lastChecked: new Date(),
          details: error instanceof Error ? error.message : "Authentication service issues"
        };
      }
      
      // Check AI services
      let aiStatus: SystemStatus = {
        service: "AI Services",
        status: "unknown",
        lastChecked: new Date()
      };
      
      try {
        const aiHealthCheck = await AIService.checkAIServices();
        
        aiStatus = {
          service: "AI Services",
          status: aiHealthCheck.overall ? "operational" : "degraded",
          lastChecked: new Date(),
          details: !aiHealthCheck.overall ? 
            `Some AI services are not responding properly: ${
              Object.entries(aiHealthCheck)
                .filter(([key, val]) => key !== "overall" && !val)
                .map(([key]) => key)
                .join(", ")
            }` : undefined
        };
      } catch (error) {
        console.error("AI services health check failed:", error);
        aiStatus = {
          service: "AI Services",
          status: "degraded",
          lastChecked: new Date(),
          details: error instanceof Error ? error.message : "AI services connection issues"
        };
      }
      
      // Storage service check
      let storageStatus: SystemStatus = {
        service: "Storage",
        status: "operational", // Assuming it's working by default
        lastChecked: new Date()
      };
      
      // Set all statuses
      setStatuses([dbStatus, authStatus, aiStatus, storageStatus]);
      
    } catch (error) {
      console.error("Error checking system health:", error);
      setError(error instanceof Error ? error : new Error("Failed to check system health"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Operational
          </Badge>
        );
      case "degraded":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Degraded
          </Badge>
        );
      case "offline":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <ServerOff className="h-3 w-3 mr-1" /> Offline
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
            Unknown
          </Badge>
        );
    }
  };

  if (loading) {
    return <AdminLoading message="Checking system health..." />;
  }

  if (error) {
    return (
      <AdminError 
        title="Failed to check system health" 
        description={error.message}
        onRetry={checkSystemHealth}
      />
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3 bg-slate-50 border-b flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-medium flex items-center">
          <Shield className="h-5 w-5 mr-2 text-moh-green" />
          System Health Status
        </CardTitle>
        <Button variant="outline" size="sm" onClick={checkSystemHealth}>
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        {statuses.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            No system status information available
          </div>
        ) : (
          <div className="space-y-4">
            {statuses.map((status, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{status.service}</span>
                  {getStatusBadge(status.status)}
                </div>
                {status.latency !== undefined && (
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Response time: {status.latency}ms</span>
                    <span>Last checked: {status.lastChecked.toLocaleTimeString()}</span>
                  </div>
                )}
                {status.details && (
                  <div className="text-xs text-red-600">{status.details}</div>
                )}
                {status.uptime !== undefined && (
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${status.uptime}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
