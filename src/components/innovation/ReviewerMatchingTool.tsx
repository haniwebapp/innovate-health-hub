
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, CheckSquare, AlertCircle } from "lucide-react";
import { ChallengeAIService, ReviewerMatchResult } from "@/services/ai/challenge/ChallengeAIService";
import { useToast } from "@/hooks/use-toast";

export function ReviewerMatchingTool() {
  const [challengeDescription, setChallengeDescription] = useState("");
  const [requiredExpertise, setRequiredExpertise] = useState<string[]>([]);
  const [expertiseInput, setExpertiseInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ReviewerMatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddExpertise = () => {
    if (expertiseInput.trim() && !requiredExpertise.includes(expertiseInput.trim())) {
      setRequiredExpertise([...requiredExpertise, expertiseInput.trim()]);
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (expertise: string) => {
    setRequiredExpertise(requiredExpertise.filter(e => e !== expertise));
  };

  const handleSubmit = async () => {
    if (!challengeDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a challenge description.",
        variant: "destructive",
      });
      return;
    }

    if (requiredExpertise.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one required expertise area.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const matchResults = await ChallengeAIService.matchReviewers(
        challengeDescription,
        requiredExpertise
      );
      setResults(matchResults);
      toast({
        title: "Reviewer matching complete",
        description: `Found ${matchResults.length} potential reviewers for your challenge.`,
      });
    } catch (err: any) {
      console.error("Error matching reviewers:", err);
      setError(err.message || "Failed to match reviewers");
      toast({
        title: "Error",
        description: err.message || "Failed to match reviewers",
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
          <Users className="h-5 w-5 text-moh-green" />
          Reviewer Auto-Matching
        </CardTitle>
        <CardDescription>
          Find the best reviewers for your innovation challenge based on expertise and availability.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="challenge-description" className="font-medium text-sm">Challenge Description</label>
          <Textarea
            id="challenge-description"
            placeholder="Describe your innovation challenge in detail..."
            rows={4}
            value={challengeDescription}
            onChange={(e) => setChallengeDescription(e.target.value)}
            className="resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="expertise" className="font-medium text-sm">Required Expertise</label>
          <div className="flex gap-2">
            <Input
              id="expertise"
              placeholder="Add expertise area (e.g., AI, Healthcare, Medical Devices)"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddExpertise();
                }
              }}
            />
            <Button variant="outline" onClick={handleAddExpertise}>Add</Button>
          </div>
          
          {requiredExpertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {requiredExpertise.map((expertise) => (
                <Badge 
                  key={expertise}
                  className="bg-moh-lightGreen text-moh-darkGreen hover:bg-moh-lightGreen/80"
                >
                  {expertise}
                  <button 
                    className="ml-1 hover:text-red-500" 
                    onClick={() => handleRemoveExpertise(expertise)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Matched Reviewers</h3>
            <div className="space-y-3">
              {results.map((reviewer) => (
                <div key={reviewer.reviewerId} className="border rounded-lg p-3 hover:bg-moh-lightGreen/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Reviewer #{reviewer.reviewerId.split('-')[0]}</h4>
                      <p className="text-sm text-muted-foreground">{reviewer.matchReason}</p>
                    </div>
                    <Badge className={`${reviewer.matchScore > 80 ? 'bg-green-500' : reviewer.matchScore > 60 ? 'bg-amber-500' : 'bg-gray-500'}`}>
                      {reviewer.matchScore}% match
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Expertise:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reviewer.expertise.map((expertise, index) => (
                        <Badge key={index} variant="outline" className="bg-slate-100">
                          {expertise}
                        </Badge>
                      ))}
                    </div>
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
              Finding Reviewers...
            </>
          ) : (
            <>
              <CheckSquare className="mr-2 h-4 w-4" /> 
              Find Matching Reviewers
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
