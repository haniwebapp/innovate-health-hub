
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, RefreshCw } from "lucide-react";
import { GeneralSettings } from "@/types/admin";

interface GeneralSettingsTabProps {
  settings: GeneralSettings;
  onSettingsChange: (setting: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

export default function GeneralSettingsTab({ 
  settings, 
  onSettingsChange, 
  onSave, 
  isLoading 
}: GeneralSettingsTabProps) {
  return (
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
            checked={settings.allowNewRegistrations}
            onCheckedChange={() => onSettingsChange('allowNewRegistrations')}
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
            checked={settings.requireEmailVerification}
            onCheckedChange={() => onSettingsChange('requireEmailVerification')}
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
            checked={settings.maintenanceMode}
            onCheckedChange={() => onSettingsChange('maintenanceMode')}
          />
        </div>

        <Button onClick={onSave} disabled={isLoading} className="w-full">
          {isLoading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Settings className="mr-2 h-4 w-4" />
          )}
          Save General Settings
        </Button>
      </CardContent>
    </Card>
  );
}
