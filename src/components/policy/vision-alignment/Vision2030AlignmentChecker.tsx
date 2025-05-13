
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Loader2, AlertCircle, Target, Check } from "lucide-react";
import { useAI } from "@/context/AIContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Vision2030AlignmentResult {
  alignmentScore: number;
  alignmentAreas: string[];
  vision2030Objectives: string[];
  improvementAreas: string[];
  potentialImpact: string;
  recommendations: string[];
}

export function Vision2030AlignmentChecker() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alignmentResult, setAlignmentResult] = useState<Vision2030AlignmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handleCheckAlignment = async () => {
    if (!title || !description) {
      toast({
        title: "Missing information",
        description: "Please provide the innovation title and description.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const objectivesArray = objectives ? objectives.split("\n").filter(o => o.trim()) : [];
      
      const { data, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: {
          innovationData: {
            title,
            description,
            objectives: objectivesArray,
          }
        }
      });
      
      if (error) throw new Error(error.message);
      
      setAlignmentResult(data);
    } catch (err: any) {
      console.error("Error checking Vision 2030 alignment:", err);
      setError(err.message || "Failed to check Vision 2030 alignment");
      toast({
        title: "Alignment Check Failed",
        description: err.message || "Failed to check Vision 2030 alignment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 50) return "bg-amber-600";
    return "bg-red-600";
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Vision 2030 Alignment Checker
          </CardTitle>
          <CardDescription>
            Check how well your healthcare innovation aligns with Saudi Vision 2030 goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Innovation Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Remote Patient Monitoring System"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Innovation Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your healthcare innovation in detail..."
              className="min-h-[150px]"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="objectives" className="text-sm font-medium">Innovation Objectives (Optional)</label>
            <Textarea
              id="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="List your innovation objectives, one per line..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Enter each objective on a new line
            </p>
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
            onClick={handleCheckAlignment}
            disabled={isLoading || !title || !description}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Alignment...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Check Vision 2030 Alignment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {alignmentResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Vision 2030 Alignment Results
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(alignmentResult.alignmentScore)}`}>
                {alignmentResult.alignmentScore}/100
              </div>
            </CardTitle>
            <CardDescription>
              Alignment analysis for "{title}"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-medium">Alignment Score</h3>
                <span className={`text-sm ${getScoreColor(alignmentResult.alignmentScore)}`}>
                  {alignmentResult.alignmentScore}/100
                </span>
              </div>
              <Progress 
                value={alignmentResult.alignmentScore} 
                max={100}
                className="h-2"
                indicatorClassName={getProgressColor(alignmentResult.alignmentScore)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Alignment Areas</h3>
                <ul className="space-y-2">
                  {alignmentResult.alignmentAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Vision 2030 Objectives</h3>
                <ul className="space-y-2">
                  {alignmentResult.vision2030Objectives.map((objective, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Potential Impact</h3>
              <p className="text-muted-foreground">{alignmentResult.potentialImpact}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Areas for Improvement</h3>
              <ul className="space-y-2">
                {alignmentResult.improvementAreas.map((area, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {alignmentResult.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 p-3 bg-muted/40 rounded-md">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
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
