import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, File, Paperclip, X } from "lucide-react";

// Mock challenge data
const mockChallenges = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    category: "Digital Health",
  },
  // ... other challenges
];

// Form schema
const submitFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }).max(2000),
  approach: z.string().min(100, { message: "Approach must be at least 100 characters" }).max(2000),
  team_info: z.string().optional(),
  github_link: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  additional_links: z.string().optional(),
});

type SubmitFormValues = z.infer<typeof submitFormSchema>;

const SubmitChallengePage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch challenge details
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase
      //   .from('challenges')
      //   .select('*')
      //   .eq('id', challengeId)
      //   .single();
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise((resolve) => {
        setTimeout(() => {
          const challenge = mockChallenges.find(c => c.id === challengeId);
          resolve(challenge);
        }, 500);
      });
    }
  });

  // Form setup
  const form = useForm<SubmitFormValues>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      title: "",
      description: "",
      approach: "",
      team_info: "",
      github_link: "",
      additional_links: "",
    },
  });

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // Submit form
  const onSubmit = async (data: SubmitFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would submit to Supabase
      // 1. Create the submission record
      // 2. Upload any files to Supabase Storage
      // 3. Update the submission with file URLs
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Submission successful!",
        description: "Your solution has been submitted for review.",
      });
      
      // Redirect to submissions page
      navigate("/dashboard/submissions");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-6">Loading challenge details...</div>;
  }

  if (error || !challenge) {
    return (
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
        <p className="mb-4">The challenge you're trying to submit to doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/challenges">Back to Challenges</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to={`/challenges/${challengeId}`} className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenge Details
        </Link>
        <h1 className="text-3xl font-bold mt-4">{challenge.title}</h1>
        <p className="text-muted-foreground mt-2">Submit your solution for this challenge</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Solution Details</CardTitle>
          <CardDescription>
            Provide details about your solution to the {challenge.category} challenge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solution Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a concise title for your solution" {...field} />
                    </FormControl>
                    <FormDescription>
                      Make it descriptive and memorable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solution Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your solution, its key features, and how it addresses the challenge..." 
                        {...field} 
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      Explain what your solution does and the problem it solves.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="approach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Approach</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your approach, methodology, and any technologies used..." 
                        {...field} 
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      Detail the technical aspects of your solution.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Supporting Documents</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload any supporting documents, presentations, or images related to your solution.
                  </p>
                  
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click to upload files</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPT, PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">Uploaded Files</p>
                      <ul className="space-y-2">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                            <div className="flex items-center">
                              <File className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-lg font-medium mb-4">Additional Information</h3>
              
              <FormField
                control={form.control}
                name="team_info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Information about your team members and their roles..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Tell us about your team members and their contributions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="github_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username/repository" {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to your code repository if applicable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additional_links"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Links (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other relevant links (demo, website, etc.)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Share any additional resources or links related to your submission.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(`/challenges/${challengeId}`)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Solution"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitChallengePage;
