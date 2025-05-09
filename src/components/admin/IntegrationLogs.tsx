
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Log {
  id: string;
  timestamp: string;
  status: "success" | "error" | "info";
  message: string;
  details?: string;
}

interface IntegrationLogsProps {
  integrationName: string;
}

// Mock log data
const generateMockLogs = (count: number): Log[] => {
  const statuses: ("success" | "error" | "info")[] = ["success", "error", "info"];
  const now = new Date();
  
  return Array.from({ length: count }).map((_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const timestamp = new Date(now.getTime() - (index * 600000)).toISOString(); // 10 minutes apart
    
    return {
      id: `log-${index}`,
      timestamp,
      status,
      message: status === "success" 
        ? "Request completed successfully" 
        : status === "error" 
          ? "Error processing request" 
          : "Connection established",
      details: status === "error" 
        ? "API returned status code 500 - Internal Server Error" 
        : status === "success" 
          ? "Response received in 230ms with 2KB payload" 
          : "Handshake completed with remote endpoint"
    };
  });
};

export default function IntegrationLogs({ integrationName }: IntegrationLogsProps) {
  const [timeRange, setTimeRange] = useState("24h");
  const logs = generateMockLogs(10);

  return (
    <Card className="mt-2 mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium">{integrationName} Activity Logs</h4>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <ScrollArea className="h-[250px]">
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="p-3 text-sm border rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        log.status === "success" ? "default" : 
                        log.status === "error" ? "destructive" : 
                        "outline"
                      }
                    >
                      {log.status}
                    </Badge>
                    <span className="font-medium">{log.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                {log.details && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {log.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
