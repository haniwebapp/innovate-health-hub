
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/events";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => id ? EventService.getEventById(id) : null,
    enabled: !!id,
  });

  // Event images for the details page
  const eventImages = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="outline" asChild className="mb-6">
            <Link to="/events" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>

          {isLoading ? (
            <div className="w-full max-w-4xl mx-auto">
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-4 w-3/4"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded-md mb-2 w-1/2"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded-md mb-8 w-1/4"></div>
              <div className="h-32 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ) : error || !event ? (
            <Card className="w-full max-w-4xl mx-auto p-8 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h2>
              <p className="text-gray-600 mb-6">The event you're looking for does not exist or has been removed.</p>
              <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
                <Link to="/events">Browse All Events</Link>
              </Button>
            </Card>
          ) : (
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <AspectRatio ratio={21/9}>
                  <img 
                    src={eventImages[parseInt(event.id) % eventImages.length]} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="border-moh-green/30 text-moh-green">
                      {event.eventType}
                    </Badge>
                    {event.featured && (
                      <Badge className="bg-amber-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-moh-green" />
                        <span className="text-gray-700">
                          {new Date(event.startDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-moh-green" />
                        <span className="text-gray-700">
                          {new Date(event.startDate).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })} - {' '}
                          {new Date(event.endDate).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-moh-green" />
                        <span className="text-gray-700">
                          {event.location || (event.isVirtual ? 'Virtual Event' : 'Location TBA')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-moh-green" />
                        <div>
                          <span className="text-gray-700">
                            {event.presenter || 'Various speakers'}
                          </span>
                          {event.presenterTitle && (
                            <p className="text-sm text-gray-500">
                              {event.presenterTitle}, {event.presenterOrganization}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">About This Event</h2>
                    <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                  </div>
                  
                  <CardFooter className="px-0 pt-6 border-t border-gray-100 flex flex-wrap gap-3 justify-between">
                    {event.eventUrl && (
                      <Button variant="outline" asChild className="border-moh-green text-moh-green hover:bg-moh-green/5">
                        <a href={event.eventUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          Event Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    
                    {event.registrationUrl && (
                      <Button className="bg-moh-green hover:bg-moh-darkGreen">
                        Register Now
                      </Button>
                    )}
                  </CardFooter>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
