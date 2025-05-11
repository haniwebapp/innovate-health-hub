import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, Lightbulb, CheckCircle, Clock, CheckSquare,
  Clipboard, FileText, ClipboardCheck, Scale, Shield, Search,
  BookText, FileSearch, Building, Landmark, ArrowRight
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
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Link } from "react-router-dom";

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
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-moh-lightGreen/30 to-transparent pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold text-moh-darkGreen mb-4 leading-tight">
                  Regulatory <span className="text-gradient">Sandbox</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                  Navigate the complex healthcare regulatory landscape with confidence. Our AI-powered Regulatory 
                  Sandbox provides a controlled environment to test your innovations against regulatory requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    className="bg-moh-green hover:bg-moh-darkGreen text-white"
                    size="lg"
                    asChild
                  >
                    <Link to="/dashboard/regulatory/applications/new">
                      Apply for Sandbox
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    onClick={generateRecommendations} 
                    className="bg-white border border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen"
                    size="lg"
                    disabled={isLoadingAI}
                  >
                    {isLoadingAI ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Get AI Guidance
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] border border-gray-100">
                <h2 className="font-semibold text-lg mb-4 text-moh-darkGreen">Quick Compliance Check</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Innovation Type
                    </label>
                    <Select value={innovationType} onValueChange={setInnovationType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical device">Medical Device</SelectItem>
                        <SelectItem value="digital health application">Digital Health Application</SelectItem>
                        <SelectItem value="diagnostic tool">Diagnostic Tool</SelectItem>
                        <SelectItem value="therapeutic solution">Therapeutic Solution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Brief Description
                    </label>
                    <Textarea 
                      value={innovationDescription}
                      onChange={(e) => setInnovationDescription(e.target.value)}
                      placeholder="Describe your innovation briefly..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  <Button 
                    className="w-full bg-moh-green hover:bg-moh-darkGreen" 
                    onClick={analyzeCompliance}
                    disabled={isAnalyzingCompliance}
                  >
                    {isAnalyzingCompliance ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Compliance
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
            
            <TabsContent value="overview" className="space-y-8">
              {/* Apply for Sandbox Call-to-Action */}
              <Card className="border-l-4 border-l-moh-green">
                <CardContent className="pt-6 pb-4">
                  <div className="md:flex items-start justify-between">
                    <div className="space-y-2 mb-4 md:mb-0">
                      <h2 className="text-xl font-medium">Apply for the Regulatory Sandbox</h2>
                      <p className="text-muted-foreground max-w-xl">
                        Test your healthcare innovations in a controlled environment with reduced regulatory barriers.
                        Submit your application to get started.
                      </p>
                    </div>
                    <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
                      <Link to="/dashboard/regulatory/applications/new" className="flex items-center">
                        Apply for Sandbox
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-moh-lightGreen">
                          {benefit.icon}
                        </div>
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* How the Sandbox Works */}
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-moh-darkGreen">
                    How the Regulatory Sandbox Works
                  </CardTitle>
                  <CardDescription>
                    A step-by-step guide to testing your innovation in a controlled regulatory environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8 mb-6 relative">
                    {/* Connecting line in background */}
                    <div className="hidden md:block absolute top-16 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-moh-green/20"></div>
                    
                    <div className="flex flex-col items-center text-center relative">
                      <div className="z-10 w-12 h-12 rounded-full bg-moh-green flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">1. Registration</h3>
                      <p className="text-sm text-gray-600">Submit your innovation details and select the applicable regulatory framework.</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="z-10 w-12 h-12 rounded-full bg-moh-green/80 flex items-center justify-center mb-4">
                        <ClipboardCheck className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">2. Assessment</h3>
                      <p className="text-sm text-gray-600">Our experts analyze your innovation and provide a customized compliance pathway.</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="z-10 w-12 h-12 rounded-full bg-moh-green/60 flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">3. Sandbox Testing</h3>
                      <p className="text-sm text-gray-600">Test your innovation in a controlled environment with regulatory guidance and support.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6 flex justify-center">
                  <Button className="bg-moh-green hover:bg-moh-darkGreen" size="lg" asChild>
                    <Link to="/dashboard/regulatory/applications/new">
                      Apply to the Sandbox Program
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Display AI Analysis if available */}
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-moh-darkGreen">Regulatory Support Services</CardTitle>
                  <CardDescription>
                    Expert assistance to help navigate complex healthcare regulations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-moh-green" />
                          Compliance Consultation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-6">
                          Get personalized guidance on your regulatory journey from our experts. 
                          One-on-one sessions focused on your specific innovation challenges.
                        </p>
                        <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                          Schedule Consultation
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ClipboardCheck className="h-5 w-5 text-moh-green" />
                          Documentation Review
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-6">
                          Have your regulatory documents reviewed by our compliance specialists.
                          Get detailed feedback and improvement recommendations.
                        </p>
                        <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                          Request Review
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckSquare className="h-5 w-5 text-moh-green" />
                          Compliance Workshops
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-6">
                          Participate in interactive workshops covering key regulatory topics.
                          Learn from peers and regulatory experts in collaborative sessions.
                        </p>
                        <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                          View Workshop Calendar
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="h-5 w-5 text-moh-green" />
                          Regulatory Pipeline Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-6">
                          Get a comprehensive assessment of your regulatory journey.
                          Includes timeline estimates, cost projections, and risk analysis.
                        </p>
                        <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                          Request Assessment
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
