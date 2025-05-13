
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events/EventService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PastEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['pastEvents'],
    queryFn: () => EventService.getPastEvents(4),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-[180px] animate-pulse">
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
        <h2 className="text-3xl font-bold mb-6">Past Events</h2>
        <Card className="p-8 text-center">
          <h3 className="text-xl mb-2">No past events found</h3>
          <p className="text-muted-foreground">
            Check back later for recordings of past events.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Past Events & Recordings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => {
          const eventDate = new Date(event.startDate);
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <Card key={event.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <Badge variant="outline">{event.eventType}</Badge>
                <h3 className="font-semibold mt-2 line-clamp-2">{event.title}</h3>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formattedDate}</span>
                </div>
                {event.recordingUrl && (
                  <Button className="w-full mt-4" size="sm" variant="outline">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Watch Recording
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link to="/events/archive">View All Past Events</Link>
        </Button>
      </div>
    </div>
  );
}
