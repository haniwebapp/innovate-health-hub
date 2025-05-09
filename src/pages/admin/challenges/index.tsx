
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, PlusCircle, Trash2, Users } from 'lucide-react';

// Mock challenges data
const challenges = [
  {
    id: '1',
    title: 'Digital Health Solutions for Rural Areas',
    category: 'Digital Health',
    submissions: 8,
    status: 'active',
    deadline: '2023-05-30',
    publishedDate: '2023-04-01'
  },
  {
    id: '2',
    title: 'AI-Powered Diagnostic Tools',
    category: 'Artificial Intelligence',
    submissions: 12,
    status: 'active',
    deadline: '2023-06-15',
    publishedDate: '2023-04-10'
  },
  {
    id: '3',
    title: 'Remote Patient Monitoring Systems',
    category: 'Telehealth',
    submissions: 5,
    status: 'closed',
    deadline: '2023-03-30',
    publishedDate: '2023-02-15'
  },
  {
    id: '4',
    title: 'Blockchain for Medical Records',
    category: 'Data Management',
    submissions: 3,
    status: 'draft',
    deadline: '2023-07-01',
    publishedDate: null
  }
];

export default function AdminChallengeManagementPage() {
  return (
    <AdminLayout
      title="Challenge Management"
      description="Create and manage innovation challenges"
      actions={
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      }
    >
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {challenges
            .filter(challenge => challenge.status === 'active')
            .map(challenge => (
              <Card key={challenge.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>Category: {challenge.category}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">{challenge.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{challenge.submissions} submissions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Deadline: {challenge.deadline}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm">
                    View Submissions
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="draft">
          {challenges
            .filter(challenge => challenge.status === 'draft')
            .map(challenge => (
              <Card key={challenge.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>Category: {challenge.category}</CardDescription>
                    </div>
                    <Badge variant="outline">{challenge.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span>Not published yet</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  <Button size="sm">
                    Publish
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="closed">
          {challenges
            .filter(challenge => challenge.status === 'closed')
            .map(challenge => (
              <Card key={challenge.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>Category: {challenge.category}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-200 text-gray-700">{challenge.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{challenge.submissions} submissions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Closed on: {challenge.deadline}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                  <Button size="sm">
                    View Submissions
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
