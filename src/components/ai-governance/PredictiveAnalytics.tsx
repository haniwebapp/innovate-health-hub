
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRight, Info, FileText, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Sample data for charts
const confidenceData = [
  { name: 'Very Low', value: 5 },
  { name: 'Low', value: 12 },
  { name: 'Medium', value: 25 },
  { name: 'High', value: 38 },
  { name: 'Very High', value: 20 },
];

const accuracyData = [
  { name: 'Demographic 1', accuracy: 92, baseline: 85 },
  { name: 'Demographic 2', accuracy: 88, baseline: 85 },
  { name: 'Demographic 3', accuracy: 78, baseline: 85 },
  { name: 'Demographic 4', accuracy: 86, baseline: 85 },
  { name: 'Demographic 5', accuracy: 94, baseline: 85 },
];

const getBarColor = (value: number) => {
  if (value < 80) return '#f87171';  // red-400
  if (value < 90) return '#fbbf24';  // amber-400
  return '#34d399';  // emerald-400
};

export function PredictiveAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [modelType, setModelType] = useState('all');
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle>Predictive Analytics Monitoring</CardTitle>
              <CardDescription>Monitor and evaluate predictive AI models across the platform</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Model Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  <SelectItem value="clinical">Clinical</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: "Total Predictions", value: "234,567", change: "+12.5%", positive: true },
              { title: "Average Accuracy", value: "87.3%", change: "+2.4%", positive: true },
              { title: "False Positives", value: "3.2%", change: "-0.8%", positive: true },
              { title: "Confidence Level", value: "High", change: "Stable", positive: true },
            ].map((stat, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        stat.positive ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
                <div className={`h-1 ${stat.positive ? "bg-green-500" : "bg-red-500"}`}></div>
              </Card>
            ))}
          </div>
          
          <Tabs defaultValue="performance">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="confidence">Confidence</TabsTrigger>
              <TabsTrigger value="fairness">Fairness</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Model Performance By Segment</CardTitle>
                  <CardDescription>Comparing accuracy across different demographic segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[50, 100]} />
                        <Tooltip />
                        <Bar dataKey="accuracy" name="Accuracy (%)">
                          {accuracyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
                          ))}
                        </Bar>
                        <Bar dataKey="baseline" name="Baseline (%)" fill="#94a3b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 flex justify-between text-sm text-muted-foreground">
                  <div>
                    <Info className="h-4 w-4 inline mr-1" />
                    Performance is below target for Demographic 3
                  </div>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    View Detailed Report <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="confidence">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Prediction Confidence Distribution</CardTitle>
                  <CardDescription>Distribution of confidence levels for all predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={confidenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="Percentage (%)" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 text-sm text-muted-foreground">
                  Overall confidence distribution suggests reliable model performance. 
                  58% of predictions have high or very high confidence.
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="fairness">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Fairness Metrics</CardTitle>
                      <Badge variant="outline">Good</Badge>
                    </div>
                    <CardDescription>Analysis of predictive equity across groups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Demographic Parity</span>
                          <span className="text-sm">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: "92%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Equal Opportunity</span>
                          <span className="text-sm">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: "88%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Predictive Parity</span>
                          <span className="text-sm">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{width: "78%"}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Recommendations</CardTitle>
                      <Button size="sm" variant="outline" className="h-8">
                        <FileText className="h-3 w-3 mr-1" /> Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <TrendingUp className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Improve data representation</p>
                          <p className="text-muted-foreground">Add more training data for underrepresented groups</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <TrendingUp className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Adjust decision thresholds</p>
                          <p className="text-muted-foreground">Fine-tune thresholds to balance performance across groups</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Continue monitoring</p>
                          <p className="text-muted-foreground">System shows good fairness metrics overall</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default PredictiveAnalytics;
