
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
          <DashboardChallenges />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
          <DashboardInnovations />
        </motion.div>
      </div>
      
      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
        <DashboardMetrics />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div {...fadeInUp} className="md:col-span-2">
          <DashboardActivity />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <DashboardSuggestions />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Investment Hub</CardTitle>
            <CardDescription>Connect with investors and explore funding opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Access funding opportunities, connect with investors, and explore financial resources for your healthcare innovations.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/investment">Explore Investment Hub</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Sandbox</CardTitle>
            <CardDescription>Test your innovations in a controlled environment</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Validate your innovations against regulatory requirements and get expert guidance on compliance matters.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/regulatory">Enter Sandbox</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Hub</CardTitle>
            <CardDescription>Access resources and learning materials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Explore curated content, research papers, and educational resources to support your healthcare innovation journey.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/knowledge">Browse Resources</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Collaboration Tools</CardTitle>
            <CardDescription>Connect with peers and experts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Join discussions, participate in forums, and network with healthcare innovation community members.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/collaboration">Start Collaborating</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
            <CardDescription>Track your platform engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View your complete activity timeline including submissions, interactions, and platform usage.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/activity">View Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
