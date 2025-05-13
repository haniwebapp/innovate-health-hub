import React from "react";
import { Vision2030AlignmentResult } from "@/services/ai/policy/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowUpRight, Loader2, Trophy } from "lucide-react";

interface AlignmentResultsProps {
  isAnalyzing: boolean;
  result: Vision2030AlignmentResult | null;
}

export function AlignmentResults({ isAnalyzing, result }: AlignmentResultsProps) {
  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-moh-green mb-4" />
        <p className="text-muted-foreground">Analyzing alignment with Vision 2030...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Trophy className="h-12 w-12 text-moh-gold/30 mb-4" />
        <p className="text-muted-foreground">Enter policy details and analyze to see alignment results</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Overall Alignment</h3>
          <Badge 
            className={`${getScoreColor(result.overallScore)} px-3 py-1 text-white`}
          >
            {result.overallScore}%
          </Badge>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-md font-medium border-b pb-2">Pillar Alignment</h3>
          
          {result.alignmentAreas.map((detail, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{detail.pillar}</h4>
                <Badge 
                  className={`${getScoreColor(detail.score)} px-2 py-0.5 text-white`}
                >
                  {detail.score}%
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{detail.relevance}</p>
              
              {detail.opportunities.length > 0 && (
                <div className="mt-1">
                  <p className="text-sm font-medium">Opportunities:</p>
                  <ul className="list-disc list-inside text-sm pl-2 text-muted-foreground">
                    {detail.opportunities.map((opportunity, i) => (
                      <li key={i}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-md font-medium border-b pb-2">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 text-moh-green mt-1 flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex justify-center border-t pt-4">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ArrowUpRight className="h-4 w-4" />
          View Detailed Report
        </Button>
      </div>
    </>
  );
}
