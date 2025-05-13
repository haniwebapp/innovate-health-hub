
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PageService } from "@/services/page/PageService";
import { WebsitePage } from "@/types/pageTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Globe, Eye, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function PageList() {
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PageService.getAllPages();
      setPages(data);
    } catch (error) {
      console.error("Failed to load pages:", error);
      let errorMessage = "Failed to load pages. Please try again.";
      
      // Provide more specific error message for common issues
      if (error instanceof Error) {
        if (error.message.includes("infinite recursion")) {
          errorMessage = "Database policy error: Infinite recursion detected. Please check your Supabase Row Level Security policies for the profiles table.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/admin/cms/pages/edit/${id}`);
  };

  const handleView = (slug: string) => {
    window.open(`/${slug}`, "_blank");
  };

  const handleTogglePublish = async (page: WebsitePage) => {
    try {
      await PageService.togglePagePublished(page.id, !page.published);
      toast({
        title: page.published ? "Page Unpublished" : "Page Published",
        description: `${page.title} has been ${page.published ? "unpublished" : "published"}.`,
        variant: "default",
      });
      loadPages();
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      toast({
        title: "Error",
        description: "Failed to update page status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await PageService.deletePage(id);
      toast({
        title: "Page Deleted",
        description: "The page has been successfully deleted.",
        variant: "default",
      });
      loadPages();
    } catch (error) {
      console.error("Failed to delete page:", error);
      toast({
        title: "Error",
        description: "Failed to delete the page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="bg-red-50/30 p-8 text-center">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
            <h3 className="text-lg font-medium mb-1">Error Loading Pages</h3>
            <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
              {error}
            </p>
            <div className="space-x-4">
              <Button onClick={loadPages}>
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard/admin")}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {pages.length === 0 ? (
        <Card className="bg-muted/30 p-8 text-center">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <Globe className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">No Pages Found</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first page.
              </p>
              <Button onClick={() => navigate("/dashboard/admin/cms/pages/new")}>
                Create New Page
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        pages.map((page) => (
          <Card key={page.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {page.title}
                    {page.published ? (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        Draft
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>/{page.slug}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div>
                  Last updated: {format(new Date(page.updatedAt), "MMM d, yyyy h:mm a")}
                </div>
                <div className="flex items-center">
                  {page.published ? (
                    <Badge variant="secondary" className="gap-1 bg-green-50 text-green-600 hover:bg-green-100">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Live</span>
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1 bg-slate-100 text-slate-600 hover:bg-slate-200">
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Draft</span>
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t bg-slate-50 p-2">
              <div className="text-sm text-muted-foreground">
                {page.metaDescription 
                  ? `${page.metaDescription.substring(0, 50)}${page.metaDescription.length > 50 ? '...' : ''}`
                  : 'No description'}
              </div>
              <div className="flex gap-2">
                {page.published && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => handleView(page.slug)}
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                )}
                <Button
                  size="sm" 
                  variant="outline"
                  className="gap-1"
                  onClick={() => handleTogglePublish(page)}
                >
                  {page.published ? (
                    <>
                      <XCircle className="h-4 w-4" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => handleEdit(page.id)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        the page "{page.title}" and remove it from the website.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(page.id)}
                        disabled={deleting === page.id}
                      >
                        {deleting === page.id ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
