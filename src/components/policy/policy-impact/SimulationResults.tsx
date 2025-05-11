
import { PolicyImpactResult } from "@/services/ai/PolicyAIService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, BarChart2, AlertCircle, ArrowUpRight } from "lucide-react";

interface SimulationResultsProps {
  isSimulating: boolean;
  result: PolicyImpactResult | null;
}

export function SimulationResults({ isSimulating, result }: SimulationResultsProps) {
  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    if (score >= 25) return "bg-orange-500"; 
    return "bg-red-500";
  };
  
  // Helper to get text color based on score
  const getTextColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    if (score >= 25) return "text-orange-500"; 
    return "text-red-500";
  };

  if (isSimulating) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-moh-blue mb-4" />
        <p className="text-muted-foreground">Simulating policy impact...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <BarChart2 className="h-12 w-12 text-moh-blue/30 mb-4" />
        <p className="text-muted-foreground">Enter policy details and run the simulation to see impact results</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Overall Impact Score</h3>
        <Badge 
          className={`${getScoreColor(result.impactScore)} px-3 py-1 text-white`}
        >
          {result.impactScore}/100
        </Badge>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-md font-medium border-b pb-2">Stakeholder Impact</h3>
        
        {Object.entries(result.stakeholderImpact).map(([stakeholder, data]) => (
          <div key={stakeholder} className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium capitalize">{stakeholder}</h4>
              <span className={getTextColor(data.score)}>{data.score}/100</span>
            </div>
            <Progress 
              value={data.score} 
              max={100}
              className={`h-2 ${getScoreColor(data.score)}`} 
            />
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-md font-medium border-b pb-2">Economic Impact</h3>
        <p className="text-sm">{result.economicImpact}</p>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-md font-medium border-b pb-2">Healthcare Outcome Impact</h3>
        <p className="text-sm">{result.healthcareOutcomeImpact}</p>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-md font-medium border-b pb-2">Implementation Complexity</h3>
        <p className="text-sm">{result.implementationComplexity}</p>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-md font-medium border-b pb-2">Recommendations</h3>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 text-moh-blue mt-1 flex-shrink-0" />
              <span className="text-sm">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
