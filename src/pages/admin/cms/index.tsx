
import React from 'react';
import { Card } from "@/components/ui/card";
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CMSPageManager } from './components/CMSPageManager';
import { MediaLibrary } from './components/MediaLibrary';
import { BlogManager } from './components/BlogManager';
import { EventsManager } from './components/EventsManager';

export default function AdminCmsPage() {
  return (
    <AdminLayout
      title="Content Management"
      description="Manage website content, blog posts, media, and events"
    >
      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <CMSPageManager />
        </TabsContent>

        <TabsContent value="media">
          <MediaLibrary />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>

        <TabsContent value="events">
          <EventsManager />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
