
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome{user?.user_metadata?.firstName ? `, ${user.user_metadata.firstName}` : ''}! 
          Manage your activities on the Ministry of Health Innovation Platform.
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-innovations">My Innovations</TabsTrigger>
          <TabsTrigger value="my-challenges">My Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Challenges</CardTitle>
                <CardDescription>Current challenges you can participate in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Your Innovations</CardTitle>
                <CardDescription>Innovations you've submitted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Knowledge Hub</CardTitle>
                <CardDescription>Articles and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">25+</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick links to help you navigate the platform</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">Submit an Innovation</h3>
                <p className="text-sm text-muted-foreground mb-3">Share your healthcare innovation with the Ministry of Health.</p>
                <a href="/innovations/submit" className="text-sm text-primary hover:underline">Get Started →</a>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">Join a Challenge</h3>
                <p className="text-sm text-muted-foreground mb-3">Participate in healthcare innovation challenges.</p>
                <a href="/challenges" className="text-sm text-primary hover:underline">View Challenges →</a>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground mb-3">Update your information to get personalized opportunities.</p>
                <a href="/dashboard/profile" className="text-sm text-primary hover:underline">Update Profile →</a>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">Explore Resources</h3>
                <p className="text-sm text-muted-foreground mb-3">Access healthcare innovation resources and guides.</p>
                <a href="/knowledge-hub" className="text-sm text-primary hover:underline">Browse Resources →</a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-innovations">
          <Card>
            <CardHeader>
              <CardTitle>My Innovations</CardTitle>
              <CardDescription>View and manage your submitted innovations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">You haven't submitted any innovations yet.</p>
                <a href="/innovations/submit" className="text-primary hover:underline mt-2 inline-block">Submit your first innovation</a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-challenges">
          <Card>
            <CardHeader>
              <CardTitle>My Challenges</CardTitle>
              <CardDescription>Challenges you've participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">You haven't joined any challenges yet.</p>
                <a href="/challenges" className="text-primary hover:underline mt-2 inline-block">Browse available challenges</a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
