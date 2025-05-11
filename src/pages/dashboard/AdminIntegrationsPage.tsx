
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Shield, Settings } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import IntegrationList from "@/components/admin/IntegrationList";
import IntegrationForm from "@/components/admin/IntegrationForm";
import IntegrationSettingsTab from "@/components/admin/IntegrationSettingsTab";
import { fetchIntegrations, Integration } from "@/utils/integrationUtils";
import { AdminLoading, AdminError } from "@/components/admin/ui/AdminPageState";
import { motion } from "framer-motion";

export default function AdminIntegrationsPage() {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error("Error loading integrations:", error);
      setError(error instanceof Error ? error : new Error("Failed to load integrations"));
      toast({
        title: "Error loading integrations",
        description: "There was a problem loading integration data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIntegrations = integrations.filter((integration) => {
    return (
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (integration.description && 
        integration.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleIntegrationAdded = () => {
    setShowAddForm(false);
    loadIntegrations();
    toast({
      title: "Integration added",
      description: "The integration has been successfully added",
    });
  };

  const handleIntegrationUpdated = () => {
    loadIntegrations();
    toast({
      title: "Integration updated",
      description: "The integration has been successfully updated",
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  if (error) {
    return (
      <AdminLayout
        title="System Integrations"
        description="Manage external services and API connections"
      >
        <AdminError 
          title="Failed to load integrations" 
          description={error.message}
          onRetry={loadIntegrations} 
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="System Integrations"
      description="Manage external services and API connections"
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => loadIntegrations()}
            disabled={isLoading}
          >
            Refresh
          </Button>
          {!showAddForm && activeTab === "list" && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Integration
            </Button>
          )}
        </div>
      }
    >
      {isLoading ? (
        <AdminLoading message="Loading integrations..." />
      ) : showAddForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IntegrationForm 
            onSuccess={handleIntegrationAdded} 
            onCancel={handleCancel}
          />
        </motion.div>
      ) : (
        <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Integrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <div className="mb-4 relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search integrations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <IntegrationList 
              integrations={filteredIntegrations} 
              onUpdate={handleIntegrationUpdated} 
            />
          </TabsContent>
          
          <TabsContent value="settings">
            <IntegrationSettingsTab />
          </TabsContent>
        </Tabs>
      )}
    </AdminLayout>
  );
}
