
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const StrategyGapAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | boolean>(null);
  
  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false);
      setResults(true);
    }, 2000);
  };
  
  const resetAnalysis = () => {
    setResults(null);
  };
  
  return (
    <Card className="border-moh-green/20">
      <CardHeader>
        <CardTitle className="text-xl text-moh-darkGreen">Strategy Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!results ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Strategy or Policy Document*
                </label>
                <Select defaultValue="strategy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a strategy document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategy">Digital Health Strategy 2025</SelectItem>
                    <SelectItem value="policy1">Healthcare Access Policy</SelectItem>
                    <SelectItem value="policy2">Telehealth Framework 2024</SelectItem>
                    <SelectItem value="policy3">Healthcare AI Regulations</SelectItem>
                    <SelectItem value="custom">Upload Custom Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Analysis Focus Areas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="implementation" defaultChecked className="h-4 w-4" />
                    <label htmlFor="implementation" className="text-sm">Implementation Status</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="resources" defaultChecked className="h-4 w-4" />
                    <label htmlFor="resources" className="text-sm">Resource Allocation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="stakeholders" defaultChecked className="h-4 w-4" />
                    <label htmlFor="stakeholders" className="text-sm">Stakeholder Alignment</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="outcomes" defaultChecked className="h-4 w-4" />
                    <label htmlFor="outcomes" className="text-sm">Outcome Measures</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="timeline" defaultChecked className="h-4 w-4" />
                    <label htmlFor="timeline" className="text-sm">Timeline Adherence</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="risks" defaultChecked className="h-4 w-4" />
                    <label htmlFor="risks" className="text-sm">Risk Identification</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Additional Context or Notes (Optional)
                </label>
                <Textarea placeholder="Add any specific concerns or areas you'd like the analysis to focus on..." className="min-h-[100px]" />
              </div>
            </div>
            
            <Separator />
            
            <Button 
              onClick={handleAnalyze} 
              className="w-full bg-moh-green hover:bg-moh-darkGreen"
              disabled={analyzing}
            >
              {analyzing ? "Analyzing..." : "Analyze Strategy Gaps"}
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-moh-lightGreen/20 rounded-lg border border-moh-green/20">
              <div className="flex items-center mb-2">
                <div className="mr-3 p-1.5 bg-moh-green/10 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-moh-green" />
                </div>
                <h3 className="text-lg font-medium text-moh-darkGreen">Analysis Complete</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We've analyzed the Digital Health Strategy 2025 document and identified several gaps in implementation, resource allocation, and stakeholder alignment.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Badge variant="outline" className="rounded-sm bg-moh-lightGreen text-moh-darkGreen px-1.5 py-0">
                  87%
                </Badge>
                Overall Alignment Score
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium">Implementation Status</span>
                    <span className="text-moh-green">92%</span>
                  </div>
                  <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                    <div className="bg-moh-green h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Excellent progress on most initiatives</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium">Resource Allocation</span>
                    <span className="text-amber-600">74%</span>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "74%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Some budget gaps for rural healthcare initiatives</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium">Stakeholder Alignment</span>
                    <span className="text-amber-600">68%</span>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Private sector engagement needs improvement</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium">Timeline Adherence</span>
                    <span className="text-rose-600">58%</span>
                  </div>
                  <div className="w-full bg-rose-100 rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: "58%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Several key milestones are behind schedule</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-3">Critical Gaps Identified</h3>
              <div className="space-y-2">
                <div className="p-2 flex items-start bg-rose-50 rounded-md border border-rose-200">
                  <AlertTriangle className="text-rose-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-rose-800">Rural Telehealth Implementation</p>
                    <p className="text-xs text-muted-foreground">18-month delay in rural telehealth center deployment</p>
                  </div>
                </div>
                
                <div className="p-2 flex items-start bg-amber-50 rounded-md border border-amber-200">
                  <AlertTriangle className="text-amber-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Healthcare AI Policy Framework</p>
                    <p className="text-xs text-muted-foreground">Lack of clear regulatory guidelines for AI diagnostic tools</p>
                  </div>
                </div>
                
                <div className="p-2 flex items-start bg-amber-50 rounded-md border border-amber-200">
                  <AlertTriangle className="text-amber-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Private Sector Engagement</p>
                    <p className="text-xs text-muted-foreground">Limited participation from technology startups</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-moh-green hover:bg-moh-darkGreen">
                Download Full Report
              </Button>
              <Button variant="outline" onClick={resetAnalysis} className="flex-1 border-moh-green text-moh-green hover:bg-moh-lightGreen/20">
                Start New Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
