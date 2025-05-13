
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Video, ExternalLink } from "lucide-react";
import { mockEvents } from "@/components/events/mockData";
import { Event } from "@/types/events";
import { format } from "date-fns";

const EventsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter events based on search query and selected category
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(mockEvents.map(event => event.category)));

  // Group events by status
  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
  const pastEvents = filteredEvents.filter(event => event.status === 'completed');
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Discover healthcare innovation events, workshops, and webinars
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search events..." 
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge 
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="cursor-pointer"
        >
          All
        </Badge>
        {categories.map(category => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="cursor-pointer"
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No upcoming events found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No past events found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          {event.featured && (
            <Badge className="bg-amber-500">Featured</Badge>
          )}
        </div>
        <CardDescription>{event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {event.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {format(event.startDate, "MMMM d, yyyy")}
              {event.startDate.toDateString() !== event.endDate.toDateString() && 
                ` - ${format(event.endDate, "MMMM d, yyyy")}`}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{format(event.startDate, "h:mm a")}</span>
          </div>
          {event.isVirtual ? (
            <div className="flex items-center text-sm">
              <Video className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Virtual Event</span>
            </div>
          ) : (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          )}
          {event.maxAttendees && (
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Limited to {event.maxAttendees} attendees</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div>
          <Badge variant="outline" className="mr-2">
            {event.category}
          </Badge>
        </div>
        {event.status === 'upcoming' ? (
          <Button>Register Now</Button>
        ) : event.recordingUrl ? (
          <Button variant="outline" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            Watch Recording
          </Button>
        ) : (
          <Badge variant="outline">Completed</Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventsPage;
