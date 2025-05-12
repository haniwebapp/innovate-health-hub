
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarRange, FileText, ImageIcon, LayoutGrid } from 'lucide-react';

export default function AdminCmsPage() {
  return (
    <AdminLayout
      title="Content Management"
      description="Manage website content and pages"
    >
      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Pages</CardTitle>
              <CardDescription>Edit main navigation pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Home", "About", "Challenges", "Innovations", "Investment", "Regulatory", "Knowledge Hub"].map((page) => (
                  <Card key={page} className="bg-muted">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <LayoutGrid className="h-5 w-5 text-muted-foreground" />
                        <span>{page}</span>
                      </div>
                      <Button size="sm" variant="outline">Edit</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Manage uploaded images and files</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Media management will be implemented in Phase 3.</p>
              <Button>Upload New Media</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage blog content and articles</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Blog management will be implemented in Phase 3.</p>
              <Button>Create New Post</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events Calendar</CardTitle>
              <CardDescription>Manage upcoming events and webinars</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <CalendarRange className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Event management will be implemented in Phase 3.</p>
              <Button>Create New Event</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
