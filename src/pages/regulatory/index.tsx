import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, Lightbulb, CheckCircle, Clock, CheckSquare,
  Clipboard, FileText, ClipboardCheck, AlertCircle,
  FileSearch, ArrowRight, FileQuestion, Scale
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define types for AI-powered compliance
interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: "required" | "recommended" | "optional";
  completed: boolean;
}

interface AIComplianceAnalysis {
  score: number;
  summary: string;
  requirements: ComplianceRequirement[];
  documentRecommendations: string[];
}

export default function RegulatoryPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [innovationDescription, setInnovationDescription] = useState("");
  const [innovationType, setInnovationType] = useState("");
  
  // New state for AI-powered compliance features
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
  
  // New function to analyze regulatory compliance
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
        <Card className="p-6 mb-8 border border-blue-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            AI Compliance Analyzer
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="innovationType" className="block text-sm font-medium mb-1">Innovation Type</label>
              <select 
                id="innovationType"
                className="w-full p-2 border rounded-md"
                value={innovationType}
                onChange={(e) => setInnovationType(e.target.value)}
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
                onChange={(e) => setInnovationDescription(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            
            <Button 
              onClick={analyzeCompliance} 
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
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
        
        {/* Display compliance analysis results */}
        {complianceAnalysis && (
          <Card className="p-6 mb-8 border-l-4 border-l-blue-600">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-blue-600" />
                Compliance Analysis Results
              </h3>
              <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
                <div className="text-center">
                  <div className={cn(
                    "text-lg font-bold",
                    complianceAnalysis.score > 80 ? "text-green-600" : 
                    complianceAnalysis.score > 60 ? "text-amber-600" : "text-red-600"
                  )}>
                    {complianceAnalysis.score}%
                  </div>
                  <div className="text-xs text-gray-500">Ready</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{complianceAnalysis.summary}</p>
            
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-2">Required Compliance Steps</h4>
              <div className="space-y-3">
                {complianceAnalysis.requirements.map(requirement => (
                  <div 
                    key={requirement.id} 
                    className={cn(
                      "p-4 border rounded-md",
                      requirement.completed ? "bg-green-50 border-green-200" : "bg-white"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {requirement.status === "required" && (
                          <Badge className="bg-red-500">Required</Badge>
                        )}
                        {requirement.status === "recommended" && (
                          <Badge className="bg-amber-500">Recommended</Badge>
                        )}
                        {requirement.status === "optional" && (
                          <Badge className="bg-gray-500">Optional</Badge>
                        )}
                        <h5 className="font-medium">{requirement.title}</h5>
                      </div>
                      <Button 
                        size="sm" 
                        variant={requirement.completed ? "outline" : "default"}
                        className={requirement.completed ? "border-green-500 text-green-500" : ""}
                        onClick={() => markRequirementComplete(requirement.id)}
                      >
                        {requirement.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" /> Completed
                          </>
                        ) : "Mark Complete"}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{requirement.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-2">Required Documentation</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {complianceAnalysis.documentRecommendations.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Compliance Report
              </Button>
            </div>
          </Card>
        )}
        
        {aiRecommendations.length > 0 && (
          <Card className="p-6 mb-8 border-l-4 border-l-yellow-400 bg-yellow-50">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Regulatory Insights
            </h3>
            <div className="space-y-2">
              {aiRecommendations.map((insight, i) => (
                <p key={i} className="text-gray-700">{insight}</p>
              ))}
            </div>
          </Card>
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
        <div className="space-y-4 mb-8">
          {regulatoryFrameworks.map((framework) => (
            <Card 
              key={framework.id}
              className={cn(
                "p-4 cursor-pointer transition-all",
                selectedRegulation === framework.id 
                  ? "border-2 border-moh-green" 
                  : "hover:border-moh-green/50"
              )}
              onClick={() => setSelectedRegulation(framework.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-moh-green/10 rounded-md text-moh-green">
                  {framework.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{framework.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{framework.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completion</span>
                      <span className="font-medium">{framework.completedSteps}/{framework.totalSteps} steps</span>
                    </div>
                    <Progress 
                      value={(framework.completedSteps / framework.totalSteps) * 100} 
                      className="h-2 bg-gray-100" 
                    />
                  </div>
                </div>
              </div>
              
              {selectedRegulation === framework.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium mb-2">Compliance Steps</h4>
                  <div className="space-y-2">
                    {framework.steps.map((step, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 text-sm"
                      >
                        {index < framework.completedSteps ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-400" />
                        )}
                        <span className={index < framework.completedSteps ? "line-through text-gray-400" : ""}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button className="w-full bg-moh-green hover:bg-moh-darkGreen">
                      Continue Compliance Process
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        
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
