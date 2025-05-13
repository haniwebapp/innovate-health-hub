
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { EventService } from '@/services/events/EventService';
import { Event } from '@/types/eventTypes';

export const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const featuredEvents = await EventService.getFeaturedEvents(3);
        setEvents(featuredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-48 bg-slate-200 rounded-t-lg"></div>
            <CardContent className="p-5">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <div className="h-10 bg-slate-200 rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  // If there are no events, display a message
  if (events.length === 0) {
    return (
      <div className="text-center py-10 bg-moh-lightGreen/20 rounded-lg">
        <CalendarDays className="mx-auto h-12 w-12 text-moh-green/60" />
        <h3 className="mt-4 text-lg font-medium">No upcoming events</h3>
        <p className="mt-2 text-muted-foreground">Check back soon for new events!</p>
        <Button className="mt-4" asChild>
          <Link to="/dashboard/collaboration/events">View All Events</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {events.map((event, index) => {
        // Format dates
        const startDate = new Date(event.startDate);
        const formattedDate = startDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        const formattedTime = startDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <motion.div key={event.id} variants={itemVariants}>
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow group">
              <div className="bg-moh-lightGreen/30 px-4 py-2 flex justify-between items-center">
                <Badge className="bg-moh-green text-white">{event.eventType}</Badge>
                {event.featured && (
                  <Badge variant="outline" className="border-moh-gold text-moh-gold">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-5 flex-grow">
                <h3 className="text-lg font-bold group-hover:text-moh-green transition-colors mb-3">
                  {event.title}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 text-moh-green mr-2" />
                    <span>{formattedDate} at {formattedTime}</span>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-moh-green mr-2" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  
                  {event.isVirtual && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-moh-green mr-2" />
                      <span>Virtual Event</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-5 pt-0">
                <Button 
                  className="w-full bg-moh-green hover:bg-moh-darkGreen text-white"
                  asChild
                >
                  <Link to={`/dashboard/collaboration/events/${event.id}`}>
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
