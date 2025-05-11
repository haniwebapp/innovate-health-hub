
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Loader2, TrendingUp, ArrowUpRight, ArrowDownRight, PieChart, DollarSign } from "lucide-react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentAIService, MarketAnalysis, MarketTrendParams } from "@/services/ai/InvestmentAIService";

// Placeholder data for charts
const sectorGrowthData = [
  { name: 'Digital Health', growth: 18.5 },
  { name: 'Med Devices', growth: 9.7 },
  { name: 'Biotech', growth: 12.8 },
  { name: 'Pharma', growth: 6.5 },
  { name: 'Healthcare IT', growth: 14.2 },
];

const investmentTrendsData = [
  { year: '2020', amount: 15 },
  { year: '2021', amount: 25 },
  { year: '2022', amount: 32 },
  { year: '2023', amount: 42 },
  { year: '2024', amount: 55 },
  { year: '2025', amount: 68 },
];

const fundingRoundsData = [
  { name: 'Pre-Seed', value: 7 },
  { name: 'Seed', value: 24 },
  { name: 'Series A', value: 18 },
  { name: 'Series B', value: 12 },
  { name: 'Series C+', value: 8 },
];

export default function DashboardMarketAnalysisPage() {
  const [activeSector, setActiveSector] = useState("digital-health");
  const [activeTimeframe, setActiveTimeframe] = useState("5-years");
  const [activeRegion, setActiveRegion] = useState("saudi-arabia");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  
  const { toast } = useToast();
  
  // Generate market analysis
  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    
    try {
      const params: MarketTrendParams = {
        sector: getSectorDisplayName(activeSector),
        timeframe: getTimeframeDisplayName(activeTimeframe),
        region: getRegionDisplayName(activeRegion)
      };
      
      const analysis = await InvestmentAIService.generateMarketAnalysis(params);
      
      if (analysis.error) {
        throw new Error(analysis.error);
      }
      
      setMarketAnalysis(analysis);
      setActiveTab("analysis");
      
      toast({
        title: "Market analysis complete",
        description: `Analysis for ${params.sector} in ${params.region} is ready.`
      });
    } catch (error: any) {
      console.error("Error generating market analysis:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message || "Failed to generate market analysis."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper functions to get display names
  const getSectorDisplayName = (value: string): string => {
    const map: Record<string, string> = {
      "digital-health": "Digital Health",
      "medical-devices": "Medical Devices",
      "biotech": "Biotechnology",
      "pharma": "Pharmaceuticals",
      "healthcare-it": "Healthcare IT",
      "telemedicine": "Telemedicine"
    };
    return map[value] || value;
  };
  
  const getTimeframeDisplayName = (value: string): string => {
    const map: Record<string, string> = {
      "1-year": "next year",
      "3-years": "next 3 years",
      "5-years": "next 5 years",
      "10-years": "next decade"
    };
    return map[value] || value;
  };
  
  const getRegionDisplayName = (value: string): string => {
    const map: Record<string, string> = {
      "saudi-arabia": "Saudi Arabia",
      "gcc": "GCC region",
      "mena": "MENA region",
      "global": "Global market"
    };
    return map[value] || value;
  };
  
  // Get trend icon based on trend direction
  const getTrendIcon = (trend: string) => {
    if (trend.includes('increasing')) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend.includes('decreasing')) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <ArrowUpRight className="h-4 w-4 text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Market Analysis" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment Hub", href: "/dashboard/investment" }
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Healthcare Market Analysis</h1>
        <p className="text-muted-foreground">
          Explore market trends and investment opportunities in the healthcare sector
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Market Analysis</CardTitle>
          <CardDescription>Select parameters to generate an AI-powered market analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Sector</label>
              <Select value={activeSector} onValueChange={setActiveSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital-health">Digital Health</SelectItem>
                  <SelectItem value="medical-devices">Medical Devices</SelectItem>
                  <SelectItem value="biotech">Biotechnology</SelectItem>
                  <SelectItem value="pharma">Pharmaceuticals</SelectItem>
                  <SelectItem value="healthcare-it">Healthcare IT</SelectItem>
                  <SelectItem value="telemedicine">Telemedicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Timeframe</label>
              <Select value={activeTimeframe} onValueChange={setActiveTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-year">Next Year</SelectItem>
                  <SelectItem value="3-years">Next 3 Years</SelectItem>
                  <SelectItem value="5-years">Next 5 Years</SelectItem>
                  <SelectItem value="10-years">Next Decade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <Select value={activeRegion} onValueChange={setActiveRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                  <SelectItem value="gcc">GCC</SelectItem>
                  <SelectItem value="mena">MENA</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                className="w-full bg-moh-green hover:bg-moh-darkGreen"
                onClick={handleGenerateAnalysis}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Generate Analysis
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted grid w-full grid-cols-2 md:grid-cols-4 h-11 items-stretch">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="trends">Investment Trends</TabsTrigger>
          <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sector Growth Rates</CardTitle>
                <CardDescription>Annual growth rates by healthcare sector</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="growth" fill="#00814A" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Funding</CardTitle>
                <CardDescription>Investment by round type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundingRoundsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00814A" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Market Statistics</CardTitle>
                <CardDescription>Healthcare market indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Market Size</span>
                    <span className="font-medium">$175.6B</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Annual Growth</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">12.5%</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Healthcare Spending % GDP</span>
                    <span className="font-medium">6.4%</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Top Investment Sectors</h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Digital Health</span>
                      <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">32%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medical Devices</span>
                      <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">24%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Biotech</span>
                      <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">18%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Regional Focus</h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Saudi Arabia</span>
                      <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">45%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">UAE</span>
                      <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">22%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other GCC</span>
                      <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">33%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Investment Trends</CardTitle>
                <CardDescription>Healthcare investment volume (in billions USD)</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}B`} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#00814A" 
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Investment Volume</CardTitle>
                <CardDescription>Healthcare investments over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}B`} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#00814A" 
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Key investment patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">Rising Sectors</h4>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Digital Health</span>
                      <Badge className="bg-green-500">+28%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Telemedicine</span>
                      <Badge className="bg-green-500">+34%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI in Healthcare</span>
                      <Badge className="bg-green-500">+42%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Investment Stages</h4>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Early Stage</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">58%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Growth Stage</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">32%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Late Stage</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">10%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-amber-500" />
                    <h4 className="font-medium">Average Deal Size</h4>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Seed</span>
                      <span className="font-medium">$1.2M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Series A</span>
                      <span className="font-medium">$5.8M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Series B</span>
                      <span className="font-medium">$14.5M</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sectors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Healthcare Sector Analysis</CardTitle>
                <CardDescription>Comparative growth and investment across healthcare sectors</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="growth" fill="#00814A" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Digital Health</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    18.5% YoY Growth
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Digital health continues to lead growth in healthcare investment, driven by telemedicine, remote monitoring, and AI-powered solutions.
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Segments</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Telemedicine</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Remote Monitoring</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">AI Diagnostics</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Digital Therapeutics</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Medical Devices</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    9.7% YoY Growth
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Innovation in medical devices focuses on miniaturization, connectivity, and integration with digital health platforms.
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Segments</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">IoMT Devices</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Wearables</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Point-of-Care</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Implantables</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Biotechnology</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    12.8% YoY Growth
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Biotech investments remain strong, with significant focus on genomics, precision medicine, and regenerative therapies.
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Segments</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Genomics</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Precision Medicine</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Cell Therapy</Badge>
                    <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">Biologics</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          {isLoading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-moh-green mb-4" />
                <h3 className="text-lg font-medium">Generating Market Analysis</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Analyzing {getSectorDisplayName(activeSector)} market trends in {getRegionDisplayName(activeRegion)}...
                </p>
              </CardContent>
            </Card>
          ) : marketAnalysis ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle>Market Analysis: {getSectorDisplayName(activeSector)}</CardTitle>
                      <CardDescription>
                        Analysis for {getRegionDisplayName(activeRegion)} over the {getTimeframeDisplayName(activeTimeframe)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Market Size</div>
                        <div className="font-medium">{marketAnalysis.marketSize}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Growth Rate</div>
                        <div className="font-medium flex items-center">
                          {marketAnalysis.growthRate}%
                          <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 mb-4">
                    <h3 className="font-medium">Market Summary</h3>
                    <p className="text-sm text-muted-foreground">{marketAnalysis.summary}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Key Market Trends</h3>
                        <ul className="space-y-2">
                          {marketAnalysis.keyTrends.map((trend, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <TrendingUp className="h-4 w-4 text-moh-green mt-0.5" />
                              <span>{trend}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Emerging Opportunities</h3>
                        <ul className="space-y-2">
                          {marketAnalysis.emergingOpportunities.map((opportunity, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Risk Factors</h3>
                        <ul className="space-y-2">
                          {marketAnalysis.riskFactors.map((risk, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <ArrowDownRight className="h-4 w-4 text-amber-500 mt-0.5" />
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <h3 className="font-medium mb-2">Vision 2030 Alignment</h3>
                        <p className="text-sm">{marketAnalysis.vision2030Alignment}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Competitive Landscape</CardTitle>
                  <CardDescription>Key players and market dynamics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Key Players</h3>
                      <div className="flex flex-wrap gap-2">
                        {marketAnalysis.competitiveLandscape.keyPlayers.map((player, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-50">
                            {player}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Barriers to Entry</h3>
                      <ul className="space-y-1">
                        {marketAnalysis.competitiveLandscape.barriers.map((barrier, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-moh-green">•</span>
                            <span>{barrier}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Regulatory Impact</h3>
                      <p className="text-sm">{marketAnalysis.regulatoryImpact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Investment Recommendations</CardTitle>
                  <CardDescription>Strategic guidance for investors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {marketAnalysis.investmentRecommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="bg-moh-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full mt-6 bg-moh-green hover:bg-moh-darkGreen">
                    Explore Investment Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <PieChart className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Analysis Generated Yet</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
                  Select your market parameters and click "Generate Analysis" to receive an AI-powered market analysis
                </p>
                <Button 
                  onClick={handleGenerateAnalysis}
                  className="mt-4 bg-moh-green hover:bg-moh-darkGreen"
                >
                  Generate Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
