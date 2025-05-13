
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events/EventService";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function UpcomingEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: () => EventService.getUpcomingEvents(6),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Upcoming Events</h2>
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Upcoming Events</h2>
        <Card className="p-8 text-center border-moh-gold/20 bg-white/50 backdrop-blur-sm">
          <h3 className="text-xl mb-2 text-moh-darkGreen">No upcoming events found</h3>
          <p className="text-muted-foreground">
            Check back soon for upcoming events.
          </p>
          <Button variant="outline" className="mt-4 border-moh-green text-moh-green hover:bg-moh-green/5">
            Submit an Event
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-3 mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 relative">
          Upcoming Events
          <div className="absolute -bottom-2 left-0 w-12 h-1 bg-moh-green"></div>
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => {
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

          const statusColors = {
            upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
            ongoing: 'bg-green-50 text-green-700 border-green-200',
            completed: 'bg-amber-50 text-amber-700 border-amber-200',
            cancelled: 'bg-red-50 text-red-700 border-red-200'
          };

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full border-moh-gold/20 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="border-moh-green/30 text-moh-green">{event.eventType}</Badge>
                    <Badge variant="outline" className={statusColors[event.status]}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mt-2 text-gray-800">{event.title}</h3>
                </CardHeader>
                
                <CardContent className="pb-2 flex-grow">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-moh-green" />
                      <span className="text-gray-600">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-moh-green" />
                      <span className="text-gray-600">{formattedTime}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 col-span-2">
                        <MapPin className="h-4 w-4 text-moh-green" />
                        <span className="text-gray-600 truncate">{event.location}</span>
                      </div>
                    )}
                    {event.presenter && (
                      <div className="flex items-center gap-1 col-span-2">
                        <Users className="h-4 w-4 text-moh-green" />
                        <span className="text-gray-600 truncate">{event.presenter}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="mr-2 border-moh-green text-moh-green hover:bg-moh-green/5" asChild>
                    <Link to={`/events/${event.id}`}>Details</Link>
                  </Button>
                  <Button size="sm" className="bg-moh-green hover:bg-moh-darkGreen">Register</Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" asChild className="border-moh-green text-moh-green hover:bg-moh-green/5">
          <Link to="/events">
            View All Upcoming Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
