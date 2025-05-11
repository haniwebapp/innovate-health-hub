
import React from 'react';
import { AIComplianceAnalyzer } from '@/components/regulatory/AIComplianceAnalyzer';

interface HeroSectionProps {
  innovationType: string;
  innovationDescription: string;
  setInnovationType: (type: string) => void;
  setInnovationDescription: (desc: string) => void;
  isLoadingAI: boolean;
  isAnalyzingCompliance: boolean;
  generateRecommendations: () => void;
  analyzeCompliance: () => void;
}

export function HeroSection({
  innovationType,
  innovationDescription,
  setInnovationType,
  setInnovationDescription,
  isLoadingAI,
  isAnalyzingCompliance,
  generateRecommendations,
  analyzeCompliance
}: HeroSectionProps) {
  return (
    <section className="bg-moh-gradient py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Healthcare Regulatory Sandbox
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-3xl">
            Test and validate your healthcare innovation in a controlled environment with expert guidance, 
            reduced regulatory barriers, and accelerated approval pathways.
          </p>
          
          <AIComplianceAnalyzer 
            innovationDescription={innovationDescription}
            innovationType={innovationType}
            isAnalyzingCompliance={isAnalyzingCompliance}
            onDescriptionChange={setInnovationDescription}
            onTypeChange={setInnovationType}
            onAnalyzeClick={analyzeCompliance}
          />
        </div>
      </div>
    </section>
  );
}
