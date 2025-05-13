import React from "react";
import { PolicyImpactResult } from "@/services/ai/policy/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft } from "lucide-react";

// Fix type issues in the component by properly typing the results
interface SimulationResultsProps {
  results: PolicyImpactResult;
  onBack: () => void;
}

export function SimulationResults({ results, onBack }: SimulationResultsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Policy Impact Simulation Results</CardTitle>
          </div>
          <Badge className="bg-green-100 text-green-700">AI-Powered</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Overall Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{results?.impactScore || 'N/A'}</div>
              <p className="text-sm text-muted-foreground">Out of 100</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Economic Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{results?.economicImpact || 'N/A'}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Healthcare Outcome Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{results?.healthcareOutcomeImpact || 'N/A'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Implementation Complexity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{results?.implementationComplexity || 'N/A'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Stakeholder Impact</CardTitle>
          </CardHeader>
          <CardContent>
            {results?.stakeholderImpact ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(results.stakeholderImpact).map(([stakeholder, impact]: any) => (
                  <div key={stakeholder} className="space-y-2">
                    <h4 className="text-sm font-medium">{stakeholder}</h4>
                    <p className="text-sm">{impact?.description || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">Score: {impact?.score || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">No stakeholder impact data available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {results?.recommendations && results.recommendations.length > 0 ? (
              <ul className="list-disc pl-5">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm">{recommendation}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No specific recommendations provided.</p>
            )}
          </CardContent>
        </Card>
      </CardContent>
      <div className="flex justify-between p-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Simulation
        </Button>
        <Button>
          Download Report
          <Download className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}
