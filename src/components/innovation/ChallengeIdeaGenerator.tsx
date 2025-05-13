
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle, Brain, Lightbulb, PlusCircle, RefreshCw, Target, Trophy } from "lucide-react";
import { ChallengeAIService, ChallengeIdea } from "@/services/ai/challenge/ChallengeAIService";
import { useToast } from "@/hooks/use-toast";

const HEALTHCARE_SECTORS = [
  "Digital Health",
  "Preventive Care",
  "Medical Devices",
  "Remote Monitoring",
  "Mental Health",
  "Chronic Disease Management",
  "Elderly Care",
  "Maternal & Child Health",
  "Clinical Research",
  "Healthcare Education"
];

export function ChallengeIdeaGenerator() {
  const [sector, setSector] = useState("");
  const [focus, setFocus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<ChallengeIdea[]>([]);
  const { toast } = useToast();

  const generateIdeas = async () => {
    if (!sector) {
      toast({
        variant: "destructive",
        title: "Sector required",
        description: "Please select a healthcare sector to generate challenge ideas."
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const generatedIdeas = await ChallengeAIService.generateChallengeIdeas(sector, focus);
      setIdeas(generatedIdeas);
      
      toast({
        title: "Ideas generated",
        description: `Generated ${generatedIdeas.length} challenge ideas for ${sector}`,
      });
    } catch (error: any) {
      console.error("Error generating challenge ideas:", error);
      toast({
        variant: "destructive",
        title: "Error generating ideas",
        description: error.message || "Failed to generate challenge ideas. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-moh-gold" />
            AI Challenge Idea Generator
          </CardTitle>
          <CardDescription>
            Generate innovative healthcare challenge ideas based on sector and focus area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="sector" className="text-sm font-medium">Healthcare Sector</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a healthcare sector" />
                </SelectTrigger>
                <SelectContent>
                  {HEALTHCARE_SECTORS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="focus" className="text-sm font-medium">Focus Area (Optional)</label>
              <Input 
                id="focus"
                placeholder="e.g., Rural Healthcare, Youth, Technology"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={generateIdeas} 
            disabled={isLoading || !sector} 
            className="flex items-center"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate Challenge Ideas
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ideas.map((idea, index) => (
            <Card key={index} className="overflow-hidden border-moh-lightGreen/30">
              <CardHeader className="pb-2 bg-gradient-to-r from-moh-lightGreen/10 to-moh-green/5">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  {idea.estimatedDifficulty && (
                    <Badge className={getDifficultyColor(idea.estimatedDifficulty)}>
                      {idea.estimatedDifficulty}
                    </Badge>
                  )}
                </div>
                <CardDescription>{idea.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <Target className="h-4 w-4 mr-1 text-moh-green" /> 
                    Potential Impact
                  </h4>
                  <p className="text-sm text-muted-foreground">{idea.potentialImpact}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Target Audience</h4>
                  <p className="text-sm text-muted-foreground">{idea.targetAudience}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-moh-gold" />
                    Vision 2030 Alignment
                  </h4>
                  <p className="text-sm text-muted-foreground">{idea.vision2030Alignment}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {idea.relevantTags && idea.relevantTags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-muted/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-between">
                <Button variant="outline" size="sm">
                  Save Idea
                </Button>
                <Button variant="default" size="sm">
                  Create Challenge
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
