
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trophy } from "lucide-react";
import { PolicyAIService, PolicyData, Vision2030AlignmentResult } from "@/services/ai/PolicyAIService";
import { AlignmentForm } from "./AlignmentForm";
import { AlignmentResults } from "./AlignmentResults";

export function Vision2030AlignmentChecker() {
  const [policyData, setPolicyData] = useState<PolicyData>({
    name: "",
    description: "",
    sector: "healthcare",
    goals: []
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Vision2030AlignmentResult | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PolicyData, value: any) => {
    setPolicyData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalInput = (value: string) => {
    // Add goal only if not empty and not already in the list
    if (value.trim() && !policyData.goals?.includes(value.trim())) {
      setPolicyData(prev => ({
        ...prev,
        goals: [...(prev.goals || []), value.trim()]
      }));
    }
  };

  const removeGoal = (goal: string) => {
    setPolicyData(prev => ({
      ...prev,
      goals: prev.goals?.filter(g => g !== goal) || []
    }));
  };

  const handleAnalyzeAlignment = async () => {
    if (!policyData.name || !policyData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and description for the policy.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const alignmentResult = await PolicyAIService.analyzeVision2030Alignment(policyData);
      setResult(alignmentResult);
      
      toast({
        title: "Analysis Complete",
        description: "Vision 2030 alignment analysis has been generated.",
      });
    } catch (error: any) {
      console.error("Error analyzing Vision 2030 alignment:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "An error occurred during analysis",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-moh-green/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-moh-gold" />
            Vision 2030 Alignment Checker
          </CardTitle>
          <CardDescription>
            Evaluate how well your policy or innovation aligns with Saudi Vision 2030 goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlignmentForm 
            policyData={policyData} 
            isAnalyzing={isAnalyzing}
            onPolicyChange={handleInputChange}
            onGoalInput={handleGoalInput}
            onRemoveGoal={removeGoal}
            onAnalyzeAlignment={handleAnalyzeAlignment}
          />
        </CardContent>
      </Card>
      
      <Card className="border-moh-green/20">
        <CardHeader>
          <CardTitle>Alignment Results</CardTitle>
          <CardDescription>
            Detailed analysis of how your policy aligns with Vision 2030 pillars
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] overflow-y-auto">
          <AlignmentResults 
            isAnalyzing={isAnalyzing} 
            result={result} 
          />
        </CardContent>
        {result && <CardFooter></CardFooter>}
      </Card>
    </div>
  );
}
