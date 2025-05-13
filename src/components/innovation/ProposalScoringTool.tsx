
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Loader2, PieChart, Star, ThumbsUp, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ChallengeAIService, ProposalScoreResult } from "@/services/ai/challenge/ChallengeAIService";

export function ProposalScoringTool() {
  const { toast } = useToast();
  const [proposalText, setProposalText] = useState("");
  const [customCriterion, setCustomCriterion] = useState("");
  const [criteria, setCriteria] = useState<string[]>([
    "innovation", "feasibility", "impact", "scalability", "sustainability"
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ProposalScoreResult | null>(null);

  const handleAddCriterion = () => {
    if (customCriterion && !criteria.includes(customCriterion.toLowerCase())) {
      setCriteria([...criteria, customCriterion.toLowerCase()]);
      setCustomCriterion("");
    }
  };

  const handleRemoveCriterion = (criterion: string) => {
    setCriteria(criteria.filter((c) => c !== criterion));
  };

  const handleAnalyze = async () => {
    if (!proposalText.trim()) {
      toast({
        title: "Missing Content",
        description: "Please enter your proposal text to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const scoreResult = await ChallengeAIService.scoreProposal(proposalText, criteria);
      setResult(scoreResult);
    } catch (error) {
      console.error("Error scoring proposal:", error);
      toast({
        title: "Error",
        description: "Failed to analyze proposal. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getCriterionIcon = (criterion: string) => {
    const icons: Record<string, React.ReactNode> = {
      innovation: <Zap className="h-4 w-4" />,
      feasibility: <CheckCircle className="h-4 w-4" />,
      impact: <Star className="h-4 w-4" />,
      scalability: <PieChart className="h-4 w-4" />,
      sustainability: <ThumbsUp className="h-4 w-4" />
    };
    
    return icons[criterion] || <Star className="h-4 w-4" />;
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-moh-gold" />
            AI Proposal Scoring Tool
          </CardTitle>
          <CardDescription>
            Analyze your healthcare innovation proposal and get an AI-powered assessment across multiple criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Enter your innovation proposal text:
            </label>
            <Textarea 
              className="h-[200px] resize-none"
              placeholder="Enter your innovation proposal text here for analysis..."
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Scoring Criteria:
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {criteria.map((criterion) => (
                <Badge key={criterion} variant="secondary" className="px-2 py-1">
                  {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                  <button
                    onClick={() => handleRemoveCriterion(criterion)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                    disabled={isAnalyzing}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Add custom criterion..."
                value={customCriterion}
                onChange={(e) => setCustomCriterion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCriterion();
                  }
                }}
                disabled={isAnalyzing}
              />
              <Button 
                variant="outline" 
                onClick={handleAddCriterion}
                disabled={!customCriterion || isAnalyzing}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleAnalyze}
            disabled={!proposalText.trim() || isAnalyzing || criteria.length === 0}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Proposal'
            )}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Proposal Analysis Results</CardTitle>
            <CardDescription>
              Your innovation proposal scored {result.overallScore}% overall
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-muted flex items-center justify-center"
                  style={{ borderColor: `${getScoreColor(result.overallScore)}` }}
                >
                  <span className="text-3xl font-bold">{result.overallScore}%</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Overall Score
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Criteria Scores</h3>
              {Object.entries(result.criteria).map(([criterion, score]) => (
                <div key={criterion} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getCriterionIcon(criterion)}
                      <span className="ml-2 capitalize">{criterion}</span>
                    </div>
                    <span className="font-medium">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Strengths</h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Areas for Improvement</h3>
              <ul className="space-y-2">
                {result.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.vision2030Alignment !== undefined && (
              <Alert className="bg-moh-lightGreen/20 border-moh-green">
                <AlertTitle className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-moh-green" />
                  Vision 2030 Alignment
                </AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    <div className="flex justify-between items-center">
                      <span>Alignment Score</span>
                      <span className="font-medium">{result.vision2030Alignment}%</span>
                    </div>
                    <Progress value={result.vision2030Alignment} className="h-2 mt-1" />
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                toast({ title: "Success", description: "Analysis results copied to clipboard" });
              }}
            >
              Export Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
