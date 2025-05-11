
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound } from "lucide-react";

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Personalized Insights</h2>
        <p className="text-muted-foreground">
          AI-generated insights tailored to your specific innovation and interests.
        </p>
      </div>

      <Card className="border-dashed border-purple-200">
        <CardHeader>
          <div className="flex items-center">
            <UserRound className="h-6 w-6 text-purple-600 mr-2" />
            <CardTitle>Your Innovation Insights</CardTitle>
          </div>
          <CardDescription>
            Personalized analysis and suggestions for your innovation journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Personalized insights will be available soon as our AI capabilities develop.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
