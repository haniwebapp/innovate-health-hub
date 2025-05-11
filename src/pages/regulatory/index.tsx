
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { HeroSection } from "@/components/regulatory/HeroSection";
import { OverviewTab } from "@/components/regulatory/OverviewTab";
import { SupportServicesSection } from "@/components/regulatory/SupportServicesSection";
import { RegulatoryFrameworks } from "@/components/regulatory/RegulatoryFrameworks";
import { AIComplianceAnalysis } from "@/components/regulatory/ComplianceResults";

export default function RegulatoryPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [innovationDescription, setInnovationDescription] = useState("");
  const [innovationType, setInnovationType] = useState("");
  
  // State for AI-powered compliance features
  const [complianceAnalysis, setComplianceAnalysis] = useState<AIComplianceAnalysis | null>(null);
  const [isAnalyzingCompliance, setIsAnalyzingCompliance] = useState(false);
  
  // Generate AI recommendations for regulatory compliance
  const generateRecommendations = async () => {
    setIsLoadingAI(true);
    
    try {
      const response: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: "Generate regulatory compliance recommendations for healthcare innovations"
        }
      ], "regulatory-sandbox");
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setAiRecommendations(response.insights || [response.message]);
      
      toast({
        title: "AI Compliance Analysis Complete",
        description: "Review your personalized regulatory guidance.",
      });
    } catch (error) {
      console.error("Error generating AI recommendations:", error);
      toast({
        title: "Could not generate recommendations",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAI(false);
    }
  };
  
  // Analyze regulatory compliance
  const analyzeCompliance = async () => {
    if (!innovationDescription || !innovationType) {
      toast({
        title: "Missing information",
        description: "Please describe your innovation and select its type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzingCompliance(true);
    
    try {
      const response: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Analyze regulatory compliance requirements for a ${innovationType} innovation in healthcare with this description: "${innovationDescription}". Provide a detailed compliance pathway and document requirements.`
        }
      ], "regulatory-compliance");
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // In a real implementation, the AI would return structured data
      // For demo purposes, we'll create mock structured data
      const mockAnalysis: AIComplianceAnalysis = {
        score: 68,
        summary: "This innovation requires regulatory approval as a Class II medical device. Several key compliance steps needed before market readiness.",
        requirements: [
          {
            id: "req1",
            title: "Quality Management System (ISO 13485)",
            description: "Implement a medical device quality management system that meets ISO 13485 standards.",
            status: "required",
            completed: false
          },
          {
            id: "req2",
            title: "Risk Management (ISO 14971)",
            description: "Conduct and document a comprehensive risk analysis.",
            status: "required",
            completed: false
          },
          {
            id: "req3",
            title: "Clinical Evaluation",
            description: "Prepare clinical evaluation documentation with relevant clinical data.",
            status: "required",
            completed: false
          },
          {
            id: "req4",
            title: "Usability Engineering (IEC 62366)",
            description: "Conduct usability testing and document results.",
            status: "recommended",
            completed: false
          },
          {
            id: "req5",
            title: "Cybersecurity Documentation",
            description: "Document cybersecurity measures and risk mitigation strategies.",
            status: "recommended",
            completed: false
          }
        ],
        documentRecommendations: [
          "Technical File/Design Dossier",
          "Declaration of Conformity",
          "Risk Management Report",
          "Clinical Evaluation Report",
          "Software Validation Documentation"
        ]
      };
      
      setComplianceAnalysis(mockAnalysis);
      
      toast({
        title: "Compliance Analysis Complete",
        description: "Review your regulatory pathway and requirements.",
      });
    } catch (error) {
      console.error("Error analyzing compliance:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete compliance analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzingCompliance(false);
    }
  };
  
  // Sample regulatory frameworks - updated to use string icon names
  const regulatoryFrameworks = [
    {
      id: "mds",
      title: "Medical Device Standards",
      icon: "Shield", 
      description: "Applicable to hardware and equipment innovations in healthcare.",
      completedSteps: 2,
      totalSteps: 5,
      steps: [
        "Device Classification", 
        "Risk Assessment",
        "Technical Documentation", 
        "Clinical Evaluation", 
        "Quality Management System"
      ]
    },
    {
      id: "dht", 
      title: "Digital Health Technologies",
      icon: "FileSearch", 
      description: "For mobile apps, AI platforms, and other software-based innovations.",
      completedSteps: 3,
      totalSteps: 6,
      steps: [
        "Software Classification",
        "Cybersecurity Assessment",
        "User Validation",
        "Data Protection Impact Assessment",
        "Algorithm Validation",
        "Post-Market Surveillance Plan"
      ]
    },
    {
      id: "ipr", 
      title: "Intellectual Property Recognition",
      icon: "Landmark", 
      description: "Protect your innovation through patents, trademarks and industrial designs.",
      completedSteps: 1,
      totalSteps: 4,
      steps: [
        "Innovation Assessment",
        "Patentability Search",
        "Application Filing",
        "Examination Response"
      ]
    },
  ];
  
  const markRequirementComplete = (id: string) => {
    if (!complianceAnalysis) return;
    
    setComplianceAnalysis({
      ...complianceAnalysis,
      requirements: complianceAnalysis.requirements.map(req => 
        req.id === id ? { ...req, completed: !req.completed } : req
      )
    });
    
    toast({
      title: "Requirement Updated",
      description: "Your compliance progress has been saved.",
    });
  };

  return (
    <>
      <Navbar />
      <HeroSection
        innovationType={innovationType}
        innovationDescription={innovationDescription}
        setInnovationType={setInnovationType}
        setInnovationDescription={setInnovationDescription}
        isLoadingAI={isLoadingAI}
        isAnalyzingCompliance={isAnalyzingCompliance}
        generateRecommendations={generateRecommendations}
        analyzeCompliance={analyzeCompliance}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="overview" className="px-6">Overview</TabsTrigger>
                <TabsTrigger value="frameworks" className="px-6">Frameworks</TabsTrigger>
                <TabsTrigger value="support" className="px-6">Support</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview">
              <OverviewTab 
                aiRecommendations={aiRecommendations}
                complianceAnalysis={complianceAnalysis}
                onMarkRequirementComplete={markRequirementComplete}
              />
            </TabsContent>
            
            <TabsContent value="frameworks">
              <h2 className="text-2xl font-semibold mb-6 text-moh-darkGreen">Regulatory Frameworks</h2>
              <RegulatoryFrameworks 
                frameworks={regulatoryFrameworks}
                selectedFramework={selectedRegulation}
                onFrameworkSelect={setSelectedRegulation}
              />
            </TabsContent>
            
            <TabsContent value="support">
              <SupportServicesSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
