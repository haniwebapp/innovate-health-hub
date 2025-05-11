
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertTriangle, BarChart3, Download, PieChart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type MetricData = {
  name: string;
  current: number;
  projected: number;
}

type SimulationResult = {
  costSavings: number;
  accessImprovement: number;
  qualityImprovement: number;
  implementationTime: number;
  chartData: {
    timeline: { name: string; baseline: number; projected: number; }[];
    metrics: MetricData[];
  };
}

export function PolicyImpactSimulator() {
  const [activeTab, setActiveTab] = useState("parameters");
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyScope, setPolicyScope] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  
  // Parameters
  const [publicPrivateBalance, setPublicPrivateBalance] = useState(50);
  const [technologyAdoption, setTechnologyAdoption] = useState(70);
  const [geographicCoverage, setGeographicCoverage] = useState("urban");
  const [includePHC, setIncludePHC] = useState(true);
  const [includeHospitals, setIncludeHospitals] = useState(true);
  const [includeSpecialty, setIncludeSpecialty] = useState(false);
  
  const handleSimulate = () => {
    if (!policyTitle || !policyScope || !policyType) return;
    
    setIsSimulating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock simulation results based on parameters
      const mockResults: SimulationResult = {
        costSavings: 15 + (technologyAdoption / 10),
        accessImprovement: publicPrivateBalance * 0.3,
        qualityImprovement: technologyAdoption * 0.2,
        implementationTime: 24 - (technologyAdoption * 0.1),
        chartData: {
          timeline: [
            { name: "Year 1", baseline: 100, projected: 100 },
            { name: "Year 2", baseline: 105, projected: 110 + (publicPrivateBalance * 0.1) },
            { name: "Year 3", baseline: 110, projected: 125 + (technologyAdoption * 0.2) },
            { name: "Year 4", baseline: 115, projected: 140 + (publicPrivateBalance * 0.2) },
            { name: "Year 5", baseline: 120, projected: 160 + (technologyAdoption * 0.3) },
          ],
          metrics: [
            { name: "Cost Efficiency", current: 100, projected: 100 + (15 + (technologyAdoption / 10)) },
            { name: "Access", current: 100, projected: 100 + (publicPrivateBalance * 0.3) },
            { name: "Quality", current: 100, projected: 100 + (technologyAdoption * 0.2) },
            { name: "Patient Satisfaction", current: 75, projected: 75 + (publicPrivateBalance * 0.2) + (technologyAdoption * 0.1) },
          ]
        }
      };
      
      setSimulationResults(mockResults);
      setIsSimulating(false);
      setActiveTab("results");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Policy Impact Simulator</CardTitle>
        <CardDescription>
          Simulate the potential impact of healthcare policies on key metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="results" disabled={!simulationResults}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="policyTitle">Policy Title</Label>
                <Input 
                  id="policyTitle" 
                  placeholder="Enter policy title"
                  value={policyTitle}
                  onChange={(e) => setPolicyTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="policyType">Policy Type</Label>
                <Select value={policyType} onValueChange={setPolicyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Policy Types</SelectLabel>
                      <SelectItem value="regulatory">Regulatory</SelectItem>
                      <SelectItem value="financial">Financial Incentive</SelectItem>
                      <SelectItem value="service">Service Delivery</SelectItem>
                      <SelectItem value="workforce">Workforce</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="policyScope">Policy Scope</Label>
                <Select value={policyScope} onValueChange={setPolicyScope}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Scope</SelectLabel>
                      <SelectItem value="national">National</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="facility">Facility-specific</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="geographicCoverage">Geographic Focus</Label>
                <Select value={geographicCoverage} onValueChange={setGeographicCoverage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Coverage</SelectLabel>
                      <SelectItem value="urban">Urban Areas</SelectItem>
                      <SelectItem value="rural">Rural Areas</SelectItem>
                      <SelectItem value="both">Both Urban & Rural</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Public-Private Partnership Balance</Label>
                  <span className="text-sm">{publicPrivateBalance}%</span>
                </div>
                <Slider
                  value={[publicPrivateBalance]}
                  onValueChange={(values) => setPublicPrivateBalance(values[0])}
                  min={0}
                  max={100}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Public-led</span>
                  <span>Balanced</span>
                  <span>Private-led</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Technology Adoption Level</Label>
                  <span className="text-sm">{technologyAdoption}%</span>
                </div>
                <Slider
                  value={[technologyAdoption]}
                  onValueChange={(values) => setTechnologyAdoption(values[0])}
                  min={0}
                  max={100}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Basic</span>
                  <span>Advanced</span>
                  <span>Cutting-edge</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium">Healthcare Facility Types Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={includePHC} 
                    onCheckedChange={setIncludePHC} 
                    id="phc"
                  />
                  <Label htmlFor="phc">Primary Health Centers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={includeHospitals} 
                    onCheckedChange={setIncludeHospitals} 
                    id="hospitals"
                  />
                  <Label htmlFor="hospitals">General Hospitals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={includeSpecialty} 
                    onCheckedChange={setIncludeSpecialty} 
                    id="specialty"
                  />
                  <Label htmlFor="specialty">Specialty Centers</Label>
                </div>
              </div>
            </div>
            
            {!includePHC && !includeHospitals && !includeSpecialty && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please select at least one facility type to include in the simulation.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {simulationResults && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-moh-green">
                          {simulationResults.costSavings.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Projected Cost Savings
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-moh-green">
                          {simulationResults.accessImprovement.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Access Improvement
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-moh-green">
                          {simulationResults.qualityImprovement.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Quality Improvement
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {simulationResults.implementationTime.toFixed(1)} mo
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Implementation Time
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      5-Year Impact Projection
                    </CardTitle>
                    <CardDescription>
                      Comparing baseline trends with policy implementation impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={simulationResults.chartData.timeline}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="baseline" 
                            name="Baseline" 
                            stroke="#8884d8" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="projected" 
                            name="With Policy" 
                            stroke="#82ca9d" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Impact by Metric
                    </CardTitle>
                    <CardDescription>
                      Comparing current state with projected improvements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={simulationResults.chartData.metrics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="current" 
                            name="Current" 
                            stroke="#8884d8" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="projected" 
                            name="Projected" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Simulation Disclaimer</AlertTitle>
                  <AlertDescription>
                    This simulation is based on general models and assumptions. 
                    Actual results may vary based on implementation details, external factors, 
                    and specific regional contexts.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {activeTab === "results" && simulationResults ? (
          <>
            <Button variant="outline" onClick={() => setActiveTab("parameters")}>
              Adjust Parameters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={() => {
                setPolicyTitle("");
                setPolicyScope("");
                setPolicyType("");
                setPublicPrivateBalance(50);
                setTechnologyAdoption(70);
                setGeographicCoverage("urban");
                setIncludePHC(true);
                setIncludeHospitals(true);
                setIncludeSpecialty(false);
              }}
            >
              Reset
            </Button>
            <Button 
              onClick={handleSimulate}
              disabled={!policyTitle || !policyScope || !policyType || isSimulating || (!includePHC && !includeHospitals && !includeSpecialty)}
            >
              {isSimulating ? "Simulating..." : "Run Simulation"}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
