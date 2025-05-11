
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PolicyAIService, PolicyData, Vision2030AlignmentResult } from "@/services/ai/PolicyAIService";

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

  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
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
          <div>
            <Label htmlFor="policy-name">Policy/Innovation Name</Label>
            <Input
              id="policy-name"
              value={policyData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter name of policy or innovation"
            />
          </div>
          
          <div>
            <Label htmlFor="policy-sector">Sector</Label>
            <Select 
              value={policyData.sector} 
              onValueChange={(value) => handleInputChange('sector', value)}
            >
              <SelectTrigger id="policy-sector">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="tourism">Tourism</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="policy-description">Description</Label>
            <Textarea
              id="policy-description"
              value={policyData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the policy or innovation in detail"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="policy-goals">Key Goals (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="policy-goals"
                placeholder="Add a goal and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGoalInput((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <Button 
                variant="outline" 
                onClick={(e) => {
                  const input = document.getElementById('policy-goals') as HTMLInputElement;
                  handleGoalInput(input.value);
                  input.value = '';
                }}
              >
                Add
              </Button>
            </div>
            
            {policyData.goals && policyData.goals.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {policyData.goals.map((goal, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-1">
                    {goal}
                    <button 
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => removeGoal(goal)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAnalyzeAlignment} 
            disabled={isAnalyzing || !policyData.name || !policyData.description}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Vision 2030 Alignment'
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-moh-green/20">
        <CardHeader>
          <CardTitle>Alignment Results</CardTitle>
          <CardDescription>
            Detailed analysis of how your policy aligns with Vision 2030 pillars
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] overflow-y-auto">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-moh-green mb-4" />
              <p className="text-muted-foreground">Analyzing alignment with Vision 2030...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Overall Alignment</h3>
                <Badge 
                  className={`${getScoreColor(result.overallScore)} px-3 py-1 text-white`}
                >
                  {result.overallScore}%
                </Badge>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-md font-medium border-b pb-2">Pillar Alignment</h3>
                
                {result.alignmentAreas.map((detail, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{detail.pillar}</h4>
                      <Badge 
                        className={`${getScoreColor(detail.score)} px-2 py-0.5 text-white`}
                      >
                        {detail.score}%
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{detail.relevance}</p>
                    
                    {detail.opportunities.length > 0 && (
                      <div className="mt-1">
                        <p className="text-sm font-medium">Opportunities:</p>
                        <ul className="list-disc list-inside text-sm pl-2 text-muted-foreground">
                          {detail.opportunities.map((opportunity, i) => (
                            <li key={i}>{opportunity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-2">
                <h3 className="text-md font-medium border-b pb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-moh-green mt-1 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Trophy className="h-12 w-12 text-moh-gold/30 mb-4" />
              <p className="text-muted-foreground">Enter policy details and analyze to see alignment results</p>
            </div>
          )}
        </CardContent>
        {result && (
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              View Detailed Report
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
