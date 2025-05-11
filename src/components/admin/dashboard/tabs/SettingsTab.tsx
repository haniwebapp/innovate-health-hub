
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export function SettingsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>System Settings</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                All Settings
              </Link>
            </Button>
          </div>
          <CardDescription>Configure platform settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Platform Configuration</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Manage system-wide settings, user permissions, notification preferences,
            and customize the platform behavior.
          </p>
          <Button asChild variant="outline">
            <Link to="/dashboard/admin/settings">
              Manage Settings
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
