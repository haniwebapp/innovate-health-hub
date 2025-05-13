
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PolicyImpactResult } from "@/services/ai/policy/types";
import { 
  ArrowDownIcon, 
  ArrowRightIcon, 
  ArrowUpIcon, 
  CalendarIcon, 
  CheckCircle2, 
  LineChart, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SimulationResultsProps {
  result: PolicyImpactResult;
  isLoading: boolean;
}

export function SimulationResults({ result, isLoading }: SimulationResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-muted rounded-md w-1/3"></div>
              <div className="h-4 bg-muted rounded-md w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-muted rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate overall impact score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card className="border-moh-lightGreen/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-moh-green" />
              Overall Policy Impact
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}/100
            </div>
          </CardTitle>
          <CardDescription>Comprehensive assessment of policy's potential impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 border rounded-lg bg-green-50 border-green-100">
              <div className="flex items-center mb-2">
                <LineChart className="h-4 w-4 text-green-600 mr-2" />
                <h4 className="font-medium text-sm text-green-800">Economic Impact</h4>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(result.economicImpact.score)}`}>
                {result.economicImpact.score}/100
              </div>
              <p className="text-xs text-green-700 mt-1">
                {result.economicImpact.description}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
              <div className="flex items-center mb-2">
                <Users className="h-4 w-4 text-blue-600 mr-2" />
                <h4 className="font-medium text-sm text-blue-800">Social Impact</h4>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(result.socialImpact.score)}`}>
                {result.socialImpact.score}/100
              </div>
              <p className="text-xs text-blue-700 mt-1">
                {result.socialImpact.description}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50 border-purple-100">
              <div className="flex items-center mb-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600 mr-2" />
                <h4 className="font-medium text-sm text-purple-800">Healthcare Impact</h4>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(result.healthcareImpact.score)}`}>
                {result.healthcareImpact.score}/100
              </div>
              <p className="text-xs text-purple-700 mt-1">
                {result.healthcareImpact.description}
              </p>
            </div>
          </div>

          {/* Timeframe Impact */}
          <div className="mt-6 border-t pt-4">
            <h4 className="flex items-center mb-3 font-medium text-sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Implementation Timeline Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-md bg-slate-50 p-3 border">
                <div className="text-sm font-medium mb-1">Short-term</div>
                <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                  {result.timeframeImpact.short.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md bg-slate-50 p-3 border">
                <div className="text-sm font-medium mb-1">Medium-term</div>
                <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                  {result.timeframeImpact.medium.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md bg-slate-50 p-3 border">
                <div className="text-sm font-medium mb-1">Long-term</div>
                <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                  {result.timeframeImpact.long.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 border-t pt-4">
            <h4 className="flex items-center mb-3 font-medium">
              <Badge className="mr-2 bg-moh-green text-white" variant="secondary">AI Recommendations</Badge>
            </h4>
            <ul className="space-y-2 pl-6 list-disc">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
