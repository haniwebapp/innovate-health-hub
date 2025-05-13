
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Activity, Target, TrendingUp, Check, AlertCircle } from "lucide-react";
import { PolicyAIService, StrategyGapParams } from "@/services/ai/PolicyAIService";

const sampleData = [
  { category: 'Quality of Care', current: 65, target: 90, gap: 25 },
  { category: 'Digital Health', current: 40, target: 85, gap: 45 },
  { category: 'Workforce', current: 55, target: 75, gap: 20 },
  { category: 'Accessibility', current: 60, target: 80, gap: 20 },
  { category: 'Preventive Care', current: 45, target: 90, gap: 45 },
];

const radarData = [
  { subject: 'Vision Alignment', A: 85, B: 55, fullMark: 100 },
  { subject: 'Implementation', A: 70, B: 40, fullMark: 100 },
  { subject: 'Stakeholder Buy-in', A: 60, B: 45, fullMark: 100 },
  { subject: 'Resource Allocation', A: 75, B: 50, fullMark: 100 },
  { subject: 'Measurable Outcomes', A: 80, B: 35, fullMark: 100 },
];

export function StrategyAnalytics() {
  const [activeTab, setActiveTab] = useState('gaps');
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [desiredState, setDesiredState] = useState("");
  const [gapAnalysisData, setGapAnalysisData] = useState<any>(null);
  const { toast } = useToast();

  const runGapAnalysis = async () => {
    if (!policyTitle || !policyDescription || !objectives) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAnalysisLoading(true);
    try {
      const params: StrategyGapParams = {
        policyDetails: {
          title: policyTitle,
          description: policyDescription,
          objectives: objectives.split('\n').filter(o => o.trim())
        },
        currentState,
        desiredState
      };

      const result = await PolicyAIService.analyzeStrategyGaps(params);
      setGapAnalysisData(result);
      
      toast({
        title: "Analysis Complete",
        description: "Strategy gap analysis has been completed successfully.",
      });
    } catch (error: any) {
      console.error("Error analyzing strategy gaps:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "Failed to analyze strategy gaps.",
        variant: "destructive",
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <Card className="border-moh-green/20">
      <CardHeader>
        <CardTitle className="text-moh-darkGreen flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Strategy Analytics
        </CardTitle>
        <CardDescription>
          Analyze strategy gaps and alignment with Vision 2030 goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="alignment">Vision Alignment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gaps" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Policy Title *</label>
                  <Input 
                    placeholder="Enter policy title" 
                    value={policyTitle}
                    onChange={(e) => setPolicyTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Policy Description *</label>
                  <Textarea 
                    placeholder="Describe the policy strategy" 
                    className="min-h-[80px]"
                    value={policyDescription}
                    onChange={(e) => setPolicyDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Objectives (one per line) *</label>
                  <Textarea 
                    placeholder="List main objectives (one per line)" 
                    className="min-h-[100px]"
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Current State (Optional)</label>
                  <Textarea 
                    placeholder="Describe the current state" 
                    className="min-h-[80px]"
                    value={currentState}
                    onChange={(e) => setCurrentState(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Desired State (Optional)</label>
                  <Textarea 
                    placeholder="Describe the desired state" 
                    className="min-h-[80px]"
                    value={desiredState}
                    onChange={(e) => setDesiredState(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={runGapAnalysis}
                  disabled={analysisLoading}
                >
                  {analysisLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-4 w-4" />
                      Run Gap Analysis
                    </>
                  )}
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Strategy Gap Visualization</h3>
                {gapAnalysisData ? (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/20">
                      <h4 className="font-medium mb-2">Overall Analysis</h4>
                      <p className="text-muted-foreground text-sm">{gapAnalysisData.overallAnalysis}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Identified Gaps</h4>
                      <div className="space-y-2">
                        {gapAnalysisData.gaps.map((gap: any, i: number) => (
                          <div key={i} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium">{gap.title}</h5>
                              <Badge className={
                                gap.severity === 'high' ? 'bg-red-100 text-red-800' :
                                gap.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }>
                                {gap.severity} severity
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{gap.description}</p>
                            <p className="text-xs text-muted-foreground border-t pt-2">
                              <span className="font-medium">Impact:</span> {gap.potentialImpact}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {gapAnalysisData.recommendations.map((rec: string, i: number) => (
                          <li key={i} className="flex items-start text-sm">
                            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="current" name="Current State" fill="#94e2cd" />
                        <Bar dataKey="target" name="Target State" fill="#38a169" />
                        <Bar dataKey="gap" name="Gap" fill="#eab308" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                      <AlertCircle className="inline mr-2 h-4 w-4" />
                      Fill out the form and run analysis to see your custom gap analysis
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Implementation Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">67%</div>
                    <p className="text-xs text-muted-foreground mt-1">+12% from last quarter</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Stakeholder Adoption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-600">54%</div>
                    <p className="text-xs text-muted-foreground mt-1">+7% from last quarter</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Vision Alignment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">82%</div>
                    <p className="text-xs text-muted-foreground mt-1">+5% from last quarter</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Strategy Implementation Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Target" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Radar name="Current" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alignment">
            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-moh-glassGreen">
                <h3 className="text-lg font-medium mb-2">Vision 2030 Key Pillars</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze how your strategy aligns with the core pillars of Saudi Vision 2030
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/80 rounded-lg">
                    <h4 className="font-medium text-center mb-2">Vibrant Society</h4>
                    <div className="flex justify-center mb-2">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                          78%
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eee"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#38a169"
                            strokeWidth="3"
                            strokeDasharray="78, 100"
                            strokeDashoffset="0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      Strong alignment with healthcare quality goals
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-lg">
                    <h4 className="font-medium text-center mb-2">Thriving Economy</h4>
                    <div className="flex justify-center mb-2">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                          64%
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eee"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eab308"
                            strokeWidth="3"
                            strokeDasharray="64, 100"
                            strokeDashoffset="0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      Moderate alignment with economic development
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-lg">
                    <h4 className="font-medium text-center mb-2">Ambitious Nation</h4>
                    <div className="flex justify-center mb-2">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                          81%
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eee"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeDasharray="81, 100"
                            strokeDashoffset="0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      Strong alignment with governance excellence
                    </div>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vision 2030 Health Targets Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'Life Expectancy', target: 95, current: 72 },
                      { name: 'Quality of Care', target: 90, current: 68 },
                      { name: 'Digital Health', target: 88, current: 58 },
                      { name: 'Healthcare Access', target: 92, current: 74 },
                      { name: 'Preventive Care', target: 85, current: 62 },
                    ]} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current Progress" fill="#94e2cd" />
                      <Bar dataKey="target" name="2030 Target" fill="#38a169" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
