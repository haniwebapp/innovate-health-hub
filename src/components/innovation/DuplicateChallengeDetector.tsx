
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle, FileCheck, Info, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ChallengeAIService } from "@/services/ai/challenge/ChallengeAIService";

// Form schema validation
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface SimilarChallenge {
  id: string;
  title: string;
  similarity: number;
  overlappingConcepts?: string[];
}

interface DuplicateDetectionResult {
  isDuplicate: boolean;
  similarityScore: number;
  similarChallenges: SimilarChallenge[];
  analysis?: string;
}

export function DuplicateChallengeDetector() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DuplicateDetectionResult | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);

    try {
      const detectionResult = await ChallengeAIService.detectDuplicateChallenges(
        values.title,
        values.description
      );
      
      setResult(detectionResult);
      
      if (detectionResult.isDuplicate) {
        toast({
          title: "Potential duplicates found",
          description: "We've detected challenges with similar content.",
          variant: "destructive", // Changed from "warning" to "destructive" to match allowed types
        });
      }
    } catch (error: any) {
      console.error("Error detecting duplicates:", error);
      toast({
        title: "Error checking for duplicates",
        description: error.message || "Failed to check for duplicate challenges.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return "text-red-600";
    if (similarity >= 60) return "text-orange-500";
    if (similarity >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getSimilarityBadge = (similarity: number) => {
    if (similarity >= 80) return "bg-red-100 text-red-800 border-red-200";
    if (similarity >= 60) return "bg-orange-100 text-orange-800 border-orange-200";
    if (similarity >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  return (
    <Card className="w-full shadow-md border-moh-green/10">
      <CardHeader>
        <CardTitle className="text-moh-darkGreen flex items-center gap-2">
          <Search className="h-5 w-5" />
          Duplicate Challenge Detector
        </CardTitle>
        <CardDescription>
          Check if your innovation challenge already exists or is similar to existing challenges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your challenge title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A concise title that describes your innovation challenge
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
                  <FormLabel>Challenge Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your innovation challenge in detail" 
                      className="min-h-32 resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a comprehensive description of what your challenge aims to solve
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="bg-moh-green hover:bg-moh-darkGreen w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking for duplicates...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Check for Duplicates
                </>
              )}
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyzing challenge...</span>
              <span>Please wait</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <Alert variant={result.isDuplicate ? "destructive" : "default"}>
              <div className="flex items-start">
                {result.isDuplicate ? (
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                )}
                <div>
                  <AlertTitle>
                    {result.isDuplicate
                      ? "Potential duplicates detected"
                      : "No significant duplicates found"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.isDuplicate
                      ? "Your challenge has similarities with existing challenges. Consider reviewing them before proceeding."
                      : "Your challenge appears to be unique. You can proceed with confidence."}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {result.analysis && (
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm">
                <div className="font-medium mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-moh-green" />
                  Analysis Summary
                </div>
                <p className="text-slate-700">{result.analysis}</p>
              </div>
            )}

            {result.similarChallenges && result.similarChallenges.length > 0 && (
              <div className="space-y-3 mt-4">
                <h4 className="text-sm font-medium flex items-center">
                  <FileCheck className="h-4 w-4 mr-2 text-moh-green" />
                  Similar Challenges
                </h4>
                
                {result.similarChallenges.map((challenge) => (
                  <div key={challenge.id} className="border rounded-md p-3 bg-white">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-medium">{challenge.title}</h5>
                      <Badge variant="outline" className={getSimilarityBadge(challenge.similarity)}>
                        {Math.round(challenge.similarity)}% similar
                      </Badge>
                    </div>
                    
                    {challenge.overlappingConcepts && challenge.overlappingConcepts.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-500 mb-1">Common themes:</p>
                        <div className="flex flex-wrap gap-1">
                          {challenge.overlappingConcepts.map((concept, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
