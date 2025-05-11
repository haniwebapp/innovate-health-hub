
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
import { Beaker, Upload, FileText, Lightbulb } from "lucide-react";

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
      
      {/* Prominently featured action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <Card className="overflow-hidden border-2 border-moh-lightGreen hover:border-moh-green transition-colors">
            <CardHeader className="bg-gradient-to-r from-moh-lightGreen to-moh-lightGold pb-8">
              <div className="absolute right-4 top-4 bg-white/20 p-2 rounded-full">
                <Beaker size={24} className="text-moh-darkGreen" />
              </div>
              <CardTitle className="text-moh-darkGreen text-xl">Regulatory Sandbox Application</CardTitle>
              <CardDescription className="text-moh-darkGreen/80">
                Test your innovations in a controlled regulatory environment
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-6">
                Apply for the sandbox testing program to validate your healthcare innovation against regulatory requirements with expert guidance.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">
                    Regulatory
                  </Badge>
                  <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">
                    Testing
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green">
                <Link to="/dashboard/regulatory/applications/new">
                  Apply for Sandbox
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden border-2 border-moh-lightGold hover:border-moh-gold transition-colors">
            <CardHeader className="bg-gradient-to-r from-moh-lightGold to-moh-lightGreen pb-8">
              <div className="absolute right-4 top-4 bg-white/20 p-2 rounded-full">
                <Lightbulb size={24} className="text-moh-darkGold" />
              </div>
              <CardTitle className="text-moh-darkGold text-xl">Submit Your Innovation</CardTitle>
              <CardDescription className="text-moh-darkGold/80">
                Share your healthcare solution with our ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-6">
                Submit your innovation to be featured on our platform and connect with investors, regulators, and potential partners across Saudi Arabia's healthcare ecosystem.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-moh-lightGold/20 text-moh-darkGold">
                    Innovation
                  </Badge>
                  <Badge variant="outline" className="bg-moh-lightGold/20 text-moh-darkGold">
                    Showcase
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-moh-gold to-moh-darkGold hover:from-moh-darkGold hover:to-moh-gold">
                <Link to="/innovations/submit">
                  Submit Innovation
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        <Card>
          <CardHeader>
            <CardTitle>My Submissions</CardTitle>
            <CardDescription>Manage your submitted innovations and applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Track the status of your submissions, view feedback, and manage your innovation portfolio.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/submissions">View Submissions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
