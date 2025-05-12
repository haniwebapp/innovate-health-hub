
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { PageService } from "@/services/page/PageService";
import { PageSection } from "@/types/pageTypes";
import { pageFormSchema, PageFormValues } from "@/components/cms/pages/editor/PageForm";

export function useCmsPageData(pageId: string | undefined) {
  const isNewPage = !pageId || pageId === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<PageSection[]>([{
    type: "hero",
    title: "",
    content: ""
  }]);

  // Form handling
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      metaDescription: "",
      published: false,
    },
  });

  // Load page data
  const loadPage = useCallback(async () => {
    if (isNewPage) return;

    try {
      setLoading(true);
      const page = await PageService.getPageById(pageId!);
      
      if (!page) {
        toast({
          title: "Page not found",
          description: "The requested page could not be found.",
          variant: "destructive",
        });
        navigate("/dashboard/admin/cms");
        return;
      }

      form.reset({
        title: page.title,
        slug: page.slug,
        metaDescription: page.metaDescription || "",
        published: page.published,
      });

      // Ensure sections are properly initialized
      setSections(page.content.sections || []);
    } catch (error) {
      console.error("Failed to load page:", error);
      toast({
        title: "Error",
        description: "Failed to load page data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [pageId, isNewPage, navigate, toast, form]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return {
    isNewPage,
    loading,
    sections,
    setSections,
    form,
  };
}
