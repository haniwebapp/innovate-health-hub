
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; 
import { Calendar, Clock, Users, MapPin, CalendarDays } from "lucide-react";
import { format } from "date-fns";

export default function AIHealthcareEventPage() {
  // Event details
  const event = {
    id: "ai-healthcare",
    title: "AI in Healthcare: Opportunities and Challenges",
    type: "Webinar",
    date: "May 20, 2025",
    time: "15:00",
    duration: "120",
    presenter: "Dr. Ahmed Al-Farsi",
    presenterTitle: "Healthcare AI Specialist",
    presenterBio: "Dr. Ahmed Al-Farsi is a leading expert in healthcare AI applications with over 15 years of experience in developing machine learning solutions for medical diagnostics. He has published numerous papers on AI applications in radiology, pathology, and clinical decision support systems.",
    description: "This webinar explores the rapidly evolving field of artificial intelligence in healthcare, with a focus on implementation challenges and opportunities in Saudi Arabia. We'll discuss real-world applications, regulatory considerations, and future trends in AI-driven healthcare solutions.",
    topics: [
      "Current state of AI in healthcare globally and regionally",
      "Machine learning models for medical diagnostics and treatment planning",
      "Implementing AI solutions in Saudi healthcare institutions",
      "Data challenges and ethical considerations",
      "Regulatory framework for AI in healthcare",
      "Future trends and opportunities"
    ],
    location: "Online - Zoom",
    participants: 85,
    registered: true,
    featured: true,
    joinLink: "https://zoom.us/j/example"
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Event Details" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Collaboration", href: "/dashboard/collaboration" },
          { label: "Events", href: "/dashboard/collaboration/events" }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="mb-2">{event.type}</Badge>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </div>
                {event.registered && (
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    Registered
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date and Time</p>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{event.duration} minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">{event.participants} registered</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium text-lg mb-2">Topics Covered</h3>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                {event.topics.map((topic, index) => (
                  <li key={index} className="text-sm">{topic}</li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {event.registered ? (
                  <>
                    <Button>Join Webinar</Button>
                    <Button variant="outline">Add to Calendar</Button>
                  </>
                ) : (
                  <Button>Register Now</Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  Join the discussion about this event.
                </p>
                <Button>Start Discussion</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Presenter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-xl">
                    {event.presenter.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg">{event.presenter}</h3>
                <p className="text-sm text-muted-foreground mb-4">{event.presenterTitle}</p>
                <p className="text-sm">{event.presenterBio}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Similar Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border rounded-md p-3">
                  <h4 className="font-medium">Data Privacy in Healthcare AI</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>June 15, 2025</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto mt-1" size="sm">
                    View Details
                  </Button>
                </div>
                
                <div className="border rounded-md p-3">
                  <h4 className="font-medium">AI-Powered Medical Diagnostics</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>July 7, 2025</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto mt-1" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
