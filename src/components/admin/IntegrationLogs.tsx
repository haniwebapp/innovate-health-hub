
import { useEffect, useState } from "react";
import { fetchIntegrationLogs, IntegrationLog } from "@/utils/integrationUtils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Info, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { AdminLoading, AdminError, AdminEmpty } from "@/components/admin/ui/AdminPageState";

interface IntegrationLogsProps {
  integrationId: string;
}

export default function IntegrationLogs({ integrationId }: IntegrationLogsProps) {
  const [logs, setLogs] = useState<IntegrationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadLogs();
  }, [integrationId]);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchIntegrationLogs(integrationId);
      setLogs(data);
    } catch (error) {
      console.error("Error loading integration logs:", error);
      setError(error instanceof Error ? error : new Error("Failed to load integration logs"));
      toast({
        title: "Error loading logs",
        description: "There was a problem loading the integration logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy HH:mm:ss');
    } catch (error) {
      return dateString || "Unknown date";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <AdminLoading message="Loading integration logs..." />;
  }

  if (error) {
    return (
      <AdminError
        title="Failed to load logs" 
        description={error.message}
        onRetry={loadLogs}
      />
    );
  }

  if (logs.length === 0) {
    return (
      <AdminEmpty 
        message="No logs found for this integration"
        icon={<Info className="h-6 w-6 text-muted-foreground" />}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <Info className="h-4 w-4 mr-1 text-muted-foreground" />
          Integration Logs
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadLogs}
          className="h-8 px-2 text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Refresh
        </Button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`rounded-md border p-3 ${
              log.status.toLowerCase() === "error" 
                ? "border-red-200 bg-red-50" 
                : log.status.toLowerCase() === "success"
                ? "border-green-100 bg-green-50"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {getStatusIcon(log.status)}
                <span className="font-medium text-sm">{log.event_type.replace(/_/g, " ")}</span>
              </div>
              {getStatusBadge(log.status)}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {log.details?.timestamp && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(log.details.timestamp)}</span>
                </div>
              )}
              {log.details?.message && (
                <p className="mt-1 text-sm">{log.details.message}</p>
              )}
              {log.details?.error && (
                <p className="mt-1 text-red-600">{log.details.error}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
