
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";
import IntegrationList from "@/components/admin/IntegrationList";
import IntegrationForm from "@/components/admin/IntegrationForm";
import IntegrationAIAssistant from "@/components/ai/IntegrationAIAssistant";
import { INTEGRATION_CATEGORIES } from "@/utils/integrationConstants";
import { IntegrationSettingsTab } from "@/components/admin/IntegrationSettingsTab";

export default function AdminIntegrationsPage() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("api");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveIntegration = () => {
    toast({
      title: "Integration Saved",
      description: "The integration settings have been updated successfully."
    });
    setIsAddingNew(false);
  };

  return (
    <AdminLayout
      title="Integration Settings"
      description="Configure and manage third-party service integrations"
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setShowAIAssistant(false);
              setShowSettings(!showSettings);
              setIsAddingNew(false);
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            {showSettings ? "Hide Settings" : "Settings"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowAIAssistant(!showAIAssistant);
              setShowSettings(false);
              setIsAddingNew(false);
            }}
          >
            {showAIAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
          {!isAddingNew && !showSettings && (
            <Button 
              onClick={() => {
                setIsAddingNew(true);
                setShowAIAssistant(false);
                setShowSettings(false);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Integration
            </Button>
          )}
        </div>
      }
    >
      {showAIAssistant && <IntegrationAIAssistant />}
      
      {showSettings ? (
        <IntegrationSettingsTab />
      ) : isAddingNew ? (
        <IntegrationForm 
          onSave={handleSaveIntegration} 
          onCancel={() => setIsAddingNew(false)}
        />
      ) : (
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mt-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
            {INTEGRATION_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {INTEGRATION_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <IntegrationList 
                category={category.id} 
                title={category.name} 
                description={category.description} 
              />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </AdminLayout>
  );
}
