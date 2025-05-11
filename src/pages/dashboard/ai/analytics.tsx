
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart } from "lucide-react";

export default function AIAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Analytics</h2>
        <p className="text-muted-foreground">
          Advanced analytics powered by our AI to help you understand trends and opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-dashed border-purple-200">
          <CardHeader>
            <div className="flex items-center">
              <LineChart className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle>Trend Analysis</CardTitle>
            </div>
            <CardDescription>
              AI-powered trend analysis for healthcare innovation sectors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Trend analysis will be available soon.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-purple-200">
          <CardHeader>
            <div className="flex items-center">
              <BarChart className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle>Success Prediction</CardTitle>
            </div>
            <CardDescription>
              Success probability analysis for your innovations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Success prediction will be available soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
