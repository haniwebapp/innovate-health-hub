
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, CheckCircle2, FileCheck, ArrowRight, 
  AlertCircle, ListChecks, CheckCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { PolicyAIService } from "@/services/ai/PolicyAIService";

export function Vision2030AlignmentChecker() {
  const [policyText, setPolicyText] = useState('');
  const [policyTitle, setPolicyTitle] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [alignmentResult, setAlignmentResult] = useState<any>(null);
  const { toast } = useToast();

  const checkAlignment = async () => {
    if (!policyText.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter the policy text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const result = await PolicyAIService.analyzeVisionAlignment(policyText, policyTitle);
      setAlignmentResult(result);
      
      toast({
        title: "Alignment Check Complete",
        description: "Your policy has been analyzed for Vision 2030 alignment.",
      });
    } catch (error: any) {
      console.error("Error checking alignment:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "Failed to check Vision 2030 alignment.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getScoreClass = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-moh-darkGreen flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-moh-green" />
              Vision 2030 Alignment Checker
            </CardTitle>
            <CardDescription>
              Check how well your policy or initiative aligns with Saudi Vision 2030
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Policy Title</label>
            <Input 
              placeholder="Enter policy or initiative title" 
              value={policyTitle}
              onChange={(e) => setPolicyTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Policy Text or Description
            </label>
            <Textarea 
              placeholder="Enter your policy text, description, or objectives here for analysis..." 
              className="min-h-[150px]"
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
            />
          </div>
          <Button 
            className="mt-4 w-full bg-moh-green hover:bg-moh-darkGreen"
            onClick={checkAlignment}
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Alignment...
              </>
            ) : (
              <>
                <FileCheck className="mr-2 h-4 w-4" />
                Check Vision 2030 Alignment
              </>
            )}
          </Button>
        </div>
        
        {alignmentResult && (
          <div className="space-y-6 bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Alignment Score</h3>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-green-100 mb-2">
                <span className={`text-3xl font-bold ${getScoreClass(alignmentResult.score)}`}>
                  {alignmentResult.score}
                </span>
              </div>
              <Progress value={alignmentResult.score} className="h-2 w-48 mx-auto" />
              <p className="text-sm mt-2 text-muted-foreground">
                {alignmentResult.score >= 80 
                  ? "Strong alignment with Vision 2030" 
                  : alignmentResult.score >= 60 
                  ? "Moderate alignment with Vision 2030" 
                  : "Limited alignment with Vision 2030"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-moh-darkGreen flex items-center mb-3">
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Alignment Areas
                </h4>
                <div className="space-y-2">
                  {alignmentResult.alignmentAreas.map((area: string, i: number) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{area}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-moh-darkGreen flex items-center mb-3">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Gap Areas
                </h4>
                <div className="space-y-2">
                  {alignmentResult.gapAreas.map((area: string, i: number) => (
                    <div key={i} className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{area}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-moh-darkGreen flex items-center mb-3">
                Vision 2030 Impact Assessment
              </h4>
              <Alert className="bg-white">
                <AlertDescription>
                  {alignmentResult.vision2030Impact}
                </AlertDescription>
              </Alert>
            </div>
            
            <div>
              <h4 className="font-medium text-moh-darkGreen flex items-center mb-3">
                Recommendations to Improve Alignment
              </h4>
              <div className="space-y-2">
                {alignmentResult.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="p-3 bg-white rounded-md flex items-start">
                    <ArrowRight className="h-4 w-4 text-moh-gold mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
