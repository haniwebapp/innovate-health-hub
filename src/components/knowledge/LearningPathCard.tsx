
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LearningPath } from '@/types/learning';
import { BookOpen, Clock, GraduationCap, Check } from 'lucide-react';

interface LearningPathCardProps {
  path: LearningPath;
  onEnroll: (pathId: string) => void;
}

export function LearningPathCard({ path, onEnroll }: LearningPathCardProps) {
  // Calculate progress if enrolled
  const progress = path.completedModules && path.totalModules 
    ? Math.round((path.completedModules / path.totalModules) * 100) 
    : 0;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{path.title}</CardTitle>
            <CardDescription className="line-clamp-2">{path.description}</CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {path.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-moh-lightGreen/10 text-moh-green">
            {path.category}
          </Badge>
          
          {path.featured && (
            <Badge variant="secondary">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{path.totalModules} modules</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{path.estimatedHours} hours</span>
        </div>
        
        {path.isEnrolled && path.completedModules !== undefined && (
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-sm">
              <span>
                <GraduationCap className="h-4 w-4 inline mr-1" />
                Progress
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {path.completedModules} of {path.totalModules} modules completed
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {path.isEnrolled ? (
          <Button variant="outline" className="w-full" asChild>
            <a href={`/dashboard/knowledge/learning-hub/path/${path.id}`}>
              <Check className="h-4 w-4 mr-2" />
              Continue Learning
            </a>
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onEnroll(path.id)}>
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
