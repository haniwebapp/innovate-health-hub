
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FileCheck, FileText, AlertTriangle } from "lucide-react";
import { StrategyGapService } from "@/services/ai/policy/StrategyGapService";
import { StrategyGapInput, StrategyGapResult } from "@/services/ai/policy/types";
import { StrategyGapResults } from "./StrategyGapResults";
import { useToast } from "@/hooks/use-toast";

interface StrategyGapAnalyzerProps {
  onAnalysisComplete?: (results: StrategyGapResult) => void;
}

export const StrategyGapAnalyzer: React.FC<StrategyGapAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [currentPolicy, setCurrentPolicy] = useState("");
  const [policyGoals, setPolicyGoals] = useState("");
  const [sector, setSector] = useState("healthcare");
  const [analysisResults, setAnalysisResults] = useState<StrategyGapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!currentPolicy.trim() || !policyGoals.trim()) {
      setError("Please fill in both current policy implementation and policy goals.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const input: StrategyGapInput = {
        currentPolicyImplementation: currentPolicy,
        policyGoals: policyGoals,
        sector: sector
      };

      const results = await StrategyGapService.analyzeGaps(input);
      setAnalysisResults(results);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(results);
      }
    } catch (err: any) {
      console.error("Error analyzing gaps:", err);
      setError(`Analysis failed: ${err.message || "Unknown error"}`);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: err.message || "There was an error analyzing the policy gaps."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!analysisResults) return;
    
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title Required",
        description: "Please provide a title for this analysis before saving."
      });
      return;
    }

    setIsSaving(true);
    try {
      await StrategyGapService.saveAnalysis(title, description, analysisResults);
      setSaveSuccess(true);
      toast({
        title: "Analysis Saved",
        description: "Your gap analysis has been saved successfully.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      
      // Reset save form
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Error saving analysis:", err);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: err.message || "There was an error saving your analysis."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {!analysisResults ? (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Healthcare Sector</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a healthcare sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">General Healthcare</SelectItem>
                    <SelectItem value="digital-health">Digital Health</SelectItem>
                    <SelectItem value="medical-devices">Medical Devices</SelectItem>
                    <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                    <SelectItem value="telemedicine">Telemedicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-policy">Current Policy Implementation</Label>
                <Textarea 
                  id="current-policy"
                  placeholder="Describe the current implementation of your healthcare policy or initiative..."
                  value={currentPolicy}
                  onChange={(e) => setCurrentPolicy(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="policy-goals">Policy Goals & Objectives</Label>
                <Textarea 
                  id="policy-goals"
                  placeholder="Outline the goals and objectives you're trying to achieve..."
                  value={policyGoals}
                  onChange={(e) => setPolicyGoals(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-red-600" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button 
                onClick={handleAnalyze} 
                disabled={isLoading || !currentPolicy.trim() || !policyGoals.trim()}
                className="w-full bg-moh-green hover:bg-moh-darkGreen"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Policy Gaps
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <StrategyGapResults results={analysisResults} />
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Save this analysis</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="analysis-title">Analysis Title</Label>
                  <Input 
                    id="analysis-title"
                    placeholder="Enter a title for this analysis..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analysis-description">Description (Optional)</Label>
                  <Textarea 
                    id="analysis-description"
                    placeholder="Add additional notes or context for this analysis..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex justify-between items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setAnalysisResults(null)}
                    disabled={isSaving}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    New Analysis
                  </Button>
                  
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving || !title.trim() || saveSuccess}
                    className="bg-moh-green hover:bg-moh-darkGreen flex-1"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        Save Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
