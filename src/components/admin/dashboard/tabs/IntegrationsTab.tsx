
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function IntegrationsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>System Integrations</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/integrations">
                <Shield className="mr-2 h-4 w-4" />
                Manage Integrations
              </Link>
            </Button>
          </div>
          <CardDescription>Configure third-party services and APIs</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">External Integrations</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Connect and configure third-party services, APIs, and external systems.
            Manage authentication keys and integration settings.
          </p>
          <Button asChild variant="outline">
            <Link to="/dashboard/admin/integrations">
              Manage Integrations
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
