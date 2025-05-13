import React, { useState } from 'react';
import EventsHero from '@/components/events/EventsHero';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EventsFilter from '@/components/events/EventsFilter';
import { Calendar, MapPin, Clock, Users, Globe, Calendar as CalendarIcon, Search, Filter, Video } from "lucide-react";
import FeaturedEvents from '@/components/events/FeaturedEvents';
import UpcomingEvents from '@/components/events/UpcomingEvents';
import PastEvents from '@/components/events/PastEvents';

// Sample mock data
const upcomingEvents = [
  {
    id: "1",
    title: "Digital Health Innovation Forum",
    description: "Join healthcare leaders to discuss the latest innovations in digital health technologies and their implementation in healthcare settings.",
    date: "2025-05-25T09:00:00",
    endDate: "2025-05-25T16:00:00",
    location: "King Salman Conference Center, Riyadh",
    image: "/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png",
    category: "Conference",
    isVirtual: false,
    presenter: "Dr. Ahmed Al-Farsi",
    organization: "Ministry of Health"
  },
  {
    id: "2",
    title: "AI in Healthcare Workshop",
    description: "Learn about practical applications of artificial intelligence in clinical decision support, diagnostics, and patient care.",
    date: "2025-06-10T13:00:00",
    endDate: "2025-06-10T17:00:00",
    location: "Online",
    image: "/lovable-uploads/dcd2d50c-77f9-409a-a6ba-fe69ade5fe12.png",
    category: "Workshop",
    isVirtual: true,
    presenter: "Dr. Sarah Johnson",
    organization: "Healthcare AI Institute"
  },
  {
    id: "3",
    title: "Healthcare Regulatory Compliance Seminar",
    description: "A comprehensive seminar on navigating healthcare regulatory frameworks and ensuring compliance.",
    date: "2025-06-18T10:00:00",
    endDate: "2025-06-18T15:30:00",
    location: "Jeddah Business Hub",
    image: "/lovable-uploads/fc6609f7-b2c9-4eb5-8a3a-6baa876025c7.png",
    category: "Seminar",
    isVirtual: false,
    presenter: "Fatima Al-Qassim",
    organization: "Healthcare Regulatory Authority"
  },
  {
    id: "4",
    title: "Telehealth Implementation Webinar",
    description: "Best practices for implementing telehealth solutions in healthcare organizations.",
    date: "2025-06-22T14:00:00",
    endDate: "2025-06-22T16:00:00",
    location: "Online",
    image: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
    category: "Webinar",
    isVirtual: true,
    presenter: "Dr. Mohammed Al-Shaikh",
    organization: "Telehealth Association"
  }
];

const pastEvents = [
  {
    id: "5",
    title: "Healthcare Innovation Summit 2025",
    description: "A gathering of healthcare innovators discussing transformative technologies and approaches.",
    date: "2025-04-15T09:00:00",
    endDate: "2025-04-16T17:00:00",
    location: "King Abdullah Economic City",
    image: "/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png",
    category: "Summit",
    isVirtual: false,
    presenter: "Various Speakers",
    organization: "Ministry of Health",
    recordingUrl: "https://example.com/recording1"
  },
  {
    id: "6",
    title: "Medical Device Innovation Workshop",
    description: "Hands-on workshop exploring innovative medical device technologies and development approaches.",
    date: "2025-03-28T10:00:00",
    endDate: "2025-03-28T16:00:00",
    location: "Riyadh Medical Technology Center",
    image: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
    category: "Workshop",
    isVirtual: false,
    presenter: "Dr. Khalid Ibrahim",
    organization: "Medical Devices Association",
    recordingUrl: "https://example.com/recording2"
  }
];

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div>
      {/* Hero Section */}
      <EventsHero />
      
      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {/* Featured Events Section */}
        <section className="mb-12">
          <FeaturedEvents />
        </section>
        
        {/* Events Filter */}
        <section className="mb-12">
          <EventsFilter />
        </section>
        
        {/* Events List Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="upcoming" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming Events</span>
              </TabsTrigger>
              <TabsTrigger value="past" className="flex gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Past Events</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-6">
              <div className="relative flex-1 mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search events by title, speaker, or topic..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No upcoming events</h3>
                  <p className="text-muted-foreground">Check back soon for new events</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {upcomingEvents
                    .filter(event => 
                      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      event.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      event.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(event => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 h-48 md:h-auto relative">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                            <Badge 
                              className={`absolute top-4 left-4 ${
                                event.isVirtual 
                                  ? 'bg-blue-500' 
                                  : 'bg-moh-green'
                              }`}
                            >
                              {event.isVirtual ? (
                                <div className="flex items-center gap-1">
                                  <Video className="h-3 w-3" />
                                  <span>Virtual</span>
                                </div>
                              ) : 'In Person'}
                            </Badge>
                          </div>
                          <div className="p-6 md:w-2/3">
                            <div className="mb-4">
                              <Badge variant="outline" className="mb-2 bg-moh-lightGreen/50 text-moh-darkGreen">
                                {event.category}
                              </Badge>
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                            </div>
                            
                            <div className="space-y-1 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-moh-green" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-moh-green" />
                                <span>{formatTime(event.date)} - {formatTime(event.endDate)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {event.isVirtual ? (
                                  <>
                                    <Globe className="h-4 w-4 text-moh-green" />
                                    <span>{event.location}</span>
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="h-4 w-4 text-moh-green" />
                                    <span>{event.location}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-moh-green" />
                                <span>{event.presenter}, {event.organization}</span>
                              </div>
                            </div>
                            
                            <Button className="w-full md:w-auto bg-moh-green hover:bg-moh-darkGreen">
                              Register Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-6">
              <div className="relative flex-1 mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search past events..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {pastEvents.length === 0 ? (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No past events</h3>
                  <p className="text-muted-foreground">Check back later for archived events</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {pastEvents
                    .filter(event => 
                      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      event.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      event.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(event => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 h-48 md:h-auto relative">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover opacity-80 grayscale"
                            />
                            <Badge 
                              className="absolute top-4 left-4 bg-muted text-muted-foreground"
                            >
                              Past Event
                            </Badge>
                          </div>
                          <div className="p-6 md:w-2/3">
                            <div className="mb-4">
                              <Badge variant="outline" className="mb-2">
                                {event.category}
                              </Badge>
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                            </div>
                            
                            <div className="space-y-1 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{event.presenter}, {event.organization}</span>
                              </div>
                            </div>
                            
                            {event.recordingUrl && (
                              <Button 
                                variant="outline" 
                                className="w-full md:w-auto"
                                onClick={() => window.open(event.recordingUrl, '_blank')}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Watch Recording
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="bg-moh-lightGreen/30 border border-moh-green/20 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-moh-darkGreen mb-2">Want to host an event?</h3>
            <p className="text-muted-foreground mb-4">
              We welcome collaboration opportunities to host healthcare innovation events or webinars.
            </p>
            <Button>Contact Us About Events</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
