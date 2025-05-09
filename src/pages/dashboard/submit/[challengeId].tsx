
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
import { Challenge } from "@/types/challenges";

// Mock data for now
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    long_description: `Challenge details...`,
    category: "Digital Health",
    start_date: "2025-01-01T00:00:00+03:00",
    end_date: "2025-06-30T23:59:59+03:00",
    status: "Open",
    prize: "SAR 500,000",
    eligibility: "Healthcare professionals and innovators",
    requirements: ["Solution must be applicable within Saudi healthcare system"],
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Innovation Department",
    created_at: "2025-01-01T00:00:00+03:00",
    updated_at: "2025-01-01T00:00:00+03:00",
    created_by: null,
    participants: 47,
    timeline: [{ date: "June 30, 2025", event: "Submission Deadline" }]
  },
  // Additional challenges would be here
];

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

  // Fetch challenge details from API with proper typing
  const { data: challenge, isLoading: challengeLoading } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase.from('challenges').select('*').eq('id', challengeId).single();
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise<Challenge | undefined>((resolve) => {
        setTimeout(() => {
          const foundChallenge = mockChallenges.find(c => c.id === challengeId);
          resolve(foundChallenge);
        }, 500);
      });
    }
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
    <div className="container mx-auto py-12">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {challengeLoading ? (
        <div className="text-center py-10">Loading challenge details...</div>
      ) : !challenge ? (
        <div className="text-center py-10">Challenge not found.</div>
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
                    <label htmlFor="files" className="flex items-center">
                      <FileUp className="h-4 w-4 mr-2" />
                      Upload Files
                    </label>
                  </Button>
                  {files.length > 0 && (
                    <ul className="mt-2">
                      {files.map((file, index) => (
                        <li key={index} className="text-sm">
                          {file.name} ({file.type}, {Math.round(file.size / 1024)} KB)
                        </li>
                      ))}
                    </ul>
                  )}
                  <FormDescription>
                    Upload any supporting documents that may help showcase your solution.
                  </FormDescription>
                </div>

                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Challenge"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
