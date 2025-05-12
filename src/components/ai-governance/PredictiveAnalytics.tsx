
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BarChart, LineChart, PieChart, Activity } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as ReBarChart, Bar } from "recharts";
import { toast } from "sonner";

const mockAdoptionData = [
  { month: "Jan", innovations: 25, challenges: 10, users: 120 },
  { month: "Feb", innovations: 32, challenges: 12, users: 135 },
  { month: "Mar", innovations: 38, challenges: 15, users: 152 },
  { month: "Apr", innovations: 40, challenges: 18, users: 168 },
  { month: "May", innovations: 52, challenges: 22, users: 189 },
  { month: "Jun", innovations: 65, challenges: 28, users: 210 },
  { month: "Jul", innovations: 75, challenges: 32, users: 250 },
  { month: "Aug", innovations: 85, challenges: 38, users: 280 },
  { month: "Sep", innovations: 92, challenges: 45, users: 320 },
];

const mockForecastData = [
  { month: "Oct", innovations: 100, challenges: 50, users: 350 },
  { month: "Nov", innovations: 115, challenges: 55, users: 380 },
  { month: "Dec", innovations: 130, challenges: 62, users: 410 },
  { month: "Jan", innovations: 145, challenges: 68, users: 450 },
];

const mockRegulatoryTrends = [
  { category: "Medical Devices", changes: 12, impact: 75 },
  { category: "Digital Health", changes: 8, impact: 60 },
  { category: "Pharma", changes: 6, impact: 85 },
  { category: "Biotech", changes: 9, impact: 70 },
  { category: "Health Services", changes: 5, impact: 50 },
];

export function PredictiveAnalytics() {
  const [selectedModel, setSelectedModel] = useState("growth");
  const [forecastPeriod, setForecastPeriod] = useState(3);
  const [confidenceInterval, setConfidenceInterval] = useState(95);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const combinedData = [...mockAdoptionData, ...mockForecastData.slice(0, forecastPeriod)];

  const handleGenerateForecast = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Forecast generated successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Platform Growth Forecast</CardTitle>
            <CardDescription>
              Predicted growth trends for platform adoption
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={combinedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="innovations" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="challenges" 
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#ffc658" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-slate-300 rounded-full"></div>
              <span>Historical Data</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>Predicted (CI: {confidenceInterval}%)</span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecast Controls</CardTitle>
            <CardDescription>
              Configure predictive model parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model-type">Prediction Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id="model-type">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth Projection</SelectItem>
                    <SelectItem value="adoption">Adoption Rate</SelectItem>
                    <SelectItem value="regulatory">Regulatory Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Forecast Period (months)</Label>
                <div className="flex items-center">
                  <Slider
                    className="flex-1 mr-4"
                    min={1}
                    max={12}
                    step={1}
                    value={[forecastPeriod]}
                    onValueChange={(value) => setForecastPeriod(value[0])}
                  />
                  <span className="w-8 text-center">{forecastPeriod}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confidence Interval (%)</Label>
                <div className="flex items-center">
                  <Slider
                    className="flex-1 mr-4"
                    min={80}
                    max={99}
                    step={1}
                    value={[confidenceInterval]}
                    onValueChange={(value) => setConfidenceInterval(value[0])}
                  />
                  <span className="w-8 text-center">{confidenceInterval}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="advanced-options" 
                  checked={showAdvancedOptions} 
                  onCheckedChange={setShowAdvancedOptions} 
                />
                <Label htmlFor="advanced-options">Show advanced options</Label>
              </div>

              {showAdvancedOptions && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="seasonality">Seasonality</Label>
                  <Select defaultValue="quarterly">
                    <SelectTrigger id="seasonality">
                      <SelectValue placeholder="Seasonality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button 
                className="w-full mt-4" 
                onClick={handleGenerateForecast}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Forecast"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="innovation">
        <TabsList>
          <TabsTrigger value="innovation" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Innovation Predictions
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Investment Trends
          </TabsTrigger>
          <TabsTrigger value="regulatory" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Regulatory Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="innovation" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Success Prediction</CardTitle>
              <CardDescription>
                Predictive analytics for innovation success factors
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={mockRegulatoryTrends}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="changes" fill="#8884d8" name="Regulatory Changes" />
                  <Bar dataKey="impact" fill="#82ca9d" name="Estimated Impact Score" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investment" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Pattern Analysis</CardTitle>
              <CardDescription>
                Predicted investment areas based on historic data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Investment trend visualization will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regulatory" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Change Projection</CardTitle>
              <CardDescription>
                Forecasting upcoming regulatory changes and impacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Regulatory projection visualization will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
