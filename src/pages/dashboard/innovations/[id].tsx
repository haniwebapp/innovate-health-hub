
import { useParams } from "react-router-dom";
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { mockInnovations } from "@/components/innovations/data/mockInnovations";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, BarChart3, MessageSquare, Calendar, Download } from "lucide-react";

export default function DashboardInnovationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the innovation from mock data
  const innovation = mockInnovations.find(inn => inn.id === id);
  
  if (!innovation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Innovation not found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage={innovation.title} 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Innovations", href: "/dashboard/innovations" },
        ]}
      />
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Left sidebar with innovation image and details */}
        <div className="w-full md:w-64">
          <Card>
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src={innovation.imageUrl} 
                alt={innovation.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge className="bg-moh-lightGreen text-moh-darkGreen">
                    {innovation.category}
                  </Badge>
                  <Badge variant={innovation.status === "New" ? "default" : "secondary"}>
                    {innovation.status}
                  </Badge>
                </div>
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span>{new Date(innovation.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Views</span>
                    <span>{Math.floor(Math.random() * 100)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span>{innovation.rating}/5</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Innovation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{innovation.title}</CardTitle>
              <CardDescription>{innovation.organization || "Your Organization"}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {innovation.longDescription || innovation.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {innovation.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Innovation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Problem Statement</h4>
                      <p className="text-muted-foreground">
                        The innovation addresses the challenge of early disease detection in remote areas.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Solution</h4>
                      <p className="text-muted-foreground">
                        AI-powered diagnostic tool that works offline and requires minimal training.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Target Users</h4>
                      <p className="text-muted-foreground">
                        Primary healthcare workers in rural communities.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Current Stage</h4>
                      <p className="text-muted-foreground">
                        Prototype with initial field testing completed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Viewer Demographics</CardTitle>
                    <CardDescription>Who is viewing your innovation</CardDescription>
                  </div>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Analytics data will be available in Phase 1.</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>How users interact with your innovation</CardDescription>
                  </div>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Engagement metrics will be available in Phase 1.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>User Feedback</CardTitle>
                    <CardDescription>Comments and reviews from viewers</CardDescription>
                  </div>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Feedback functionality will be available in Phase 1.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Documents & Resources</CardTitle>
                    <CardDescription>Supporting materials for your innovation</CardDescription>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Resource management will be available in Phase 1.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
