
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StrategyGapService } from "@/services/ai/policy/StrategyGapService";
import { BenchmarkData, StrategyGapAnalysisResult, StrategyMetric } from "@/services/ai/policy/types";
import { BarChart } from "@/components/ui/bar-chart";
import { Loader2, ArrowRight, AlertTriangle, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export function StrategyGapAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string | null>(null);
  const [benchmarks, setBenchmarks] = useState<BenchmarkData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<StrategyMetric[]>([]);
  const [analysisResult, setAnalysisResult] = useState<StrategyGapAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("benchmark");
  const { toast } = useToast();

  // Load benchmarks and current metrics
  const loadInitialData = async () => {
    try {
      setLoading(true);
      const benchmarksData = await StrategyGapService.getAvailableBenchmarks();
      const metricsData = await StrategyGapService.getCurrentStrategyMetrics();
      
      setBenchmarks(benchmarksData);
      setCurrentMetrics(metricsData);
      if (benchmarksData.length > 0) {
        setActiveBenchmarkId(benchmarksData[0].id);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: error.message || "Could not load benchmarks and metrics"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle benchmark selection
  const handleBenchmarkSelect = (value: string) => {
    setActiveBenchmarkId(value);
  };

  // Run the gap analysis
  const runAnalysis = async () => {
    if (!activeBenchmarkId) {
      toast({
        variant: "destructive",
        title: "No benchmark selected",
        description: "Please select a benchmark to compare against"
      });
      return;
    }

    try {
      setLoading(true);
      const result = await StrategyGapService.analyzeStrategyGaps(currentMetrics, activeBenchmarkId);
      setAnalysisResult(result);
      setActiveTab("results");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message || "Could not complete the gap analysis"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data on first render
  useState(() => {
    loadInitialData();
  });

  // Function to get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-amber-500 text-white";
      case "medium": return "bg-amber-300 text-amber-950";
      case "low": return "bg-green-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Get active benchmark name
  const activeBenchmarkName = benchmarks.find(b => b.id === activeBenchmarkId)?.name || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Strategy Gap Analyzer
        </CardTitle>
        <CardDescription>
          Compare your healthcare strategy against global and regional benchmarks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="benchmark">Select Benchmark</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisResult}>Results</TabsTrigger>
            <TabsTrigger value="recommendations" disabled={!analysisResult}>Recommendations</TabsTrigger>
          </TabsList>

          {/* Benchmark Selection Tab */}
          <TabsContent value="benchmark">
            <div className="space-y-6">
              {loading && !benchmarks.length ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Loading benchmarks...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mt-4">
                    <h3 className="text-md font-medium">Select a benchmark to compare against</h3>
                    <Select value={activeBenchmarkId || ''} onValueChange={handleBenchmarkSelect}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a benchmark" />
                      </SelectTrigger>
                      <SelectContent>
                        {benchmarks.map((benchmark) => (
                          <SelectItem key={benchmark.id} value={benchmark.id}>
                            {benchmark.name} ({benchmark.source})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {activeBenchmarkId && (
                    <>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Current Strategy Metrics</h3>
                        <div className="space-y-3">
                          {currentMetrics.map((metric) => (
                            <div key={metric.id} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{metric.name}</span>
                                <span className="font-medium">{metric.currentValue}{metric.unit}</span>
                              </div>
                              <Progress value={(metric.currentValue / metric.targetValue) * 100} />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Current</span>
                                <span>Target: {metric.targetValue}{metric.unit}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={runAnalysis}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            Analyze Gaps
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            {analysisResult && (
              <div className="space-y-6 mt-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="text-3xl font-bold">
                    {analysisResult.overallScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall alignment with {analysisResult.benchmarkSource}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Category Performance</h3>
                  <div className="space-y-4">
                    {analysisResult.categoryScores.map((category) => (
                      <div key={category.category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{category.category}</span>
                          <span className="font-medium">{category.score}%</span>
                        </div>
                        <Progress value={category.score} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Gap Details</h3>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {analysisResult.gaps.map((gap) => (
                      <div key={gap.metricId} className="border rounded p-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{gap.metricName}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(gap.priority)}`}>
                            {gap.priority}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <div className="flex-1">
                            <span className="text-muted-foreground">Current</span>
                            <div className="font-medium">{gap.currentValue}</div>
                          </div>
                          <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <span className="text-muted-foreground">Benchmark</span>
                            <div className="font-medium">{gap.benchmarkValue}</div>
                          </div>
                          <div className="flex-1 text-right">
                            <span className="text-muted-foreground">Gap</span>
                            <div className={`font-medium ${gap.gap > 0 ? "text-destructive" : "text-green-600"}`}>
                              {gap.gap > 0 ? "+" : ""}{gap.gap} ({Math.abs(gap.gapPercentage).toFixed(1)}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            {analysisResult && (
              <div className="space-y-6 mt-4">
                <h3 className="text-lg font-medium">Recommended Actions</h3>
                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded-full ${rec.timeframe === 'short' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                          {rec.timeframe === 'short' ? 
                            <AlertTriangle className="h-4 w-4 text-orange-600" /> : 
                            <Check className="h-4 w-4 text-blue-600" />
                          }
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium">{rec.category}</span>
                            <span className="ml-2 text-xs px-2 py-0.5 bg-muted rounded-full">
                              {rec.timeframe === 'short' ? 'Short-term' : rec.timeframe === 'medium' ? 'Medium-term' : 'Long-term'}
                            </span>
                          </div>
                          <p className="text-sm">{rec.description}</p>
                          <p className="text-xs text-muted-foreground">Expected impact: {rec.expectedImpact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium">Next Steps</h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      Review recommendations with stakeholders
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      Prioritize actions based on impact and feasibility
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      Develop an implementation roadmap with clear milestones
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
