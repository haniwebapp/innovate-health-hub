
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";

export default function AIRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Recommendations</h2>
        <p className="text-muted-foreground">
          Personalized recommendations based on your innovation profile and activities.
        </p>
      </div>

      <Card className="border-dashed border-purple-200">
        <CardHeader>
          <div className="flex items-center">
            <Cpu className="h-6 w-6 text-purple-600 mr-2" />
            <CardTitle>Tailored Recommendations</CardTitle>
          </div>
          <CardDescription>
            Our AI analyzes your innovation profile to suggest opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Recommendations will be available soon as our AI capabilities develop.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
