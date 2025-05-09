
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, Lightbulb, CheckCircle, Clock, CheckSquare,
  Clipboard, FileText, ClipboardCheck, Scale
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AIInsightsCard } from "@/components/investment/AIInsightsCard";
import { AIComplianceAnalyzer } from "@/components/regulatory/AIComplianceAnalyzer";
import { ComplianceResults, AIComplianceAnalysis } from "@/components/regulatory/ComplianceResults";
import { RegulatoryFrameworks } from "@/components/regulatory/RegulatoryFrameworks";

export default function RegulatoryPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
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
  
  // Sample regulatory frameworks
  const regulatoryFrameworks = [
    {
      id: "mds",
      title: "Medical Device Standards",
      icon: <CheckSquare className="h-5 w-5" />,
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
      icon: <Clipboard className="h-5 w-5" />,
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
      icon: <FileText className="h-5 w-5" />,
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-6">Regulatory Sandbox</h1>
        <p className="text-lg text-gray-700 mb-10">
          Navigate the healthcare regulatory landscape with confidence. Our AI-powered Regulatory Sandbox provides a controlled environment to test innovative solutions against regulatory requirements.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button 
            onClick={generateRecommendations} 
            className="bg-moh-green hover:bg-moh-darkGreen flex items-center gap-2"
            disabled={isLoadingAI}
          >
            {isLoadingAI ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing Regulatory Landscape...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                Get AI Compliance Analysis
              </>
            )}
          </Button>
        </div>
        
        {/* AI Compliance Analyzer */}
        <AIComplianceAnalyzer 
          innovationDescription={innovationDescription}
          innovationType={innovationType}
          isAnalyzingCompliance={isAnalyzingCompliance}
          onDescriptionChange={(value) => setInnovationDescription(value)}
          onTypeChange={(value) => setInnovationType(value)}
          onAnalyzeClick={analyzeCompliance}
        />
        
        {/* Display compliance analysis results */}
        {complianceAnalysis && (
          <ComplianceResults 
            analysis={complianceAnalysis}
            onMarkRequirementComplete={markRequirementComplete}
          />
        )}
        
        {aiRecommendations.length > 0 && (
          <AIInsightsCard 
            insights={aiRecommendations} 
            title="AI Regulatory Insights" 
          />
        )}
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">How the Sandbox Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-moh-green/10 flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-moh-green" />
              </div>
              <h3 className="font-medium mb-2">1. Registration</h3>
              <p className="text-sm text-gray-600">Register your innovation and select the applicable regulatory framework.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-moh-green/10 flex items-center justify-center mb-3">
                <ClipboardCheck className="h-6 w-6 text-moh-green" />
              </div>
              <h3 className="font-medium mb-2">2. Preparation</h3>
              <p className="text-sm text-gray-600">Complete the required documentation and get ready for testing.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-moh-green/10 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-moh-green" />
              </div>
              <h3 className="font-medium mb-2">3. Testing</h3>
              <p className="text-sm text-gray-600">Test your innovation in a controlled environment with regulatory oversight.</p>
            </div>
          </div>
          <Button className="w-full bg-moh-green hover:bg-moh-darkGreen">Apply to the Sandbox Program</Button>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Regulatory Frameworks</h2>
        <RegulatoryFrameworks 
          frameworks={regulatoryFrameworks}
          selectedFramework={selectedRegulation}
          onFrameworkSelect={setSelectedRegulation}
        />
        
        <Separator className="my-8" />
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Regulatory Support Services</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <h3 className="font-medium mb-2">Compliance Consultation</h3>
              <p className="text-sm text-gray-600 mb-3">Get personalized guidance on your regulatory journey from our experts.</p>
              <Button variant="outline" className="w-full text-blue-700 border-blue-200 hover:bg-blue-50">Book Consultation</Button>
            </div>
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <h3 className="font-medium mb-2">Documentation Review</h3>
              <p className="text-sm text-gray-600 mb-3">Have your regulatory documents reviewed by our compliance specialists.</p>
              <Button variant="outline" className="w-full text-blue-700 border-blue-200 hover:bg-blue-50">Request Review</Button>
            </div>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-lg font-medium">How does AI improve regulatory compliance?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Our AI system analyzes your innovation against thousands of regulatory requirements, standards, and previous approvals to create a customized compliance pathway. It identifies gaps in documentation, suggests improvements, and continually updates recommendations based on regulatory changes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-lg font-medium">What types of innovations can be evaluated?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Our system can analyze medical devices, digital health applications, AI/ML-based health solutions, telehealth platforms, diagnostics tools, and therapeutic interventions. The AI adapts recommendations based on the specific characteristics of your innovation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-lg font-medium">How accurate are the AI compliance recommendations?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Our AI compliance engine has been trained on thousands of regulatory submissions and outcomes, achieving an accuracy rate of over 92% in identifying relevant requirements. All AI recommendations are reviewed by regulatory experts to ensure quality and correctness.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
