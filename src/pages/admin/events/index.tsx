
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/events';
import AdminEventForm from '@/components/admin/events/AdminEventForm';
import AdminEventsList from '@/components/admin/events/AdminEventsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function EventsAdminPage() {
  const { data: events, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => EventService.getAllEvents(),
  });

  const handleEventAdded = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Events Management" 
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Events", href: "/admin/events" },
        ]}
      />
      
      <h1 className="text-2xl font-semibold">Events Management</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Events List</TabsTrigger>
          <TabsTrigger value="add">Add Event</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          {isLoading ? (
            <Card className="p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
            </Card>
          ) : error ? (
            <Card className="p-8 text-center">
              <h3 className="text-lg text-red-600">Error loading events</h3>
              <p className="text-muted-foreground">Please try again later</p>
            </Card>
          ) : (
            <AdminEventsList events={events || []} onEventUpdated={refetch} />
          )}
        </TabsContent>
        
        <TabsContent value="add">
          <AdminEventForm onEventAdded={handleEventAdded} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
