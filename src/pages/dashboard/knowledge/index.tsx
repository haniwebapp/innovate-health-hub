
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardKnowledgePage() {
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
      
      <Tabs defaultValue="recommended" className="space-y-4">
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
              <div className="text-center py-10">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Personalized learning feature will be implemented in Phase 2.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/knowledge-hub">Browse Public Knowledge Hub</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Resources</CardTitle>
              <CardDescription>Your bookmarked and downloaded resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Resource saving feature will be implemented in Phase 2.</p>
              </div>
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
              <div className="text-center py-10">
                <p className="text-muted-foreground">Learning paths will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
