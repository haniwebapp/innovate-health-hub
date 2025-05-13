
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { InnovationGuideService } from '@/services/ai/innovation/InnovationGuideService';
import { InnovationGuideResult } from '@/services/ai/policy/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, Loader2 } from "lucide-react";

export interface InnovationGuideGeneratorProps {
  onGuideGenerated?: (results: InnovationGuideResult) => void;
}

export function InnovationGuideGenerator({ onGuideGenerated }: InnovationGuideGeneratorProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [innovationStage, setInnovationStage] = useState('');
  const [innovationType, setInnovationType] = useState('');
  const [challenges, setChallenges] = useState('');
  const [goals, setGoals] = useState('');

  const handleGenerate = async () => {
    if (!innovationStage || !innovationType) {
      toast({
        title: "Missing information",
        description: "Please select innovation stage and type.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await InnovationGuideService.generateGuidance({
        innovationStage,
        innovationType,
        challenges,
        goals
      });
      
      toast({
        title: "Guide Generated",
        description: "Innovation guidance has been generated successfully."
      });
      
      if (onGuideGenerated) {
        onGuideGenerated(result);
      }
    } catch (error) {
      console.error('Error generating guidance:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate innovation guidance.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[#C3A86B]/30 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#00814A]/10 to-[#C3A86B]/10">
        <CardTitle className="flex items-center gap-2 text-[#00814A]">
          <Lightbulb className="h-5 w-5" />
          Innovation Guide Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="innovation-stage">Innovation Stage</Label>
            <Select value={innovationStage} onValueChange={setInnovationStage}>
              <SelectTrigger id="innovation-stage">
                <SelectValue placeholder="Select current innovation stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ideation">Ideation</SelectItem>
                <SelectItem value="concept">Concept Development</SelectItem>
                <SelectItem value="prototype">Prototyping</SelectItem>
                <SelectItem value="validation">Validation</SelectItem>
                <SelectItem value="early_market">Early Market Entry</SelectItem>
                <SelectItem value="scaling">Scaling</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="innovation-type">Innovation Type</Label>
            <Select value={innovationType} onValueChange={setInnovationType}>
              <SelectTrigger id="innovation-type">
                <SelectValue placeholder="Select innovation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical_device">Medical Device</SelectItem>
                <SelectItem value="digital_health">Digital Health Application</SelectItem>
                <SelectItem value="ai_solution">AI-based Healthcare Solution</SelectItem>
                <SelectItem value="telemedicine">Telemedicine Platform</SelectItem>
                <SelectItem value="pharma">Pharmaceutical</SelectItem>
                <SelectItem value="diagnostic">Diagnostic Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="challenges">Current Challenges (Optional)</Label>
            <Textarea 
              id="challenges"
              placeholder="What challenges are you facing with your innovation?"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="goals">Innovation Goals (Optional)</Label>
            <Textarea 
              id="goals"
              placeholder="What are your primary goals for this innovation?"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-[#00814A] hover:bg-[#006e3f]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Guidance...
              </>
            ) : (
              "Generate Innovation Guide"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
