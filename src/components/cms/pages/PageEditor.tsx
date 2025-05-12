
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { PageService } from "@/services/page/PageService";
import { WebsitePage, PageSection, PageContent, WebsitePageFormData } from "@/types/pageTypes";
import { supabase } from "@/integrations/supabase/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Save,
  Eye,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react";
import { SectionEditor } from "./SectionEditor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .refine((s) => !s.startsWith("-") && !s.endsWith("-"), "Slug cannot start or end with a hyphen"),
  metaDescription: z.string().max(160, "Meta description should be 160 characters or less").optional(),
  published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function PageEditor() {
  const { id } = useParams<{ id: string }>();
  const isNewPage = !id || id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<{ errors: string[], warnings: string[], seoSuggestions: string[] }>({
    errors: [],
    warnings: [],
    seoSuggestions: []
  });
  const [activeTab, setActiveTab] = useState("content");
  const [sections, setSections] = useState<PageSection[]>([{
    type: "hero",
    title: "",
    content: ""
  }]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      metaDescription: "",
      published: false,
    },
  });

  const loadPage = useCallback(async () => {
    if (isNewPage) return;

    try {
      setLoading(true);
      const page = await PageService.getPageById(id!);
      
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
  }, [id, isNewPage, navigate, toast, form]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const validatePageContent = async (content: PageContent, slug: string) => {
    try {
      setValidating(true);
      setValidationIssues({ errors: [], warnings: [], seoSuggestions: [] });

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`https://ntgrokpnwizohtfkcfec.supabase.co/functions/v1/page-validator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({ content, slug }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Validation failed");
      }

      setValidationIssues({
        errors: result.errors || [],
        warnings: result.warnings || [],
        seoSuggestions: result.seoSuggestions || []
      });

      return result.isValid !== false;
    } catch (error) {
      console.error("Validation error:", error);
      toast({
        title: "Validation Error",
        description: "Failed to validate page content. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setValidating(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);
      
      const pageContent: PageContent = {
        sections: sections,
      };
      
      // Validate content before saving
      const isValid = await validatePageContent(pageContent, values.slug);

      if (!isValid) {
        // Show a toast but allow saving anyway (just a warning)
        toast({
          title: "Content Issues Detected",
          description: "Please review the validation issues before publishing.",
          variant: "warning",
        });
      }

      const pageData: WebsitePageFormData = {
        slug: values.slug,
        title: values.title,
        content: pageContent,
        metaDescription: values.metaDescription,
        published: values.published,
      };

      let result: WebsitePage;
      if (isNewPage) {
        result = await PageService.createPage(pageData);
        toast({
          title: "Page Created",
          description: "Your page has been successfully created.",
        });
      } else {
        result = await PageService.updatePage(id!, pageData);
        toast({
          title: "Page Updated",
          description: "Your changes have been saved successfully.",
        });
      }

      if (values.published && result.published) {
        toast({
          title: "Page Published",
          description: "The page is now live on the website.",
          variant: "success",
        });
      }

      // Redirect to the pages list after creating/updating
      navigate("/dashboard/admin/cms");
      
    } catch (error) {
      console.error("Error saving page:", error);
      toast({
        title: "Error",
        description: "Failed to save page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddSection = (type: PageSection["type"]) => {
    const newSection: PageSection = {
      type,
      title: "",
      content: ""
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
  };

  const handleUpdateSection = (index: number, updatedSection: PageSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
          <p>Loading page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/dashboard/admin/cms")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pages
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => validatePageContent({ sections }, form.getValues().slug)}
            disabled={validating}
            className="gap-2"
          >
            {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            Validate Content
          </Button>
          <Button 
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={saving}
            className="gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNewPage ? "Create Page" : "Save Changes"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter page title" {...field} />
                    </FormControl>
                    <FormDescription>
                      The main title of the page that will be displayed in the browser tab.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">/</span>
                        <Input placeholder="page-url-slug" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the page title (e.g., "about-us").
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a brief description for search engines" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A short description that appears in search engine results (max 160 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Published
                      </FormLabel>
                      <FormDescription>
                        When enabled, the page will be visible to all users.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="validation" className="relative">
                Validation
                {(validationIssues.errors.length > 0 || validationIssues.warnings.length > 0) && (
                  <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1 absolute -top-1 -right-1 rounded-full">
                    {validationIssues.errors.length + validationIssues.warnings.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Page Sections</h3>
                <div className="flex gap-2 items-center">
                  <Select
                    onValueChange={(value: PageSection["type"]) => handleAddSection(value as PageSection["type"])}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Add Section</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Section</SelectItem>
                      <SelectItem value="content">Content Section</SelectItem>
                      <SelectItem value="cards">Cards Section</SelectItem>
                      <SelectItem value="image-text">Image + Text</SelectItem>
                      <SelectItem value="cta">Call to Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {sections.length === 0 ? (
                  <div className="flex items-center justify-center border rounded-lg p-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">
                        No sections added yet. Add your first section to get started.
                      </p>
                      <Select
                        onValueChange={(value: PageSection["type"]) => handleAddSection(value as PageSection["type"])}
                      >
                        <SelectTrigger className="w-[180px] mx-auto">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            <span>Add Section</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero Section</SelectItem>
                          <SelectItem value="content">Content Section</SelectItem>
                          <SelectItem value="cards">Cards Section</SelectItem>
                          <SelectItem value="image-text">Image + Text</SelectItem>
                          <SelectItem value="cta">Call to Action</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  sections.map((section, index) => (
                    <Card key={index} className="relative border">
                      <CardHeader className="bg-slate-50 flex flex-row items-center justify-between py-3">
                        <CardTitle className="text-sm font-medium capitalize flex gap-2 items-center">
                          Section {index + 1}: {section.type}
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveSection(index, 'up')}
                            disabled={index === 0}
                            className="h-8 w-8"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveSection(index, 'down')}
                            disabled={index === sections.length - 1}
                            className="h-8 w-8"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSection(index)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <SectionEditor 
                          section={section}
                          onChange={(updatedSection) => handleUpdateSection(index, updatedSection)}
                        />
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="border rounded-lg p-6 bg-white min-h-[500px]">
                    <h1 className="text-2xl font-bold mb-4">{form.getValues().title || "Page Title"}</h1>
                    <div className="space-y-8">
                      {sections.map((section, index) => (
                        <div key={index} className="border-b pb-6 last:border-0">
                          {section.title && (
                            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                          )}
                          {section.content && (
                            <div className="prose max-w-none">
                              {/* In a real implementation, you'd use a rich text renderer here */}
                              <p className="whitespace-pre-wrap">{section.content}</p>
                            </div>
                          )}
                          {section.type === 'cta' && (
                            <div className="mt-4 flex justify-center">
                              <Button disabled>
                                {section.buttonText || "Call to Action"}
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="validation" className="mt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {validating ? (
                    <div className="flex items-center justify-center min-h-64">
                      <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
                        <p>Validating page content...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          Errors
                        </h3>
                        {validationIssues.errors.length === 0 ? (
                          <div className="flex items-center gap-2 text-green-600 mb-4">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>No errors found</span>
                          </div>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1 mb-4">
                            {validationIssues.errors.map((error, i) => (
                              <li key={i} className="text-red-500">
                                {error}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          Warnings
                        </h3>
                        {validationIssues.warnings.length === 0 ? (
                          <div className="flex items-center gap-2 text-green-600 mb-4">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>No warnings found</span>
                          </div>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1 mb-4">
                            {validationIssues.warnings.map((warning, i) => (
                              <li key={i} className="text-amber-500">
                                {warning}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                          SEO Suggestions
                        </h3>
                        {validationIssues.seoSuggestions.length === 0 ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>No SEO suggestions</span>
                          </div>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1">
                            {validationIssues.seoSuggestions.map((suggestion, i) => (
                              <li key={i} className="text-blue-600">
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      {(validationIssues.errors.length === 0 && 
                       validationIssues.warnings.length === 0 &&
                       validationIssues.seoSuggestions.length === 0) && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <div className="bg-green-100 rounded-full p-3">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="mt-4 text-lg font-medium text-green-700">Content Looks Good!</h3>
                          <p className="text-green-600 text-center mt-2">
                            Your page content passed all validation checks.
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button
                          variant="outline"
                          onClick={() => validatePageContent({ sections }, form.getValues().slug)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Run Validation Again
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/admin/cms")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={saving}
              className="gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isNewPage ? "Create Page" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
