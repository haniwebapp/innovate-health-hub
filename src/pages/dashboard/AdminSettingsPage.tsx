
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import GeneralSettingsTab from "@/components/admin/GeneralSettingsTab";
import ChallengeSettingsTab from "@/components/admin/ChallengeSettingsTab";
import NotificationSettingsTab from "@/components/admin/NotificationSettingsTab";
import { GeneralSettings, ChallengeSettings } from "@/types/admin";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Platform settings state
  const [platformSettings, setPlatformSettings] = useState<GeneralSettings>({
    allowNewRegistrations: true,
    requireEmailVerification: true,
    enableNotifications: true,
    maintenanceMode: false,
  });
  
  // Challenge settings state
  const [challengeSettings, setChallengeSettings] = useState<ChallengeSettings>({
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
          <GeneralSettingsTab 
            settings={platformSettings}
            onSettingsChange={handlePlatformSettingsChange}
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="challenges">
          <ChallengeSettingsTab 
            settings={challengeSettings}
            onSettingsChange={handleChallengeSettingsChange}
            onTimeChange={handleTimeChange}
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettingsTab 
            enableNotifications={platformSettings.enableNotifications}
            onToggleNotifications={() => handlePlatformSettingsChange('enableNotifications')}
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
