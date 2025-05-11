
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, BarChart2, ArrowUpRight, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PolicyAIService, PolicyData, PolicyImpactResult } from "@/services/ai/PolicyAIService";
import { Progress } from "@/components/ui/progress";

export function PolicyImpactSimulator() {
  const [policyData, setPolicyData] = useState<PolicyData>({
    name: "",
    description: "",
    sector: "healthcare",
    stakeholders: []
  });
  
  const [simulationParams, setSimulationParams] = useState({
    timeframe: "5 years",
    region: "Saudi Arabia"
  });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<PolicyImpactResult | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PolicyData, value: any) => {
    setPolicyData(prev => ({ ...prev, [field]: value }));
  };

  const handleParamChange = (field: keyof typeof simulationParams, value: string) => {
    setSimulationParams(prev => ({ ...prev, [field]: value }));
  };

  const handleStakeholderInput = (value: string) => {
    // Add stakeholder only if not empty and not already in the list
    if (value.trim() && !policyData.stakeholders?.includes(value.trim())) {
      setPolicyData(prev => ({
        ...prev,
        stakeholders: [...(prev.stakeholders || []), value.trim()]
      }));
    }
  };

  const removeStakeholder = (stakeholder: string) => {
    setPolicyData(prev => ({
      ...prev,
      stakeholders: prev.stakeholders?.filter(s => s !== stakeholder) || []
    }));
  };

  const handleRunSimulation = async () => {
    if (!policyData.name || !policyData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and description for the policy.",
        variant: "destructive"
      });
      return;
    }

    setIsSimulating(true);
    try {
      const impactResult = await PolicyAIService.simulatePolicyImpact(policyData, simulationParams);
      setResult(impactResult);
      
      toast({
        title: "Simulation Complete",
        description: "Policy impact simulation has been generated.",
      });
    } catch (error: any) {
      console.error("Error simulating policy impact:", error);
      toast({
        title: "Simulation Error",
        description: error.message || "An error occurred during simulation",
        variant: "destructive"
      });
    } finally {
      setIsSimulating(false);
    }
  };

  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    if (score >= 25) return "bg-orange-500"; 
    return "bg-red-500";
  };
  
  // Helper to get text color based on score
  const getTextColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    if (score >= 25) return "text-orange-500"; 
    return "text-red-500";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-moh-green/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-moh-blue" />
            Policy Impact Simulator
          </CardTitle>
          <CardDescription>
            Simulate the potential impact of healthcare policies across various stakeholders and metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="policy-name">Policy Name</Label>
            <Input
              id="policy-name"
              value={policyData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter name of policy"
            />
          </div>
          
          <div>
            <Label htmlFor="policy-sector">Sector</Label>
            <Select 
              value={policyData.sector} 
              onValueChange={(value) => handleInputChange('sector', value)}
            >
              <SelectTrigger id="policy-sector">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="policy-description">Description</Label>
            <Textarea
              id="policy-description"
              value={policyData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the policy in detail"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="policy-stakeholders">Stakeholders (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="policy-stakeholders"
                placeholder="Add a stakeholder and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleStakeholderInput((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <Button 
                variant="outline" 
                onClick={(e) => {
                  const input = document.getElementById('policy-stakeholders') as HTMLInputElement;
                  handleStakeholderInput(input.value);
                  input.value = '';
                }}
              >
                Add
              </Button>
            </div>
            
            {policyData.stakeholders && policyData.stakeholders.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {policyData.stakeholders.map((stakeholder, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-1">
                    {stakeholder}
                    <button 
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => removeStakeholder(stakeholder)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select 
                value={simulationParams.timeframe} 
                onValueChange={(value) => handleParamChange('timeframe', value)}
              >
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 year">1 year</SelectItem>
                  <SelectItem value="3 years">3 years</SelectItem>
                  <SelectItem value="5 years">5 years</SelectItem>
                  <SelectItem value="10 years">10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="region">Region</Label>
              <Select 
                value={simulationParams.region} 
                onValueChange={(value) => handleParamChange('region', value)}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                  <SelectItem value="GCC">Gulf Cooperation Council</SelectItem>
                  <SelectItem value="Middle East">Middle East</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleRunSimulation} 
            disabled={isSimulating || !policyData.name || !policyData.description}
            className="w-full"
          >
            {isSimulating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Simulation...
              </>
            ) : (
              'Run Impact Simulation'
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-moh-green/20">
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>
            Projected impact analysis across stakeholders, economics, and healthcare outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] overflow-y-auto">
          {isSimulating ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-moh-blue mb-4" />
              <p className="text-muted-foreground">Simulating policy impact...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Overall Impact Score</h3>
                <Badge 
                  className={`${getScoreColor(result.impactScore)} px-3 py-1 text-white`}
                >
                  {result.impactScore}/100
                </Badge>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium border-b pb-2">Stakeholder Impact</h3>
                
                {Object.entries(result.stakeholderImpact).map(([stakeholder, data]) => (
                  <div key={stakeholder} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium capitalize">{stakeholder}</h4>
                      <span className={getTextColor(data.score)}>{data.score}/100</span>
                    </div>
                    <Progress 
                      value={data.score} 
                      max={100}
                      className={`h-2 ${getScoreColor(data.score)}`} 
                    />
                    <p className="text-sm text-muted-foreground">{data.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-md font-medium border-b pb-2">Economic Impact</h3>
                <p className="text-sm">{result.economicImpact}</p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-md font-medium border-b pb-2">Healthcare Outcome Impact</h3>
                <p className="text-sm">{result.healthcareOutcomeImpact}</p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-md font-medium border-b pb-2">Implementation Complexity</h3>
                <p className="text-sm">{result.implementationComplexity}</p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-md font-medium border-b pb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 text-moh-blue mt-1 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <BarChart2 className="h-12 w-12 text-moh-blue/30 mb-4" />
              <p className="text-muted-foreground">Enter policy details and run the simulation to see impact results</p>
            </div>
          )}
        </CardContent>
        {result && (
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              Export Full Report
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
