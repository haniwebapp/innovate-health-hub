
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { StrategyGapService } from '@/services/ai/policy/StrategyGapService';
import { FileSpreadsheet, Loader2, Save } from "lucide-react";
import { StrategyGapResult } from "@/services/ai/policy/types";
import { StrategyGapResults } from './StrategyGapResults';

export interface StrategyGapAnalyzerProps {
  onAnalysisComplete?: (results: any) => void;
}

export function StrategyGapAnalyzer({ onAnalysisComplete }: StrategyGapAnalyzerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [desiredState, setDesiredState] = useState('');
  const [objectives, setObjectives] = useState('');
  const [results, setResults] = useState<StrategyGapResult | null>(null);

  const handleAnalyze = async () => {
    if (!policyTitle || !policyDescription) {
      toast({
        title: "Missing information",
        description: "Please provide a policy title and description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const objectivesList = objectives.split(',').map(o => o.trim()).filter(o => o);
      
      const result = await StrategyGapService.analyzeGaps({
        policyDetails: {
          title: policyTitle,
          description: policyDescription,
          objectives: objectivesList,
          targetSectors: []
        },
        currentState,
        desiredState
      });
      
      toast({
        title: "Analysis Complete",
        description: "Strategy gap analysis has been completed successfully."
      });
      
      setResults(result);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (error) {
      console.error('Error analyzing gaps:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze strategy gaps.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!results) return;
    
    setIsSaving(true);
    try {
      await StrategyGapService.saveAnalysis(policyTitle, policyDescription, results);
      
      toast({
        title: "Saved Successfully",
        description: "The gap analysis has been saved to your account."
      });
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save the analysis.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#C3A86B]/30 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#00814A]/10 to-[#C3A86B]/10">
          <CardTitle className="flex items-center gap-2 text-[#00814A]">
            <FileSpreadsheet className="h-5 w-5" />
            Strategy Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="policy-title">Policy Title</Label>
              <Input 
                id="policy-title"
                placeholder="Enter the policy title" 
                value={policyTitle}
                onChange={(e) => setPolicyTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="policy-description">Policy Description</Label>
              <Textarea 
                id="policy-description"
                placeholder="Describe the policy in detail"
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="policy-objectives">Policy Objectives (comma separated)</Label>
              <Input 
                id="policy-objectives"
                placeholder="E.g. Improve access, Reduce costs, Enhance quality"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="current-state">Current State</Label>
                <Textarea 
                  id="current-state"
                  placeholder="Describe the current state"
                  value={currentState}
                  onChange={(e) => setCurrentState(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="desired-state">Desired State</Label>
                <Textarea 
                  id="desired-state"
                  placeholder="Describe the desired state"
                  value={desiredState}
                  onChange={(e) => setDesiredState(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAnalyze} 
                className="w-full bg-[#00814A] hover:bg-[#006e3f]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Gaps...
                  </>
                ) : (
                  "Analyze Strategy Gaps"
                )}
              </Button>
              
              {results && (
                <Button 
                  onClick={handleSaveAnalysis} 
                  className="w-full border-[#00814A] text-[#00814A] hover:bg-[#00814A]/10"
                  variant="outline"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Analysis
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {results && <StrategyGapResults results={results} />}
    </div>
  );
}
