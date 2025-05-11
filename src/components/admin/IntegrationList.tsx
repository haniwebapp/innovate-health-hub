
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Search } from "lucide-react";
import IntegrationItem from "./IntegrationItem";
import { useToast } from "@/hooks/use-toast";
import { fetchIntegrationsByType, Integration, toggleIntegration } from "@/utils/integrationUtils";
import { AdminLoading, AdminError, AdminEmpty } from "@/components/admin/ui/AdminPageState";

interface IntegrationListProps {
  category: string;
  title: string;
  description: string;
}

export default function IntegrationList({ category, title, description }: IntegrationListProps) {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load integrations
  useEffect(() => {
    loadIntegrations();
  }, [category]);

  // Filter integrations when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredIntegrations(integrations);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredIntegrations(
        integrations.filter(
          (integration) =>
            integration.name.toLowerCase().includes(lowerQuery) ||
            (integration.description?.toLowerCase().includes(lowerQuery) || false) ||
            (integration.endpoint?.toLowerCase().includes(lowerQuery) || false)
        )
      );
    }
  }, [searchQuery, integrations]);

  const loadIntegrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIntegrationsByType(category);
      setIntegrations(data);
      setFilteredIntegrations(data);
    } catch (error) {
      console.error("Error loading integrations:", error);
      setError(error instanceof Error ? error : new Error("Failed to load integrations"));
      toast({
        title: "Error loading integrations",
        description: "There was a problem loading the integration list",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIntegration = async (id: string, isActive: boolean) => {
    try {
      const updatedIntegration = await toggleIntegration(id, isActive);
      
      // Update the integration in the state
      const updatedIntegrations = integrations.map(integration => 
        integration.id === id ? updatedIntegration : integration
      );
      
      setIntegrations(updatedIntegrations);
      
      // Also update filtered integrations if necessary
      setFilteredIntegrations(prevFiltered => 
        prevFiltered.map(integration => 
          integration.id === id ? updatedIntegration : integration
        )
      );
      
      toast({
        title: `Integration ${isActive ? 'enabled' : 'disabled'}`,
        description: `The integration has been ${isActive ? 'enabled' : 'disabled'} successfully.`,
      });
    } catch (error) {
      console.error("Error toggling integration:", error);
      toast({
        title: "Error updating integration",
        description: "There was a problem updating the integration status",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadIntegrations();
      toast({
        title: "Integrations refreshed",
        description: "The integration list has been updated.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
        {!loading && !error && integrations.length > 0 && (
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <AdminLoading message="Loading integrations..." />
        ) : error ? (
          <AdminError 
            title="Failed to load integrations" 
            description={error.message}
            onRetry={loadIntegrations}
          />
        ) : filteredIntegrations.length === 0 ? (
          searchQuery ? (
            <AdminEmpty message={`No integrations found matching "${searchQuery}". Try a different search.`} />
          ) : (
            <AdminEmpty message={`No integrations available for ${category}. Add a new integration to get started.`} />
          )
        ) : (
          <div className="space-y-4">
            {filteredIntegrations.map(integration => (
              <IntegrationItem 
                key={integration.id} 
                integration={integration}
                onToggle={handleToggleIntegration}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
