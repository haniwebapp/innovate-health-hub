
import React, { useState } from 'react';
import { format, parseISO, addHours } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, SearchIcon, Plus, Edit, Trash2, Eye, MoreHorizontal, Link } from 'lucide-react';
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'webinar' | 'conference' | 'workshop' | 'other';
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  presenterName: string;
  presenterOrg: string;
  registrationUrl?: string;
  eventUrl?: string;
  status: 'upcoming' | 'live' | 'past' | 'canceled';
  featured: boolean;
  maxAttendees?: number;
  currentAttendees: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI in Healthcare Innovation Webinar',
    description: 'Join us for an informative session on how AI is transforming healthcare innovation and improving patient outcomes.',
    eventType: 'webinar',
    startDate: '2025-05-20T14:00:00Z',
    endDate: '2025-05-20T15:30:00Z',
    location: 'Online',
    isVirtual: true,
    presenterName: 'Dr. Ahmed Al-Farsi',
    presenterOrg: 'Saudi Health Innovation Center',
    registrationUrl: 'https://example.com/register/ai-healthcare',
    eventUrl: 'https://example.com/webinar/ai-healthcare',
    status: 'upcoming',
    featured: true,
    maxAttendees: 500,
    currentAttendees: 243
  },
  {
    id: '2',
    title: 'Annual Healthcare Innovation Conference',
    description: 'A comprehensive two-day conference covering the latest trends and breakthroughs in healthcare technology and innovation.',
    eventType: 'conference',
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-16T17:00:00Z',
    location: 'Riyadh International Convention Center',
    isVirtual: false,
    presenterName: 'Various Speakers',
    presenterOrg: 'Ministry of Health',
    registrationUrl: 'https://example.com/register/annual-conference',
    status: 'upcoming',
    featured: true,
    maxAttendees: 1000,
    currentAttendees: 450
  },
  {
    id: '3',
    title: 'Healthcare Regulatory Compliance Workshop',
    description: 'A hands-on workshop for healthcare innovators to understand regulatory requirements and compliance procedures.',
    eventType: 'workshop',
    startDate: '2025-04-10T10:00:00Z',
    endDate: '2025-04-10T16:00:00Z',
    location: 'Jeddah Business Center',
    isVirtual: false,
    presenterName: 'Fatima Al-Otaibi',
    presenterOrg: 'Saudi FDA',
    registrationUrl: 'https://example.com/register/regulatory-workshop',
    status: 'past',
    featured: false,
    maxAttendees: 50,
    currentAttendees: 50
  },
  {
    id: '4',
    title: 'Digital Health Investment Forum',
    description: 'Connect with investors and learn about funding opportunities for healthcare startups and innovations.',
    eventType: 'conference',
    startDate: '2025-07-22T13:00:00Z',
    endDate: '2025-07-22T18:00:00Z',
    location: 'Online',
    isVirtual: true,
    presenterName: 'Multiple Speakers',
    presenterOrg: 'Saudi Investment Fund',
    registrationUrl: 'https://example.com/register/investment-forum',
    eventUrl: 'https://example.com/event/investment-forum',
    status: 'upcoming',
    featured: true,
    maxAttendees: 300,
    currentAttendees: 127
  },
  {
    id: '5',
    title: 'Healthcare Data Privacy Webinar',
    description: 'Essential information on protecting patient data and maintaining privacy in digital health solutions.',
    eventType: 'webinar',
    startDate: '2025-05-05T11:00:00Z',
    endDate: '2025-05-05T12:30:00Z',
    location: 'Online',
    isVirtual: true,
    presenterName: 'Dr. Mohammed Al-Zahrani',
    presenterOrg: 'Saudi Digital Health Authority',
    registrationUrl: 'https://example.com/register/data-privacy',
    eventUrl: 'https://example.com/webinar/data-privacy',
    status: 'past',
    featured: false,
    maxAttendees: 200,
    currentAttendees: 183
  }
];

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editForm, setEditForm] = useState<Partial<Event>>({
    title: '',
    description: '',
    eventType: 'webinar',
    startDate: '',
    endDate: '',
    location: '',
    isVirtual: false,
    presenterName: '',
    presenterOrg: '',
    registrationUrl: '',
    eventUrl: '',
    status: 'upcoming',
    featured: false,
    maxAttendees: 100
  });
  
  // Filter events based on active tab and search query
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.presenterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'all': return matchesSearch;
      case 'upcoming': return event.status === 'upcoming' && matchesSearch;
      case 'past': return event.status === 'past' && matchesSearch;
      case 'featured': return event.featured && matchesSearch;
      default: return matchesSearch;
    }
  });
  
  const handleAddEvent = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setSelectedEvent(null);
    setEditForm({
      title: '',
      description: '',
      eventType: 'webinar',
      startDate: tomorrow.toISOString(),
      endDate: addHours(tomorrow, 1).toISOString(),
      location: '',
      isVirtual: true,
      presenterName: '',
      presenterOrg: '',
      registrationUrl: '',
      eventUrl: '',
      status: 'upcoming',
      featured: false,
      maxAttendees: 100
    });
    setIsEditDialogOpen(true);
  };
  
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      isVirtual: event.isVirtual,
      presenterName: event.presenterName,
      presenterOrg: event.presenterOrg,
      registrationUrl: event.registrationUrl,
      eventUrl: event.eventUrl,
      status: event.status,
      featured: event.featured,
      maxAttendees: event.maxAttendees
    });
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };
  
  const handlePreviewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsPreviewDialogOpen(true);
  };
  
  const handleSaveEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...editForm, currentAttendees: event.currentAttendees } as Event : event
      ));
      toast.success('Event updated successfully');
    } else {
      // Create new event
      const newEvent: Event = {
        id: Math.random().toString(36).substring(2, 9),
        title: editForm.title || 'Untitled Event',
        description: editForm.description || '',
        eventType: editForm.eventType as 'webinar' | 'conference' | 'workshop' | 'other' || 'webinar',
        startDate: editForm.startDate || new Date().toISOString(),
        endDate: editForm.endDate || new Date().toISOString(),
        location: editForm.location || '',
        isVirtual: editForm.isVirtual || false,
        presenterName: editForm.presenterName || '',
        presenterOrg: editForm.presenterOrg || '',
        registrationUrl: editForm.registrationUrl,
        eventUrl: editForm.eventUrl,
        status: editForm.status as 'upcoming' | 'live' | 'past' | 'canceled' || 'upcoming',
        featured: editForm.featured || false,
        maxAttendees: editForm.maxAttendees,
        currentAttendees: 0
      };
      setEvents([...events, newEvent]);
      toast.success('Event created successfully');
    }
    setIsEditDialogOpen(false);
  };
  
  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setIsDeleteDialogOpen(false);
      toast.success('Event deleted successfully');
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy h:mm a');
    } catch (e) {
      return dateString;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
      case 'live':
        return <Badge className="bg-green-500">Live</Badge>;
      case 'past':
        return <Badge variant="outline" className="text-slate-500 border-slate-200 bg-slate-50">Past</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Events Calendar</CardTitle>
            <CardDescription>Manage upcoming events and webinars</CardDescription>
          </div>
          <Button onClick={handleAddEvent}>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full md:w-[250px]"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                            {event.presenterName && `By ${event.presenterName}`}
                            {event.presenterName && event.presenterOrg && ', '}
                            {event.presenterOrg}
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{event.eventType}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(event.startDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {event.isVirtual ? (
                            <span className="flex items-center">
                              <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                                Virtual
                              </Badge>
                            </span>
                          ) : (
                            <span>{event.location}</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>
                          {event.currentAttendees}
                          {event.maxAttendees && ` / ${event.maxAttendees}`}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreviewEvent(event)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEvent(event)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <CalendarRange className="h-12 w-12 mb-2" />
                          <h3 className="text-lg font-medium">No events found</h3>
                          <p className="text-sm mt-1">
                            {searchQuery 
                              ? "Try adjusting your search query" 
                              : "Get started by creating a new event"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? `Edit Event: ${selectedEvent.title}` : 'Create New Event'}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent 
                ? "Make changes to the event and save when done." 
                : "Fill in the details to create a new event."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Enter event description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select 
                      value={editForm.eventType || 'webinar'} 
                      onValueChange={(value: any) => setEditForm({ ...editForm, eventType: value })}
                    >
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={editForm.status || 'upcoming'} 
                      onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="past">Past</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVirtual"
                      checked={editForm.isVirtual || false}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, isVirtual: checked })}
                    />
                    <Label htmlFor="isVirtual">Virtual Event</Label>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editForm.location || ''}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder={editForm.isVirtual ? "Online" : "Enter physical location"}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={editForm.startDate ? format(parseISO(editForm.startDate), "yyyy-MM-dd'T'HH:mm") : ''}
                      onChange={(e) => setEditForm({ ...editForm, startDate: new Date(e.target.value).toISOString() })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>End Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={editForm.endDate ? format(parseISO(editForm.endDate), "yyyy-MM-dd'T'HH:mm") : ''}
                      onChange={(e) => setEditForm({ ...editForm, endDate: new Date(e.target.value).toISOString() })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="presenterName">Presenter Name</Label>
                    <Input
                      id="presenterName"
                      value={editForm.presenterName || ''}
                      onChange={(e) => setEditForm({ ...editForm, presenterName: e.target.value })}
                      placeholder="Enter presenter name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="presenterOrg">Presenter Organization</Label>
                    <Input
                      id="presenterOrg"
                      value={editForm.presenterOrg || ''}
                      onChange={(e) => setEditForm({ ...editForm, presenterOrg: e.target.value })}
                      placeholder="Enter presenter organization"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    min="1"
                    value={editForm.maxAttendees?.toString() || ''}
                    onChange={(e) => setEditForm({ ...editForm, maxAttendees: parseInt(e.target.value) || undefined })}
                    placeholder="Enter maximum attendees or leave blank for unlimited"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="registrationUrl">Registration URL</Label>
                  <Input
                    id="registrationUrl"
                    value={editForm.registrationUrl || ''}
                    onChange={(e) => setEditForm({ ...editForm, registrationUrl: e.target.value })}
                    placeholder="Enter registration URL"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="eventUrl">Event URL</Label>
                  <Input
                    id="eventUrl"
                    value={editForm.eventUrl || ''}
                    onChange={(e) => setEditForm({ ...editForm, eventUrl: e.target.value })}
                    placeholder="Enter event URL (for virtual events)"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={editForm.featured || false}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Event</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              {selectedEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event "{selectedEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Event Preview</DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  {getStatusBadge(selectedEvent.status)}
                  {selectedEvent.featured && (
                    <Badge className="bg-moh-green">Featured</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p>{formatDate(selectedEvent.startDate)}</p>
                    {selectedEvent.endDate && (
                      <p>to {formatDate(selectedEvent.endDate)}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{selectedEvent.isVirtual ? 'Virtual Event' : selectedEvent.location}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Presenter</p>
                    <p>{selectedEvent.presenterName}</p>
                    <p>{selectedEvent.presenterOrg}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Attendance</p>
                    <p>
                      {selectedEvent.currentAttendees} registered
                      {selectedEvent.maxAttendees && ` / ${selectedEvent.maxAttendees} max`}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="font-medium">Description</p>
                <p className="text-sm mt-1">{selectedEvent.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedEvent.registrationUrl && (
                  <Button size="sm" variant="outline" onClick={() => window.open(selectedEvent.registrationUrl, '_blank')}>
                    <Link className="h-4 w-4 mr-2" />
                    Registration Link
                  </Button>
                )}
                
                {selectedEvent.eventUrl && (
                  <Button size="sm" variant="outline" onClick={() => window.open(selectedEvent.eventUrl, '_blank')}>
                    <Link className="h-4 w-4 mr-2" />
                    Event Link
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
