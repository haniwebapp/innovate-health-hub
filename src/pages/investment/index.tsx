
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lightbulb, BarChart3, TrendingUp, Search, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

// Types for AI-generated investment data
interface AIMatchScore {
  name: string;
  score: number;
  reason: string;
}

interface AIMarketTrend {
  sector: string;
  growth: number;
  confidence: number;
  insight: string;
}

export default function InvestmentPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("startups");
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [investmentType, setInvestmentType] = useState("all");
  
  // New state for AI-powered features
  const [aiMatchScores, setAiMatchScores] = useState<AIMatchScore[]>([]);
  const [aiMarketTrends, setAiMarketTrends] = useState<AIMarketTrend[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSector, setSelectedSector] = useState("all");
  
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

  // New function to analyze investment opportunities
  const analyzeInvestmentOpportunities = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call AI assistant for investment matching
      const matchResponse: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Analyze and match investment opportunities in the ${selectedSector === 'all' ? 'healthcare' : selectedSector} sector. Consider factors like innovation potential, market readiness, and growth potential.`
        }
      ], "investment-matching");
      
      if (matchResponse.error) {
        throw new Error(matchResponse.error);
      }
      
      // Generate mock data for demo purposes
      // In a real implementation, this would parse structured data from the AI response
      const mockMatches: AIMatchScore[] = [
        {
          name: "Digital Health Platform",
          score: 87,
          reason: "Strong market fit with current healthcare digitalization trends"
        },
        {
          name: "Remote Patient Monitoring Solution",
          score: 92,
          reason: "High growth potential with increasing telehealth adoption"
        },
        {
          name: "AI Diagnostic Tool",
          score: 79,
          reason: "Innovative technology with regulatory pathway challenges"
        },
        {
          name: "Personalized Medicine Platform",
          score: 84,
          reason: "Growing market with strong intellectual property position"
        }
      ];
      
      setAiMatchScores(mockMatches);
      
      // Get market trend analysis
      const trendsResponse: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Analyze market trends in healthcare investment for ${new Date().getFullYear()}. Identify growth sectors, emerging opportunities, and potential risks.`
        }
      ], "market-analysis");
      
      // Mock market trends data
      const mockTrends: AIMarketTrend[] = [
        {
          sector: "Digital Therapeutics",
          growth: 32,
          confidence: 89,
          insight: "Rapid growth driven by regulatory acceptance and insurance coverage"
        },
        {
          sector: "AI in Healthcare",
          growth: 48,
          confidence: 92,
          insight: "Continued expansion with focus on clinical decision support systems"
        },
        {
          sector: "Remote Monitoring",
          growth: 27,
          confidence: 85,
          insight: "Steady growth supported by aging population and chronic disease management"
        },
        {
          sector: "Personalized Medicine",
          growth: 19,
          confidence: 78,
          insight: "Growing interest with advances in genomics and proteomics"
        }
      ];
      
      setAiMarketTrends(mockTrends);
      
      toast({
        title: "Investment Analysis Complete",
        description: "AI-powered matching and trend analysis is now available.",
      });
    } catch (error) {
      console.error("Error analyzing investments:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete investment analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Filter AI match scores based on search query
  const filteredMatches = aiMatchScores.filter(match => 
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-6">Investment Platform</h1>
        <p className="text-lg text-gray-700 mb-10">
          Connect healthcare innovations with the right investment opportunities. Our AI-powered platform brings together startups, investors, and growth resources to accelerate healthcare solutions.
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
                Generating Recommendations...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                Get AI Recommendations
              </>
            )}
          </Button>
          
          <Button 
            onClick={analyzeInvestmentOpportunities} 
            variant="outline"
            className="border-moh-green text-moh-green hover:bg-moh-green/10 flex items-center gap-2"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing Investment Landscape...
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4" />
                AI Investment Analysis
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
        
        {aiMatchScores.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              AI Investment Match Scores
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search opportunities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    <SelectItem value="digital-health">Digital Health</SelectItem>
                    <SelectItem value="medical-devices">Medical Devices</SelectItem>
                    <SelectItem value="biotech">Biotech</SelectItem>
                    <SelectItem value="ai-ml">AI/ML in Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, i) => (
                  <div key={i} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-lg">{match.name}</h4>
                      <Badge className={match.score > 85 ? 'bg-green-500' : match.score > 75 ? 'bg-amber-500' : 'bg-gray-500'}>
                        {match.score}/100
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{match.reason}</p>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1">Match Score</div>
                      <Progress value={match.score} className="h-2" 
                        style={{backgroundColor: '#e5e7eb'}} // light gray background
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No matching opportunities found.</p>
              )}
            </div>
          </Card>
        )}
        
        {aiMarketTrends.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Healthcare Investment Market Trends
            </h3>
            <div className="space-y-4">
              {aiMarketTrends.map((trend, i) => (
                <div key={i} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{trend.sector}</h4>
                      <p className="text-sm text-gray-600">{trend.insight}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-500 mb-1">+{trend.growth}% Growth</Badge>
                      <div className="text-xs text-gray-500">Confidence: {trend.confidence}%</div>
                    </div>
                  </div>
                </div>
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
