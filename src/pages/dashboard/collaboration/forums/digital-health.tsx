
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Plus } from "lucide-react";
import { format } from "date-fns";

export default function DigitalHealthForumPage() {
  // Mock forum topics
  const topics = [
    {
      id: "1",
      title: "Best practices for EHR implementation in small clinics",
      author: "Dr. Abdullah",
      avatar: "",
      date: "2025-05-09T15:30:00",
      replies: 24,
      views: 156,
      pinned: true,
      category: "Implementation"
    },
    {
      id: "2",
      title: "AI diagnostics: regulatory considerations for Saudi market",
      author: "Sara M.",
      avatar: "",
      date: "2025-05-08T09:45:00",
      replies: 18,
      views: 102,
      pinned: false,
      category: "Regulation"
    },
    {
      id: "3",
      title: "Patient data sharing between healthcare facilities",
      author: "Mohammed K.",
      avatar: "",
      date: "2025-05-07T14:20:00",
      replies: 32,
      views: 210,
      pinned: false,
      category: "Data Privacy"
    },
    {
      id: "4",
      title: "Telehealth platforms suitable for rural areas in KSA",
      author: "Fatima A.",
      avatar: "",
      date: "2025-05-05T11:15:00",
      replies: 15,
      views: 89,
      pinned: false,
      category: "Telehealth"
    }
  ];
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Digital Health Innovations" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Collaboration", href: "/dashboard/collaboration" },
          { label: "Forums", href: "/dashboard/collaboration/forums" }
        ]}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Digital Health Innovations</h1>
          <p className="text-muted-foreground mt-2">
            Discussions about digital health technologies, solutions, and implementations.
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
                56 topics, 238 posts
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
