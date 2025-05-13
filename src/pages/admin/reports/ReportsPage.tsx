
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart, Users, Activity, Newspaper, Calendar, Lightbulb } from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-moh-darkGreen">Reports</h1>
          <p className="text-muted-foreground">
            Analyze system data and generate reports
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export All Data
        </Button>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-6 h-auto">
          <TabsTrigger value="activity" className="py-2">
            <Activity className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="py-2">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="py-2">
            <FileBarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="innovations" className="py-2">
            <Lightbulb className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Innovations</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="py-2">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="py-2">
            <Newspaper className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Activity
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,842</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,453</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Engagement Rate
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.3%</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Session
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12m 24s</div>
                <p className="text-xs text-muted-foreground">
                  +1m 12s from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                System activity over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                {/* Activity chart would go here */}
                <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                  Activity Chart Placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>
                User registrations, activity, and growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                User Analytics Charts Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Reports</CardTitle>
              <CardDescription>
                Challenge participation and completion statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                Challenge Reports Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="innovations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Insights</CardTitle>
              <CardDescription>
                Analysis of innovation submissions and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                Innovation Insights Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
              <CardDescription>
                Event participation and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                Event Analytics Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>
                Analysis of content views and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                Content Performance Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
