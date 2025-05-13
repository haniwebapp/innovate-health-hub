
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, FileSearch, AlertTriangle, CheckCircle, XCircle, 
  TrendingUp, Download, Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PolicyAIService } from "@/services/ai/PolicyAIService";

export function StrategyGapAnalyzer() {
  const [policyText, setPolicyText] = useState('');
  const [policyTitle, setPolicyTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [healthcareSector, setHealthcareSector] = useState('general');
  const { toast } = useToast();

  const analyzePolicy = async () => {
    if (!policyText.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter the policy text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await PolicyAIService.analyzeVisionAlignment(policyText, policyTitle);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Policy has been analyzed successfully.",
      });
    } catch (error: any) {
      console.error("Error analyzing policy:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "Failed to analyze the policy.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="border-moh-green/20">
      <CardHeader>
        <CardTitle className="text-moh-darkGreen flex items-center gap-2">
          <FileSearch className="h-5 w-5" />
          Vision 2030 Alignment Analyzer
        </CardTitle>
        <CardDescription>
          Analyze how well your policy aligns with Saudi Vision 2030 goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="policy-title">Policy Title</Label>
                <Input 
                  id="policy-title" 
                  placeholder="Enter policy title" 
                  value={policyTitle}
                  onChange={(e) => setPolicyTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="healthcare-sector">Healthcare Sector</Label>
                <Select value={healthcareSector} onValueChange={setHealthcareSector}>
                  <SelectTrigger id="healthcare-sector">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Healthcare</SelectItem>
                    <SelectItem value="preventive">Preventive Care</SelectItem>
                    <SelectItem value="digital">Digital Health</SelectItem>
                    <SelectItem value="access">Healthcare Access</SelectItem>
                    <SelectItem value="quality">Quality of Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="policy-text">Policy Text</Label>
              <Textarea 
                id="policy-text" 
                placeholder="Paste or enter your policy text here for analysis" 
                className="min-h-[200px]"
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
              />
            </div>
            <Button 
              onClick={analyzePolicy}
              disabled={isAnalyzing || !policyText.trim()}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileSearch className="mr-2 h-4 w-4" />
                  Analyze Vision 2030 Alignment
                </>
              )}
            </Button>
          </div>
          
          <div>
            {analysisResult ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/10">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">Alignment Score</h3>
                    <Badge className={getScoreBadge(analysisResult.score)}>
                      {analysisResult.score}/100
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className={`h-3 rounded-full ${
                        analysisResult.score >= 80 ? 'bg-green-600' : 
                        analysisResult.score >= 60 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${analysisResult.score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{analysisResult.vision2030Impact}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Strong Alignment Areas</h3>
                  {analysisResult.alignmentAreas.map((area: string, i: number) => (
                    <Alert key={i} className="bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle className="ml-2">{area}</AlertTitle>
                    </Alert>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Gap Areas</h3>
                  {analysisResult.gapAreas.map((area: string, i: number) => (
                    <Alert key={i} className="bg-amber-50 text-amber-800 border-amber-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="ml-2">{area}</AlertTitle>
                    </Alert>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Recommendations</h3>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <ul className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <TrendingUp className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center border border-dashed rounded-lg bg-muted/5">
                <FileSearch className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your policy text and click "Analyze" to check alignment with Saudi Vision 2030 goals
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
