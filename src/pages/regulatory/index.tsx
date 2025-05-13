import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { HeroSection } from "@/components/regulatory/HeroSection";
import { OverviewTab } from "@/components/regulatory/OverviewTab";
import { SupportServicesSection } from "@/components/regulatory/SupportServicesSection";
import { RegulatoryFrameworks } from "@/components/regulatory/RegulatoryFrameworks";
import { AIComplianceAnalysis } from "@/components/regulatory/ComplianceResults";
import { AIComplianceAnalyzer } from "@/components/regulatory/AIComplianceAnalyzer";
import { Shield, ClipboardCheck, FileCheck, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGreen">
      <Navbar />
      <ScrollProgress />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
          {/* Background decoration elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold blur-3xl"></div>
            <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-moh-darkGreen blur-3xl"></div>
          </div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 rounded-full bg-moh-darkGreen text-moh-lightGreen text-sm font-medium"
                >
                  Regulatory Hub
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Regulatory Sandbox</span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-moh-lightGreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Test and validate your healthcare innovation in a controlled environment with expert guidance, 
                  reduced regulatory barriers, and accelerated approval pathways.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a href="#ai-analyzer" className="bg-moh-gold hover:bg-moh-darkGold text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    Start Compliance Check
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                  <a href="#frameworks" className="border border-moh-gold/50 text-moh-lightGold hover:bg-moh-darkGreen/20 font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    View Frameworks
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-moh-gold/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-moh-gold/30 rounded-full blur-md"></div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-moh-green flex items-center justify-center">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-white">Regulatory Frameworks</h3>
                          <p className="text-sm text-white/70">Streamlined compliance pathways</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-moh-green/30 flex items-center justify-center mr-3">
                            <ClipboardCheck className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Medical Device Standards</p>
                            <div className="flex mt-1">
                              <span className="text-xs bg-moh-green/20 text-white px-2 py-0.5 rounded">5 steps</span>
                              <span className="text-xs text-white/70 ml-2">2/5 completed</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-moh-green/30 flex items-center justify-center mr-3">
                            <FileCheck className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Digital Health Technologies</p>
                            <div className="flex mt-1">
                              <span className="text-xs bg-moh-green/20 text-white px-2 py-0.5 rounded">6 steps</span>
                              <span className="text-xs text-white/70 ml-2">3/6 completed</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <a href="#frameworks" className="text-moh-lightGold hover:text-moh-gold text-sm flex items-center justify-center">
                        View all frameworks
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-moh-lightGreen"></path>
            </svg>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="bg-moh-lightGreen">
                  <TabsTrigger 
                    value="overview" 
                    className="px-6 data-[state=active]:bg-moh-green data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="frameworks" 
                    id="frameworks"
                    className="px-6 data-[state=active]:bg-moh-green data-[state=active]:text-white"
                  >
                    Frameworks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="support" 
                    className="px-6 data-[state=active]:bg-moh-green data-[state=active]:text-white"
                  >
                    Support
                  </TabsTrigger>
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

            {/* AI Compliance Analyzer - Moved above the FAQ */}
            <div id="ai-analyzer" className="mt-16 mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-moh-darkGreen">AI Compliance Assessment</h2>
              <AIComplianceAnalyzer 
                innovationDescription={innovationDescription}
                innovationType={innovationType}
                isAnalyzingCompliance={isAnalyzingCompliance}
                onDescriptionChange={setInnovationDescription}
                onTypeChange={setInnovationType}
                onAnalyzeClick={analyzeCompliance}
              />
            </div>

            {/* FAQ section */}
            <div className="mt-8">
              <RegulatoryFAQ />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
