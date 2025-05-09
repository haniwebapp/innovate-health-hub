
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, Lightbulb, CheckCircle, Clock, CheckSquare,
  Clipboard, FileText, ClipboardCheck, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegulatoryPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  
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
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-6">Regulatory Sandbox</h1>
        <p className="text-lg text-gray-700 mb-10">
          Navigate the healthcare regulatory landscape with confidence. Our Regulatory Sandbox provides a controlled environment to test innovative solutions against regulatory requirements.
        </p>
        
        <div className="mb-8">
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
      </div>
    </div>
  );
}
