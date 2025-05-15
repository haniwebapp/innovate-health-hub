
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Compass, Loader2 } from "lucide-react";
import { Vision2030Service } from '@/services/ai/policy/Vision2030Service';
import { AlignmentResults } from './AlignmentResults';
import { Vision2030AlignmentResult } from '@/services/ai/policy/types';

export interface Vision2030AlignmentCheckerProps {
  onAlignmentComplete?: (results: any) => void;
}

export function Vision2030AlignmentChecker({ onAlignmentComplete }: Vision2030AlignmentCheckerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [innovationName, setInnovationName] = useState('');
  const [innovationDescription, setInnovationDescription] = useState('');
  const [innovationGoals, setInnovationGoals] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [alignmentResults, setAlignmentResults] = useState<Vision2030AlignmentResult | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);

  const handleCheck = async () => {
    if (!innovationName || !innovationDescription) {
      toast({
        title: "Missing information",
        description: "Please provide an innovation name and description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResultsLoading(true);
    
    try {
      const result = await Vision2030Service.checkAlignment({
        name: innovationName,
        description: innovationDescription,
        goals: innovationGoals,
        targetAudience: targetAudience,
        sector: "Healthcare"
      });
      
      toast({
        title: "Alignment Check Complete",
        description: "Vision 2030 alignment analysis has been completed successfully."
      });
      
      setAlignmentResults(result);
      
      if (onAlignmentComplete) {
        onAlignmentComplete(result);
      }
    } catch (error) {
      console.error('Error checking alignment:', error);
      toast({
        title: "Alignment Check Failed",
        description: error instanceof Error ? error.message : "Failed to check Vision 2030 alignment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setResultsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#C3A86B]/30 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#00814A]/10 to-[#C3A86B]/10">
          <CardTitle className="flex items-center gap-2 text-[#00814A]">
            <Compass className="h-5 w-5" />
            Vision 2030 Alignment Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="innovation-name">Innovation Name</Label>
              <Input 
                id="innovation-name"
                placeholder="Enter the innovation name" 
                value={innovationName}
                onChange={(e) => setInnovationName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="innovation-description">Innovation Description</Label>
              <Textarea 
                id="innovation-description"
                placeholder="Describe your healthcare innovation in detail"
                value={innovationDescription}
                onChange={(e) => setInnovationDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="innovation-goals">Innovation Goals</Label>
              <Input 
                id="innovation-goals"
                placeholder="What are the main goals of your innovation?"
                value={innovationGoals}
                onChange={(e) => setInnovationGoals(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Input 
                id="target-audience"
                placeholder="Who will benefit from this innovation?"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleCheck} 
              className="w-full bg-[#00814A] hover:bg-[#006e3f]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Vision 2030 Alignment...
                </>
              ) : (
                "Check Vision 2030 Alignment"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {alignmentResults && <AlignmentResults result={alignmentResults} isLoading={resultsLoading} />}
    </div>
  );
}
