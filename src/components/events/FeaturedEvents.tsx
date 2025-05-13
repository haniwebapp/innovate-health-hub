
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events/EventService";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function FeaturedEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['featuredEvents'],
    queryFn: () => EventService.getFeaturedEvents(3),
  });

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
        </div>
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Events</h2>
        <Card className="p-8 text-center border-moh-gold/20 bg-white/50 backdrop-blur-sm">
          <h3 className="text-xl mb-2 text-moh-darkGreen">No featured events found</h3>
          <p className="text-muted-foreground">
            Check back soon for upcoming featured events.
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
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-2">Featured Events</span>
          <div className="absolute -bottom-2 left-0 w-12 h-1 bg-moh-gold"></div>
        </motion.h2>
        <Button variant="outline" asChild className="border-moh-green text-moh-green hover:bg-moh-green/5">
          <Link to="/events">View All Events <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col border-moh-gold/20 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <div className="w-full h-full bg-gradient-to-br from-moh-green/10 to-moh-gold/10 flex items-center justify-center">
                      <div className="text-3xl text-moh-green/20 font-bold">{event.eventType.toUpperCase()}</div>
                    </div>
                  </AspectRatio>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500 text-white hover:bg-amber-600 flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>Featured</span>
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit border-moh-green/30 text-moh-green">{event.eventType}</Badge>
                  <h3 className="text-xl font-bold mt-2 text-gray-800">{event.title}</h3>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-moh-green" />
                      <span className="text-gray-600">{formattedDate} at {formattedTime}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-moh-green" />
                        <span className="text-gray-600">{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-moh-green" />
                      <span className="text-gray-600">
                        {Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60))} minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-moh-green" />
                      <span className="text-gray-600">{event.presenter || "Various speakers"}</span>
                    </div>
                    <p className="line-clamp-2 mt-2 text-gray-700">{event.description}</p>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 flex justify-between">
                  <Button variant="outline" asChild className="border-moh-green text-moh-green hover:bg-moh-green/5">
                    <Link to={`/events/${event.id}`}>Details</Link>
                  </Button>
                  <Button className="bg-moh-green hover:bg-moh-darkGreen">Register</Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
