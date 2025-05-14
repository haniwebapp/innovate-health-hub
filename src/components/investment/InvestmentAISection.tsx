import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap, Brain, BarChart3, TrendingUp, Info, AreaChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentAIService, MarketTrendParams } from "@/services/ai/InvestmentAIService";
import { AIMatchScoreCard } from "./AIMatchScoreCard";
import { AIInsightsCard } from "./AIInsightsCard";

// Sample innovation data for testing
const testInnovationData = {
  name: "HealthMonitor Pro",
  description: "A wearable device that continuously monitors vital signs and uses AI to detect early warning signs of health issues.",
  stage: "early",
  sector: "Digital Health",
  fundingNeeded: 2000000,
  teamSize: 8,
  traction: "500 beta users, 3 hospital partnerships",
  patentStatus: "Patent pending",
  regulatoryStatus: "FDA approval in progress"
};

export function InvestmentAISection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('matching');
  const [selectedSector, setSelectedSector] = useState('digital-health');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMatchScores, setAiMatchScores] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [marketTrendInsights, setMarketTrendInsights] = useState<any>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    setButtonClicked(true);
    
    try {
      // Generate investment matches based on test data
      const matchResult = await InvestmentAIService.generateMatchAnalysis(
        testInnovationData,
        {
          investmentFocus: [selectedSector],
          investmentStage: ["early"],
          geographicFocus: ["Saudi Arabia"],
          investmentSizeMin: 500000,
          investmentSizeMax: 5000000
        }
      );
      
      // Generate market analysis for the selected sector
      const marketParams: MarketTrendParams = {
        sector: selectedSector === 'all' ? 'Healthcare' : selectedSector.replace('-', ' '),
        timeframe: "Next 2 years",
        region: "Saudi Arabia"
      };
      
      const marketAnalysis = await InvestmentAIService.generateMarketAnalysis(marketParams);
      
      // Create formatted match scores for display
      const formattedMatchScores = [
        {
          name: "Connected Health Solutions Fund",
          score: matchResult.matchScore,
          reason: matchResult.mainReasons[0] || "Strong alignment with your digital health focus and target market.",
          additionalInfo: [
            { label: "Investment Range", value: "$500K-2M" },
            { label: "Focus", value: "Digital Health" },
            { label: "Time to Decision", value: "4-6 weeks" }
          ]
        },
        {
          name: "Saudi Healthcare Innovation Fund",
          score: Math.max(30, matchResult.matchScore - 12),
          reason: matchResult.mainReasons[1] || "Good fit for early-stage healthcare startups with traction.",
          additionalInfo: [
            { label: "Investment Range", value: "$1M-5M" },
            { label: "Focus", value: "Healthcare Tech" },
            { label: "Time to Decision", value: "6-8 weeks" }
          ]
        },
        {
          name: "Medical Device Growth Partners",
          score: Math.max(20, matchResult.matchScore - 20),
          reason: matchResult.mainReasons[2] || "Potential match for hardware-focused healthcare solutions.",
          additionalInfo: [
            { label: "Investment Range", value: "$2M-10M" },
            { label: "Focus", value: "Medical Devices" },
            { label: "Time to Decision", value: "8-10 weeks" }
          ]
        }
      ];
      
      setAiMatchScores(formattedMatchScores);
      
      // Set AI insights from the SWOT analysis
      const insights = [
        ...matchResult.swotAnalysis.opportunities.map(o => o),
        ...matchResult.keyMetrics.map(m => `Key metric to highlight: ${m}`),
        matchResult.recommendedApproach,
        ...matchResult.swotAnalysis.strengths.map(s => `Strength: ${s}`)
      ].slice(0, 4);
      
      setAiInsights(insights);
      
      // Set market trends
      setMarketTrendInsights(marketAnalysis);
      
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed the latest market trends and investment opportunities.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "An error occurred during analysis",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      // Keep button in active state for visual feedback
      setTimeout(() => setButtonClicked(false), 3000);
    }
  };
  
  // Auto-run analysis on first load
  useEffect(() => {
    handleAnalysis();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-moh-gold text-white mb-3">AI-POWERED</Badge>
          <h2 className="text-3xl font-bold mb-3">Smart Investment Intelligence</h2>
          <p className="max-w-2xl mx-auto text-moh-lightGreen">
            Leverage AI-powered analysis to find the best matches for your healthcare innovation or investment strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-6 h-full">
              <div className="flex items-center space-x-4">
                <div className="bg-moh-gold/50 p-3 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">AI Investment Assistant</h3>
                  <p className="text-moh-lightGreen text-sm">Intelligent analysis and matching</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-moh-lightGreen">
                    Investment Sector
                  </label>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="digital-health">Digital Health</SelectItem>
                      <SelectItem value="medical-devices">Medical Devices</SelectItem>
                      <SelectItem value="biotech">Biotech</SelectItem>
                      <SelectItem value="ai-ml">AI/ML in Healthcare</SelectItem>
                      <SelectItem value="telemedicine">Telemedicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-moh-lightGreen">
                    Investment Stage
                  </label>
                  <Select defaultValue="early">
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="early">Early Stage</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="late">Late Stage</SelectItem>
                      <SelectItem value="all-stages">All Stages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-moh-lightGreen">
                    Geographic Focus
                  </label>
                  <Select defaultValue="saudi">
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saudi">Saudi Arabia</SelectItem>
                      <SelectItem value="gcc">GCC</SelectItem>
                      <SelectItem value="mena">MENA</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-moh-lightGreen">
                    Investment Size
                  </label>
                  <Select defaultValue="1m-5m">
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<500k">Less than $500K</SelectItem>
                      <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                      <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                      <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                      <SelectItem value="10m+">$10M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleAnalysis} 
                className={`w-full transition-all duration-300 ${
                  buttonClicked || isAnalyzing
                    ? "bg-gradient-to-r from-moh-darkGold to-moh-gold hover:from-moh-darkGold hover:to-moh-gold ring-2 ring-white/30 shadow-lg transform scale-[0.98]"
                    : "bg-gradient-to-r from-moh-gold to-moh-darkGold hover:from-moh-darkGold hover:to-moh-gold"
                }`}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Zap className={`mr-2 h-4 w-4 ${buttonClicked ? "text-white animate-pulse" : ""}`} />
                    Run AI Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-white/10 p-1">
                <TabsTrigger 
                  value="matching" 
                  className="data-[state=active]:bg-moh-gold data-[state=active]:text-white"
                >
                  Investment Matches
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="data-[state=active]:bg-moh-gold data-[state=active]:text-white"
                >
                  AI Insights
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="data-[state=active]:bg-moh-gold data-[state=active]:text-white"
                >
                  Market Trends
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="matching" className="space-y-4">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
                  <Input 
                    type="search" 
                    placeholder="Search opportunities..."
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-moh-gold mb-4" />
                    <p className="text-lg font-medium">Analyzing investment matches...</p>
                    <p className="text-sm text-moh-lightGreen">This may take a moment</p>
                  </div>
                ) : (
                  aiMatchScores.map((match, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{match.name}</h3>
                        <Badge className={`${match.score > 85 ? 'bg-green-600' : match.score > 75 ? 'bg-moh-gold' : 'bg-white/30'}`}>
                          {match.score}% Match
                        </Badge>
                      </div>
                      <p className="text-moh-lightGreen mb-3">{match.reason}</p>
                      
                      {match.additionalInfo && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {match.additionalInfo.map((info, i) => (
                            <div key={i} className="bg-white/5 p-2 rounded text-center">
                              <p className="text-xs text-moh-lightGreen">{info.label}</p>
                              <p className="font-medium">{info.value}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="w-full bg-white/5 rounded-full h-2 mb-1">
                        <div 
                          className="bg-gradient-to-r from-moh-green to-moh-gold h-2 rounded-full" 
                          style={{ width: `${match.score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-moh-lightGreen">
                        <span>Low match</span>
                        <span>High match</span>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="insights">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-moh-lightGold" />
                    <h3 className="text-xl font-medium">AI Investment Insights</h3>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-moh-gold mb-4" />
                      <p>Generating investment insights...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="bg-white/5 p-4 rounded-lg">
                          <div className="flex">
                            <span className="flex h-6 w-6 mr-3 rounded-full bg-moh-gold/50 items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <p>{insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-moh-gold/20 to-moh-green/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-moh-gold" />
                      Recommendation
                    </h4>
                    <p className="text-moh-lightGreen">
                      {isAnalyzing 
                        ? "Generating recommendations..." 
                        : "Based on current trends, focus on solutions that integrate with existing healthcare systems and address specific regional needs for the highest investment potential."}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <TrendingUp className="h-5 w-5 text-moh-lightGold" />
                    <h3 className="text-xl font-medium">Healthcare Investment Trends</h3>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-moh-gold mb-4" />
                      <p>Analyzing market trends...</p>
                    </div>
                  ) : marketTrendInsights ? (
                    <>
                      <div className="mb-4 p-4 bg-white/5 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-moh-gold" />
                          Market Summary
                        </h4>
                        <p className="text-moh-lightGreen">{marketTrendInsights.summary}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-white/5 p-3 rounded-lg text-center">
                            <p className="text-xs text-moh-lightGreen">Growth Rate</p>
                            <p className="text-xl font-medium">{marketTrendInsights.growthRate}%</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg text-center">
                            <p className="text-xs text-moh-lightGreen">Market Size</p>
                            <p className="text-xl font-medium">{marketTrendInsights.marketSize}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 p-4 rounded-lg">
                          <h4 className="font-medium text-moh-lightGreen mb-3">Key Trends</h4>
                          <ul className="space-y-2">
                            {marketTrendInsights.keyTrends.map((trend: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <TrendingUp className="h-4 w-4 mr-2 text-moh-gold mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{trend}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <h4 className="font-medium text-moh-lightGreen mb-3">Emerging Opportunities</h4>
                          <ul className="space-y-2">
                            {marketTrendInsights.emergingOpportunities.map((opportunity: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <Zap className="h-4 w-4 mr-2 text-moh-gold mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{opportunity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg mb-6">
                        <h4 className="font-medium text-moh-lightGreen mb-3">Vision 2030 Alignment</h4>
                        <p className="text-sm">{marketTrendInsights.vision2030Alignment}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-moh-gold/20 to-moh-green/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Investment Recommendations</h4>
                        <ul className="space-y-2">
                          {marketTrendInsights.investmentRecommendations.map((rec: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <BarChart3 className="h-4 w-4 mr-2 text-moh-gold mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-moh-lightGreen">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p>No market trend data available</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
