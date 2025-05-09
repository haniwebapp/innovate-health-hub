
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChartPieIcon, ClockIcon, DollarSign, Eye, Plus, Users } from 'lucide-react';

// Mock investment programs data
const investmentPrograms = [
  {
    id: '1',
    name: 'Healthcare Seed Fund',
    type: 'Equity',
    amount: '$250,000 - $500,000',
    status: 'active',
    applicants: 8,
    deadline: '2023-06-30'
  },
  {
    id: '2',
    name: 'Digital Health Grant',
    type: 'Grant',
    amount: '$50,000 - $100,000',
    status: 'active',
    applicants: 24,
    deadline: '2023-07-15'
  },
  {
    id: '3',
    name: 'MedTech Accelerator',
    type: 'Accelerator',
    amount: '$75,000 + mentorship',
    status: 'upcoming',
    applicants: 0,
    deadline: '2023-08-01'
  },
  {
    id: '4',
    name: 'Healthcare Scale-up Fund',
    type: 'Equity',
    amount: '$1M - $3M',
    status: 'closed',
    applicants: 12,
    deadline: '2023-03-15'
  }
];

export default function AdminInvestmentToolsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-200 text-gray-700">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout
      title="Investment Tools"
      description="Manage investment programs and applications"
      actions={
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Program
        </Button>
      }
    >
      <Tabs defaultValue="programs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="investor-portal">Investor Portal</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          {investmentPrograms.map(program => (
            <Card key={program.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{program.name}</CardTitle>
                    <CardDescription>Type: {program.type}</CardDescription>
                  </div>
                  {getStatusBadge(program.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">Funding Amount:</span> {program.amount}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{program.applicants} applicants</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Deadline: {program.deadline}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm">
                  Edit Program
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Funding Applications</CardTitle>
              <CardDescription>Review and manage investment applications</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Application management will be implemented in Phase 3.</p>
              <Button>View Applications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investor-portal">
          <Card>
            <CardHeader>
              <CardTitle>Investor Portal</CardTitle>
              <CardDescription>Manage investor access and connections</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <DollarSign className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Investor portal will be implemented in Phase 3.</p>
              <Button>Setup Investor Portal</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Investment Analytics</CardTitle>
              <CardDescription>Track investment performance and outcomes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <ChartPieIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Investment analytics will be implemented in Phase 3.</p>
              <Button>View Analytics</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
