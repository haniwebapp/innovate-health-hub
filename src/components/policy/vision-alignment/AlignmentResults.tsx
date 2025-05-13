
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Vision2030AlignmentResult } from "@/services/ai/policy/types";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, FileText, Target } from "lucide-react";

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
            <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}/100
            </div>
          </CardTitle>
          <CardDescription>Evaluation of alignment with Saudi Vision 2030 healthcare objectives</CardDescription>
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
            <div className="space-y-2">
              {result.alignmentAreas.map((area, idx) => (
                <div key={idx} className="p-2 bg-green-50 border border-green-100 rounded-md">
                  <p className="text-sm text-green-800">{area}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gap Areas */}
          <div className="mt-6">
            <h4 className="flex items-center mb-3 font-medium">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
              Gap Areas
            </h4>
            <div className="space-y-2">
              {result.gapAreas.map((gap, idx) => (
                <div key={idx} className="p-2 bg-amber-50 border border-amber-100 rounded-md">
                  <p className="text-sm text-amber-800">{gap}</p>
                </div>
              ))}
            </div>
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
}
