
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertTriangle, Info, Ban, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function BiasDetection() {
  const [activeTab, setActiveTab] = useState('data');
  const [analyzing, setAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);
  
  const handleBeginAnalysis = () => {
    setAnalyzing(true);
    
    // Simulate an analysis process
    setTimeout(() => {
      setAnalyzing(false);
      setComplete(true);
    }, 3000);
  };

  const handleReset = () => {
    setAnalyzing(false);
    setComplete(false);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>AI Bias Detection System</CardTitle>
              <CardDescription>Analyze and detect biases in AI systems and training data</CardDescription>
            </div>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200" variant="outline">
              Beta Feature
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="data" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="data">1. Data Analysis</TabsTrigger>
              <TabsTrigger value="models" disabled={!complete}>2. Model Evaluation</TabsTrigger>
              <TabsTrigger value="reports" disabled={!complete}>3. Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="data" className="space-y-4">
              {!analyzing && !complete ? (
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>About Bias Detection</AlertTitle>
                    <AlertDescription>
                      This tool helps identify potential biases in your AI systems, including data sources, 
                      model behaviors, and outcomes. Start by analyzing your training data to identify 
                      imbalances or underrepresentation.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="bg-slate-50 p-4 rounded-md border">
                    <h3 className="text-sm font-medium mb-2">Select data sources to analyze:</h3>
                    
                    <div className="space-y-2">
                      {[
                        {id: 'clinical_data', name: 'Clinical Data', records: '2,345', status: 'ready'},
                        {id: 'demographic_data', name: 'Demographics', records: '15,783', status: 'ready'},
                        {id: 'outcomes_data', name: 'Patient Outcomes', records: '9,127', status: 'ready'},
                      ].map(source => (
                        <div key={source.id} className="flex items-center justify-between p-2 border rounded-md bg-white">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={source.id} 
                              className="h-4 w-4 rounded border-gray-300 text-moh-green focus:ring-moh-green"
                              defaultChecked
                            />
                            <label htmlFor={source.id} className="ml-2 block text-sm font-medium">
                              {source.name}
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{source.records} records</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                              {source.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleBeginAnalysis}>
                      Begin Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : analyzing ? (
                <div className="space-y-6 py-10">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Analyzing Data Sources</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Scanning for potential biases and imbalances in your data...
                    </p>
                    <Progress value={65} className="h-2 w-[300px] mx-auto" />
                  </div>
                  
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scanning demographic distributions</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Analyzing feature correlations</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Evaluating attribute balance</span>
                      <div className="animate-pulse">
                        <div className="h-4 w-4 rounded-full bg-blue-400"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="text-sm">Checking for representation gaps</span>
                      <span className="text-xs">Pending</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="text-sm">Generating bias report</span>
                      <span className="text-xs">Pending</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert>
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle>Analysis Complete</AlertTitle>
                    <AlertDescription>
                      Your data analysis is complete. We've identified several potential areas of concern.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Demographic Balance</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Age Groups</span>
                              <span className="text-green-600 font-medium">Balanced</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Geographic Regions</span>
                              <span className="text-amber-600 font-medium">Moderate Bias</span>
                            </div>
                            <Progress value={68} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Socioeconomic Status</span>
                              <span className="text-red-600 font-medium">Significant Bias</span>
                            </div>
                            <Progress value={42} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Detected Issues</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex gap-2 p-2 bg-amber-50 rounded-md border border-amber-100">
                          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Rural areas underrepresented</p>
                            <p className="text-xs text-amber-700">Only 12% of data from rural healthcare settings</p>
                          </div>
                        </div>
                        <div className="flex gap-2 p-2 bg-red-50 rounded-md border border-red-100">
                          <Ban className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Lower income groups missing</p>
                            <p className="text-xs text-red-700">Less than 5% representation from lower income brackets</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-between gap-2 pt-2">
                    <Button variant="outline" onClick={handleReset}>
                      Restart Analysis
                    </Button>
                    <Button onClick={() => setActiveTab('models')}>
                      Continue to Model Evaluation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="models" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Model Performance Across Groups</CardTitle>
                    <CardDescription>Evaluating model fairness</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground opacity-20" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Decision Boundary Analysis</CardTitle>
                    <CardDescription>Examining decision fairness</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground opacity-20" />
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab('reports')}>
                  View Detailed Reports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Bias Analysis Reports</CardTitle>
                  <CardDescription>Download detailed reports of your analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Data Bias Report</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive analysis of your training data</p>
                      </div>
                      <Button variant="outline">Download PDF</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Model Fairness Analysis</h3>
                        <p className="text-sm text-muted-foreground">Evaluation of model performance across groups</p>
                      </div>
                      <Button variant="outline">Download PDF</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Mitigation Recommendations</h3>
                        <p className="text-sm text-muted-foreground">Steps to address identified biases</p>
                      </div>
                      <Button variant="outline">Download PDF</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/50 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Last analysis: {complete ? "Just now" : "Never"}
          </div>
          <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-100">
            Powered by HealthEquity AI
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BiasDetection;
