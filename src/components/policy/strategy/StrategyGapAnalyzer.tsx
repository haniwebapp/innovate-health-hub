
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, Lightbulb, FileStack, GanttChart } from "lucide-react";
import { useAI } from "@/context/AIContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GapAnalysisResult {
  gaps: {
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
    potentialImpact: string;
  }[];
  recommendations: string[];
  overallAnalysis: string;
}

export function StrategyGapAnalyzer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [desiredState, setDesiredState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<GapAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handleAnalyze = async () => {
    if (!title || !description || !objectives) {
      toast({
        title: "Missing information",
        description: "Please provide the policy title, description, and objectives.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const objectivesArray = objectives.split("\n").filter(o => o.trim());
      
      const { data, error } = await supabase.functions.invoke("strategy-gap-analysis", {
        body: {
          policyDetails: {
            title,
            description,
            objectives: objectivesArray,
          },
          currentState,
          desiredState,
        }
      });
      
      if (error) throw new Error(error.message);
      
      setAnalysisResult(data);
    } catch (err: any) {
      console.error("Error analyzing strategy gaps:", err);
      setError(err.message || "Failed to analyze strategy gaps");
      toast({
        title: "Analysis Failed",
        description: err.message || "Failed to analyze strategy gaps",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GanttChart className="mr-2 h-5 w-5" />
            Strategy Gap Analyzer
          </CardTitle>
          <CardDescription>
            Analyze gaps between your healthcare policy and its implementation goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Policy Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., National Digital Health Strategy"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Policy Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the policy's purpose and scope..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="objectives" className="text-sm font-medium">Policy Objectives</label>
            <Textarea
              id="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="List policy objectives, one per line..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Enter each objective on a new line
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="currentState" className="text-sm font-medium">Current State (Optional)</label>
              <Textarea
                id="currentState"
                value={currentState}
                onChange={(e) => setCurrentState(e.target.value)}
                placeholder="Describe the current state of implementation..."
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="desiredState" className="text-sm font-medium">Desired State (Optional)</label>
              <Textarea
                id="desiredState"
                value={desiredState}
                onChange={(e) => setDesiredState(e.target.value)}
                placeholder="Describe the desired outcomes..."
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !title || !description || !objectives}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <GanttChart className="mr-2 h-4 w-4" />
                Analyze Strategy Gaps
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileStack className="mr-2 h-5 w-5" />
              Gap Analysis Results
            </CardTitle>
            <CardDescription>
              Analysis for "{title}"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Overall Analysis</h3>
              <p className="text-muted-foreground">{analysisResult.overallAnalysis}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Identified Gaps</h3>
              <div className="space-y-3">
                {analysisResult.gaps.map((gap, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{gap.title}</h4>
                        <Badge className={getSeverityColor(gap.severity)}>
                          {gap.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{gap.description}</p>
                      <div className="text-xs">
                        <span className="font-semibold">Potential Impact: </span>
                        <span>{gap.potentialImpact}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Recommendations</h3>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
