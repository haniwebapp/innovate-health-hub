
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { WebsitePage } from "@/types/pageTypes";
import { PageService } from "@/services/page/PageService";

export function ContentTab() {
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        const pagesData = await PageService.getAllPages();
        setPages(pagesData);
      } catch (error) {
        console.error("Error loading pages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Content Management</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/cms">
                <FileText className="mr-2 h-4 w-4" />
                Content Manager
              </Link>
            </Button>
          </div>
          <CardDescription>Manage website content and pages</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              // Skeleton loading indicators
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="bg-slate-50/50 hover:bg-slate-50 transition-colors animate-pulse">
                  <CardContent className="p-4 text-center">
                    <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-slate-200" />
                    <div className="h-5 w-20 mx-auto mb-1 bg-slate-200 rounded" />
                    <div className="h-3 w-36 mx-auto mt-1 bg-slate-200 rounded" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Globe className="h-10 w-10 mx-auto text-moh-green/70 mb-2" />
                    <h3 className="font-medium">Pages</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pages.length} {pages.length === 1 ? 'page' : 'pages'}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-10 w-10 mx-auto text-moh-green/70 mb-2" />
                    <h3 className="font-medium">Blog Posts</h3>
                    <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-10 w-10 mx-auto text-moh-green/70 mb-2" />
                    <h3 className="font-medium">Media Library</h3>
                    <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-10 w-10 mx-auto text-moh-green/70 mb-2" />
                    <h3 className="font-medium">Events</h3>
                    <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          {!loading && pages.length > 0 && (
            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="bg-slate-50 p-3 border-b">
                <h3 className="font-medium">Recently Updated Pages</h3>
              </div>
              <div className="divide-y">
                {[...pages]
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .slice(0, 3)
                  .map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-sm">{page.title}</p>
                        <p className="text-xs text-muted-foreground">/{page.slug}</p>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/dashboard/admin/cms/pages/edit/${page.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
