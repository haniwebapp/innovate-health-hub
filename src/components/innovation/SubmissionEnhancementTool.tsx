
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Lightbulb, AlertCircle, Check } from "lucide-react";
import { ChallengeAIService } from "@/services/ai/challenge/ChallengeAIService";
import { useToast } from "@/hooks/use-toast";

export function SubmissionEnhancementTool() {
  const [submissionText, setSubmissionText] = useState("");
  const [challengeContext, setChallengeContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!submissionText.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your submission text.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const enhancementSuggestions = await ChallengeAIService.generateSubmissionSuggestions(
        submissionText,
        challengeContext
      );
      setSuggestions(enhancementSuggestions);
      toast({
        title: "Enhancement complete",
        description: `Generated ${enhancementSuggestions.length} suggestions for your submission.`,
      });
    } catch (err: any) {
      console.error("Error generating submission suggestions:", err);
      setError(err.message || "Failed to generate suggestions");
      toast({
        title: "Error",
        description: err.message || "Failed to generate suggestions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-moh-green/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-moh-green" />
          Submission Enhancement Tool
        </CardTitle>
        <CardDescription>
          Improve your innovation submission with AI-powered enhancement suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="challenge-context" className="font-medium text-sm">Challenge Context (Optional)</label>
          <Input
            id="challenge-context"
            placeholder="e.g., AI healthcare solutions for elderly care"
            value={challengeContext}
            onChange={(e) => setChallengeContext(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Providing challenge context will help generate more relevant suggestions.</p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="submission-text" className="font-medium text-sm">Your Submission</label>
          <Textarea
            id="submission-text"
            placeholder="Paste your innovation submission here..."
            rows={6}
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            className="resize-none"
          />
        </div>

        {suggestions.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Enhancement Suggestions</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-moh-lightGreen/20 p-3 rounded-lg border border-moh-green/20">
                  <div className="flex gap-2">
                    <Lightbulb className="h-5 w-5 text-moh-green flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-start gap-2 mt-4">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="bg-moh-green hover:bg-moh-darkGreen text-white w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Generating Suggestions...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" /> 
              Enhance My Submission
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
