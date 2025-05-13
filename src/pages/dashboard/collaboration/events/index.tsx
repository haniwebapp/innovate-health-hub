
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingEvents = [
    {
      id: "ai-healthcare",
      title: "AI in Healthcare: Opportunities and Challenges",
      type: "Webinar",
      date: "May 20, 2025",
      time: "15:00",
      presenter: "Dr. Ahmed Al-Farsi",
      presenterTitle: "Healthcare AI Specialist",
      duration: "120",
      registered: true,
      featured: true
    },
    {
      id: "regulatory-workshop",
      title: "Navigating Healthcare Regulations",
      type: "Workshop",
      date: "May 25, 2025",
      time: "10:00",
      presenter: "Ministry of Health Officials",
      presenterTitle: "",
      duration: "180",
      registered: false,
      featured: false
    },
    {
      id: "innovation-funding",
      title: "Securing Funding for Healthcare Innovations",
      type: "Panel",
      date: "June 5, 2025",
      time: "14:00",
      presenter: "Various Investors",
      presenterTitle: "",
      duration: "90",
      registered: false,
      featured: true
    }
  ];
  
  const pastEvents = [
    {
      id: "telemedicine-trends",
      title: "Telemedicine Trends in MENA",
      type: "Webinar",
      date: "April 15, 2025",
      time: "11:00",
      presenter: "Dr. Fatima Al-Mansouri",
      presenterTitle: "Telemedicine Specialist",
      duration: "60",
      recording: "https://example.com/recording",
      featured: false
    },
    {
      id: "patient-data",
      title: "Patient Data Security Best Practices",
      type: "Workshop",
      date: "April 5, 2025",
      time: "09:00",
      presenter: "Cyber Security Team",
      presenterTitle: "",
      duration: "120",
      recording: "https://example.com/recording",
      featured: true
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          currentPage="Events" 
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Collaboration", href: "/dashboard/collaboration" },
          ]}
        />
        
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/events">
              Public Events
            </Link>
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            View in Calendar
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge>{event.type}</Badge>
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
                  {event.registered ? (
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      Registered
                    </Badge>
                  ) : (
                    <Button>Register</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">{event.type}</Badge>
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
                  <Button variant="outline">
                    Watch Recording
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
