
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function PlatformAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Analytics</h2>
          <p className="text-muted-foreground">Track usage metrics and performance analytics</p>
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
          <Button>Export Data</Button>
        </div>
      </div>
      
      {/* Analytics Time Range */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>Platform usage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="day">
            <TabsList className="mb-4">
              <TabsTrigger value="day">Last 24 Hours</TabsTrigger>
              <TabsTrigger value="week">Last Week</TabsTrigger>
              <TabsTrigger value="month">Last Month</TabsTrigger>
              <TabsTrigger value="year">Last Year</TabsTrigger>
            </TabsList>
            
            <TabsContent value="day" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Daily analytics chart would appear here</p>
            </TabsContent>
            
            <TabsContent value="week" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Weekly analytics chart would appear here</p>
            </TabsContent>
            
            <TabsContent value="month" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Monthly analytics chart would appear here</p>
            </TabsContent>
            
            <TabsContent value="year" className="h-80 w-full bg-slate-50 rounded-md flex items-center justify-center">
              <p className="text-slate-400 text-center">Yearly analytics chart would appear here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Analytics Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full bg-slate-50 rounded-md flex items-center justify-center">
                <p className="text-slate-400 text-center">User activity chart would appear here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Resource utilization and response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full bg-slate-50 rounded-md flex items-center justify-center">
                <p className="text-slate-400 text-center">Performance chart would appear here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
