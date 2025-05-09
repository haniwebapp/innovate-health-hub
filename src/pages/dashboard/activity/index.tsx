
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ArrowUpRight, Download } from "lucide-react";

export default function DashboardActivityPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Activity History" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity History</h1>
        <p className="text-muted-foreground">
          Track your activity across the platform
        </p>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="innovations">Innovations</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Activities</CardTitle>
              <CardDescription>Your complete activity timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Activity tracking will be implemented in Phase 2.</p>
                <Button variant="outline" className="mt-4">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="innovations">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Activities</CardTitle>
              <CardDescription>Activities related to your innovations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Innovation activity tracking will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Activities</CardTitle>
              <CardDescription>Activities related to challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Challenge activity tracking will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investment">
          <Card>
            <CardHeader>
              <CardTitle>Investment Activities</CardTitle>
              <CardDescription>Activities related to investment opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Investment activity tracking will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
