
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Search, Plus } from "lucide-react";
import IntegrationItem from "./IntegrationItem";
import { useToast } from "@/hooks/use-toast";
import { fetchIntegrationsByType, Integration, toggleIntegration } from "@/utils/integrationUtils";
import { AdminLoading, AdminError, AdminEmpty } from "@/components/admin/ui/AdminPageState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [sortOption, setSortOption] = useState("name");

  // Load integrations
  useEffect(() => {
    loadIntegrations();
  }, [category]);

  // Filter and sort integrations when search query or sort option changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      const sorted = sortIntegrations([...integrations], sortOption);
      setFilteredIntegrations(sorted);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = integrations.filter(
        (integration) =>
          integration.name.toLowerCase().includes(lowerQuery) ||
          (integration.description?.toLowerCase().includes(lowerQuery) || false) ||
          (integration.endpoint?.toLowerCase().includes(lowerQuery) || false)
      );
      const sorted = sortIntegrations(filtered, sortOption);
      setFilteredIntegrations(sorted);
    }
  }, [searchQuery, integrations, sortOption]);

  const sortIntegrations = (items: Integration[], sortBy: string) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          // Sort by active status (active first)
          return (b.is_active === a.is_active) ? 0 : b.is_active ? 1 : -1;
        case "newest":
          // Sort by creation date (newest first)
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          // Sort by creation date (oldest first)
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        default:
          return 0;
      }
    });
  };

  const loadIntegrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIntegrationsByType(category);
      setIntegrations(data);
      setFilteredIntegrations(sortIntegrations(data, sortOption));
    } catch (error) {
      console.error("Error loading integrations:", error);
      setError(error instanceof Error ? error : new Error("Failed to load integrations"));
      toast({
        title: "Error loading integrations",
        description: "There was a problem loading the integration list. Please try again.",
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
      
      // Also update filtered integrations
      setFilteredIntegrations(prevFiltered => 
        prevFiltered.map(integration => 
          integration.id === id ? updatedIntegration : integration
        )
      );
      
      toast({
        title: `Integration ${isActive ? 'enabled' : 'disabled'}`,
        description: `${updatedIntegration.name} has been ${isActive ? 'enabled' : 'disabled'} successfully.`,
      });
    } catch (error) {
      console.error("Error toggling integration:", error);
      toast({
        title: "Error updating integration",
        description: "There was a problem updating the integration status. Please try again.",
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
    } catch (error) {
      console.error("Error refreshing integrations:", error);
      toast({
        title: "Refresh failed",
        description: "There was a problem refreshing integrations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddIntegration = () => {
    // This would typically navigate to an add integration page or open a modal
    toast({
      title: "Add Integration",
      description: "This feature will be implemented in the next phase.",
    });
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-xl text-moh-darkGreen">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddIntegration}
              className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
              className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen/20"
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>
        
        {!loading && !error && integrations.length > 0 && (
          <div className="mt-4 flex flex-col md:flex-row gap-2 md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search integrations..."
                className="pl-8 border-slate-200 focus-visible:ring-moh-green/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={sortOption}
              onValueChange={setSortOption}
            >
              <SelectTrigger className="w-[180px] border-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
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
