
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StrategyGapResult } from '@/services/ai/policy/types';
import { AlertTriangle, CheckCircle, CircleHelp, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface StrategyGapResultsProps {
  results: StrategyGapResult;
}

export function StrategyGapResults({ results }: StrategyGapResultsProps) {
  if (!results || !results.gaps) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-amber-600" />;
      case 'low':
        return <CircleHelp className="h-4 w-4 text-green-600" />;
      default:
        return <CircleHelp className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#00814A]/20 shadow-sm">
        <CardHeader className="bg-[#00814A]/5 pb-4">
          <CardTitle className="text-[#00814A] flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Gap Analysis Results
          </CardTitle>
          <CardDescription>
            Identified gaps between policy objectives and implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2">Overall Analysis</h3>
            <p className="text-sm text-muted-foreground">{results.overallAnalysis}</p>
          </div>

          <Separator className="my-4" />

          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2">Identified Gaps</h3>
            <div className="space-y-3">
              {results.gaps.map((gap, index) => (
                <div key={index} className={`p-3 border rounded-md ${getSeverityColor(gap.severity)}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getSeverityIcon(gap.severity)}
                    <h4 className="text-sm font-semibold">{gap.title}</h4>
                    <Badge variant="outline" className="ml-auto">
                      {gap.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{gap.description}</p>
                  <p className="text-xs italic">
                    <span className="font-semibold">Potential Impact:</span> {gap.potentialImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-base font-semibold mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#00814A] mt-0.5" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
