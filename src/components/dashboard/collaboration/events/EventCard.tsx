
import React from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    presenter: string;
    presenterTitle?: string;
    duration: string;
    registered?: boolean;
    featured?: boolean;
    recording?: string;
  };
  isPast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isPast = false }) => {
  return (
    <Card key={event.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant={isPast ? "outline" : "default"}>{event.type}</Badge>
          {event.featured && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Featured</span>
            </div>
          )}
        </div>
        <CardTitle className="mt-1">{event.title}</CardTitle>
        <CardDescription className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.presenter}</span>
            {event.presenterTitle && (
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                {event.presenterTitle}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.duration} minutes</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" asChild>
          <Link to={`/dashboard/collaboration/events/${event.id}`}>
            View Details
          </Link>
        </Button>
        {isPast ? (
          <Button variant="outline">
            Watch Recording
          </Button>
        ) : (
          event.registered ? (
            <Badge className="bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
          ) : (
            <Button>Register</Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
