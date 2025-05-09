
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function DashboardCollaborationPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Collaboration" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Collaboration</h1>
        <p className="text-muted-foreground">
          Connect with other users, join discussions and webinars
        </p>
      </div>
      
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Direct messages with other users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Messaging feature will be implemented in Phase 2.</p>
                <Button className="mt-4">Find Users</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forums</CardTitle>
              <CardDescription>Topic-based discussions with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Forums will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webinars">
          <Card>
            <CardHeader>
              <CardTitle>Webinars & Events</CardTitle>
              <CardDescription>Upcoming and recorded webinars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Webinars will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Meetings</CardTitle>
              <CardDescription>Request and manage one-on-one meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Meeting scheduling will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
