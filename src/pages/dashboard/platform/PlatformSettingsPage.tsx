
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function PlatformSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    enableNotifications: true,
    darkMode: false,
    autoSave: true,
    showStatusBar: true,
    optimizePerformance: true,
    emailNotifications: true,
    apiThrottling: true,
    cacheEnabled: true
  });
  
  const handleSettingChange = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings]
    });
  };
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your settings have been saved successfully."
      });
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
          <p className="text-muted-foreground">Configure platform behavior and preferences</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            onClick={handleSaveSettings}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSave">Auto-save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save changes</p>
                  </div>
                  <Switch 
                    id="autoSave" 
                    checked={settings.autoSave} 
                    onCheckedChange={() => handleSettingChange("autoSave")}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showStatusBar">Status bar</Label>
                    <p className="text-sm text-muted-foreground">Show status information</p>
                  </div>
                  <Switch 
                    id="showStatusBar" 
                    checked={settings.showStatusBar} 
                    onCheckedChange={() => handleSettingChange("showStatusBar")}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="apiLimit">API Rate Limit (requests per minute)</Label>
                  <Input id="apiLimit" type="number" defaultValue="60" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the visual appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark color theme</p>
                </div>
                <Switch 
                  id="darkMode" 
                  checked={settings.darkMode} 
                  onCheckedChange={() => handleSettingChange("darkMode")}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Theme Selection</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="h-20 bg-white border-blue-400 border-2">Light</Button>
                  <Button variant="outline" className="h-20 bg-slate-800 text-white">Dark</Button>
                  <Button variant="outline" className="h-20 bg-gradient-to-r from-blue-100 to-white">System</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show platform notifications</p>
                </div>
                <Switch 
                  id="enableNotifications" 
                  checked={settings.enableNotifications} 
                  onCheckedChange={() => handleSettingChange("enableNotifications")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch 
                  id="emailNotifications" 
                  checked={settings.emailNotifications} 
                  onCheckedChange={() => handleSettingChange("emailNotifications")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
              <CardDescription>Configure system performance options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="optimizePerformance">Optimize Performance</Label>
                  <p className="text-sm text-muted-foreground">Apply performance optimizations</p>
                </div>
                <Switch 
                  id="optimizePerformance" 
                  checked={settings.optimizePerformance} 
                  onCheckedChange={() => handleSettingChange("optimizePerformance")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="apiThrottling">API Throttling</Label>
                  <p className="text-sm text-muted-foreground">Limit API request rates</p>
                </div>
                <Switch 
                  id="apiThrottling" 
                  checked={settings.apiThrottling} 
                  onCheckedChange={() => handleSettingChange("apiThrottling")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cacheEnabled">Enable Caching</Label>
                  <p className="text-sm text-muted-foreground">Cache responses for faster performance</p>
                </div>
                <Switch 
                  id="cacheEnabled" 
                  checked={settings.cacheEnabled} 
                  onCheckedChange={() => handleSettingChange("cacheEnabled")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
