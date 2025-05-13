import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
  Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BrainCircuit, LineChart as LineChartIcon, BarChart2, PieChart as PieChartIcon, TrendingUp, Download, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration (would be fetched from APIs in production)
const innovationSuccessData = [
  { month: 'Jan', successful: 65, failed: 25, pending: 10 },
  { month: 'Feb', successful: 58, failed: 22, pending: 20 },
  { month: 'Mar', successful: 72, failed: 18, pending: 10 },
  { month: 'Apr', successful: 80, failed: 15, pending: 5 },
  { month: 'May', successful: 85, failed: 10, pending: 5 },
  { month: 'Jun', successful: 78, failed: 12, pending: 10 },
];

const challengeResponseData = [
  { name: 'Digital Health Solutions', completed: 67, inProgress: 33 },
  { name: 'Preventive Care', completed: 45, inProgress: 55 },
  { name: 'Remote Monitoring', completed: 80, inProgress: 20 },
  { name: 'Healthcare Access', completed: 62, inProgress: 38 },
  { name: 'Medical Education', completed: 73, inProgress: 27 },
];

const topSectors = [
  { name: 'Digital Health', value: 35 },
  { name: 'AI in Healthcare', value: 25 },
  { name: 'Medical Devices', value: 18 },
  { name: 'Telemedicine', value: 12 },
  { name: 'Preventive Care', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState('6months');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Simulated refreshing of data
  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Analytics data has been updated with the latest information.",
      });
    }, 1500);
  };

  // Simulated predictions data
  const [predictions, setPredictions] = useState<any>(null);
  
  useEffect(() => {
    // Simulate loading predictions
    setIsLoading(true);
    setTimeout(() => {
      setPredictions({
        successRate: {
          digital: 78,
          medicalDevices: 65,
          telemedicine: 82,
          preventive: 71,
          aiDriven: 85
        },
        growthAreas: [
          { name: 'AI-Powered Diagnostics', growth: '+42%', confidence: 'High' },
          { name: 'Remote Patient Monitoring', growth: '+37%', confidence: 'High' },
          { name: 'Mental Health Tech', growth: '+31%', confidence: 'Medium' },
          { name: 'Personalized Medicine', growth: '+28%', confidence: 'Medium' }
        ],
        risks: [
          { name: 'Regulatory Compliance', level: 'Medium', mitigation: 'Early engagement with authorities' },
          { name: 'Data Privacy', level: 'High', mitigation: 'Enhanced security protocols' },
          { name: 'Market Adoption', level: 'Medium', mitigation: 'User-centered design approach' }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AdminLayout
      title="Analytics & Reports"
      description="AI-powered analytics and predictive insights"
      actions={
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Innovation Success Rate
              </CardTitle>
              <CardDescription>Overall success rate of submitted innovations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">76%</div>
              <p className="text-xs text-muted-foreground">+12% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" />
                Challenge Participation
              </CardTitle>
              <CardDescription>Average submissions per challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">32.5</div>
              <p className="text-xs text-muted-foreground">+8 from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2" />
                Top Innovation Sector
              </CardTitle>
              <CardDescription>Most active healthcare sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">Digital Health</div>
              <p className="text-xs text-muted-foreground">35% of all innovations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="success" className="space-y-4">
          <TabsList>
            <TabsTrigger value="success">Success Prediction</TabsTrigger>
            <TabsTrigger value="trends">Innovation Trends</TabsTrigger>
            <TabsTrigger value="challenges">Challenge Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="success" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <BrainCircuit className="h-5 w-5 mr-2 text-purple-500" />
                      AI Success Predictions
                    </CardTitle>
                    <CardDescription>
                      Predictive analytics for innovation success by sector
                    </CardDescription>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">AI-Generated</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {predictions ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Predicted Success Rate by Sector</h4>
                      <div className="space-y-3">
                        {Object.entries(predictions.successRate).map(([sector, rate]) => (
                          <div key={sector} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>
                                {sector === 'digital' ? 'Digital Health' : 
                                 sector === 'medicalDevices' ? 'Medical Devices' :
                                 sector === 'telemedicine' ? 'Telemedicine' :
                                 sector === 'preventive' ? 'Preventive Care' : 'AI-Driven Innovations'}
                              </span>
                              <span className="font-medium">{rate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  Number(rate) > 80 ? 'bg-green-500' :
                                  Number(rate) > 70 ? 'bg-lime-500' :
                                  Number(rate) > 60 ? 'bg-amber-500' : 'bg-orange-500'
                                }`}
                                style={{ width: `${rate}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3">Risk Assessment</h4>
                        <div className="space-y-2">
                          {predictions.risks.map((risk: any, i: number) => (
                            <div key={i} className="p-3 bg-gray-50 rounded-md">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{risk.name}</span>
                                <Badge 
                                  className={
                                    risk.level === 'High' ? 'bg-red-100 text-red-800' :
                                    risk.level === 'Medium' ? 'bg-amber-100 text-amber-800' :
                                    'bg-blue-100 text-blue-800'
                                  }
                                >
                                  {risk.level}
                                </Badge>
                              </div>
                              <p className="text-xs mt-1 text-gray-600">
                                <span className="font-medium">Mitigation:</span> {risk.mitigation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Projected Growth Areas</h4>
                      <div className="space-y-3">
                        {predictions.growthAreas.map((area: any, i: number) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{area.name}</span>
                              <Badge className="bg-green-100 text-green-800">
                                {area.growth}
                              </Badge>
                            </div>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500 mr-2">Confidence:</span>
                              <Badge 
                                variant="outline" 
                                className={
                                  area.confidence === 'High' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
                                  'bg-purple-50 border-purple-200 text-purple-700'
                                }
                              >
                                {area.confidence}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-medium mb-2 text-blue-800">AI Recommendation</h4>
                        <p className="text-sm text-blue-700">
                          Based on current trends and success rates, digital health innovations with AI components 
                          show the highest potential for success. Focus on solutions that address remote monitoring 
                          and preventive care while ensuring strong data privacy measures.
                        </p>
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export Predictions
                        </Button>
                        <Button size="sm">Generate Detailed Report</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <RefreshCcw className="h-8 w-8 animate-spin text-muted-foreground mb-2 mx-auto" />
                      <p>Loading AI predictions...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Innovation Success Timeline</CardTitle>
                <CardDescription>
                  Success, failure, and pending innovations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={innovationSuccessData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="successful" stackId="1" stroke="#10b981" fill="#10b981" />
                      <Area type="monotone" dataKey="failed" stackId="1" stroke="#f87171" fill="#f87171" />
                      <Area type="monotone" dataKey="pending" stackId="1" stroke="#fcd34d" fill="#fcd34d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Healthcare Innovation Sector Distribution</CardTitle>
                <CardDescription>
                  Breakdown of innovations by healthcare sector
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={topSectors}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {topSectors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-sm mb-2">Top Innovation Categories</h3>
                      <div className="space-y-2">
                        {topSectors.map((sector, i) => (
                          <div key={i} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[i % COLORS.length] }}
                            ></div>
                            <div className="flex-1 text-sm">{sector.name}</div>
                            <div className="font-medium text-sm">{sector.value}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-blue-50 border-blue-100">
                      <h4 className="font-medium text-sm mb-2 text-blue-800">Trend Analysis</h4>
                      <p className="text-sm text-blue-700">
                        Digital Health and AI in Healthcare are driving most innovations, 
                        showing a 15% increase over the previous period. 
                        Investment in Medical Devices has remained stable.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  <BrainCircuit className="h-5 w-5 inline mr-2 text-purple-500" />
                  AI Trend Prediction
                </CardTitle>
                <CardDescription>
                  Predicted innovation sectors for the next 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', digital: 35, devices: 18, tele: 12, ai: 25, preventive: 10 },
                        { month: 'Mar', digital: 38, devices: 17, tele: 14, ai: 28, preventive: 12 },
                        { month: 'May', digital: 36, devices: 19, tele: 15, ai: 32, preventive: 11 },
                        { month: 'Jul', digital: 40, devices: 20, tele: 18, ai: 35, preventive: 12 },
                        { month: 'Sep', digital: 42, devices: 18, tele: 20, ai: 40, preventive: 15 },
                        { month: 'Nov', digital: 45, devices: 19, tele: 22, ai: 45, preventive: 18 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="digital" stroke="#0088FE" name="Digital Health" />
                      <Line type="monotone" dataKey="devices" stroke="#00C49F" name="Medical Devices" />
                      <Line type="monotone" dataKey="tele" stroke="#FFBB28" name="Telemedicine" />
                      <Line type="monotone" dataKey="ai" stroke="#8884d8" name="AI in Healthcare" />
                      <Line type="monotone" dataKey="preventive" stroke="#FF8042" name="Preventive Care" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg border bg-blue-50 border-blue-100">
                    <h4 className="font-medium text-sm mb-1 text-blue-800">Key Insight</h4>
                    <p className="text-xs text-blue-700">
                      AI-powered healthcare solutions are projected to see the highest growth in the next 12 months.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-green-50 border-green-100">
                    <h4 className="font-medium text-sm mb-1 text-green-800">Emerging Trend</h4>
                    <p className="text-xs text-green-700">
                      Preventive care innovations are beginning to gain momentum, showing potential for growth.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-amber-50 border-amber-100">
                    <h4 className="font-medium text-sm mb-1 text-amber-800">Recommendation</h4>
                    <p className="text-xs text-amber-700">
                      Focus on AI-driven solutions that enhance preventive care for maximum impact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Challenge Response Analytics</CardTitle>
                <CardDescription>
                  Analysis of responses to healthcare innovation challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={challengeResponseData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                      <Bar dataKey="inProgress" stackId="a" fill="#fcd34d" name="In Progress" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-green-800">Highest Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-700">Remote Monitoring</div>
                      <p className="text-xs text-green-600 mt-1">80% completion rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-amber-800">Lowest Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-700">Preventive Care</div>
                      <p className="text-xs text-amber-600 mt-1">45% completion rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-blue-800">Average Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">65.4%</div>
                      <p className="text-xs text-blue-600 mt-1">Across all challenges</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 p-4 border rounded-lg bg-purple-50 border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                    <BrainCircuit className="h-4 w-4 mr-2" />
                    AI-Generated Challenge Recommendation
                  </h4>
                  <p className="text-sm text-purple-700">
                    Based on completion rates and innovation trends, consider launching a new challenge focused on 
                    "AI-Powered Preventive Care Solutions" to drive innovation in this underrepresented but high-potential area.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Create Recommended Challenge
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
