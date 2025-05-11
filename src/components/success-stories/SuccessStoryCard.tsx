
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SuccessStory } from "@/types/successStoryTypes";

interface SuccessStoryCardProps {
  story: SuccessStory;
  compact?: boolean;
}

export function SuccessStoryCard({ story, compact = false }: SuccessStoryCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {story.coverImageUrl && !compact && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={story.coverImageUrl} 
            alt={story.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge>{story.category}</Badge>
          {story.featured && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Featured</span>
            </div>
          )}
        </div>
        
        <CardTitle className="mt-2 line-clamp-2">
          {story.title}
        </CardTitle>
        
        {story.publicationDate && (
          <CardDescription className="flex items-center gap-1 mt-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {story.publicationDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className={`text-slate-600 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {story.summary}
        </p>
        
        {!compact && story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {story.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {story.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{story.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="outline" asChild className="w-full">
          <Link to={`/dashboard/success-stories/${story.id}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
