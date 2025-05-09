
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, ExternalLink, Star, Clock, Bookmark, GraduationCap,
  Play, ArrowRight, Check, CalendarDays, Users, Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for recommended resources
const recommendedResources = [
  {
    id: "1",
    title: "Digital Health Innovation Guide",
    type: "Guide",
    category: "Digital Health",
    thumbnail: "/lovable-uploads/4b75072f-e048-410c-8071-da579732a493.png",
    matchScore: 92,
    isNew: true,
  },
  {
    id: "2",
    title: "Regulatory Compliance for Medical Devices",
    type: "Course",
    category: "Regulatory",
    thumbnail: "/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png",
    matchScore: 86,
    isNew: false,
  },
  {
    id: "3",
    title: "Healthcare Data Security Best Practices",
    type: "Whitepaper",
    category: "Security",
    thumbnail: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
    matchScore: 78,
    isNew: true,
  }
];

// Mock data for saved resources
const savedResources = [
  {
    id: "4",
    title: "Securing Investment for Healthcare Startups",
    type: "Webinar",
    savedDate: "2025-04-12",
    lastViewed: "2025-04-30",
    category: "Investment",
  },
  {
    id: "5",
    title: "AI in Medical Diagnosis: Regulatory Considerations",
    type: "Whitepaper",
    savedDate: "2025-03-25",
    lastViewed: "2025-04-15",
    category: "AI",
  }
];

// Mock data for learning paths
const learningPaths = [
  {
    id: "1",
    title: "Healthcare Innovation Fundamentals",
    modules: 5,
    completedModules: 2,
    estimatedHours: 8,
    category: "Innovation",
    enrolled: true,
  },
  {
    id: "2",
    title: "Regulatory Compliance Mastery",
    modules: 7,
    completedModules: 0,
    estimatedHours: 12,
    category: "Regulatory",
    enrolled: false,
  }
];

// Mock data for upcoming webinars
const upcomingWebinars = [
  {
    id: "1",
    title: "AI in Healthcare: Opportunities and Challenges",
    date: "2025-05-20",
    time: "15:00",
    speaker: "Dr. Ahmed Al-Farsi",
    registered: true
  },
  {
    id: "2",
    title: "Securing Investment for Healthcare Innovations",
    date: "2025-06-05",
    time: "10:30",
    speaker: "Sarah Johnson",
    registered: false
  }
];

export default function DashboardKnowledgePage() {
  const [activeTab, setActiveTab] = useState("recommended");
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Knowledge Hub" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Knowledge Hub</h1>
        <p className="text-muted-foreground">
          Access personalized learning resources
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="saved">Saved Resources</TabsTrigger>
          <TabsTrigger value="learning">Learning Paths</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>AI-curated content based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden border">
                    <div className="h-40 bg-muted relative">
                      {resource.thumbnail ? (
                        <img 
                          src={resource.thumbnail} 
                          alt={resource.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <BookOpen className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Badge className="bg-moh-green">
                          Match: {resource.matchScore}%
                        </Badge>
                        {resource.isNew && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">
                        {resource.category}
                      </Badge>
                      <h3 className="font-medium text-base mb-1">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {resource.type}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/knowledge-hub/resource/${resource.id}`}>
                            View Resource
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link to="/knowledge-hub">
                    Browse All Resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">Upcoming Webinars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingWebinars.map(webinar => (
                <Card key={webinar.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="mb-2">Webinar</Badge>
                        <h3 className="font-medium">{webinar.title}</h3>
                        <div className="flex items-center gap-2 text-sm mt-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span>{webinar.date} at {webinar.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{webinar.speaker}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      {webinar.registered ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="w-3 h-3 mr-1" />
                            Registered
                          </Badge>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/knowledge-hub/webinars/${webinar.id}`}>
                              Add to Calendar
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm">
                          Register Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Resources</CardTitle>
              <CardDescription>Your bookmarked and downloaded resources</CardDescription>
            </CardHeader>
            <CardContent>
              {savedResources.length > 0 ? (
                <div className="space-y-4">
                  {savedResources.map(resource => (
                    <div key={resource.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-1">
                            {resource.category} • {resource.type}
                          </Badge>
                          <h3 className="font-medium">{resource.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Saved: {resource.savedDate}</span>
                            <span>Last viewed: {resource.lastViewed}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                        </Button>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/knowledge-hub/resource/${resource.id}`}>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't saved any resources yet.</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/knowledge-hub">Browse Resources</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Learning Paths</CardTitle>
              <CardDescription>Structured learning journeys for healthcare innovation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningPaths.map(path => (
                  <div key={path.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Badge variant="outline" className="mb-1">
                          {path.category}
                        </Badge>
                        <h3 className="font-medium">{path.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{path.modules} Modules</span>
                          <span>{path.estimatedHours} Hours</span>
                        </div>
                      </div>
                      {path.enrolled && (
                        <Badge className="bg-green-500">
                          Enrolled
                        </Badge>
                      )}
                    </div>
                    
                    {path.enrolled && (
                      <>
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{path.completedModules}/{path.modules} modules completed</span>
                          </div>
                          <Progress value={(path.completedModules / path.modules) * 100} />
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/knowledge-hub/learning-paths/${path.id}`}>
                              View Path
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/knowledge-hub/learning-paths/${path.id}/continue`}>
                              <Play className="h-3 w-3 mr-1" />
                              Continue Learning
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                    
                    {!path.enrolled && (
                      <div className="flex justify-end">
                        <Button size="sm">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          Enroll Now
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mt-4 text-center pt-4 border-t">
                  <h3 className="font-medium mb-2">Discover More Learning Paths</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore structured learning journeys tailored to your interests and career goals
                  </p>
                  <Button asChild>
                    <Link to="/knowledge-hub/learning-paths">
                      Browse All Learning Paths
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
