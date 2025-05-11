
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, Shield, Building, BookText } from "lucide-react";
import { BenefitCard } from "./BenefitCard";
import { SandboxProcess } from "./SandboxProcess";
import { SandboxCallToAction } from "./SandboxCallToAction";
import { RegulatoryFAQ } from "./RegulatoryFAQ";
import { AIInsightsCard } from "@/components/investment/AIInsightsCard";
import { ComplianceResults } from "./ComplianceResults";
import { AIComplianceAnalysis } from "./ComplianceResults";

interface OverviewTabProps {
  aiRecommendations: string[];
  complianceAnalysis: AIComplianceAnalysis | null;
  onMarkRequirementComplete: (id: string) => void;
}

export function OverviewTab({ 
  aiRecommendations, 
  complianceAnalysis,
  onMarkRequirementComplete
}: OverviewTabProps) {
  // Benefits of the regulatory sandbox
  const benefits = [
    {
      title: "Accelerated Approvals",
      description: "Fast-track your regulatory journey with expert guidance and simplified processes.",
      icon: <Clock className="h-6 w-6 text-moh-green" />
    },
    {
      title: "Risk Reduction",
      description: "Identify and mitigate compliance risks early in your development process.",
      icon: <Shield className="h-6 w-6 text-moh-green" />
    },
    {
      title: "Market Readiness",
      description: "Ensure your innovation is fully compliant and ready for market entry.",
      icon: <Building className="h-6 w-6 text-moh-green" />
    },
    {
      title: "Expert Support",
      description: "Access to regulatory specialists who understand healthcare innovation challenges.",
      icon: <BookText className="h-6 w-6 text-moh-green" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Apply for Sandbox Call-to-Action */}
      <SandboxCallToAction />

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
          />
        ))}
      </div>
      
      {/* How the Sandbox Works */}
      <SandboxProcess />
      
      {/* Display AI Analysis if available */}
      {complianceAnalysis && (
        <ComplianceResults 
          analysis={complianceAnalysis}
          onMarkRequirementComplete={onMarkRequirementComplete}
        />
      )}
      
      {aiRecommendations.length > 0 && (
        <AIInsightsCard 
          insights={aiRecommendations} 
          title="AI Regulatory Insights" 
        />
      )}
      
      <RegulatoryFAQ />
    </div>
  );
}
