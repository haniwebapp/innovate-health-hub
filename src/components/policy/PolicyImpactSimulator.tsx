
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BarChart2, ArrowUpRight } from "lucide-react";
import { PolicyAIService, PolicyData, PolicyImpactResult } from "@/services/ai/PolicyAIService";
import { SimulationForm } from "./policy-impact/SimulationForm";
import { SimulationResults } from "./policy-impact/SimulationResults";
import { initialPolicyData, initialSimulationParams } from "./policy-impact/utils";

export function PolicyImpactSimulator() {
  const [policyData, setPolicyData] = useState<PolicyData>(initialPolicyData);
  const [simulationParams, setSimulationParams] = useState(initialSimulationParams);
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
      const impactResult = await PolicyAIService.simulateImpact(policyData, simulationParams);
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
          <SimulationForm 
            policyData={policyData}
            simulationParams={simulationParams}
            isSimulating={isSimulating}
            onPolicyChange={handleInputChange}
            onParamChange={handleParamChange}
            onStakeholderInput={handleStakeholderInput}
            onRemoveStakeholder={removeStakeholder}
            onRunSimulation={handleRunSimulation}
          />
        </CardContent>
      </Card>
      
      <Card className="border-moh-green/20">
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>
            Projected impact analysis across stakeholders, economics, and healthcare outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] overflow-y-auto">
          <SimulationResults 
            isSimulating={isSimulating}
            result={result}
          />
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
