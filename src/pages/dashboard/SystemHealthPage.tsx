
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import SystemHealthMonitor from "@/components/admin/SystemHealthMonitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminError } from "@/components/admin/ui/AdminPageState";

export default function SystemHealthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh operation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "System Health Refreshed",
        description: "The system health data has been updated.",
      });
    }, 1000);
  };
  
  return (
    <AdminLayout
      title="System Health"
      description="Monitor platform health and performance"
      actions={
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      }
    >
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <SystemHealthMonitor />
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <AdminError
            title="Service Details Coming Soon"
            description="This feature is currently under development."
          />
        </TabsContent>
        
        <TabsContent value="logs">
          <AdminError
            title="System Logs Coming Soon"
            description="This feature is currently under development."
          />
        </TabsContent>
        
        <TabsContent value="alerts">
          <AdminError
            title="Alert Configuration Coming Soon"
            description="This feature is currently under development."
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
