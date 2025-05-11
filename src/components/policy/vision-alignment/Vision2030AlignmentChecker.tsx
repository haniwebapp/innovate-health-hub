
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { VisionAlignmentService } from "@/services/ai/policy/VisionAlignmentService";
import { PolicyData, Vision2030AlignmentResult } from "@/services/ai/PolicyAIService";
import { AlignmentForm } from "./AlignmentForm";
import { AlignmentResults } from "./AlignmentResults";
import { Lightbulb } from "lucide-react";

export function Vision2030AlignmentChecker() {
  const [activeTab, setActiveTab] = useState<string>("input");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Vision2030AlignmentResult | null>(null);
  const { toast } = useToast();
  
  const [policyData, setPolicyData] = useState<PolicyData>({
    name: "",
    description: "",
    sector: "healthcare",
    goals: []
  });

  const handlePolicyChange = (field: keyof PolicyData, value: any) => {
    setPolicyData({ ...policyData, [field]: value });
  };

  const handleGoalInput = (value: string) => {
    if (!value.trim()) return;
    if (policyData.goals && policyData.goals.includes(value.trim())) return;
    
    setPolicyData({
      ...policyData,
      goals: [...(policyData.goals || []), value.trim()]
    });
  };

  const handleRemoveGoal = (goal: string) => {
    setPolicyData({
      ...policyData,
      goals: policyData.goals?.filter(g => g !== goal) || []
    });
  };

  const handleAnalyzeAlignment = async () => {
    if (!policyData.name || !policyData.description) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide policy name and description."
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const alignmentResult = await VisionAlignmentService.analyzeVision2030Alignment(policyData);
      setResult(alignmentResult);
      setActiveTab("results");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message || "Could not analyze alignment with Vision 2030"
      });
      console.error("Vision 2030 alignment analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Lightbulb className="h-5 w-5 text-moh-gold" />
          Vision 2030 Alignment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-4 mt-4">
            <AlignmentForm 
              policyData={policyData}
              isAnalyzing={isAnalyzing}
              onPolicyChange={handlePolicyChange}
              onGoalInput={handleGoalInput}
              onRemoveGoal={handleRemoveGoal}
              onAnalyzeAlignment={handleAnalyzeAlignment}
            />
          </TabsContent>
          
          <TabsContent value="results" className="mt-4">
            <AlignmentResults 
              isAnalyzing={isAnalyzing} 
              result={result} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
