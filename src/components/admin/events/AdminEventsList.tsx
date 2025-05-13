
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '@/types/events';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar, Star, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

interface AdminEventsListProps {
  events: Event[];
  onEventUpdated: () => void;
}

export default function AdminEventsList({ events, onEventUpdated }: AdminEventsListProps) {
  const [eventToDelete, setEventToDelete] = React.useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFeaturedChange = async (event: Event, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ featured })
        .eq('id', event.id);
      
      if (error) throw error;
      
      toast.success(`Event ${featured ? 'marked as featured' : 'removed from featured'}`);
      onEventUpdated();
    } catch (error: any) {
      console.error('Error updating event:', error);
      toast.error(`Failed to update event: ${error.message}`);
    }
  };

  const confirmDelete = (event: Event) => {
    setEventToDelete(event);
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventToDelete.id);
      
      if (error) throw error;
      
      toast.success('Event deleted successfully');
      onEventUpdated();
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error(`Failed to delete event: ${error.message}`);
    } finally {
      setIsDeleting(false);
      setEventToDelete(null);
    }
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No events found. Create your first event to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Events ({events.length})</h3>
            <Link to="/events">
              <Button variant="outline" size="sm">View Public Events</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Badge variant="outline">{event.eventType}</Badge>
                          {event.location ? (
                            <div className="flex items-center gap-1 text-xs">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate max-w-[150px]">{event.location}</span>
                            </div>
                          ) : null}
                          {event.presenter ? (
                            <div className="flex items-center gap-1 text-xs">
                              <Users className="h-3 w-3" />
                              <span>{event.presenter}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-moh-green" />
                        <span className="text-sm">{formatDate(event.startDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          event.status === 'upcoming' ? 'bg-blue-500' : 
                          event.status === 'ongoing' ? 'bg-green-500' : 
                          event.status === 'completed' ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={event.featured} 
                          onCheckedChange={(checked) => handleFeaturedChange(event, checked)} 
                        />
                        {event.featured && <Star className="h-4 w-4 text-amber-500" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" title="Edit event" asChild>
                          <Link to={`/admin/events/edit/${event.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => confirmDelete(event)}
                          title="Delete event"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!eventToDelete} onOpenChange={(open) => !open && setEventToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
              "{eventToDelete?.title}" and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
