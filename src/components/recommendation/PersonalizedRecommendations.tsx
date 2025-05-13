
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  RecommendationService, 
  RecommendationItem, 
  UserRecommendations 
} from "@/services/ai/recommendation/RecommendationService";
import { Brain, Calendar, FileText, Link2, Sparkles, ThumbsDown, ThumbsUp, Users, BookOpen, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<UserRecommendations | null>(null);
  const [activeTab, setActiveTab] = useState<string>("personalized");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadRecommendations();
  }, [user?.id]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      // For demo purposes, we're using mock interests - in a real app these would come from user preferences
      const mockUserInterests = ["Digital Health", "Preventive Care", "Healthcare Innovation"];
      
      const recs = await RecommendationService.getPersonalizedRecommendations({
        userId: user?.id,
        interests: mockUserInterests,
        limit: 6
      });
      
      setRecommendations(recs);
    } catch (error: any) {
      console.error("Error loading recommendations:", error);
      toast({
        variant: "destructive",
        title: "Failed to load recommendations",
        description: error.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (item: RecommendationItem, isRelevant: boolean) => {
    try {
      await RecommendationService.submitRecommendationFeedback({
        recommendationId: item.id,
        userId: user?.id || 'anonymous',
        isRelevant,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Thank you for your feedback",
        description: "Your feedback helps us improve our recommendations."
      });
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'challenge':
        return <Target className="h-4 w-4" />;
      case 'resource':
        return <FileText className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'connection':
        return <Users className="h-4 w-4" />;
      case 'learning':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Link2 className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'challenge':
        return 'Challenge';
      case 'resource':
        return 'Resource';
      case 'event':
        return 'Event';
      case 'connection':
        return 'Connection';
      case 'learning':
        return 'Learning';
      case 'strategy':
        return 'Strategy';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getRecommendationsList = () => {
    if (!recommendations) return [];
    
    switch(activeTab) {
      case 'personalized':
        return recommendations.personalizedRecommendations;
      case 'trending':
        return recommendations.trendingItems;
      case 'recent':
        return recommendations.recentlyViewed || [];
      default:
        return recommendations.personalizedRecommendations;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-moh-gold" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>Loading your personalized recommendations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-4 pb-2">
                  <div className="h-5 bg-muted rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-1/2"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-20 bg-muted rounded-md"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-moh-gold" />
          AI-Powered Recommendations
          <Badge className="ml-2 bg-moh-gold text-white" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Personalized
          </Badge>
        </CardTitle>
        <CardDescription>
          Tailored recommendations based on your interests and activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personalized" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="personalized">Personalized</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            {recommendations?.recentlyViewed?.length ? (
              <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
            ) : null}
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getRecommendationsList().map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  {item.imageUrl && (
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                        {getTypeIcon(item.type)}
                        <span className="ml-1">{getTypeLabel(item.type)}</span>
                      </Badge>
                    </div>
                  )}
                  <CardHeader className={`${item.imageUrl ? 'pt-3 pb-2' : 'pb-2'}`}>
                    <CardTitle className="text-base line-clamp-1">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" asChild>
                      <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFeedback(item, true)}
                        className="h-8 w-8 p-0"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFeedback(item, false)}
                        className="h-8 w-8 p-0"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {getRecommendationsList().length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recommendations available in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" onClick={loadRecommendations} className="flex items-center">
          <Brain className="mr-2 h-4 w-4" />
          Refresh Recommendations
        </Button>
      </CardFooter>
    </Card>
  );
}
