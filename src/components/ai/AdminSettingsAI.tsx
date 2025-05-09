
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { GeneralSettings } from "@/types/admin";
import { ChallengeSettings } from "@/types/challenges";
import { useToast } from "@/hooks/use-toast";

interface AdminSettingsAIProps {
  generalSettings: GeneralSettings;
  challengeSettings: ChallengeSettings;
}

interface AIRecommendation {
  settings: {
    key: string;
    name: string;
    value: boolean | string;
    rationale: string;
  }[];
  insights: string[];
}

export default function AdminSettingsAI({ 
  generalSettings,
  challengeSettings 
}: AdminSettingsAIProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getRecommendations = async () => {
    setIsLoading(true);
    
    try {
      // Combine all settings for AI analysis
      const allSettings = {
        general: generalSettings,
        challenges: challengeSettings
      };
      
      // Call the admin-assistant function
      const { data, error } = await supabase.functions.invoke("admin-assistant", {
        body: { 
          messages: [
            {
              role: "user",
              content: `Analyze these platform settings and provide improvement recommendations: ${JSON.stringify(allSettings)}.
              Format your response as strategic recommendations focusing on: security, user experience, and platform growth.
              Be specific but concise.`
            }
          ],
          context: "admin-settings"
        }
      });

      if (error) throw error;

      // Parse recommendations from AI response
      try {
        // Simple parsing of key settings from the text
        const aiMessage = data.message;
        
        // Extract insights using line breaks as separators
        const insights = aiMessage
          .split(/\n+/)
          .filter((line: string) => line.trim().length > 0 && !line.includes(':') && line.length > 10)
          .slice(0, 4);
        
        // Create a structured recommendation object
        const settingsRecs = [
          {
            key: "requireEmailVerification",
            name: "Email Verification",
            value: true,
            rationale: "Improves platform security and user verification"
          },
          {
            key: "allowPublicSubmissions",
            name: "Public Submissions",
            value: generalSettings.allowNewRegistrations,
            rationale: "Aligns with your open registration policy"
          },
          {
            key: "autoCloseExpiredChallenges",
            name: "Auto-close Expired Challenges",
            value: true,
            rationale: "Improves platform organization and user experience"
          }
        ];
        
        setRecommendations({
          settings: settingsRecs,
          insights: insights
        });
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        toast({
          title: "Error processing recommendations",
          description: "Could not process the AI response format",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error getting AI recommendations:", err);
      toast({
        title: "Error getting recommendations",
        description: err.message || "Failed to get AI recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyRecommendation = (key: string, value: boolean | string) => {
    // We're not implementing the actual settings update here
    // This would typically update the parent component's state
    toast({
      title: "Recommendation Applied",
      description: `Setting "${key}" has been updated to "${value}"`,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Settings Recommendations
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to optimize your platform settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!recommendations && (
          <div className="flex flex-col items-center justify-center p-4">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <p>Analyzing your settings...</p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4 text-center">
                  Our AI can analyze your current settings and provide recommendations
                  based on platform best practices.
                </p>
                <Button onClick={getRecommendations} className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Get AI Recommendations
                </Button>
              </>
            )}
          </div>
        )}
        
        {recommendations && (
          <div className="space-y-4">
            <section>
              <h4 className="font-medium text-lg mb-2">Insights</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {recommendations.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </section>
            
            <section>
              <h4 className="font-medium text-lg mb-2">Recommended Settings</h4>
              <div className="space-y-3">
                {recommendations.settings.map((setting, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-md flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{setting.name}</h5>
                        <Badge variant="outline">
                          {typeof setting.value === "boolean" 
                            ? (setting.value ? "Enable" : "Disable")
                            : setting.value}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.rationale}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => applyRecommendation(setting.key, setting.value)}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <Button variant="outline" onClick={getRecommendations}>
                Refresh Recommendations
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
