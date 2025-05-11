
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIJourney from "@/components/ai/AIJourney";

export default function AIOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Capabilities</h2>
        <p className="text-muted-foreground">
          Explore the AI-powered features enhancing your healthcare innovation journey.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Development Status</CardTitle>
          <CardDescription>
            Track the progress of our AI capabilities development roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AIJourney />
        </CardContent>
      </Card>
    </div>
  );
}
