
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle, Info } from "lucide-react";
import { StrategyGapResult } from '@/services/ai/policy/types';

interface StrategyGapResultsProps {
  results: StrategyGapResult;
}

export const StrategyGapResults: React.FC<StrategyGapResultsProps> = ({ results }) => {
  // Helper function to get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return "bg-red-100 text-red-800 border-red-200";
      case 'medium':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'low':
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // Helper function to get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'low':
        return <Info className="h-5 w-5 text-green-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Gap Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Overall Analysis</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
                <p className="text-sm text-slate-700 whitespace-pre-line">{results.overallAnalysis}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Identified Gaps</h3>
              <div className="space-y-4">
                {results.gaps.map((gap, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-md p-4 ${getSeverityColor(gap.severity)}`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {getSeverityIcon(gap.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{gap.title}</h4>
                          <Badge variant="outline" className={`${getSeverityColor(gap.severity)} border`}>
                            {gap.severity} severity
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{gap.description}</p>
                        {gap.potentialImpact && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Potential Impact: </span>
                            {gap.potentialImpact}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Recommendations</h3>
              <div className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start bg-moh-lightGreen/20 border border-moh-green/20 rounded-md p-3">
                    <CheckCircle className="h-5 w-5 text-moh-green mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-moh-darkGreen">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
