
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Vision2030AlignmentResult } from "@/services/ai/policy/types";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, FileText, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AlignmentResultsProps {
  result: Vision2030AlignmentResult;
  isLoading: boolean;
}

export function AlignmentResults({ result, isLoading }: AlignmentResultsProps) {
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

  if (!result || result.error) {
    return (
      <Card className="border-red-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Analysis Error
          </CardTitle>
          <CardDescription>There was a problem analyzing the alignment</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{result?.error || "Unknown error occurred"}</p>
        </CardContent>
      </Card>
    );
  }

  // Use score or alignmentScore or overallScore, in that order of preference
  const finalScore = result.score || result.alignmentScore || result.overallScore || 0;

  // Calculate score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card className="border-moh-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-moh-gold" />
              Vision 2030 Alignment Assessment
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(finalScore)}`}>
              {finalScore}/100
            </div>
          </CardTitle>
          <CardDescription>Evaluation of alignment with Saudi Vision 2030 healthcare objectives</CardDescription>
          
          <div className="w-full mt-2">
            <Progress value={finalScore} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          {/* Vision 2030 Impact */}
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-md">
            <h4 className="font-medium mb-2 text-amber-900">Vision 2030 Impact</h4>
            <p className="text-sm text-amber-800">{result.vision2030Impact}</p>
          </div>

          {/* Alignment Areas */}
          <div className="mt-6">
            <h4 className="flex items-center mb-3 font-medium">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
              Alignment Areas
            </h4>
            <div className="grid gap-2 md:grid-cols-2">
              {result.alignmentAreas?.map((area, idx) => (
                <div key={idx} className="p-2 bg-green-50 border border-green-100 rounded-md">
                  <p className="text-sm text-green-800">{area}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision 2030 Objectives */}
          {result.vision2030Objectives && result.vision2030Objectives.length > 0 && (
            <div className="mt-6">
              <h4 className="flex items-center mb-3 font-medium">
                <Target className="h-4 w-4 mr-2 text-moh-gold" />
                Vision 2030 Healthcare Objectives
              </h4>
              <div className="grid gap-2 md:grid-cols-2">
                {result.vision2030Objectives.map((objective, idx) => (
                  <div key={idx} className="p-2 bg-amber-50 border border-amber-100 rounded-md">
                    <p className="text-sm text-amber-800">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gap Areas */}
          <div className="mt-6">
            <h4 className="flex items-center mb-3 font-medium">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
              Gap Areas
            </h4>
            <div className="grid gap-2 md:grid-cols-2">
              {result.gapAreas?.map((gap, idx) => (
                <div key={idx} className="p-2 bg-amber-50 border border-amber-100 rounded-md">
                  <p className="text-sm text-amber-800">{gap}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Improvement Areas */}
          {result.improvementAreas && result.improvementAreas.length > 0 && (
            <div className="mt-6">
              <h4 className="flex items-center mb-3 font-medium">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                Improvement Areas
              </h4>
              <div className="grid gap-2 md:grid-cols-2">
                {result.improvementAreas?.map((area, idx) => (
                  <div key={idx} className="p-2 bg-amber-50 border border-amber-100 rounded-md">
                    <p className="text-sm text-amber-800">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="mt-6">
            <h4 className="flex items-center mb-3 font-medium">
              <Badge className="mr-2 bg-moh-gold text-white" variant="secondary">AI Recommendations</Badge>
            </h4>
            <div className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="p-2 border rounded-md">
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Potential Impact (if different from vision2030Impact) */}
          {result.potentialImpact && result.potentialImpact !== result.vision2030Impact && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Potential Impact</h4>
              <p className="text-sm text-muted-foreground">{result.potentialImpact}</p>
            </div>
          )}
          
          {/* Overall Assessment (if available) */}
          {result.overallAssessment && (
            <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-md">
              <h4 className="font-medium mb-2">Overall Assessment</h4>
              <p className="text-sm">{result.overallAssessment}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
