
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Beaker, Edit, Eye, FileCode, FileText, Shield, Table2 } from 'lucide-react';
import { ApplicationCard } from '@/components/regulatory/applications/ApplicationCard';

// Mock sandbox projects data
const sandboxProjects = [
  {
    id: '1',
    name: 'AI Diagnostic Algorithm',
    innovator: 'Health Tech Solutions',
    status: 'active',
    startDate: '2023-04-01',
    endDate: '2023-07-01',
    riskLevel: 'Medium',
    progress: 65,
    framework: 'AI Medical Solutions',
    submittedDate: '2023-03-15',
    testingPeriod: '2023-04-01 to 2023-07-01'
  },
  {
    id: '2',
    name: 'Remote Patient Monitoring Device',
    innovator: 'MedTech Innovations',
    status: 'pending',
    startDate: 'N/A',
    endDate: 'N/A',
    riskLevel: 'High',
    progress: 30,
    framework: 'Medical Devices Framework',
    submittedDate: '2023-05-20'
  },
  {
    id: '3',
    name: 'Medication Management App',
    innovator: 'Digital Health Inc',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-03-15',
    riskLevel: 'Low',
    progress: 100,
    framework: 'Digital Health Framework',
    submittedDate: '2022-12-10',
    testingPeriod: '2023-01-15 to 2023-03-15'
  }
];

export default function AdminSandboxPage() {
  const [activeTab, setActiveTab] = useState('projects');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active Testing</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending Approval</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'High':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  // Convert sandbox projects to application format for reusing application card
  const convertedProjects = sandboxProjects.map(project => ({
    id: project.id,
    name: project.name,
    status: project.status === 'active' ? 'approved' : project.status === 'pending' ? 'in-review' : 'draft',
    submittedDate: project.submittedDate,
    framework: project.framework,
    progress: project.progress,
    testingPeriod: project.testingPeriod
  }));

  return (
    <AdminLayout
      title="Regulatory Sandbox"
      description="Monitor and manage regulatory sandbox activities"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Sandbox Projects</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Templates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          {convertedProjects.map(project => (
            <ApplicationCard key={project.id} application={project} />
          ))}
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Policies</CardTitle>
              <CardDescription>Manage testing policies and guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Data Privacy Policy", "Patient Safety Guidelines", "Testing Protocol", "Evaluation Criteria"].map((policy) => (
                  <Card key={policy} className="bg-muted">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span>{policy}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <FileCode className="h-4 w-4 mr-1" />
                Create New Policy
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Templates</CardTitle>
              <CardDescription>Standardized forms for regulatory compliance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Table2 className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Compliance templates will be implemented in Phase 3.</p>
              <Button>View Templates</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Sandbox Reports</CardTitle>
              <CardDescription>Analytics and outcomes from sandbox testing</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Beaker className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Sandbox reporting will be implemented in Phase 3.</p>
              <Button>View Reports</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
