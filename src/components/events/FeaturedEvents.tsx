
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events/EventService";

export default function FeaturedEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['featuredEvents'],
    queryFn: () => EventService.getFeaturedEvents(3),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-[350px] animate-pulse">
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
        <h2 className="text-3xl font-bold mb-6">Featured Events</h2>
        <Card className="p-8 text-center">
          <h3 className="text-xl mb-2">No featured events found</h3>
          <p className="text-muted-foreground">
            Check back soon for upcoming featured events.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Featured Events</h2>
        <Button variant="outline" asChild>
          <Link to="/events">View All Events</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Card key={event.id} className="overflow-hidden h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge>{event.eventType}</Badge>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Featured</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-2">{event.title}</h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formattedDate} at {formattedTime}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60))} minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.presenter || "Various speakers"}</span>
                  </div>
                  <p className="line-clamp-2 mt-2">{event.description}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/events/${event.id}`}>Details</Link>
                </Button>
                <Button>Register</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
