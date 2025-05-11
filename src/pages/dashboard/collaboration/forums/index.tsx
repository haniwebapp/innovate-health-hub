
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForumsPage() {
  const forums = [
    {
      id: "digital-health",
      title: "Digital Health Innovations",
      description: "Discussions about digital health technologies, solutions, and implementations.",
      topics: 56,
      posts: 238
    },
    {
      id: "regulatory",
      title: "Regulatory Compliance",
      description: "Discussions on navigating healthcare regulations in Saudi Arabia.",
      topics: 42,
      posts: 175
    },
    {
      id: "investment",
      title: "Healthcare Investment",
      description: "Forum for investors and startups to discuss healthcare funding opportunities.",
      topics: 38,
      posts: 126
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          currentPage="Forums" 
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Collaboration", href: "/dashboard/collaboration" },
          ]}
        />
        
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Create New Topic
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forums.map((forum) => (
          <Card key={forum.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-moh-green" />
                {forum.title}
              </CardTitle>
              <CardDescription>{forum.description}</CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{forum.topics} topics</Badge>
                <Badge variant="outline">{forum.posts} posts</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Active members: 32</span>
                </div>
                <Button asChild>
                  <Link to={`/dashboard/collaboration/forums/${forum.id}`}>
                    Explore Forum
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
