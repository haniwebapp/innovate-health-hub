
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, ArrowUpRightIcon } from "lucide-react";

export const StrategyAnalytics = () => {
  // Mock data for strategy alignment scores
  const alignmentScores = [
    { area: "Digital Transformation", score: 85 },
    { area: "Patient-Centered Care", score: 72 },
    { area: "Healthcare Access", score: 93 },
    { area: "Data Governance", score: 68 }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5" />
          Strategy Alignment
        </CardTitle>
        <CardDescription>
          See how your innovation aligns with strategic healthcare priorities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alignmentScores.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.area}</span>
                <span className="font-medium">{item.score}%</span>
              </div>
              <Progress value={item.score} className="h-2" />
            </div>
          ))}
          
          <div className="pt-4">
            <Button size="sm" className="w-full mt-2">
              Generate Full Analysis
              <ArrowUpRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
