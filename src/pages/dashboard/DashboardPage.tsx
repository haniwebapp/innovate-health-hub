
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Clock, Activity, Bell, FileText, Beaker, BookOpen, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
import DashboardSuggestions from "@/components/dashboard/DashboardSuggestions";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DashboardChallenges from "@/components/dashboard/DashboardChallenges";
import DashboardInnovations from "@/components/dashboard/DashboardInnovations";

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <DashboardWelcome user={user} />
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="innovations">Innovations</TabsTrigger>
          <TabsTrigger value="investments">Investment</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div {...fadeInUp} className="md:col-span-2">
              <DashboardActivity />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <DashboardSuggestions />
            </motion.div>
          </div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <DashboardMetrics />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <DashboardChallenges />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <DashboardInnovations />
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>My Challenges</CardTitle>
              <CardDescription>View and manage your active and past challenge submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Detailed challenge view will be implemented in Phase 1</p>
              <Button className="mt-4" asChild>
                <Link to="/dashboard/submissions">View All Submissions</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="innovations">
          <Card>
            <CardHeader>
              <CardTitle>My Innovations</CardTitle>
              <CardDescription>Upload, track, and manage your innovations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Innovation management will be implemented in Phase 1</p>
              <Button className="mt-4" asChild>
                <Link to="/innovations/submit">Submit New Innovation</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Investment Hub</CardTitle>
              <CardDescription>Connect with investors and funding opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Investment Hub will be implemented in Phase 2</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regulatory">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Sandbox</CardTitle>
              <CardDescription>Test and validate your innovations in a controlled environment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Regulatory Sandbox will be implemented in Phase 2</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="knowledge">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Hub</CardTitle>
              <CardDescription>Access personalized learning resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Knowledge Hub will be implemented in Phase 2</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/knowledge-hub">Visit Public Knowledge Hub</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collaboration">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>Connect with other users, join webinars and forums</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Collaboration features will be implemented in Phase 2</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>View timeline of your activities, submissions, and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Activity History will be implemented in Phase 2</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
