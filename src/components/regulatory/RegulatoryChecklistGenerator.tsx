
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RegulatoryChecklistService } from '@/services/ai/regulatory/RegulatoryChecklistService';
import { RegulatoryChecklistResult } from '@/services/ai/policy/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, Loader2 } from "lucide-react";

export interface RegulatoryChecklistGeneratorProps {
  onChecklistGenerated?: (results: RegulatoryChecklistResult) => void;
}

export function RegulatoryChecklistGenerator({ onChecklistGenerated }: RegulatoryChecklistGeneratorProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [innovationType, setInnovationType] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');

  const handleGenerate = async () => {
    if (!innovationType || !description) {
      toast({
        title: "Missing information",
        description: "Please provide innovation type and description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await RegulatoryChecklistService.generateChecklist({
        innovationType,
        description,
        sector
      });
      
      toast({
        title: "Checklist Generated",
        description: "Regulatory checklist has been generated successfully."
      });
      
      if (onChecklistGenerated) {
        onChecklistGenerated(result);
      }
    } catch (error) {
      console.error('Error generating checklist:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate regulatory checklist.",
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
          <ClipboardList className="h-5 w-5" />
          Regulatory Checklist Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
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
                <SelectItem value="wearable">Healthcare Wearable</SelectItem>
                <SelectItem value="diagnostic">Diagnostic Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Innovation Description</Label>
            <Textarea 
              id="description"
              placeholder="Describe your healthcare innovation in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div>
            <Label htmlFor="sector">Healthcare Sector (Optional)</Label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger id="sector">
                <SelectValue placeholder="Select healthcare sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary_care">Primary Care</SelectItem>
                <SelectItem value="secondary_care">Secondary Care</SelectItem>
                <SelectItem value="tertiary_care">Tertiary Care</SelectItem>
                <SelectItem value="mental_health">Mental Health</SelectItem>
                <SelectItem value="preventative">Preventative Healthcare</SelectItem>
                <SelectItem value="remote_care">Remote Care</SelectItem>
                <SelectItem value="emergency">Emergency Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-[#00814A] hover:bg-[#006e3f]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Checklist...
              </>
            ) : (
              "Generate Regulatory Checklist"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
