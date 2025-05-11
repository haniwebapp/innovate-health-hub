
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Plus } from "lucide-react";
import { format } from "date-fns";

export default function InvestmentForumPage() {
  // Mock forum topics
  const topics = [
    {
      id: "1",
      title: "Funding opportunities for healthcare startups in Saudi Arabia",
      author: "Mohammed A.",
      avatar: "",
      date: "2025-05-09T11:30:00",
      replies: 27,
      views: 189,
      pinned: true,
      category: "Funding"
    },
    {
      id: "2",
      title: "How to prepare for investor pitches in healthcare tech",
      author: "Rania S.",
      avatar: "",
      date: "2025-05-07T13:15:00",
      replies: 19,
      views: 124,
      pinned: false,
      category: "Pitching"
    },
    {
      id: "3",
      title: "Valuation methods for healthcare startups",
      author: "Khalid N.",
      avatar: "",
      date: "2025-05-05T16:40:00",
      replies: 14,
      views: 92,
      pinned: false,
      category: "Valuation"
    },
    {
      id: "4",
      title: "Term sheets and investment agreements in Saudi Arabia",
      author: "Amal H.",
      avatar: "",
      date: "2025-05-03T09:20:00",
      replies: 11,
      views: 78,
      pinned: false,
      category: "Legal"
    }
  ];
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Healthcare Investment" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Collaboration", href: "/dashboard/collaboration" },
          { label: "Forums", href: "/dashboard/collaboration/forums" }
        ]}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Healthcare Investment</h1>
          <p className="text-muted-foreground mt-2">
            Forum for investors and startups to discuss healthcare funding opportunities.
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
                38 topics, 126 posts
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
