
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

interface TestingMetric {
  name: string;
  target: number;
  current: number;
}

interface TestingMetricsPanelProps {
  metrics: TestingMetric[];
}

export function TestingMetricsPanel({ metrics }: TestingMetricsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testing Metrics</CardTitle>
        <CardDescription>Track the progress of your sandbox testing</CardDescription>
      </CardHeader>
      <CardContent>
        {metrics.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {metrics.map((metric, index) => {
              const percentage = Math.round((metric.current / metric.target) * 100);
              return (
                <div key={index} className="flex-1">
                  <p className="text-sm font-medium">{metric.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{metric.current}</span>
                    <span className="text-sm text-muted-foreground">/ {metric.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-moh-green h-2.5 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Detailed metrics visualization will be available once more data is collected
              </p>
              <Button asChild>
                <Link to="/dashboard/regulatory/testing/metrics/setup">
                  Configure Metrics
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
