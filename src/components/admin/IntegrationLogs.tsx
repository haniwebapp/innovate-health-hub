
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { fetchIntegrationLogs, IntegrationLog } from "@/utils/integrationUtils";

interface IntegrationLogsProps {
  integrationId: string;
}

export default function IntegrationLogs({ integrationId }: IntegrationLogsProps) {
  const [logs, setLogs] = useState<IntegrationLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      try {
        const data = await fetchIntegrationLogs(integrationId);
        setLogs(data);
      } catch (error) {
        console.error("Error loading integration logs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [integrationId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="mt-2">
      <CardContent className="p-4">
        <h4 className="text-sm font-semibold mb-2">Integration Logs</h4>
        {loading ? (
          <div className="text-center py-2 text-sm">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-2 text-sm text-muted-foreground">No logs available</div>
        ) : (
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className="text-xs border rounded p-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{log.event_type}</div>
                    <Badge 
                      variant="outline" 
                      className={`text-white ${getStatusColor(log.status)}`}
                    >
                      {log.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground mt-1">
                    {formatDate(log.created_at)}
                  </div>
                  {log.details && (
                    <div className="mt-1 text-muted-foreground">
                      {log.details.message || JSON.stringify(log.details)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
