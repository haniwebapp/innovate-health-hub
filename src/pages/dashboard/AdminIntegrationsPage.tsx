
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import IntegrationList from "@/components/admin/IntegrationList";
import IntegrationForm from "@/components/admin/IntegrationForm";
import IntegrationAIAssistant from "@/components/ai/IntegrationAIAssistant";

const INTEGRATION_CATEGORIES = [
  { id: "api", name: "APIs", description: "FHIR, HL7, REST APIs" },
  { id: "communication", name: "Communication", description: "SMS, WhatsApp, Email" },
  { id: "payment", name: "Payments", description: "Stripe, PayPal, SADAD" },
  { id: "auth", name: "Authentication", description: "National ID, OAuth2, SSO" },
  { id: "storage", name: "Storage & Files", description: "Supabase, AWS S3, Dropbox" },
  { id: "analytics", name: "Analytics", description: "Redash, Metabase, Google Analytics" },
  { id: "ai", name: "AI & NLP", description: "OpenAI, Hugging Face, Custom Models" },
  { id: "meetings", name: "Meetings", description: "Zoom, Teams, Jitsi" }
];

export default function AdminIntegrationsPage() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("api");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

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
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            {showAIAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
          {!isAddingNew && (
            <Button onClick={() => setIsAddingNew(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Integration
            </Button>
          )}
        </div>
      }
    >
      {showAIAssistant && <IntegrationAIAssistant />}

      {isAddingNew ? (
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
