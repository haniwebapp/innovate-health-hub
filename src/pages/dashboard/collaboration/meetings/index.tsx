
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Video, Clock, Users, Plus, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const today = new Date().toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const upcomingMeetings = [
    {
      id: "1",
      title: "Innovation Review Meeting",
      date: today,
      time: "15:00",
      duration: "60",
      participants: 5,
      host: "You",
      status: "scheduled",
      link: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: "2",
      title: "Regulatory Consultation",
      date: tomorrow.toDateString(),
      time: "10:00",
      duration: "45",
      participants: 3,
      host: "Dr. Abdullah",
      status: "scheduled",
      link: "https://meet.google.com/klm-nopq-rst"
    },
    {
      id: "3",
      title: "Healthcare Data Framework Discussion",
      date: tomorrow.toDateString(),
      time: "14:30",
      duration: "90",
      participants: 8,
      host: "Ministry of Health",
      status: "pending",
      link: ""
    }
  ];
  
  const pastMeetings = [
    {
      id: "4",
      title: "Project Status Update",
      date: "Mon May 05 2025",
      time: "11:00",
      duration: "30",
      participants: 4,
      recording: "https://example.com/recording1"
    },
    {
      id: "5",
      title: "Medical Device Regulation Workshop",
      date: "Fri May 02 2025",
      time: "13:30",
      duration: "120",
      participants: 12,
      recording: "https://example.com/recording2"
    }
  ];
  
  // Format meeting date for display
  const formatMeetingDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return format(date, "MMM d, yyyy");
    }
  };
  
  const selectedDateMeetings = upcomingMeetings.filter(meeting => {
    if (!date) return false;
    return new Date(meeting.date).toDateString() === date.toDateString();
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          currentPage="Meetings" 
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Collaboration", href: "/dashboard/collaboration" },
          ]}
        />
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Video Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="mt-4 space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatMeetingDate(meeting.date)}, {meeting.time}</span>
                            </div>
                            <div className="hidden sm:block text-muted-foreground">•</div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{meeting.duration} min</span>
                            </div>
                            <div className="hidden sm:block text-muted-foreground">•</div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{meeting.participants} participants</span>
                            </div>
                          </div>
                          <div className="mt-1 text-sm">
                            <span className="text-muted-foreground">Host: </span>
                            <span>{meeting.host}</span>
                          </div>
                        </div>
                        
                        {meeting.status === "scheduled" ? (
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            Scheduled
                          </Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t">
                        {meeting.status === "scheduled" && (
                          <Button>
                            <Video className="h-4 w-4 mr-2" />
                            Join Meeting
                          </Button>
                        )}
                        <Button variant="outline">View Details</Button>
                        {meeting.status === "pending" && (
                          <Button variant="outline">Confirm</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="past" className="mt-4 space-y-4">
                  {pastMeetings.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatMeetingDate(meeting.date)}, {meeting.time}</span>
                            </div>
                            <div className="hidden sm:block text-muted-foreground">•</div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{meeting.duration} min</span>
                            </div>
                            <div className="hidden sm:block text-muted-foreground">•</div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{meeting.participants} participants</span>
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t">
                        <Button>
                          <Video className="h-4 w-4 mr-2" />
                          Watch Recording
                        </Button>
                        <Button variant="outline">Meeting Notes</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Meeting Calendar</CardTitle>
              <CardDescription>Select a date to see scheduled meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
                initialFocus
              />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">
                  {date ? format(date, "MMMM d, yyyy") : "No date selected"}
                </h4>
                
                {selectedDateMeetings.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDateMeetings.map(meeting => (
                      <div key={meeting.id} className="border rounded-md p-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{meeting.title}</span>
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{meeting.participants} participants</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No meetings scheduled for this date</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
