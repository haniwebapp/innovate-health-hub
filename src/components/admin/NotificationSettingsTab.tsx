
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw, Bell, MessageCircle } from "lucide-react";

interface NotificationSettingsTabProps {
  enableNotifications: boolean;
  onToggleNotifications: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export default function NotificationSettingsTab({
  enableNotifications,
  onToggleNotifications,
  onSave,
  isLoading
}: NotificationSettingsTabProps) {
  return (
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
            checked={enableNotifications}
            onCheckedChange={onToggleNotifications}
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

        <Button onClick={onSave} disabled={isLoading} className="w-full">
          {isLoading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bell className="mr-2 h-4 w-4" />
          )}
          Save Notification Settings
        </Button>
      </CardContent>
    </Card>
  );
}
