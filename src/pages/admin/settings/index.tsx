
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GeneralSettingsTab from '@/components/admin/GeneralSettingsTab';
import ChallengeSettingsTab from '@/components/admin/ChallengeSettingsTab';
import NotificationSettingsTab from '@/components/admin/NotificationSettingsTab';
import { IntegrationSettingsTab } from '@/components/admin/IntegrationSettingsTab';
import AdminSettingsAI from '@/components/ai/AdminSettingsAI';
import { GeneralSettings, ChallengeSettings } from '@/types/admin';
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  
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
    // Simulate API call - would connect to Supabase in production
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
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowAIRecommendations(!showAIRecommendations)}
          >
            {showAIRecommendations ? "Hide AI Recommendations" : "Show AI Recommendations"}
          </Button>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      }
    >
      {showAIRecommendations && (
        <AdminSettingsAI 
          generalSettings={platformSettings}
          challengeSettings={challengeSettings}
        />
      )}

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="challenges">Challenge Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integration Settings</TabsTrigger>
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
        
        <TabsContent value="integrations">
          <IntegrationSettingsTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
