
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Loader2, DollarSign, Users, ArrowRightCircle, Check, X, FileText, BarChart } from "lucide-react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentAIService, InnovationData, InvestorCriteria, MatchResult } from "@/services/ai/InvestmentAIService";

export default function DashboardInvestorMatchingPage() {
  const [activeTab, setActiveTab] = useState("form");
  const [isLoading, setIsLoading] = useState(false);
  const [innovationData, setInnovationData] = useState<InnovationData>({
    name: "",
    description: "",
    stage: "seed",
    sector: "digital-health"
  });
  const [investorCriteria, setInvestorCriteria] = useState<InvestorCriteria>({
    investmentFocus: [],
    investmentStage: [],
  });
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const { toast } = useToast();

  // Handle innovation form input changes
  const handleInnovationChange = (field: keyof InnovationData, value: string | number) => {
    setInnovationData(prev => ({ ...prev, [field]: value }));
  };

  // Handle investor criteria form input changes
  const handleInvestorCriteriaChange = (field: keyof InvestorCriteria, value: any) => {
    setInvestorCriteria(prev => ({ ...prev, [field]: value }));
  };

  // Handle multi-select arrays like investmentFocus
  const handleArraySelection = (field: keyof InvestorCriteria, value: string) => {
    setInvestorCriteria(prev => {
      const currentValues = prev[field] as string[] || [];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  // Generate the match analysis
  const handleGenerateMatch = async () => {
    if (!innovationData.name || !innovationData.description) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide at least the innovation name and description."
      });
      return;
    }

    setIsLoading(true);
    setActiveTab("results"); // Switch to results tab

    try {
      const result = await InvestmentAIService.generateMatchAnalysis(
        innovationData,
        Object.keys(investorCriteria).length > 0 ? investorCriteria : undefined
      );
      
      setMatchResult(result);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Match analysis complete",
        description: "Your innovation has been analyzed against investment criteria."
      });
    } catch (error: any) {
      console.error("Error generating match:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message || "Failed to generate investment match analysis."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Investor Matching" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment Hub", href: "/dashboard/investment" }
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Investor Matching Tool</h1>
        <p className="text-muted-foreground">
          Match your healthcare innovation against investor criteria to find the perfect funding partner
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted grid w-full grid-cols-2 h-11 items-stretch">
          <TabsTrigger value="form">Innovation Details</TabsTrigger>
          <TabsTrigger value="results">Match Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Healthcare Innovation</CardTitle>
                <CardDescription>Provide details about your innovation to generate a match analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Innovation Name*</label>
                  <Input 
                    id="name" 
                    value={innovationData.name} 
                    onChange={(e) => handleInnovationChange("name", e.target.value)}
                    placeholder="Enter your innovation name"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description*</label>
                  <Textarea 
                    id="description" 
                    value={innovationData.description}
                    onChange={(e) => handleInnovationChange("description", e.target.value)}
                    placeholder="Describe your healthcare innovation in detail"
                    className="h-32"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium mb-1">Sector</label>
                    <Select 
                      value={innovationData.sector}
                      onValueChange={(value) => handleInnovationChange("sector", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-health">Digital Health</SelectItem>
                        <SelectItem value="medical-devices">Medical Devices</SelectItem>
                        <SelectItem value="biotech">Biotech</SelectItem>
                        <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                        <SelectItem value="healthcare-services">Healthcare Services</SelectItem>
                        <SelectItem value="mental-health">Mental Health</SelectItem>
                        <SelectItem value="wellness">Wellness & Prevention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium mb-1">Stage</label>
                    <Select 
                      value={innovationData.stage}
                      onValueChange={(value) => handleInnovationChange("stage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="early-growth">Early Growth</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fundingNeeded" className="block text-sm font-medium mb-1">Funding Needed ($)</label>
                    <Input 
                      id="fundingNeeded" 
                      type="number" 
                      value={innovationData.fundingNeeded || ''} 
                      onChange={(e) => handleInnovationChange("fundingNeeded", parseFloat(e.target.value) || 0)}
                      placeholder="Amount in USD"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="teamSize" className="block text-sm font-medium mb-1">Team Size</label>
                    <Input 
                      id="teamSize" 
                      type="number"
                      value={innovationData.teamSize || ''}
                      onChange={(e) => handleInnovationChange("teamSize", parseInt(e.target.value) || 0)}
                      placeholder="Number of team members"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="traction" className="block text-sm font-medium mb-1">Traction / Validation</label>
                  <Textarea 
                    id="traction" 
                    value={innovationData.traction || ''}
                    onChange={(e) => handleInnovationChange("traction", e.target.value)}
                    placeholder="Describe any traction, customers, or validation you have"
                    className="h-20"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Investor Criteria (Optional)</CardTitle>
                <CardDescription>Specify investor criteria to match against, or leave blank for general analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="investmentFocus" className="block text-sm font-medium mb-1">Investment Focus</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "digital-health", label: "Digital Health" },
                      { value: "medical-devices", label: "Medical Devices" },
                      { value: "biotech", label: "Biotech" },
                      { value: "telemedicine", label: "Telemedicine" },
                      { value: "ai-healthcare", label: "AI in Healthcare" },
                      { value: "mental-health", label: "Mental Health" }
                    ].map(({ value, label }) => {
                      const isSelected = (investorCriteria.investmentFocus || []).includes(value);
                      return (
                        <Badge 
                          key={value}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${isSelected ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                          onClick={() => handleArraySelection("investmentFocus", value)}
                        >
                          {isSelected && <Check className="w-3 h-3 mr-1" />}
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="investmentStage" className="block text-sm font-medium mb-1">Investment Stage</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "pre-seed", label: "Pre-Seed" },
                      { value: "seed", label: "Seed" },
                      { value: "series-a", label: "Series A" },
                      { value: "series-b", label: "Series B" },
                      { value: "growth", label: "Growth" }
                    ].map(({ value, label }) => {
                      const isSelected = (investorCriteria.investmentStage || []).includes(value);
                      return (
                        <Badge 
                          key={value}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${isSelected ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                          onClick={() => handleArraySelection("investmentStage", value)}
                        >
                          {isSelected && <Check className="w-3 h-3 mr-1" />}
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="investmentSizeMin" className="block text-sm font-medium mb-1">Min Investment ($)</label>
                    <Input 
                      id="investmentSizeMin" 
                      type="number"
                      value={investorCriteria.investmentSizeMin || ''}
                      onChange={(e) => handleInvestorCriteriaChange("investmentSizeMin", parseFloat(e.target.value) || 0)}
                      placeholder="Minimum amount"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="investmentSizeMax" className="block text-sm font-medium mb-1">Max Investment ($)</label>
                    <Input 
                      id="investmentSizeMax" 
                      type="number"
                      value={investorCriteria.investmentSizeMax || ''}
                      onChange={(e) => handleInvestorCriteriaChange("investmentSizeMax", parseFloat(e.target.value) || 0)}
                      placeholder="Maximum amount"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="geographicFocus" className="block text-sm font-medium mb-1">Geographic Focus</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "saudi-arabia", label: "Saudi Arabia" },
                      { value: "gcc", label: "GCC" },
                      { value: "mena", label: "MENA" },
                      { value: "global", label: "Global" }
                    ].map(({ value, label }) => {
                      const isSelected = (investorCriteria.geographicFocus || []).includes(value);
                      return (
                        <Badge 
                          key={value}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${isSelected ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                          onClick={() => handleArraySelection("geographicFocus", value)}
                        >
                          {isSelected && <Check className="w-3 h-3 mr-1" />}
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleGenerateMatch}
                    className="w-full bg-moh-green hover:bg-moh-darkGreen"
                    disabled={isLoading || !innovationData.name || !innovationData.description}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Generate Match Analysis
                        <ArrowRightCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="results">
          {isLoading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-moh-green mb-4" />
                <h3 className="text-lg font-medium">Analyzing Your Innovation</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Our AI is evaluating investment potential and generating insights...
                </p>
              </CardContent>
            </Card>
          ) : matchResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Investment Match Score</CardTitle>
                  <CardDescription>AI-powered investment compatibility analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center py-4">
                    <div className="relative">
                      <svg className="w-40 h-40">
                        <circle
                          className="text-muted-foreground/20"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="60"
                          cx="80"
                          cy="80"
                        />
                        <circle
                          className="text-moh-green"
                          strokeWidth="10"
                          strokeDasharray={Math.PI * 120}
                          strokeDashoffset={Math.PI * 120 * (1 - matchResult.matchScore / 100)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="60"
                          cx="80"
                          cy="80"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold">{matchResult.matchScore}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Factors</h4>
                    <ul className="space-y-1">
                      {matchResult.mainReasons.map((reason, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <ArrowRightCircle className="h-4 w-4 text-moh-green shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Recommended Approach</h4>
                    <p className="text-sm mt-1">{matchResult.recommendedApproach}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Vision 2030 Alignment</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {matchResult.alignmentAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-moh-lightGreen text-moh-darkGreen border-moh-green/20">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>SWOT Analysis</CardTitle>
                  <CardDescription>Strategic analysis of your healthcare innovation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 bg-green-50/50">
                      <h4 className="font-medium text-green-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {matchResult.swotAnalysis.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-amber-50/50">
                      <h4 className="font-medium text-amber-700 flex items-center">
                        <X className="h-4 w-4 mr-2" />
                        Weaknesses
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {matchResult.swotAnalysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm">{weakness}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-blue-50/50">
                      <h4 className="font-medium text-blue-700 flex items-center">
                        <ArrowRightCircle className="h-4 w-4 mr-2" />
                        Opportunities
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {matchResult.swotAnalysis.opportunities.map((opportunity, index) => (
                          <li key={index} className="text-sm">{opportunity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-red-50/50">
                      <h4 className="font-medium text-red-700 flex items-center">
                        <X className="h-4 w-4 mr-2" />
                        Threats
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {matchResult.swotAnalysis.threats.map((threat, index) => (
                          <li key={index} className="text-sm">{threat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium">Key Metrics to Focus On</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {matchResult.keyMetrics.map((metric, index) => (
                        <Badge key={index} variant="outline" className="bg-moh-green/10 border-moh-green/30">
                          <BarChart className="h-3 w-3 mr-1" />
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>Recommended actions based on your analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center gap-2 h-auto py-3 justify-start">
                      <FileText className="h-5 w-5 text-moh-green" />
                      <div className="text-left">
                        <div className="font-medium">Generate Pitch Deck</div>
                        <div className="text-xs text-muted-foreground">Create investor materials</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 h-auto py-3 justify-start">
                      <Users className="h-5 w-5 text-moh-green" />
                      <div className="text-left">
                        <div className="font-medium">Find Matching Investors</div>
                        <div className="text-xs text-muted-foreground">Connect with potential funders</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 h-auto py-3 justify-start">
                      <DollarSign className="h-5 w-5 text-moh-green" />
                      <div className="text-left">
                        <div className="font-medium">Explore Funding Programs</div>
                        <div className="text-xs text-muted-foreground">View available opportunities</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Analysis Generated Yet</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
                  Complete the innovation details form and generate an analysis to see investment matching insights here
                </p>
                <Button 
                  onClick={() => setActiveTab("form")}
                  className="mt-4 bg-moh-green hover:bg-moh-darkGreen"
                >
                  Go to Innovation Form
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
