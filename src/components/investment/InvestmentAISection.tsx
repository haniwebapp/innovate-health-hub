
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap, Brain, BarChart3, TrendingUp, Info, AreaChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentInsightsService } from "@/services/investment/InvestmentInsightsService";
import { InvestmentAIService, MarketTrendParams } from "@/services/ai/InvestmentAIService";

// Sample data for demonstration
const testInnovation = {
  name: "HealthMonitor Pro",
  description: "Continuous remote monitoring solution for chronic disease patients with AI-powered anomaly detection.",
  sector: "digital-health",
  stage: "early-growth",
  fundingNeeded: 2500000,
  teamSize: 12,
  traction: "2,500 active users, 5 hospital partnerships"
};

// Sample match results
const sampleMatches = [
  {
    id: 1,
    name: "Saudi Health Ventures",
    matchScore: 92,
    investmentRange: "$1M - $5M",
    focusSectors: ["Digital Health", "Medical Devices"],
    stage: "Early Stage",
    notable: "Backed 15 successful healthcare startups"
  },
  {
    id: 2,
    name: "MENA Healthcare Fund",
    matchScore: 87,
    investmentRange: "$500K - $3M",
    focusSectors: ["Telemedicine", "Health AI"],
    stage: "Seed, Series A",
    notable: "Strong connections with regional healthcare systems"
  },
  {
    id: 3,
    name: "Vision Medical Capital",
    matchScore: 84,
    investmentRange: "$1M - $10M",
    focusSectors: ["Digital Therapeutics", "Remote Care"],
    stage: "Series A",
    notable: "Focus on Vision 2030 healthcare transformation"
  }
];

export function InvestmentAISection() {
  const [activeTab, setActiveTab] = useState("matching");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedStage, setSelectedStage] = useState("early");
  const [selectedRegion, setSelectedRegion] = useState("saudi");
  const [selectedSize, setSelectedSize] = useState("1m-5m");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState(sampleMatches);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [marketTrends, setMarketTrends] = useState<any>(null);
  
  const { toast } = useToast();
  
  const handleAnalysis = async () => {
    setButtonClicked(true);
    setIsAnalyzing(true);
    
    try {
      // Generate AI insights
      const insights = await InvestmentInsightsService.getInsights({
        sector: selectedSector,
        stage: selectedStage,
        region: selectedRegion,
        investmentSize: selectedSize
      });
      
      setAiInsights(insights);
      
      // Also generate market analysis
      try {
        const marketAnalysis = await InvestmentAIService.generateMarketAnalysis({
          sector: selectedSector === 'all' ? 'digital health' : selectedSector,
          timeframe: '2025-2030',
          region: selectedRegion === 'saudi' ? 'Saudi Arabia' : selectedRegion === 'gcc' ? 'GCC' : 'MENA'
        });
        
        setMarketTrends(marketAnalysis);
      } catch (marketError) {
        console.error("Error generating market analysis:", marketError);
      }
      
      toast({
        title: "Analysis complete!",
        description: "AI has analyzed investment data and generated insights.",
      });
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to complete investment analysis. Please try again.",
        variant: "destructive",
      });
      
      // Set fallback insights
      setAiInsights([
        "Healthcare AI solutions focusing on preventative care are seeing increased investor interest due to their potential for reducing healthcare costs.",
        "Telemedicine platforms with specialized features for chronic disease management show strong growth potential in the Saudi market.",
        "Investors are prioritizing healthcare startups that demonstrate clear integration pathways with existing healthcare systems.",
        "Digital health solutions that align with Vision 2030 healthcare goals are attracting premium valuations.",
        "Regional investors prefer startups with a clear regulatory compliance strategy and established clinical validation."
      ]);
    } finally {
      setIsAnalyzing(false);
      
      // Switch to insights tab after analysis
      setTimeout(() => {
        setActiveTab("insights");
      }, 500);
    }
  };
  
  const filteredMatches = matchResults.filter(match => {
    if (!searchQuery) return true;
    return (
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.focusSectors.some(sector => 
        sector.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <section className="py-16 bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-moh-gold text-white mb-3">AI-POWERED</Badge>
          <h2 className="text-3xl font-bold mb-3 text-white">Smart Investment Intelligence</h2>
          <p className="max-w-2xl mx-auto text-white">
            Leverage AI-powered analysis to find the best matches for your healthcare innovation or investment strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-6 h-full">
              <div className="flex items-center space-x-4">
                <div className="bg-moh-gold/50 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-white">AI Investment Assistant</h3>
                  <p className="text-white text-sm">Intelligent analysis and matching</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-white">
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
                  <label className="block text-sm font-medium mb-1.5 text-white">
                    Investment Stage
                  </label>
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
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
                  <label className="block text-sm font-medium mb-1.5 text-white">
                    Geographic Focus
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
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
                  <label className="block text-sm font-medium mb-1.5 text-white">
                    Investment Size
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
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
                  className="data-[state=active]:bg-moh-gold data-[state=active]:text-white text-white"
                >
                  Investment Matches
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="data-[state=active]:bg-moh-gold data-[state=active]:text-white text-white"
                >
                  AI Insights
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="data-[state=active]:bg-moh-gold data-[state=active]:text-white text-white"
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
                    <p className="text-lg font-medium text-white">Analyzing investment matches...</p>
                    <p className="text-sm text-white">This may take a moment</p>
                  </div>
                ) : filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <Card key={match.id} className="bg-white/10 border-0 backdrop-blur-sm overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-xl font-semibold text-white">{match.name}</h3>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-white">{match.matchScore}%</span>
                              <Badge className="bg-gradient-to-r from-moh-gold to-moh-darkGold">Match</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-white/80">Investment Range</p>
                              <p className="font-medium text-white">{match.investmentRange}</p>
                            </div>
                            <div>
                              <p className="text-sm text-white/80">Stage Focus</p>
                              <p className="font-medium text-white">{match.stage}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-sm text-white/80">Sectors</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {match.focusSectors.map((sector, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-white/10 text-white border-white/20">
                                    {sector}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-sm text-white/80">Notable</p>
                              <p className="font-medium text-white">{match.notable}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 flex flex-col justify-center items-center md:items-end bg-white/5 md:border-l border-white/20 md:w-48">
                          <div className="flex flex-col items-center md:items-end space-y-4">
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-moh-lightGold mr-2" />
                              <span className="text-white">Trending Up</span>
                            </div>
                            
                            <Button className="bg-white hover:bg-white/80 text-moh-darkGreen">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="bg-white/10 rounded-lg p-8 text-center">
                    <Info className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white">No matching investors found</h3>
                    <p className="text-white/70 mt-2">Try adjusting your search criteria</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="insights">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-moh-lightGold" />
                    <h3 className="text-xl font-medium text-white">AI Investment Insights</h3>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-moh-gold mb-4" />
                      <p className="text-white">Generating investment insights...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="bg-white/5 p-4 rounded-lg">
                          <div className="flex">
                            <span className="flex h-6 w-6 mr-3 rounded-full bg-moh-gold/50 items-center justify-center text-sm text-white">
                              {index + 1}
                            </span>
                            <p className="text-white">{insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-moh-gold/20 to-moh-green/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center text-white">
                      <BarChart3 className="h-4 w-4 mr-2 text-moh-gold" />
                      Recommendation
                    </h4>
                    <p className="text-white">
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
                    <h3 className="text-xl font-medium text-white">Healthcare Investment Trends</h3>
                  </div>
                  
                  {isAnalyzing || !marketTrends ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-moh-gold mb-4" />
                      <p className="text-white">Analyzing market trends...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white/5 border-0">
                          <CardContent className="pt-6">
                            <div className="flex items-center mb-2">
                              <AreaChart className="h-5 w-5 text-moh-gold mr-2" />
                              <h4 className="font-medium text-white">Market Size</h4>
                            </div>
                            <p className="text-3xl font-bold text-white">{marketTrends.marketSize}</p>
                            <p className="text-sm text-white/70 mt-1">Projected by 2025</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-white/5 border-0">
                          <CardContent className="pt-6">
                            <div className="flex items-center mb-2">
                              <TrendingUp className="h-5 w-5 text-moh-gold mr-2" />
                              <h4 className="font-medium text-white">Growth Rate</h4>
                            </div>
                            <p className="text-3xl font-bold text-white">{marketTrends.growthRate}%</p>
                            <p className="text-sm text-white/70 mt-1">Annual CAGR</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-white/5 border-0">
                          <CardContent className="pt-6">
                            <div className="flex items-center mb-2">
                              <Info className="h-5 w-5 text-moh-gold mr-2" />
                              <h4 className="font-medium text-white">Vision 2030</h4>
                            </div>
                            <p className="font-medium text-white">Strong Alignment</p>
                            <p className="text-sm text-white/70 mt-1">Healthcare transformation goals</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 text-white">Key Trends</h4>
                          <div className="space-y-2">
                            {marketTrends.keyTrends.map((trend: string, idx: number) => (
                              <div key={idx} className="bg-white/5 p-3 rounded-lg text-white">
                                {trend}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3 text-white">Emerging Opportunities</h4>
                          <div className="space-y-2">
                            {marketTrends.emergingOpportunities.map((opp: string, idx: number) => (
                              <div key={idx} className="bg-white/5 p-3 rounded-lg text-white">
                                {opp}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 text-white">Investment Recommendations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {marketTrends.investmentRecommendations.map((rec: string, idx: number) => (
                            <div key={idx} className="bg-white/5 p-3 rounded-lg">
                              <div className="flex">
                                <Badge className="bg-moh-gold h-5 w-5 p-0 flex items-center justify-center mr-2 rounded-full shrink-0">
                                  {idx + 1}
                                </Badge>
                                <p className="text-white text-sm">{rec}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
