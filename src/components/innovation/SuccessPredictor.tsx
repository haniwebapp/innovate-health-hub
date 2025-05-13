
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Gauge, LineChart, Loader2, BarChart2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { 
  InnovationPredictiveService, 
  SuccessPredictionParams,
  SuccessPredictionResult 
} from "@/services/ai/innovation/InnovationPredictiveService";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SECTORS = [
  "Digital Health",
  "Medical Devices",
  "Telemedicine",
  "Healthcare AI",
  "Biotechnology",
  "Pharmaceuticals",
  "Healthcare Services",
  "Mental Health",
  "Preventive Care",
  "Remote Monitoring"
];

const TECHNOLOGIES = [
  "AI/Machine Learning",
  "IoT/Connected Devices",
  "Mobile Apps",
  "Cloud Computing",
  "Blockchain",
  "Big Data Analytics",
  "Robotics",
  "3D Printing",
  "AR/VR",
  "Wearables"
];

const TIMEFRAMES = [
  "Less than 6 months",
  "6-12 months",
  "1-2 years",
  "2-5 years",
  "More than 5 years"
];

export function SuccessPredictor() {
  const [params, setParams] = useState<SuccessPredictionParams>({
    title: "",
    description: "",
    sector: "",
    technology: [],
    targetUsers: [],
    implementationTimeframe: ""
  });
  const [result, setResult] = useState<SuccessPredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [targetUserInput, setTargetUserInput] = useState("");

  const handleTargetUserAdd = () => {
    if (targetUserInput && !params.targetUsers.includes(targetUserInput)) {
      setParams({
        ...params,
        targetUsers: [...params.targetUsers, targetUserInput]
      });
      setTargetUserInput("");
    }
  };

  const handleTechnologyToggle = (tech: string) => {
    if (params.technology.includes(tech)) {
      setParams({
        ...params,
        technology: params.technology.filter(t => t !== tech)
      });
    } else {
      setParams({
        ...params,
        technology: [...params.technology, tech]
      });
    }
  };

  const predictSuccess = async () => {
    if (!params.title || !params.description || !params.sector || params.technology.length === 0 || 
        params.targetUsers.length === 0 || !params.implementationTimeframe) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields to predict success probability."
      });
      return;
    }

    setIsLoading(true);
    try {
      const prediction = await InnovationPredictiveService.predictSuccessProbability(params);
      setResult(prediction);
      
      toast({
        title: "Analysis complete",
        description: "Success prediction analysis has been completed.",
      });
    } catch (error: any) {
      console.error("Error predicting success:", error);
      toast({
        variant: "destructive",
        title: "Prediction failed",
        description: error.message || "Failed to predict innovation success. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRiskLevel = (likelihood: number, impact: number) => {
    const riskScore = likelihood * impact / 10;
    if (riskScore >= 7) return "High";
    if (riskScore >= 4) return "Medium";
    return "Low";
  };

  const getRiskColor = (likelihood: number, impact: number) => {
    const level = getRiskLevel(likelihood, impact);
    if (level === "High") return "text-red-600";
    if (level === "Medium") return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gauge className="h-5 w-5 mr-2 text-moh-green" />
            Innovation Success Predictor
          </CardTitle>
          <CardDescription>
            Analyze your healthcare innovation's probability of success based on key factors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Innovation Title</label>
              <Input 
                id="title"
                placeholder="Enter the name of your innovation"
                value={params.title}
                onChange={(e) => setParams({...params, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sector" className="text-sm font-medium">Healthcare Sector</label>
              <Select 
                value={params.sector} 
                onValueChange={(value) => setParams({...params, sector: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select healthcare sector" />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((sector) => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Innovation Description</label>
            <Textarea 
              id="description"
              placeholder="Describe your innovation, its purpose, and how it works"
              rows={3}
              value={params.description}
              onChange={(e) => setParams({...params, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Technologies Used</label>
            <div className="flex flex-wrap gap-2">
              {TECHNOLOGIES.map((tech) => (
                <Badge 
                  key={tech}
                  variant={params.technology.includes(tech) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTechnologyToggle(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="targetUsers" className="text-sm font-medium">Target Users/Beneficiaries</label>
              <div className="flex space-x-2">
                <Input 
                  id="targetUsers"
                  placeholder="e.g., Elderly patients"
                  value={targetUserInput}
                  onChange={(e) => setTargetUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTargetUserAdd();
                    }
                  }}
                />
                <Button type="button" onClick={handleTargetUserAdd} className="shrink-0">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {params.targetUsers.map((user, index) => (
                  <Badge key={index} className="bg-moh-lightGreen">
                    {user}
                    <button 
                      className="ml-1 hover:text-red-500" 
                      onClick={() => setParams({
                        ...params,
                        targetUsers: params.targetUsers.filter((_, i) => i !== index)
                      })}
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="timeframe" className="text-sm font-medium">Implementation Timeframe</label>
              <Select 
                value={params.implementationTimeframe} 
                onValueChange={(value) => setParams({...params, implementationTimeframe: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEFRAMES.map((timeframe) => (
                    <SelectItem key={timeframe} value={timeframe}>{timeframe}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={predictSuccess} 
            disabled={isLoading} 
            className="flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <LineChart className="mr-2 h-4 w-4" />
                Predict Success Probability
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card className="border-moh-green/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 mr-2 text-moh-green" />
                  Success Prediction Results
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}%
                </div>
              </CardTitle>
              <CardDescription>
                AI-powered analysis of your innovation's success probability
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Low Probability</span>
                  <span>High Probability</span>
                </div>
                <Progress value={result.overallScore} className="h-3" indicatorClassName={getScoreProgressColor(result.overallScore)} />
              </div>
              
              {/* Success Factors */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Key Success Factors
                </h4>
                <div className="space-y-3">
                  {result.factors.map((factor, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{factor.name}</span>
                        <span className={getScoreColor(factor.score)}>{factor.score}%</span>
                      </div>
                      <Progress value={factor.score} className="h-2" indicatorClassName={getScoreProgressColor(factor.score)} />
                      <p className="text-xs text-gray-500">{factor.analysis}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Risks */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Potential Risks
                </h4>
                <div className="space-y-2">
                  {result.risks.map((risk, idx) => (
                    <Collapsible key={idx}>
                      <Card className="border shadow-none">
                        <CardHeader className="p-3 pb-0">
                          <CollapsibleTrigger className="flex justify-between items-center w-full text-left">
                            <div className="flex items-center">
                              <span className="font-medium">{risk.name}</span>
                              <Badge 
                                className="ml-2" 
                                variant="outline"
                              >
                                <span className={getRiskColor(risk.likelihood, risk.impact)}>
                                  {getRiskLevel(risk.likelihood, risk.impact)} Risk
                                </span>
                              </Badge>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="p-3 pt-2">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-xs text-gray-500">Likelihood</p>
                                  <Progress value={risk.likelihood * 10} className="h-2 mt-1" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Impact</p>
                                  <Progress value={risk.impact * 10} className="h-2 mt-1" />
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mt-2">Suggested Mitigation</p>
                                <p className="text-sm">{risk.mitigation}</p>
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </div>
              
              {/* Market Analysis */}
              <Card className="bg-muted/20 border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Similar Innovations Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Similar Innovations Found</span>
                    <span className="font-medium">{result.similarInnovationsAnalysis.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Success Rate</span>
                    <span className={`font-medium ${getScoreColor(result.similarInnovationsAnalysis.averageSuccessRate)}`}>
                      {result.similarInnovationsAnalysis.averageSuccessRate}%
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Key Differentiators</p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {result.similarInnovationsAnalysis.keyDifferentiators.map((diff, idx) => (
                        <li key={idx}>{diff}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <h4 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-blue-600" />
                  AI Recommendations
                </h4>
                <ul className="space-y-2 list-disc pl-5">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-blue-700">{rec}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
