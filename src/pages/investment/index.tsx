
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lightbulb } from "lucide-react";

export default function InvestmentPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("startups");
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  // Generate AI recommendations based on selected tab
  const generateRecommendations = async () => {
    setIsLoadingAI(true);
    
    try {
      const context = activeTab === "startups" 
        ? "investment-startup" 
        : activeTab === "investors" 
          ? "investment-investor" 
          : "investment-resources";
      
      const response: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Generate personalized ${activeTab} recommendations for the investment platform.`
        }
      ], context);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setAiRecommendations(response.insights || [response.message]);
      
      toast({
        title: "AI Recommendations Generated",
        description: "Personalized insights are now available.",
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
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-6">Investment Platform</h1>
        <p className="text-lg text-gray-700 mb-10">
          Connect healthcare innovations with the right investment opportunities. Our platform brings together startups, investors, and growth resources to accelerate healthcare solutions.
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
                Generating Recommendations...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </div>
        
        {aiRecommendations.length > 0 && (
          <Card className="p-6 mb-8 border-l-4 border-l-yellow-400 bg-yellow-50">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Insights
            </h3>
            <div className="space-y-2">
              {aiRecommendations.map((insight, i) => (
                <p key={i} className="text-gray-700">{insight}</p>
              ))}
            </div>
          </Card>
        )}
        
        <Tabs defaultValue="startups" className="mb-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="startups">For Startups</TabsTrigger>
            <TabsTrigger value="investors">For Investors</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="startups" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6 border-l-4 border-l-moh-green">
                <h3 className="text-xl font-semibold mb-3">Funding Opportunities</h3>
                <p className="mb-4">Access targeted funding opportunities aligned with your healthcare innovation stage and domain.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">Find Opportunities</Button>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-moh-green">
                <h3 className="text-xl font-semibold mb-3">Investor Matching</h3>
                <p className="mb-4">Get matched with investors who specialize in your area of healthcare innovation.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">Connect with Investors</Button>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-moh-green">
                <h3 className="text-xl font-semibold mb-3">Pitch Resources</h3>
                <p className="mb-4">Access tools and templates to create compelling investment pitches.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">View Resources</Button>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-moh-green">
                <h3 className="text-xl font-semibold mb-3">Growth Guidance</h3>
                <p className="mb-4">Receive tailored guidance on scaling your healthcare startup.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">Get Guidance</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="investors" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="text-xl font-semibold mb-3">Deal Flow</h3>
                <p className="mb-4">Access a curated pipeline of vetted healthcare innovations ready for investment.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">View Opportunities</Button>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="text-xl font-semibold mb-3">Due Diligence Support</h3>
                <p className="mb-4">Get comprehensive due diligence resources for healthcare innovation investments.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">Access Tools</Button>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="text-xl font-semibold mb-3">Market Intelligence</h3>
                <p className="mb-4">Stay informed with the latest trends and opportunities in healthcare innovation.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">View Reports</Button>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="text-xl font-semibold mb-3">Co-Investment Network</h3>
                <p className="mb-4">Connect with other investors for healthcare innovation co-investment opportunities.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">Join Network</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Investment Guides</h3>
                <p className="mb-4">Comprehensive guides for healthcare innovation investment strategies.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Early-stage Investment Guide</li>
                  <li>Digital Health Investment Framework</li>
                  <li>Medical Device Investment Strategy</li>
                  <li>Biotech Investment Risk Assessment</li>
                </ul>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">Access Guides</Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Funding Events</h3>
                <p className="mb-4">Upcoming pitch events, investor meetings and funding workshops.</p>
                <div className="space-y-3 mb-4">
                  <div className="border-b pb-2">
                    <p className="font-medium">Healthcare Investment Summit</p>
                    <p className="text-sm text-gray-500">June 15-16, 2025 • Riyadh</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-medium">Digital Health Investor Showcase</p>
                    <p className="text-sm text-gray-500">July 23, 2025 • Virtual</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-medium">Medical Innovation Funding Workshop</p>
                    <p className="text-sm text-gray-500">August 10, 2025 • Jeddah</p>
                  </div>
                </div>
                <Button className="bg-moh-green hover:bg-moh-darkGreen">View All Events</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
