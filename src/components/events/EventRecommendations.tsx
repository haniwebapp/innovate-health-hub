
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EventsAIService } from "@/services/ai/events/EventsAIService";
import { useAuth } from "@/contexts/AuthContext";

interface EventRecommendation {
  eventId: string;
  eventTitle: string;
  matchScore: number;
  matchReason: string;
}

export function EventRecommendations() {
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  const fetchRecommendations = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Example interests and past events would typically come from user profile or behavior
      const userInterests = ["AI", "digital health", "healthcare", "innovation"];
      const pastEvents = ["Workshop", "Webinar"];
      
      const recommendationResults = await EventsAIService.getEventRecommendations(
        user.id,
        userInterests,
        pastEvents
      );
      
      setRecommendations(recommendationResults);
    } catch (err: any) {
      console.error("Error fetching event recommendations:", err);
      setError(err.message || "Failed to load recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Events</CardTitle>
          <CardDescription>Personalized for you based on your interests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">
            Could not load recommendations: {error}
          </p>
          <Button onClick={fetchRecommendations} variant="outline" size="sm" className="mt-2">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No event recommendations available at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Events</CardTitle>
        <CardDescription>Personalized for you based on your interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation.eventId} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{recommendation.eventTitle}</h4>
              <Badge className="bg-moh-green/20 text-moh-green border-moh-green/30">
                {recommendation.matchScore}% match
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{recommendation.matchReason}</p>
            <Link to={`/dashboard/collaboration/events/${recommendation.eventId}`} className="inline-flex items-center text-xs text-moh-green">
              View details
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        ))}
        
        <Button variant="outline" className="w-full" asChild>
          <Link to="/dashboard/collaboration/events">
            View All Events
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
