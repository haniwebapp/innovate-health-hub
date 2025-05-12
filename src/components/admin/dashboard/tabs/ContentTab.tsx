
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PageService } from "@/services/page/PageService";
import { Files, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AdminLoading, AdminError, AdminEmpty } from "../../ui/AdminPageState";
import { MockDataGenerator } from "../../MockDataGenerator";

export function ContentTab() {
  const { data: pages, isLoading, error } = useQuery({
    queryKey: ['admin', 'pages'],
    queryFn: async () => {
      return PageService.getAllPages();
    }
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader className="bg-slate-50 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Website Pages</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/cms/pages/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Page
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading && <AdminLoading loadingMessage="Loading content pages..." />}
            {error && <AdminError title="Failed to load content pages" description={error.toString()} />}
            {pages && pages.length === 0 && <AdminEmpty message="No content pages found" />}
            {pages && pages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {pages.length || 0} content page(s) available
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard/admin/cms/pages">
                    <Files className="mr-2 h-4 w-4" />
                    Manage All Pages
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <MockDataGenerator />
      </motion.div>
    </div>
  );
}
