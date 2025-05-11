
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

export function AnalyticsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Analytics Dashboard</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Full Analytics
              </Link>
            </Button>
          </div>
          <CardDescription>View platform metrics and performance data</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Detailed platform analytics and reporting tools will be available here.
            View user engagement, challenge metrics, and system performance.
          </p>
          <Button asChild variant="outline">
            <Link to="/dashboard/admin/analytics">
              View Analytics Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
