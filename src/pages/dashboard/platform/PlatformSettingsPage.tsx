
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function PlatformSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // General settings
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [enableUserTracking, setEnableUserTracking] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // API settings
  const [apiRateLimit, setApiRateLimit] = useState("1000");
  const [apiTimeout, setApiTimeout] = useState("30");
  
  // Email settings
  const [emailSender, setEmailSender] = useState("platform@example.com");
  const [emailFooter, setEmailFooter] = useState("© 2023 Platform. All rights reserved.");
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your platform settings have been updated successfully."
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
          <p className="text-muted-foreground">Configure and manage platform settings</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic platform settings and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notifications" className="flex flex-col space-y-1">
                  <span>Enable Notifications</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Allow platform to send notifications to users
                  </span>
                </Label>
                <Switch 
                  id="notifications" 
                  checked={enableNotifications} 
                  onCheckedChange={setEnableNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="analytics" className="flex flex-col space-y-1">
                  <span>Enable Analytics</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Collect anonymous usage data to improve the platform
                  </span>
                </Label>
                <Switch 
                  id="analytics" 
                  checked={enableAnalytics} 
                  onCheckedChange={setEnableAnalytics}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="user-tracking" className="flex flex-col space-y-1">
                  <span>User Session Tracking</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Track user activity and session data
                  </span>
                </Label>
                <Switch 
                  id="user-tracking" 
                  checked={enableUserTracking} 
                  onCheckedChange={setEnableUserTracking}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="maintenance" className="flex flex-col space-y-1">
                  <span>Maintenance Mode</span>
                  <span className="text-sm font-normal text-text-muted-foreground">
                    Put the platform into maintenance mode (users will see a maintenance page)
                  </span>
                </Label>
                <Switch 
                  id="maintenance" 
                  checked={maintenanceMode} 
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save General Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure API behavior and rate limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rate-limit">API Rate Limit (requests per hour)</Label>
                <Input 
                  id="rate-limit" 
                  value={apiRateLimit} 
                  onChange={(e) => setApiRateLimit(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeout">API Timeout (seconds)</Label>
                <Input 
                  id="timeout" 
                  value={apiTimeout} 
                  onChange={(e) => setApiTimeout(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save API Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-sender">Default Sender Email</Label>
                <Input 
                  id="email-sender" 
                  value={emailSender} 
                  onChange={(e) => setEmailSender(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-footer">Email Footer Text</Label>
                <Textarea 
                  id="email-footer" 
                  value={emailFooter} 
                  onChange={(e) => setEmailFooter(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Email Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the platform look and feel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Appearance settings will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Advanced platform configuration options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Advanced settings will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
