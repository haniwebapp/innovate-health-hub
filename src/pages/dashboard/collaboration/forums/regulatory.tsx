
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Plus } from "lucide-react";
import { format } from "date-fns";

export default function RegulatoryForumPage() {
  // Mock forum topics
  const topics = [
    {
      id: "1",
      title: "New changes to medical device approval process in Saudi Arabia",
      author: "Ahmed S.",
      avatar: "",
      date: "2025-05-08T10:15:00",
      replies: 31,
      views: 203,
      pinned: true,
      category: "Device Regulation"
    },
    {
      id: "2",
      title: "Compliance checklist for health app development",
      author: "Layla K.",
      avatar: "",
      date: "2025-05-07T14:30:00",
      replies: 16,
      views: 97,
      pinned: false,
      category: "App Development"
    },
    {
      id: "3",
      title: "Patient data protection requirements under Saudi law",
      author: "Ibrahim M.",
      avatar: "",
      date: "2025-05-05T09:45:00",
      replies: 23,
      views: 142,
      pinned: false,
      category: "Data Protection"
    },
    {
      id: "4",
      title: "Upcoming regulatory changes for telemedicine providers",
      author: "Nora A.",
      avatar: "",
      date: "2025-05-02T16:20:00",
      replies: 12,
      views: 76,
      pinned: false,
      category: "Telemedicine"
    }
  ];
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Regulatory Compliance" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Collaboration", href: "/dashboard/collaboration" },
          { label: "Forums", href: "/dashboard/collaboration/forums" }
        ]}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Regulatory Compliance</h1>
          <p className="text-muted-foreground mt-2">
            Discussions on navigating healthcare regulations in Saudi Arabia.
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Topic
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Forum Topics</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                42 topics, 175 posts
              </span>
            </div>
          </div>
          
          <Tabs defaultValue="recent" className="mt-2">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {topics.map((topic) => (
            <div 
              key={topic.id} 
              className={`border-b py-4 ${topic.pinned ? 'bg-muted/30' : ''}`}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(topic.author)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {topic.pinned && (
                      <Badge variant="default" className="bg-moh-gold">Pinned</Badge>
                    )}
                    <Badge variant="outline">{topic.category}</Badge>
                  </div>
                  
                  <h3 className="font-medium text-lg mt-1">
                    <a href="#" className="hover:text-moh-green">{topic.title}</a>
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                    <span>By: {topic.author}</span>
                    <span>Posted: {format(new Date(topic.date), "MMM d, yyyy")}</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{topic.replies} replies</span>
                    </div>
                    <span>{topic.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Topics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
