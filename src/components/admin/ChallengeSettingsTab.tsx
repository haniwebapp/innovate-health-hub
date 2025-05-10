
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RefreshCw, Shield } from "lucide-react";
import { ChallengeSettings } from "@/types/admin";

interface ChallengeSettingsTabProps {
  settings: ChallengeSettings;
  onSettingsChange: (setting: string) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isLoading: boolean;
}

export default function ChallengeSettingsTab({
  settings,
  onSettingsChange,
  onTimeChange,
  onSave,
  isLoading
}: ChallengeSettingsTabProps) {
  return (
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
            checked={settings.requireApproval}
            onCheckedChange={() => onSettingsChange('requireApproval')}
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
            checked={settings.allowPublicSubmissions}
            onCheckedChange={() => onSettingsChange('allowPublicSubmissions')}
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
            checked={settings.autoCloseExpiredChallenges}
            onCheckedChange={() => onSettingsChange('autoCloseExpiredChallenges')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="submissionTimeLimit">Submission Time Limit (days)</Label>
          <Input 
            id="submissionTimeLimit"
            type="number" 
            value={settings.submissionTimeLimit}
            onChange={onTimeChange}
          />
          <p className="text-sm text-muted-foreground">
            Number of days users have to submit to a challenge after it opens
          </p>
        </div>

        <Button onClick={onSave} disabled={isLoading} className="w-full">
          {isLoading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Shield className="mr-2 h-4 w-4" />
          )}
          Save Challenge Settings
        </Button>
      </CardContent>
    </Card>
  );
}
