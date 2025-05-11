
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, ArrowUpRight, MessageSquare, ChevronRight, BarChart3, ArrowDown } from "lucide-react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentAIService, InnovationData, Vision2030Alignment } from "@/services/ai/InvestmentAIService";

export default function DashboardVision2030AlignmentPage() {
  const [innovationData, setInnovationData] = useState<InnovationData>({
    name: "",
    description: "",
    stage: "seed",
    sector: "digital-health"
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alignmentResult, setAlignmentResult] = useState<Vision2030Alignment | null>(null);
  const { toast } = useToast();

  // Handle form input changes
  const handleInnovationChange = (field: keyof InnovationData, value: string | number) => {
    setInnovationData(prev => ({ ...prev, [field]: value }));
  };

  // Generate Vision 2030 alignment analysis
  const handleAnalyzeAlignment = async () => {
    if (!innovationData.name || !innovationData.description) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide at least the innovation name and description."
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await InvestmentAIService.analyzeVision2030Alignment(innovationData);
      
      setAlignmentResult(result);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Analysis complete",
        description: "Your innovation has been analyzed for Vision 2030 alignment."
      });
    } catch (error: any) {
      console.error("Error analyzing Vision 2030 alignment:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message || "Failed to analyze Vision 2030 alignment."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Get color based on alignment score
  const getAlignmentColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Vision 2030 Alignment" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment Hub", href: "/dashboard/investment" }
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vision 2030 Alignment</h1>
        <p className="text-muted-foreground">
          Analyze how well your healthcare innovation aligns with Saudi Vision 2030 goals
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Healthcare Innovation Details</CardTitle>
            <CardDescription>Provide information about your innovation for analysis</CardDescription>
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
              <label htmlFor="stage" className="block text-sm font-medium mb-1">Development Stage</label>
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
            
            <div>
              <label htmlFor="additional" className="block text-sm font-medium mb-1">Additional Information (Optional)</label>
              <Textarea 
                id="additional" 
                value={innovationData.additionalInfo || ''}
                onChange={(e) => handleInnovationChange("additionalInfo", e.target.value)}
                placeholder="Any other relevant information about your innovation"
                className="h-20"
              />
            </div>
            
            <Button 
              onClick={handleAnalyzeAlignment}
              className="w-full bg-moh-green hover:bg-moh-darkGreen"
              disabled={isAnalyzing || !innovationData.name || !innovationData.description}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Vision 2030 Alignment
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          {isAnalyzing ? (
            <CardContent className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-moh-green mb-4" />
              <h3 className="text-lg font-medium">Analyzing Vision 2030 Alignment</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Evaluating how your innovation supports Saudi Arabia's healthcare transformation goals...
              </p>
            </CardContent>
          ) : alignmentResult ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Vision 2030 Alignment Analysis</CardTitle>
                    <CardDescription>AI-powered assessment of alignment with Saudi Vision 2030 healthcare goals</CardDescription>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${getAlignmentColor(alignmentResult.alignmentScore)}`}>
                      {alignmentResult.alignmentScore}%
                    </span>
                    <p className="text-xs text-muted-foreground">Alignment Score</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-moh-green" />
                    Primary Areas of Alignment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {alignmentResult.alignmentAreas.map((area, index) => (
                      <div key={index} className="flex items-center space-x-2 border rounded-md p-2 bg-moh-lightGreen/10">
                        <CheckCircle2 className="h-4 w-4 text-moh-green flex-shrink-0" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Vision 2030 Healthcare Objectives Addressed
                  </h3>
                  <div className="space-y-2">
                    {alignmentResult.vision2030Objectives.map((objective, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-moh-green text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm">{objective}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Areas for Improvement
                    </h3>
                    <div className="space-y-2">
                      {alignmentResult.improvementAreas.map((area, index) => (
                        <div key={index} className="flex items-start">
                          <ArrowDown className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{area}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Recommendations to Enhance Alignment
                    </h3>
                    <div className="space-y-2">
                      {alignmentResult.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start">
                          <ArrowUpRight className="h-4 w-4 text-moh-green mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Potential Impact on Vision 2030 Healthcare KPIs
                  </h3>
                  <div className="bg-moh-lightGreen/20 p-3 rounded-md border border-moh-green/20">
                    <p className="text-sm">{alignmentResult.potentialImpact}</p>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-20">
              <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Analysis Generated Yet</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
                Complete the innovation details form and generate an analysis to see Vision 2030 alignment insights
              </p>
            </CardContent>
          )}
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vision 2030 Healthcare Transformation Resources</CardTitle>
          <CardDescription>Learn more about Saudi Vision 2030 healthcare goals and alignment</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border rounded-xl p-4 flex flex-col h-full">
            <div className="bg-moh-lightGreen w-10 h-10 rounded-md flex items-center justify-center mb-3">
              <BarChart3 className="h-5 w-5 text-moh-green" />
            </div>
            <h3 className="font-medium mb-1">Healthcare Sector Transformation Strategy</h3>
            <p className="text-sm text-muted-foreground mb-auto">
              Learn about the key initiatives to transform healthcare delivery in Saudi Arabia by 2030.
            </p>
            <Button variant="outline" size="sm" className="mt-4 flex items-center gap-1">
              View Strategy
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-slate-50 border rounded-xl p-4 flex flex-col h-full">
            <div className="bg-moh-lightGreen w-10 h-10 rounded-md flex items-center justify-center mb-3">
              <BarChart3 className="h-5 w-5 text-moh-green" />
            </div>
            <h3 className="font-medium mb-1">Healthcare Investment Priorities</h3>
            <p className="text-sm text-muted-foreground mb-auto">
              Explore the priority areas for healthcare investment aligned with Vision 2030 goals.
            </p>
            <Button variant="outline" size="sm" className="mt-4 flex items-center gap-1">
              View Priorities
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-slate-50 border rounded-xl p-4 flex flex-col h-full">
            <div className="bg-moh-lightGreen w-10 h-10 rounded-md flex items-center justify-center mb-3">
              <BarChart3 className="h-5 w-5 text-moh-green" />
            </div>
            <h3 className="font-medium mb-1">Vision 2030 KPI Framework</h3>
            <p className="text-sm text-muted-foreground mb-auto">
              Access the key performance indicators for measuring Vision 2030 healthcare success.
            </p>
            <Button variant="outline" size="sm" className="mt-4 flex items-center gap-1">
              View Framework
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
