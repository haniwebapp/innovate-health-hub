
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

export default function DashboardInvestmentPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Investment Hub" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Investment Hub</h1>
        <p className="text-muted-foreground">
          Connect with investors and funding opportunities
        </p>
      </div>
      
      <Tabs defaultValue="matches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matches">Investor Matches</TabsTrigger>
          <TabsTrigger value="funding">Funding Rounds</TabsTrigger>
          <TabsTrigger value="pitches">Pitch Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Investor Matches</CardTitle>
              <CardDescription>AI-matched investors for your innovations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Investment matching feature will be implemented in Phase 2.</p>
                <Button className="mt-4">Complete Your Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>Available Funding Rounds</CardTitle>
              <CardDescription>Open funding opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Funding rounds feature will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pitches">
          <Card>
            <CardHeader>
              <CardTitle>Pitch Events</CardTitle>
              <CardDescription>Schedule and prepare for investor pitches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Pitch scheduling will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
