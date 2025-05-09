
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, RefreshCw, Shield, MessageCircle, Bell } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Platform settings state
  const [platformSettings, setPlatformSettings] = useState({
    allowNewRegistrations: true,
    requireEmailVerification: true,
    enableNotifications: true,
    maintenanceMode: false,
  });
  
  // Challenge settings state
  const [challengeSettings, setChallengeSettings] = useState({
    requireApproval: true,
    allowPublicSubmissions: false,
    autoCloseExpiredChallenges: true,
    submissionTimeLimit: "30", // days
  });

  const handlePlatformSettingsChange = (setting: string) => {
    setPlatformSettings({
      ...platformSettings,
      [setting]: !platformSettings[setting as keyof typeof platformSettings]
    });
  };

  const handleChallengeSettingsChange = (setting: string) => {
    setChallengeSettings({
      ...challengeSettings,
      [setting]: !challengeSettings[setting as keyof typeof challengeSettings]
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeSettings({
      ...challengeSettings,
      submissionTimeLimit: e.target.value,
    });
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your settings have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AdminLayout 
      title="Platform Settings"
      description="Configure and manage system settings"
    >
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="challenges">Challenge Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Platform Settings</CardTitle>
              <CardDescription>Configure general platform behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="allowNewRegistrations">Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    When disabled, new users cannot register on the platform
                  </p>
                </div>
                <Switch
                  id="allowNewRegistrations"
                  checked={platformSettings.allowNewRegistrations}
                  onCheckedChange={() => handlePlatformSettingsChange('allowNewRegistrations')}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Users must verify their email before accessing the platform
                  </p>
                </div>
                <Switch
                  id="requireEmailVerification"
                  checked={platformSettings.requireEmailVerification}
                  onCheckedChange={() => handlePlatformSettingsChange('requireEmailVerification')}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode" className="text-red-500">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, only administrators can access the platform
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={() => handlePlatformSettingsChange('maintenanceMode')}
                />
              </div>

              <Button onClick={handleSaveSettings} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Settings className="mr-2 h-4 w-4" />
                )}
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Settings</CardTitle>
              <CardDescription>Configure challenge submission settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="requireApproval">Require Admin Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    All challenge submissions require administrator approval
                  </p>
                </div>
                <Switch
                  id="requireApproval"
                  checked={challengeSettings.requireApproval}
                  onCheckedChange={() => handleChallengeSettingsChange('requireApproval')}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="allowPublicSubmissions">Allow Public Submissions</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, anyone can submit to challenges without logging in
                  </p>
                </div>
                <Switch
                  id="allowPublicSubmissions"
                  checked={challengeSettings.allowPublicSubmissions}
                  onCheckedChange={() => handleChallengeSettingsChange('allowPublicSubmissions')}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="autoCloseExpiredChallenges">Auto-Close Expired Challenges</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically close challenges past their end date
                  </p>
                </div>
                <Switch
                  id="autoCloseExpiredChallenges"
                  checked={challengeSettings.autoCloseExpiredChallenges}
                  onCheckedChange={() => handleChallengeSettingsChange('autoCloseExpiredChallenges')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="submissionTimeLimit">Submission Time Limit (days)</Label>
                <Input 
                  id="submissionTimeLimit"
                  type="number" 
                  value={challengeSettings.submissionTimeLimit}
                  onChange={handleTimeChange}
                />
                <p className="text-sm text-muted-foreground">
                  Number of days users have to submit to a challenge after it opens
                </p>
              </div>

              <Button onClick={handleSaveSettings} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Shield className="mr-2 h-4 w-4" />
                )}
                Save Challenge Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure platform notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Enable System Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to users for important events
                  </p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={platformSettings.enableNotifications}
                  onCheckedChange={() => handlePlatformSettingsChange('enableNotifications')}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Notification Templates</Label>
                <Card className="bg-muted">
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Welcome Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted">
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Challenge Submission
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={handleSaveSettings} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bell className="mr-2 h-4 w-4" />
                )}
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
