
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, AlertCircle, Info, PlayCircle, PauseCircle, UploadCloud } from "lucide-react";
import { toast } from "sonner";

interface BiasIssue {
  id: string;
  model: string;
  feature: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: string;
  status: 'active' | 'resolved' | 'investigating';
  impactedGroups: string[];
}

interface FairnessMetric {
  category: string;
  demographic: string;
  score: number;
  benchmark: number;
  status: 'fair' | 'warning' | 'unfair';
}

export function BiasDetection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModel, setSelectedModel] = useState("all");
  const [testRunning, setTestRunning] = useState(false);

  const mockBiasIssues: BiasIssue[] = [
    {
      id: "1",
      model: "ClinicalAI",
      feature: "Patient Symptom Analysis",
      severity: "medium",
      description: "Potential gender bias in symptom severity assessment",
      detectedAt: "2025-05-08T14:23:00Z",
      status: "investigating",
      impactedGroups: ["Women", "Elderly"]
    },
    {
      id: "2",
      model: "InvestmentAI",
      feature: "Funding Opportunity Matching",
      severity: "high",
      description: "Geographic bias favoring urban innovation centers",
      detectedAt: "2025-05-10T09:15:00Z",
      status: "active",
      impactedGroups: ["Rural innovators"]
    },
    {
      id: "3",
      model: "RegulatoryAI",
      feature: "Compliance Risk Scoring",
      severity: "low",
      description: "Bias towards established companies in compliance evaluation",
      detectedAt: "2025-05-07T11:30:00Z",
      status: "resolved",
      impactedGroups: ["Startups", "SMEs"]
    },
    {
      id: "4",
      model: "SupportAI",
      feature: "Ticket Priority Classification",
      severity: "medium",
      description: "Language bias affecting non-native English speakers",
      detectedAt: "2025-05-11T16:45:00Z",
      status: "active",
      impactedGroups: ["Non-native English speakers"]
    }
  ];

  const filteredIssues = selectedModel === "all" 
    ? mockBiasIssues 
    : mockBiasIssues.filter(issue => issue.model === selectedModel);

  const mockFairnessMetrics: FairnessMetric[] = [
    { category: "Gender", demographic: "Male", score: 0.95, benchmark: 0.90, status: "fair" },
    { category: "Gender", demographic: "Female", score: 0.87, benchmark: 0.90, status: "warning" },
    { category: "Age", demographic: "18-35", score: 0.93, benchmark: 0.90, status: "fair" },
    { category: "Age", demographic: "36-60", score: 0.91, benchmark: 0.90, status: "fair" },
    { category: "Age", demographic: "60+", score: 0.82, benchmark: 0.90, status: "unfair" },
    { category: "Region", demographic: "Urban", score: 0.94, benchmark: 0.90, status: "fair" },
    { category: "Region", demographic: "Suburban", score: 0.92, benchmark: 0.90, status: "fair" },
    { category: "Region", demographic: "Rural", score: 0.83, benchmark: 0.90, status: "unfair" }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'investigating':
        return <Badge variant="warning">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="success" className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getFairnessStatusIndicator = (status: string) => {
    switch (status) {
      case 'fair':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'unfair':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleRunBiasTest = () => {
    setTestRunning(true);
    toast.info("Bias detection test started. This may take several minutes...");
    
    // Simulate test run
    setTimeout(() => {
      setTestRunning(false);
      toast.success("Bias detection test completed successfully");
    }, 3000);
  };

  const overallHealthScore = 87;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">AI Bias Detection & Mitigation</h2>
          <p className="text-muted-foreground">Monitor and address potential biases in AI models</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={handleRunBiasTest}
            disabled={testRunning}
          >
            {testRunning ? (
              <>
                <PauseCircle className="mr-2 h-4 w-4" />
                Running Test...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Run Bias Test
              </>
            )}
          </Button>
          <Button>
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Dataset
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Potential bias detected in 2 AI models</AlertTitle>
        <AlertDescription>
          Review the detected issues and mitigation suggestions below to ensure fair and ethical AI operation.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Detected Issues</TabsTrigger>
          <TabsTrigger value="fairness">Fairness Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Fairness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl font-bold">{overallHealthScore}/100</div>
                  <Progress value={overallHealthScore} className="h-2 w-full" />
                  <span className="text-xs text-muted-foreground">
                    {overallHealthScore >= 90 ? 'Excellent' : overallHealthScore >= 80 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {mockBiasIssues.filter(issue => issue.status === 'active').length}
                </div>
                <p className="text-xs text-center text-muted-foreground">Across all models</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {mockBiasIssues.filter(issue => issue.status === 'investigating').length}
                </div>
                <p className="text-xs text-center text-muted-foreground">In progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recently Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {mockBiasIssues.filter(issue => issue.status === 'resolved').length}
                </div>
                <p className="text-xs text-center text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bias Risk by AI Service</CardTitle>
              <CardDescription>Risk assessment scores across platform AI services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">ClinicalAI</span>
                      <Badge variant="outline">Medium Risk</Badge>
                    </div>
                    <span className="text-sm">76/100</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">InvestmentAI</span>
                      <Badge variant="destructive">High Risk</Badge>
                    </div>
                    <span className="text-sm">64/100</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">RegulatoryAI</span>
                      <Badge variant="outline">Low Risk</Badge>
                    </div>
                    <span className="text-sm">92/100</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">SupportAI</span>
                      <Badge variant="warning">Medium Risk</Badge>
                    </div>
                    <span className="text-sm">81/100</span>
                  </div>
                  <Progress value={81} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issues" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Detected Bias Issues</h3>
              <p className="text-sm text-muted-foreground">Review and address potential biases across AI models</p>
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="ClinicalAI">Clinical AI</SelectItem>
                <SelectItem value="InvestmentAI">Investment AI</SelectItem>
                <SelectItem value="RegulatoryAI">Regulatory AI</SelectItem>
                <SelectItem value="SupportAI">Support AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {filteredIssues.map(issue => (
              <Card key={issue.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{issue.model}: {issue.feature}</CardTitle>
                      <CardDescription>{issue.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getSeverityBadge(issue.severity)}
                      {getStatusBadge(issue.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Potentially Impacted Groups:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {issue.impactedGroups.map(group => (
                          <Badge variant="secondary" key={group}>{group}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Detected: {new Date(issue.detectedAt).toLocaleDateString()}
                      </span>
                      <Button 
                        size="sm" 
                        variant={issue.status === 'resolved' ? 'outline' : 'default'}
                      >
                        {issue.status === 'resolved' ? 'View Resolution' : 'Resolve Issue'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredIssues.length === 0 && (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">No bias issues detected for the selected model.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="fairness" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Fairness Metrics</h3>
              <p className="text-sm text-muted-foreground">Fairness evaluation across demographic groups</p>
            </div>
            <Select defaultValue="ClinicalAI">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ClinicalAI">Clinical AI</SelectItem>
                <SelectItem value="InvestmentAI">Investment AI</SelectItem>
                <SelectItem value="RegulatoryAI">Regulatory AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Demographic Group</TableHead>
                <TableHead>Fairness Score</TableHead>
                <TableHead>Benchmark</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFairnessMetrics.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{metric.category}</TableCell>
                  <TableCell>{metric.demographic}</TableCell>
                  <TableCell>{metric.score.toFixed(2)}</TableCell>
                  <TableCell>{metric.benchmark.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {getFairnessStatusIndicator(metric.status)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Card>
            <CardHeader>
              <CardTitle>Mitigation Recommendations</CardTitle>
              <CardDescription>AI-generated suggestions to improve fairness metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. Dataset Balancing</h4>
                <p className="text-sm text-muted-foreground">
                  Review and balance training datasets for underrepresented demographics, particularly for elderly users and rural innovators.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">2. Feature Engineering Review</h4>
                <p className="text-sm text-muted-foreground">
                  Evaluate feature importance and remove or modify features that may lead to demographic biases.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">3. Regular Fairness Audits</h4>
                <p className="text-sm text-muted-foreground">
                  Implement scheduled audits using diverse test datasets to proactively identify fairness issues.
                </p>
              </div>
              
              <Button className="w-full mt-4">
                Generate Detailed Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
