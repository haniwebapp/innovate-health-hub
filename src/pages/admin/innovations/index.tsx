
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Eye, MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';

// Mock innovations data
const innovations = [
  {
    id: '1',
    title: 'AI-Powered Skin Disease Detection',
    category: 'Diagnostics',
    submittedBy: 'John Doe',
    organization: 'Health Tech Solutions',
    status: 'pending',
    submittedDate: '2023-04-15',
    views: 34
  },
  {
    id: '2',
    title: 'Smart Medication Dispenser',
    category: 'Medical Devices',
    submittedBy: 'Jane Smith',
    organization: 'MedTech Innovations',
    status: 'approved',
    submittedDate: '2023-04-10',
    views: 87
  },
  {
    id: '3',
    title: 'Digital Therapy for Anxiety',
    category: 'Digital Therapeutics',
    submittedBy: 'Sarah Brown',
    organization: 'Mental Health Tech',
    status: 'rejected',
    submittedDate: '2023-04-05',
    views: 12
  },
  {
    id: '4',
    title: 'Remote Patient Monitoring Platform',
    category: 'Telehealth',
    submittedBy: 'Michael Johnson',
    organization: 'Connected Care',
    status: 'approved',
    submittedDate: '2023-04-01',
    views: 156
  }
];

export default function AdminInnovationRegistryPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout
      title="Innovation Registry"
      description="Manage submitted innovations"
    >
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Innovations</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {innovations.map(innovation => (
            <Card key={innovation.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{innovation.title}</CardTitle>
                    <CardDescription>Category: {innovation.category}</CardDescription>
                  </div>
                  {getStatusBadge(innovation.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Submitted by:</span> {innovation.submittedBy}, {innovation.organization}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{innovation.submittedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{innovation.views} views</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                {innovation.status === 'pending' && (
                  <>
                    <Button variant="destructive" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </>
                )}
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send Feedback
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending">
          {innovations
            .filter(innovation => innovation.status === 'pending')
            .map(innovation => (
              <Card key={innovation.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{innovation.title}</CardTitle>
                      <CardDescription>Category: {innovation.category}</CardDescription>
                    </div>
                    {getStatusBadge(innovation.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Submitted by:</span> {innovation.submittedBy}, {innovation.organization}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{innovation.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="destructive" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="approved">
          {innovations
            .filter(innovation => innovation.status === 'approved')
            .map(innovation => (
              <Card key={innovation.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{innovation.title}</CardTitle>
                      <CardDescription>Category: {innovation.category}</CardDescription>
                    </div>
                    {getStatusBadge(innovation.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Submitted by:</span> {innovation.submittedBy}, {innovation.organization}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{innovation.submittedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{innovation.views} views</span>
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
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Featured
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="rejected">
          {innovations
            .filter(innovation => innovation.status === 'rejected')
            .map(innovation => (
              <Card key={innovation.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{innovation.title}</CardTitle>
                      <CardDescription>Category: {innovation.category}</CardDescription>
                    </div>
                    {getStatusBadge(innovation.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Submitted by:</span> {innovation.submittedBy}, {innovation.organization}
                    </p>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{innovation.submittedDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Reconsider
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
