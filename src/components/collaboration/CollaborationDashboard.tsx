import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MessageSquare, Users, Video, UserPlus, Globe, Calendar, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function CollaborationDashboard() {
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Conversations</CardTitle>
            <CardDescription>Your ongoing discussions</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 rounded-full bg-green-500 p-0" />
                  <span>Direct Messages</span>
                </div>
                <Badge>4</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 rounded-full bg-blue-500 p-0" />
                  <span>Group Discussions</span>
                </div>
                <Badge>2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 rounded-full bg-amber-500 p-0" />
                  <span>Unread Messages</span>
                </div>
                <Badge>3</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/dashboard/collaboration/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Open Messages
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
            <CardDescription>Scheduled video calls and meetings</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              <div className="border rounded-md p-2">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Today, 3:00 PM</span>
                </div>
                <h4 className="font-medium text-sm">Innovation Review Meeting</h4>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>5 participants</span>
                </div>
              </div>
              <div className="border rounded-md p-2">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tomorrow, 10:00 AM</span>
                </div>
                <h4 className="font-medium text-sm">Regulatory Consultation</h4>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>3 participants</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/dashboard/collaboration/meetings">
                <Video className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Connection Requests</CardTitle>
            <CardDescription>Connect with healthcare innovators</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Dr. Sarah Ahmed</p>
                    <p className="text-xs text-muted-foreground">Healthcare Researcher</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Mohammed Khalid</p>
                    <p className="text-xs text-muted-foreground">Health Tech Investor</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/dashboard/collaboration/connections">
                <Users className="mr-2 h-4 w-4" />
                View All Connections
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Your latest conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Abdullah Al-Otaibi</p>
                        <p className="text-xs text-muted-foreground">30 minutes ago</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Direct
                    </Badge>
                  </div>
                  <p className="text-sm">
                    Thanks for sharing those regulatory documents. I've reviewed them and added my feedback. Let's discuss during our meeting tomorrow.
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>TG</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium">Healthcare Innovators</p>
                          <Badge>6 members</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-moh-green/10 text-moh-green">
                      Group
                    </Badge>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Layla:</span> Has anyone implemented the new patient data exchange standard? We're looking at integrating it in our platform.
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/dashboard/collaboration/messages">
                  View All Messages
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="forums" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forums</CardTitle>
              <CardDescription>Engage in healthcare innovation discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Digital Health Innovations</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">56 topics</Badge>
                        <Badge variant="outline">238 posts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Discussions about digital health technologies, solutions, and implementations.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/collaboration/forums/digital-health">
                        <Globe className="h-4 w-4 mr-1" />
                        Join
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Regulatory Compliance</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">42 topics</Badge>
                        <Badge variant="outline">175 posts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Discussions on navigating healthcare regulations in Saudi Arabia.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/collaboration/forums/regulatory">
                        <Globe className="h-4 w-4 mr-1" />
                        Join
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Healthcare Investment</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">38 topics</Badge>
                        <Badge variant="outline">126 posts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Forum for investors and startups to discuss healthcare funding opportunities.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/collaboration/forums/investment">
                        <Globe className="h-4 w-4 mr-1" />
                        Join
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/dashboard/collaboration/forums">
                  Explore All Forums
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Webinars, workshops, and networking events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-1">Webinar</Badge>
                      <h3 className="font-medium">AI in Healthcare: Opportunities and Challenges</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>May 20, 2025 at 15:00</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Dr. Ahmed Al-Farsi, Healthcare AI Specialist</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Registered
                    </Badge>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button size="sm" asChild>
                      <Link to="/dashboard/collaboration/events/ai-healthcare">
                        Add to Calendar
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-1">Workshop</Badge>
                      <h3 className="font-medium">Navigating Healthcare Regulations</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>May 25, 2025 at 10:00</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Ministry of Health Officials</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Register</Button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>120 minutes</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span>Featured Event</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/events">
                  View All Events
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
