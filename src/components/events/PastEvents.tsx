
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events/EventService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, PlayCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function PastEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['pastEvents'],
    queryFn: () => EventService.getPastEvents(4),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Past Events</h2>
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Past Events</h2>
        <Card className="p-8 text-center border-moh-gold/20 bg-white/50 backdrop-blur-sm">
          <h3 className="text-xl mb-2 text-moh-darkGreen">No past events found</h3>
          <p className="text-muted-foreground">
            Check back later for recordings of past events.
          </p>
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
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 relative">
          Past Events & Recordings
          <div className="absolute -bottom-2 left-0 w-12 h-1 bg-moh-gold"></div>
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => {
          const eventDate = new Date(event.startDate);
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full border-moh-gold/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                {event.recordingUrl ? (
                  <div className="relative">
                    <AspectRatio ratio={16/9}>
                      <div className="w-full h-full bg-gradient-to-br from-moh-green/5 to-moh-gold/5"></div>
                    </AspectRatio>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-moh-green/90 flex items-center justify-center">
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit border-moh-gold/30 text-moh-green">{event.eventType}</Badge>
                  <h3 className="font-semibold mt-2 line-clamp-2 text-gray-800">{event.title}</h3>
                </CardHeader>
                
                <CardContent className="flex-grow pb-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-moh-green" />
                    <span className="text-gray-600">{formattedDate}</span>
                  </div>
                  {event.recordingUrl && (
                    <Button 
                      className="w-full mt-4 bg-moh-green/10 hover:bg-moh-green/20 text-moh-darkGreen"
                      variant="outline"
                      asChild
                    >
                      <Link to={event.recordingUrl}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" asChild className="border-moh-green text-moh-green hover:bg-moh-green/5">
          <Link to="/events/archive">
            View All Past Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
