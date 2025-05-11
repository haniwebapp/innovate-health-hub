
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, Video, Search, Plus, UserPlus, CalendarPlus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
  };
  preview: string;
  timestamp: string;
  unread: boolean;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  status: "upcoming" | "completed" | "cancelled";
}

interface ForumTopic {
  id: string;
  title: string;
  category: string;
  replies: number;
  lastActivity: string;
}

export function CollaborationDashboard() {
  const [activeTab, setActiveTab] = useState("messages");
  
  // Mock data for demonstration
  const recentMessages: Message[] = [
    {
      id: "msg1",
      sender: { name: "Sarah Johnson" },
      preview: "I'd be interested in discussing your approach to clinical validation...",
      timestamp: "2h ago",
      unread: true
    },
    {
      id: "msg2",
      sender: { name: "Dr. Ahmed Al-Farsi" },
      preview: "Thanks for sharing your research. Have you considered applying for...",
      timestamp: "Yesterday",
      unread: false
    }
  ];
  
  const upcomingMeetings: Meeting[] = [
    {
      id: "meet1",
      title: "Innovation Review Session",
      date: "May 15, 2025",
      time: "10:30 AM",
      attendees: 3,
      status: "upcoming"
    },
    {
      id: "meet2",
      title: "Regulatory Compliance Discussion",
      date: "May 18, 2025",
      time: "2:00 PM",
      attendees: 4,
      status: "upcoming"
    }
  ];
  
  const forumTopics: ForumTopic[] = [
    {
      id: "topic1",
      title: "Challenges in Medical Device Regulatory Approval",
      category: "Regulatory",
      replies: 24,
      lastActivity: "3h ago"
    },
    {
      id: "topic2",
      title: "AI in Healthcare: Opportunities and Limitations",
      category: "Technology",
      replies: 32,
      lastActivity: "Yesterday"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "upcoming": return "bg-green-50 border-green-200 text-green-700";
      case "completed": return "bg-blue-50 border-blue-200 text-blue-700";
      case "cancelled": return "bg-red-50 border-red-200 text-red-700";
      default: return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Collaboration Hub</h1>
          <p className="text-muted-foreground">
            Connect, communicate, and collaborate with healthcare innovators
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard/collaboration/find">
              <Search className="h-4 w-4 mr-2" />
              Find Collaborators
            </Link>
          </Button>
          <Button variant="default" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
            <Link to="/dashboard/collaboration/messages/new">
              <MessageSquare className="h-4 w-4 mr-2" />
              New Message
            </Link>
          </Button>
        </div>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Your latest conversations with others</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentMessages.length > 0 ? (
                    <div className="space-y-4">
                      {recentMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-4 border rounded-md flex justify-between ${message.unread ? "bg-blue-50 border-blue-100" : ""}`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                {message.sender.avatar ? (
                                  <img src={message.sender.avatar} alt={message.sender.name} className="w-full h-full rounded-full" />
                                ) : (
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <h3 className="font-medium">{message.sender.name}</h3>
                              {message.unread && (
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{message.preview}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{message.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No messages yet</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" asChild>
                      <Link to="/dashboard/collaboration/messages">
                        View All Messages
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Connection and collaboration tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/dashboard/collaboration/messages/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Message
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/dashboard/collaboration/connections">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Find Connections
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/dashboard/collaboration/meetings/schedule">
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>Your scheduled discussions and calls</CardDescription>
                </div>
                <Button asChild>
                  <Link to="/dashboard/collaboration/meetings/schedule">
                    <Plus className="h-4 w-4 mr-1" />
                    Schedule
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingMeetings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {meeting.date}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {meeting.time}
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {meeting.attendees} attendees
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(meeting.status)}`}>
                          {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/collaboration/meetings/${meeting.id}`}>
                            Details
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/dashboard/collaboration/meetings/${meeting.id}/join`}>
                            <Video className="h-3 w-3 mr-1" />
                            Join
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming meetings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Discussion Forums</CardTitle>
                  <CardDescription>Connect with the healthcare innovation community</CardDescription>
                </div>
                <Button asChild>
                  <Link to="/dashboard/collaboration/forums/new">
                    <Plus className="h-4 w-4 mr-1" />
                    New Topic
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {forumTopics.length > 0 ? (
                <div className="space-y-4">
                  {forumTopics.map((topic) => (
                    <div key={topic.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{topic.title}</h3>
                          <div className="flex items-center text-sm mt-1">
                            <span className="px-2 py-0.5 bg-moh-green/10 text-moh-green rounded-full text-xs">
                              {topic.category}
                            </span>
                            <span className="ml-4 text-muted-foreground text-xs">
                              {topic.replies} replies
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last activity {topic.lastActivity}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/collaboration/forums/topic/${topic.id}`}>
                            View Discussion
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No forum topics yet</p>
                </div>
              )}
              
              <div className="mt-4 flex justify-center">
                <Button variant="outline" asChild>
                  <Link to="/dashboard/collaboration/forums">
                    View All Discussions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
              <CardDescription>Manage your collaboration teams</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Team functionality will be available in the next update
              </p>
              <Button disabled>Create Team</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
