
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";
import { UserProfile } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";

interface UserInsightsCardProps {
  users: UserProfile[];
}

interface InsightData {
  summary: string;
  recommendations: string[];
  userGroups: {
    name: string;
    count: number;
    description: string;
  }[];
}

export default function UserInsightsCard({ users }: UserInsightsCardProps) {
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateInsights = async () => {
      if (!users.length) return;
      setIsLoading(true);
      setError(null);

      try {
        // Prepare user data for analysis
        const userData = users.map(user => ({
          userType: user.userType || "user",
          organization: user.organization,
          status: user.status,
          isAdmin: user.email.endsWith('@moh.gov.sa')
        }));

        // Call the AI insights function
        const { data, error } = await supabase.functions.invoke("user-insights", {
          body: { userData }
        });

        if (error) throw new Error(error.message);
        setInsights(data);
      } catch (err: any) {
        console.error("Error generating insights:", err);
        setError(err.message || "Failed to generate insights");
      } finally {
        setIsLoading(false);
      }
    };

    // Only generate insights if we have users and at least 3 of them
    if (users.length >= 3) {
      generateInsights();
    }
  }, [users]);

  if (!users.length || users.length < 3) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            AI User Insights
          </CardTitle>
          <CardDescription>
            Add more users to get AI-powered insights on your user base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            You need at least 3 users to generate insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI User Insights
        </CardTitle>
        <CardDescription>
          AI-powered analysis of your user base and activity patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Analyzing user data...</span>
          </div>
        ) : error ? (
          <div className="text-destructive py-4">
            Error generating insights: {error}
          </div>
        ) : insights ? (
          <div className="space-y-4">
            <section>
              <h4 className="font-medium text-lg mb-2">Summary</h4>
              <p className="text-muted-foreground">{insights.summary}</p>
            </section>
            
            <section>
              <h4 className="font-medium text-lg mb-2">User Groups</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.userGroups.map((group, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-medium">{group.name}</h5>
                      <Badge variant="outline">{group.count} users</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h4 className="font-medium text-lg mb-2">Recommendations</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {insights.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
