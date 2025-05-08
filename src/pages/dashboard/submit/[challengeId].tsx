
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileUp } from "lucide-react";
import { getChallengeById } from "@/services/challengeService";
import { Challenge, Submission } from "@/types/challenges";

// Types for the form data
interface SubmissionFormData {
  title: string;
  summary: string;
  description: string;
  team_members?: string;
  files?: FileList;
}

export default function SubmitChallengePage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Fetch challenge details
  const { data: challenge, isLoading: challengeLoading } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallengeById(challengeId as string),
    enabled: !!challengeId
  });

  // Form configuration
  const form = useForm<SubmissionFormData>({
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      team_members: "",
    },
  });

  const onSubmit = async (data: SubmissionFormData) => {
    if (!challenge) {
      toast({
        title: "Error",
        description: "Challenge not found. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Basic validation
    if (!data.title || !data.summary || !data.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate submission to a backend (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Your submission has been received!",
      });
      navigate("/dashboard/submissions");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {challengeLoading ? (
        <div className="text-center py-10">
          <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      ) : !challenge ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium mb-2">Challenge not found</h2>
          <p className="mb-4 text-muted-foreground">The challenge you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/challenges")}>Browse Challenges</Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Submit to: {challenge.title}</CardTitle>
            <CardDescription>
              Fill out the form below to submit your solution to this challenge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submission Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your submission title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give your submission a clear and concise title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Executive Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a brief summary of your solution"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Summarize your solution in 2-3 sentences.
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
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your solution in detail"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a comprehensive description of your solution, including its key features and benefits.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="team_members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Members (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="List team members and their roles" {...field} />
                      </FormControl>
                      <FormDescription>
                        If applicable, list the names and roles of your team members.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Supporting Documents (Optional)</FormLabel>
                  <div className="mt-2">
                    <Input
                      type="file"
                      multiple
                      id="files"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFiles(Array.from(e.target.files));
                        }
                      }}
                      className="hidden"
                    />
                    <Button variant="secondary" asChild>
                      <label htmlFor="files" className="flex items-center cursor-pointer">
                        <FileUp className="h-4 w-4 mr-2" />
                        Upload Files
                      </label>
                    </Button>
                    {files.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {files.map((file, index) => (
                          <li key={index} className="text-sm flex items-center bg-gray-50 px-3 py-2 rounded border">
                            <span className="font-medium">{file.name}</span>
                            <span className="ml-2 text-muted-foreground">
                              ({file.type || 'Unknown'}, {Math.round(file.size / 1024)} KB)
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <FormDescription className="mt-2">
                    Upload any supporting documents that may help showcase your solution.
                  </FormDescription>
                </div>

                <CardFooter className="px-0">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(-1)} 
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-moh-green hover:bg-moh-darkGreen"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Challenge"}
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
