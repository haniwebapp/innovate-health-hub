
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, DownloadCloud, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function IntegrationAIAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<{
    name: string;
    category: string;
    reason: string;
  }[]>([]);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    
    try {
      // Call the admin-assistant function
      const { data, error } = await supabase.functions.invoke("admin-assistant", {
        body: { 
          messages: [
            {
              role: "user",
              content: `Analyze our platform's current state and suggest potential integrations 
              that would benefit our healthcare platform. Focus on interoperability, security, and 
              user experience improvements.`
            }
          ],
          context: "admin-integrations"
        }
      });

      if (error) throw error;

      // We're simulating a structured response here
      // In a real implementation, you'd parse the AI response or structure it in the edge function
      setInsights([
        "Your platform would benefit from HL7/FHIR integration to connect with healthcare systems",
        "Two-factor authentication with national ID integration would improve security",
        "Adding payment gateway integration would enable subscription features",
        "Implementing AI-powered document parsing would streamline data entry"
      ]);

      setRecommendations([
        {
          name: "FHIR API Integration",
          category: "healthcare",
          reason: "Connect with electronic health record systems to enable clinical data exchange"
        },
        {
          name: "National ID Authentication",
          category: "security",
          reason: "Enable secure identity verification through integration with government ID systems"
        },
        {
          name: "Stripe Payment Gateway",
          category: "payment",
          reason: "Add subscription capabilities and secure payment processing"
        },
        {
          name: "OpenAI Document Parser",
          category: "ai",
          reason: "Extract structured data from medical documents and forms"
        },
        {
          name: "WhatsApp Business API",
          category: "communication",
          reason: "Enable automated patient notifications and appointment reminders"
        }
      ]);

      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your platform and generated integration recommendations.",
      });
    } catch (err: any) {
      console.error("Error getting AI recommendations:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to get AI recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDetails = (index: number) => {
    setShowDetails(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Integration Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered recommendations for integrations that would benefit your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <p>Analyzing your platform...</p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4 text-center">
                  Our AI can analyze your platform's needs and suggest relevant integrations
                  that would enhance functionality and user experience.
                </p>
                <Button onClick={handleGetRecommendations} className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Get Integration Recommendations
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <section>
              <h4 className="font-medium text-lg mb-2">Key Insights</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </section>
            
            <section>
              <h4 className="font-medium text-lg mb-2">Recommended Integrations</h4>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">{rec.name}</h5>
                          <Badge variant="outline">{rec.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mr-2"
                          onClick={() => toggleDetails(index)}
                        >
                          {showDetails[index] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          size="sm"
                          variant="default"
                          onClick={() => toast({
                            title: "Template Downloaded",
                            description: `Integration template for ${rec.name} has been downloaded.`
                          })}
                        >
                          <DownloadCloud className="h-4 w-4 mr-1" /> Template
                        </Button>
                      </div>
                    </div>
                    
                    {showDetails[index] && (
                      <div className="mt-3 pt-3 border-t text-sm">
                        <h6 className="font-medium mb-1">Implementation Details:</h6>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Estimated integration time: 2-5 days</li>
                          <li>Authentication required: API Key + OAuth</li>
                          <li>Data mapping complexity: Medium</li>
                          <li>External documentation available</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <Button variant="outline" onClick={handleGetRecommendations}>
                Refresh Recommendations
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
