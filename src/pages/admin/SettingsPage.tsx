
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/layouts/AdminLayout";
import GeneralSettingsTab from "@/components/admin/GeneralSettingsTab";
import ChallengeSettingsTab from "@/components/admin/ChallengeSettingsTab";
import NotificationSettingsTab from "@/components/admin/NotificationSettingsTab";
import { GeneralSettings, ChallengeSettings } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";

// This would typically come from a database, but for now we'll use hardcoded defaults
const defaultGeneralSettings: GeneralSettings = {
  allowNewRegistrations: true,
  requireEmailVerification: false,
  enableNotifications: true,
  maintenanceMode: false,
};

const defaultChallengeSettings: ChallengeSettings = {
  requireApproval: true,
  allowPublicSubmissions: false,
  autoCloseExpiredChallenges: true,
  submissionTimeLimit: "30",
};

export default function SettingsPage() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(defaultGeneralSettings);
  const [challengeSettings, setChallengeSettings] = useState<ChallengeSettings>(defaultChallengeSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real implementation, we would fetch settings from Supabase here
    // For now, we'll use the default values
    const fetchSettings = async () => {
      try {
        // Simulating API call delay
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleGeneralSettingChange = (setting: string) => {
    setGeneralSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof GeneralSettings]
    }));
  };

  const handleChallengeSettingChange = (setting: string) => {
    setChallengeSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof ChallengeSettings]
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeSettings(prev => ({
      ...prev,
      submissionTimeLimit: e.target.value
    }));
  };

  const saveGeneralSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to Supabase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Settings saved",
        description: "General settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveChallengeSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to Supabase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Settings saved",
        description: "Challenge settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotificationSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to Supabase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Settings saved",
        description: "Notification settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout 
      title="Platform Settings" 
      description="Configure system settings and defaults"
    >
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <GeneralSettingsTab 
            settings={generalSettings}
            onSettingsChange={handleGeneralSettingChange}
            onSave={saveGeneralSettings}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-4">
          <ChallengeSettingsTab
            settings={challengeSettings}
            onSettingsChange={handleChallengeSettingChange}
            onTimeChange={handleTimeChange}
            onSave={saveChallengeSettings}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettingsTab
            enableNotifications={generalSettings.enableNotifications}
            onToggleNotifications={() => handleGeneralSettingChange('enableNotifications')}
            onSave={saveNotificationSettings}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
