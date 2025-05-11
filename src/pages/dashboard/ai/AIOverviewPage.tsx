
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw, Zap, Database, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AIOverviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Overview</h2>
          <p className="text-muted-foreground">Monitor and manage AI services and models</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* AI Services Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Services</CardTitle>
              <Brain className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">All services operational</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,429</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Models</CardTitle>
              <Database className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 new models available</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.4%</div>
              <p className="text-xs text-muted-foreground">+0.6% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Service Information */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Services Overview</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Services Status</CardTitle>
              <CardDescription>Current status of all AI services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ServiceStatusCard 
                    name="Investment AI" 
                    status="Operational" 
                    latency="120ms" 
                    uptime="99.9%" 
                  />
                  <ServiceStatusCard 
                    name="Regulatory AI" 
                    status="Operational" 
                    latency="145ms" 
                    uptime="99.7%" 
                  />
                  <ServiceStatusCard 
                    name="Innovation AI" 
                    status="Degraded" 
                    latency="320ms" 
                    uptime="98.2%" 
                    issue="High latency detected"
                  />
                  <ServiceStatusCard 
                    name="Knowledge AI" 
                    status="Operational" 
                    latency="98ms" 
                    uptime="100%" 
                  />
                  <ServiceStatusCard 
                    name="Policy AI" 
                    status="Operational" 
                    latency="135ms" 
                    uptime="99.9%" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Models</CardTitle>
              <CardDescription>Available AI models and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Models information will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>AI service usage metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Usage statistics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Logs</CardTitle>
              <CardDescription>AI service logs and error reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Service logs will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ServiceStatusCardProps {
  name: string;
  status: "Operational" | "Degraded" | "Offline";
  latency: string;
  uptime: string;
  issue?: string;
}

function ServiceStatusCard({ name, status, latency, uptime, issue }: ServiceStatusCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{name}</h3>
        <StatusBadge status={status} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Latency</p>
          <p className="font-medium">{latency}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Uptime</p>
          <p className="font-medium">{uptime}</p>
        </div>
      </div>
      
      {issue && (
        <div className="mt-2 flex items-start gap-2 text-amber-600 bg-amber-50 p-2 rounded text-sm">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <span>{issue}</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "Operational" | "Degraded" | "Offline" }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800";
      case "Degraded":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
      {status}
    </span>
  );
}
