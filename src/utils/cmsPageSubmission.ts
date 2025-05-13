
import { PageSection, PageContent, WebsitePageFormData } from "@/types/pageTypes";
import { PageService } from "@/services/page/PageService";
import { PageFormValues } from "@/components/cms/pages/editor/PageForm";

export const createPageSubmission = async (
  values: PageFormValues,
  sections: PageSection[],
  isNewPage: boolean,
  pageId: string | undefined,
  toast: any,
  validatePageContent: (content: PageContent, slug: string) => Promise<boolean>
) => {
  if (sections.length === 0) {
    toast({
      title: "Error",
      description: "At least one content section is required.",
      variant: "destructive",
    });
    return false;
  }
  
  const pageContent: PageContent = {
    sections: sections,
  };
  
  // Validate content before saving
  await validatePageContent(pageContent, values.slug);

  const pageData: WebsitePageFormData = {
    slug: values.slug,
    title: values.title,
    content: pageContent,
    metaDescription: values.metaDescription,
    published: values.published,
  };

  try {
    if (isNewPage) {
      await PageService.createPage(pageData);
      toast({
        title: "Page Created",
        description: "Your page has been successfully created.",
      });
    } else {
      const result = await PageService.updatePage(pageId!, pageData);
      toast({
        title: "Page Updated",
        description: "Your changes have been saved successfully.",
      });
      
      if (values.published && result.published) {
        toast({
          title: "Page Published",
          description: "The page is now live on the website.",
        });
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error saving page:", error);
    toast({
      title: "Error",
      description: "Failed to save page. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};
