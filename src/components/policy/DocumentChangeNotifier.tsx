
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const DocumentChangeNotifier: React.FC = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-moh-green/10">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-moh-green mr-3" />
          <div>
            <h3 className="text-sm font-medium">Policy Change Alerts</h3>
            <p className="text-xs text-muted-foreground">Get notified when healthcare policies are updated</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="policy-alerts" />
            <Label htmlFor="policy-alerts">Enable</Label>
          </div>
          <Button variant="link" size="sm" className="text-moh-green">
            <ExternalLink className="h-4 w-4 mr-1" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
