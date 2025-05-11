
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Lightbulb, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ChallengeAIService, ChallengeIdea } from "@/services/ai/challenge/ChallengeAIService";

export function AIChallengeGenerator() {
  const [sector, setSector] = useState("");
  const [focus, setFocus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [challengeIdeas, setChallengeIdeas] = useState<ChallengeIdea[]>([]);
  const { toast } = useToast();

  const generateChallengeIdeas = async () => {
    if (!sector) {
      toast({
        title: "Sector Required",
        description: "Please select a healthcare sector to generate challenge ideas.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const ideas = await ChallengeAIService.generateChallengeIdeas(sector, focus);
      setChallengeIdeas(ideas);
      toast({
        title: "Challenge Ideas Generated",
        description: `${ideas.length} challenge ideas have been generated for the ${sector} sector.`,
      });
    } catch (error: any) {
      console.error("Error generating challenge ideas:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate challenge ideas.",
        variant: "destructive",
      });
      setChallengeIdeas([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-moh-gold" />
            AI Challenge Generator
          </CardTitle>
          <CardDescription>
            Generate innovative healthcare challenge ideas powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Healthcare Sector</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Digital Health">Digital Health</SelectItem>
                  <SelectItem value="Telemedicine">Telemedicine</SelectItem>
                  <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                  <SelectItem value="Public Health">Public Health</SelectItem>
                  <SelectItem value="Healthcare AI">Healthcare AI</SelectItem>
                  <SelectItem value="Preventive Care">Preventive Care</SelectItem>
                  <SelectItem value="Rural Healthcare">Rural Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Focus Area (Optional)</label>
              <Input 
                placeholder="e.g., elderly care, chronic diseases" 
                value={focus} 
                onChange={(e) => setFocus(e.target.value)} 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={generateChallengeIdeas} 
            disabled={isLoading || !sector}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Generate Challenge Ideas
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {challengeIdeas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Generated Challenge Ideas</h3>
          {challengeIdeas.map((idea, index) => (
            <Card key={index} className="border-moh-green/20">
              <CardHeader>
                <CardTitle>{idea.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {idea.relevantTags.map((tag, tagIdx) => (
                    <Badge key={tagIdx} variant="outline" className="bg-moh-lightGreen/20">
                      <Tag className="h-3 w-3 mr-1" /> {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold">Description</h4>
                  <p className="text-muted-foreground">{idea.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold">Potential Impact</h4>
                    <p className="text-muted-foreground">{idea.potentialImpact}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Target Audience</h4>
                    <p className="text-muted-foreground">{idea.targetAudience}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Vision 2030 Alignment</h4>
                  <p className="text-muted-foreground">{idea.vision2030Alignment}</p>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground">
                  Difficulty: <span className="font-medium">{idea.estimatedDifficulty}</span>
                </div>
                <Button variant="outline">Create Challenge</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
