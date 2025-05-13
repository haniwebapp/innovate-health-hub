
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events/EventService";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function UpcomingEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: () => EventService.getUpcomingEvents(6),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-[200px] animate-pulse">
              <div className="h-full bg-slate-200 rounded-lg"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !events || events.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <Card className="p-8 text-center">
          <h3 className="text-xl mb-2">No upcoming events found</h3>
          <p className="text-muted-foreground">
            Check back soon for upcoming events.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const eventDate = new Date(event.startDate);
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
          const formattedTime = eventDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <Card key={event.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge>{event.eventType}</Badge>
                  <Badge variant="outline" className={
                    event.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    event.status === 'ongoing' ? 'bg-green-50 text-green-700 border-green-200' : 
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formattedTime}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 col-span-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.presenter && (
                    <div className="flex items-center gap-1 col-span-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.presenter}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="mr-2" asChild>
                  <Link to={`/events/${event.id}`}>Details</Link>
                </Button>
                <Button size="sm">Register</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link to="/events">View All Upcoming Events</Link>
        </Button>
      </div>
    </div>
  );
}
