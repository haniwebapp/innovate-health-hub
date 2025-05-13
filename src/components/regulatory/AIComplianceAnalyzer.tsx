
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileSearch, Loader2, Scale } from "lucide-react";

interface AIComplianceAnalyzerProps {
  innovationDescription: string;
  innovationType: string;
  isAnalyzingCompliance: boolean;
  onDescriptionChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onAnalyzeClick: () => void;
}

export function AIComplianceAnalyzer({
  innovationDescription,
  innovationType,
  isAnalyzingCompliance,
  onDescriptionChange,
  onTypeChange,
  onAnalyzeClick
}: AIComplianceAnalyzerProps) {
  return (
    <Card className="p-6 mb-8 border-moh-gold/30 bg-gradient-to-br from-white to-moh-lightGreen/20">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Scale className="h-5 w-5 text-moh-green" />
        AI Compliance Analyzer
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="innovationType" className="block text-sm font-medium mb-1">Innovation Type</label>
          <select 
            id="innovationType"
            className="w-full p-2 border rounded-md focus:border-moh-green focus:ring focus:ring-moh-green/20 outline-none"
            value={innovationType}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="" disabled>Select innovation type</option>
            <option value="medical device">Medical Device</option>
            <option value="digital health application">Digital Health Application</option>
            <option value="diagnostic tool">Diagnostic Tool</option>
            <option value="AI-based solution">AI-based Solution</option>
            <option value="telemedicine platform">Telemedicine Platform</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="innovationDescription" className="block text-sm font-medium mb-1">Describe Your Innovation</label>
          <Textarea 
            id="innovationDescription"
            placeholder="Briefly describe your healthcare innovation, its purpose, and how it works..."
            value={innovationDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-[120px] focus:border-moh-green"
          />
        </div>
        
        <Button 
          onClick={onAnalyzeClick} 
          className="w-full bg-moh-green hover:bg-moh-darkGreen text-white flex items-center justify-center gap-2"
          disabled={isAnalyzingCompliance}
        >
          {isAnalyzingCompliance ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Compliance Requirements...
            </>
          ) : (
            <>
              <FileSearch className="h-4 w-4" />
              Analyze Regulatory Requirements
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
