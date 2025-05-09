
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Edit, FileUp, Flag, Search, Tag } from 'lucide-react';

// Mock knowledge resources data
const resources = [
  {
    id: '1',
    title: 'Guide to Digital Health Regulations in Saudi Arabia',
    type: 'PDF',
    category: 'Regulatory',
    tags: ['Digital Health', 'Regulations', 'Compliance'],
    dateAdded: '2023-04-10',
    downloads: 145,
    featured: true
  },
  {
    id: '2',
    title: 'Healthcare Innovation Framework',
    type: 'Document',
    category: 'Innovation',
    tags: ['Framework', 'Best Practices'],
    dateAdded: '2023-03-22',
    downloads: 87,
    featured: false
  },
  {
    id: '3',
    title: 'Funding Options for Healthcare Startups',
    type: 'Presentation',
    category: 'Investment',
    tags: ['Funding', 'Startups', 'Investment'],
    dateAdded: '2023-04-05',
    downloads: 213,
    featured: true
  },
  {
    id: '4',
    title: 'AI in Healthcare: Case Studies',
    type: 'PDF',
    category: 'Technology',
    tags: ['AI', 'Case Studies', 'Implementation'],
    dateAdded: '2023-03-15',
    downloads: 178,
    featured: false
  },
];

export default function AdminKnowledgePage() {
  return (
    <AdminLayout
      title="Knowledge Repository"
      description="Manage resources and learning materials"
      actions={
        <Button>
          <FileUp className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      }
    >
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-8" />
        </div>
      </div>
      
      <Tabs defaultValue="resources" className="space-y-6">
        <TabsList>
          <TabsTrigger value="resources">All Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          {resources.map(resource => (
            <Card key={resource.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CardTitle>{resource.title}</CardTitle>
                    {resource.featured && (
                      <Badge className="bg-amber-500">
                        <Flag className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                </div>
                <CardDescription>Category: {resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <div>
                      <span className="text-muted-foreground">Date added:</span> {resource.dateAdded}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Downloads:</span> {resource.downloads}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {resource.featured ? (
                  <Button variant="outline" size="sm">
                    Unfeature
                  </Button>
                ) : (
                  <Button size="sm">
                    <Flag className="h-4 w-4 mr-1" />
                    Feature
                  </Button>
                )}
                <Button size="sm">
                  View Resource
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="featured">
          {resources
            .filter(resource => resource.featured)
            .map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CardTitle>{resource.title}</CardTitle>
                      <Badge className="bg-amber-500">
                        <Flag className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                  </div>
                  <CardDescription>Category: {resource.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <div>
                        <span className="text-muted-foreground">Date added:</span> {resource.dateAdded}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Downloads:</span> {resource.downloads}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Unfeature
                  </Button>
                  <Button size="sm">
                    View Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Resource Categories</CardTitle>
              <CardDescription>Manage knowledge categories</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Category management will be implemented in Phase 3.</p>
              <Button>Manage Categories</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags">
          <Card>
            <CardHeader>
              <CardTitle>Resource Tags</CardTitle>
              <CardDescription>Manage knowledge tags</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Tag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Tag management will be implemented in Phase 3.</p>
              <Button>Manage Tags</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
