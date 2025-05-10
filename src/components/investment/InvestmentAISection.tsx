
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';
import { AIMatchScoreCard } from '@/components/investment/AIMatchScoreCard';
import { Loader2, Zap, Brain, BarChart3, TrendingUp } from "lucide-react";
import { analyzeMarketTrends } from '@/utils/aiUtils';
import { useToast } from "@/components/ui/use-toast";

// Sample data - in a real app, this would come from an API or database
const aiMatchScores = [
  {
    name: "Connected Health Solutions Fund",
    score: 92,
    reason: "Strong alignment with your digital health focus and target market.",
    additionalInfo: [
      { label: "Investment Range", value: "$500K-2M" },
      { label: "Focus", value: "Digital Health" },
      { label: "Time to Decision", value: "4-6 weeks" }
    ]
  },
  {
    name: "Saudi Healthcare Innovation Fund",
    score: 86,
    reason: "Good fit for early-stage healthcare startups with traction.",
    additionalInfo: [
      { label: "Investment Range", value: "$1M-5M" },
      { label: "Focus", value: "Healthcare Tech" },
      { label: "Time to Decision", value: "6-8 weeks" }
    ]
  },
  {
    name: "Medical Device Growth Partners",
    score: 78,
    reason: "Potential match for hardware-focused healthcare solutions.",
    additionalInfo: [
      { label: "Investment Range", value: "$2M-10M" },
      { label: "Focus", value: "Medical Devices" },
      { label: "Time to Decision", value: "8-10 weeks" }
    ]
  }
];

const aiInsights = [
  "Digital health solutions focused on remote patient monitoring have seen a 34% increase in funding over the past quarter.",
  "The average investment size for AI-powered diagnostic tools has grown to $3.2M, a 28% increase year-over-year.",
  "Healthcare solutions integrating with Vision 2030 initiatives are receiving 40% faster investor interest and response.",
  "Regulatory-approved solutions are securing investment at 2.5x the rate of pre-approval innovations."
];

const marketTrendInsights = [
  "Telemedicine solutions have seen sustained growth with 47% higher adoption rates post-pandemic.",
  "AI-driven diagnostic tools are the fastest growing segment with 52% CAGR expected through 2027.",
  "Saudi investors are increasingly focused on solutions that address regional healthcare challenges.",
  "Preventive healthcare innovations are attracting 38% more funding than treatment-focused solutions."
];

export function InvestmentAISection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('matching');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate API call to analyze market trends
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed the latest market trends and investment opportunities.",
      });
    }, 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-purple-700 text-white mb-3">AI-POWERED</Badge>
          <h2 className="text-3xl font-bold mb-3">Smart Investment Intelligence</h2>
          <p className="max-w-2xl mx-auto text-purple-200">
            Leverage AI-powered analysis to find the best matches for your healthcare innovation or investment strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-6 h-full">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-700/50 p-3 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">AI Investment Assistant</h3>
                  <p className="text-purple-200 text-sm">Intelligent analysis and matching</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-purple-100">
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
                  <label className="block text-sm font-medium mb-1.5 text-purple-100">
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
                  <label className="block text-sm font-medium mb-1.5 text-purple-100">
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
                  <label className="block text-sm font-medium mb-1.5 text-purple-100">
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
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
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
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Investment Matches
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  AI Insights
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
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
                
                {aiMatchScores.map((match, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{match.name}</h3>
                      <Badge className={`${match.score > 85 ? 'bg-green-600' : match.score > 75 ? 'bg-amber-500' : 'bg-white/30'}`}>
                        {match.score}% Match
                      </Badge>
                    </div>
                    <p className="text-purple-200 mb-3">{match.reason}</p>
                    
                    {match.additionalInfo && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {match.additionalInfo.map((info, i) => (
                          <div key={i} className="bg-white/5 p-2 rounded text-center">
                            <p className="text-xs text-purple-200">{info.label}</p>
                            <p className="font-medium">{info.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="w-full bg-white/5 rounded-full h-2 mb-1">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-indigo-400 h-2 rounded-full" 
                        style={{ width: `${match.score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-purple-200">
                      <span>Low match</span>
                      <span>High match</span>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="insights">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-300" />
                    <h3 className="text-xl font-medium">AI Investment Insights</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-lg">
                        <div className="flex">
                          <span className="flex h-6 w-6 mr-3 rounded-full bg-purple-600/50 items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <p>{insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-indigo-300" />
                      Recommendation
                    </h4>
                    <p className="text-purple-100">
                      Based on current trends, focus on solutions that integrate with existing healthcare systems and address specific regional needs for the highest investment potential.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-300" />
                    <h3 className="text-xl font-medium">Healthcare Investment Trends</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-100 mb-1">Digital Health</h4>
                      <div className="flex items-end space-x-1 h-32 mt-4 mb-2">
                        <div className="bg-purple-500/70 w-1/5 h-[20%] rounded-t"></div>
                        <div className="bg-purple-500/70 w-1/5 h-[30%] rounded-t"></div>
                        <div className="bg-purple-500/70 w-1/5 h-[45%] rounded-t"></div>
                        <div className="bg-purple-500/70 w-1/5 h-[60%] rounded-t"></div>
                        <div className="bg-purple-500/70 w-1/5 h-[80%] rounded-t"></div>
                      </div>
                      <p className="text-sm text-purple-200">+45% YoY Growth</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-100 mb-1">Medical Devices</h4>
                      <div className="flex items-end space-x-1 h-32 mt-4 mb-2">
                        <div className="bg-indigo-500/70 w-1/5 h-[40%] rounded-t"></div>
                        <div className="bg-indigo-500/70 w-1/5 h-[38%] rounded-t"></div>
                        <div className="bg-indigo-500/70 w-1/5 h-[45%] rounded-t"></div>
                        <div className="bg-indigo-500/70 w-1/5 h-[50%] rounded-t"></div>
                        <div className="bg-indigo-500/70 w-1/5 h-[58%] rounded-t"></div>
                      </div>
                      <p className="text-sm text-purple-200">+22% YoY Growth</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {marketTrendInsights.map((insight, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg">
                        <p className="text-sm flex">
                          <TrendingUp className="h-4 w-4 mr-2 text-blue-300 flex-shrink-0 mt-0.5" />
                          <span>{insight}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Market Outlook</h4>
                    <p className="text-purple-100">
                      The Saudi healthcare investment market is projected to grow by 32% over the next two years, with digital health solutions and AI-driven diagnostics leading the expansion.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
