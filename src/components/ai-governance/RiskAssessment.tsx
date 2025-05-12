
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Shield, AlertTriangle, CheckCircle, XCircle, AlertCircle, UploadCloud, Crosshair, FileText } from "lucide-react";
import { toast } from "sonner";

interface RiskCategory {
  name: string;
  value: number;
  color: string;
  issues: number;
}

interface RiskItem {
  id: string;
  title: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  likelihood: number;
  impact: number;
  riskScore: number;
  status: 'open' | 'mitigated' | 'accepted' | 'monitoring';
  lastUpdated: string;
}

export function RiskAssessment() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const riskData: RiskCategory[] = [
    { name: 'Ethical', value: 25, color: '#8884d8', issues: 3 },
    { name: 'Technical', value: 35, color: '#83a6ed', issues: 5 },
    { name: 'Privacy', value: 15, color: '#8dd1e1', issues: 2 },
    { name: 'Regulatory', value: 10, color: '#82ca9d', issues: 1 },
    { name: 'Operational', value: 15, color: '#ffc658', issues: 2 },
  ];

  const riskItems: RiskItem[] = [
    {
      id: '1',
      title: 'Potential Patient Data Disclosure',
      category: 'Privacy',
      description: 'Risk of inadvertent exposure of sensitive patient data through API endpoints.',
      severity: 'critical',
      likelihood: 2, // 1-10
      impact: 9, // 1-10
      riskScore: 72, // likelihood * impact * 4
      status: 'mitigated',
      lastUpdated: '2025-05-09T10:15:00Z'
    },
    {
      id: '2',
      title: 'Algorithm Bias in Clinical Recommendations',
      category: 'Ethical',
      description: 'Potential bias in treatment recommendations affecting specific demographic groups.',
      severity: 'high',
      likelihood: 4,
      impact: 8,
      riskScore: 64,
      status: 'open',
      lastUpdated: '2025-05-10T14:30:00Z'
    },
    {
      id: '3',
      title: 'Non-compliance with GDPR Data Processing Requirements',
      category: 'Regulatory',
      description: 'AI processing may not fully comply with GDPR consent and transparency requirements.',
      severity: 'high',
      likelihood: 6,
      impact: 7,
      riskScore: 63,
      status: 'open',
      lastUpdated: '2025-05-08T09:45:00Z'
    },
    {
      id: '4',
      title: 'Model Degradation Over Time',
      category: 'Technical',
      description: 'AI model accuracy may decline as real-world data patterns evolve.',
      severity: 'medium',
      likelihood: 7,
      impact: 5,
      riskScore: 35,
      status: 'monitoring',
      lastUpdated: '2025-05-07T16:20:00Z'
    },
    {
      id: '5',
      title: 'Interpretability Limitations',
      category: 'Ethical',
      description: 'Difficulty explaining specific AI decisions to end-users and regulators.',
      severity: 'medium',
      likelihood: 8,
      impact: 6,
      riskScore: 48,
      status: 'open',
      lastUpdated: '2025-05-11T11:10:00Z'
    },
    {
      id: '6',
      title: 'Unauthorized AI Model Access',
      category: 'Technical',
      description: 'Risk of unauthorized access to AI models through weak authentication.',
      severity: 'high',
      likelihood: 3,
      impact: 8,
      riskScore: 48,
      status: 'mitigated',
      lastUpdated: '2025-05-06T13:55:00Z'
    },
    {
      id: '7',
      title: 'System Downtime Impact',
      category: 'Operational',
      description: 'AI services unavailability affecting critical healthcare decisions.',
      severity: 'high',
      likelihood: 2,
      impact: 9,
      riskScore: 54,
      status: 'monitoring',
      lastUpdated: '2025-05-09T08:30:00Z'
    }
  ];

  const filteredRisks = selectedCategory === "all" 
    ? riskItems 
    : riskItems.filter(item => item.category === selectedCategory);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
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
      case 'open':
        return <Badge className="bg-blue-500 hover:bg-blue-400">Open</Badge>;
      case 'mitigated':
        return <Badge className="bg-green-500 hover:bg-green-400">Mitigated</Badge>;
      case 'accepted':
        return <Badge variant="outline">Accepted</Badge>;
      case 'monitoring':
        return <Badge variant="secondary">Monitoring</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getScoreSeverity = (score: number) => {
    if (score >= 70) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  };

  const getRiskProgressColor = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 50) return 'bg-orange-500';
    if (score >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleScanForRisks = () => {
    toast.info("Scanning AI systems for new risks...");
    setTimeout(() => {
      toast.success("Risk assessment scan completed");
    }, 2000);
  };

  const totalRisks = riskItems.length;
  const mitigatedRisks = riskItems.filter(item => item.status === 'mitigated').length;
  const highSeverityRisks = riskItems.filter(item => ['critical', 'high'].includes(item.severity)).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">AI Risk Assessment</h2>
          <p className="text-muted-foreground">Identify and mitigate risks in AI systems</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleScanForRisks}>
            <Crosshair className="mr-2 h-4 w-4" />
            Scan for Risks
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Risk Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="details">Risk Details</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Risk Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalRisks}</div>
                <p className="text-xs text-muted-foreground">
                  {mitigatedRisks} mitigated ({Math.round((mitigatedRisks / totalRisks) * 100)}%)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">High Severity Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <div className="text-3xl font-bold">{highSeverityRisks}</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {highSeverityRisks} of {totalRisks} risks ({Math.round((highSeverityRisks / totalRisks) * 100)}%)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risk Assessment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Last assessment: May 12, 2025</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Next scheduled: May 19, 2025
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>
                  Breakdown of identified risks by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [`${value}%`, `${name} Risks`]} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-3 justify-center w-full">
                  {riskData.map((category, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs text-muted-foreground">({category.issues})</span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Critical Risks</CardTitle>
                <CardDescription>
                  Highest priority risks requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskItems
                    .filter(risk => risk.severity === 'critical' || (risk.severity === 'high' && risk.status === 'open'))
                    .slice(0, 3)
                    .map(risk => (
                      <div key={risk.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{risk.title}</div>
                          {getSeverityBadge(risk.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground">{risk.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <span>Risk score:</span>
                            <Progress 
                              value={risk.riskScore} 
                              max={100} 
                              className={`h-2 w-24 ${getRiskProgressColor(risk.riskScore)}`} 
                            />
                            <span className="font-medium">{risk.riskScore}</span>
                          </div>
                          <span className="text-muted-foreground">{risk.category}</span>
                        </div>
                      </div>
                    ))}

                  {!riskItems.some(risk => risk.severity === 'critical' || (risk.severity === 'high' && risk.status === 'open')) && (
                    <div className="flex flex-col items-center justify-center h-32">
                      <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                      <p className="text-muted-foreground">No critical risks detected</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All High Priority Risks
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Risk Register</h3>
              <p className="text-sm text-muted-foreground">Comprehensive list of identified AI risks</p>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Risk category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Privacy">Privacy</SelectItem>
                <SelectItem value="Ethical">Ethical</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Risk Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRisks.map(risk => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.title}</TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>{getSeverityBadge(risk.severity)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress 
                        value={risk.riskScore} 
                        max={100} 
                        className={`h-2 w-16 ${getRiskProgressColor(risk.riskScore)}`} 
                      />
                      <span>{risk.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(risk.status)}</TableCell>
                </TableRow>
              ))}

              {filteredRisks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No risks found for the selected category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="mitigation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Strategies</CardTitle>
              <CardDescription>
                Approach for addressing identified AI risks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Data Protection & Privacy
                </h4>
                <p className="text-sm text-muted-foreground">
                  Implement enhanced encryption, access controls, and data minimization practices to address privacy risks.
                  Regular privacy impact assessments and data flow audits.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Implementation progress:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="h-2 w-32" />
                    <span className="text-sm">75%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Ethical AI Framework
                </h4>
                <p className="text-sm text-muted-foreground">
                  Develop and apply ethical guidelines for AI development and operation. 
                  Regular evaluations of AI outputs against fairness and equity metrics.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Implementation progress:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={60} className="h-2 w-32" />
                    <span className="text-sm">60%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Technical Resilience
                </h4>
                <p className="text-sm text-muted-foreground">
                  Robust testing protocols, model versioning, and automated monitoring systems.
                  Implement continuous training and validation pipelines with human oversight.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Implementation progress:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="h-2 w-32" />
                    <span className="text-sm">85%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Regulatory Compliance
                </h4>
                <p className="text-sm text-muted-foreground">
                  Establish regulatory monitoring system for healthcare AI requirements.
                  Documentation and traceability of AI decisions for compliance purposes.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">Implementation progress:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={40} className="h-2 w-32" />
                    <span className="text-sm">40%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                View Complete Mitigation Plan
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our risk assessment methodology combines quantitative metrics and qualitative analysis
                  to provide comprehensive evaluation of potential AI risks. The process includes:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-4 text-sm text-muted-foreground">
                  <li>Automated vulnerability scanning</li>
                  <li>Data protection impact assessment (DPIA)</li>
                  <li>Model behavior testing across demographic groups</li>
                  <li>Regulatory compliance reviews</li>
                  <li>Incident simulation exercises</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governance & Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI risk governance framework establishes clear accountability and procedures
                  for ongoing risk management:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-4 text-sm text-muted-foreground">
                  <li>AI Ethics Committee review of high-risk systems</li>
                  <li>Monthly risk register updates</li>
                  <li>Quarterly executive risk reviews</li>
                  <li>Clear escalation paths for newly identified risks</li>
                  <li>Training program for AI developers and operators</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
