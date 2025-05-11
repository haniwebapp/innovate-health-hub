
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Clock, Play, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LearningPathCardProps {
  path: {
    id: string;
    title: string;
    description: string;
    category: string;
    totalModules: number;
    completedModules: number;
    estimatedHours: number;
    level: "beginner" | "intermediate" | "advanced";
    isEnrolled?: boolean;
  };
  className?: string;
  onEnroll?: (pathId: string) => void;
}

export function LearningPathCard({ path, className, onEnroll }: LearningPathCardProps) {
  const progress = Math.round((path.completedModules / path.totalModules) * 100);
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case "beginner": return "bg-green-50 text-green-700 border-green-200";
      case "intermediate": return "bg-amber-50 text-amber-700 border-amber-200";
      case "advanced": return "bg-red-50 text-red-700 border-red-200";
      default: return "";
    }
  };
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:border-moh-green/40", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <Badge variant="outline" className="bg-moh-green/10 text-moh-green border-moh-green/20">
            {path.category}
          </Badge>
          <Badge variant="outline" className={getLevelColor(path.level)}>
            {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-1">{path.title}</CardTitle>
        <CardDescription className="line-clamp-2">{path.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center text-sm mb-3">
          <div className="flex items-center text-muted-foreground">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{path.totalModules} modules</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{path.estimatedHours} hours</span>
          </div>
        </div>
        
        {path.isEnrolled && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {path.completedModules} of {path.totalModules} modules completed
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {path.isEnrolled ? (
          <div className="w-full flex justify-between">
            <Button variant="outline" asChild>
              <Link to={`/dashboard/knowledge/learning-paths/${path.id}`}>
                <BookOpen className="h-4 w-4 mr-1" />
                View Path
              </Link>
            </Button>
            <Button asChild>
              <Link to={`/dashboard/knowledge/learning-paths/${path.id}/continue`}>
                <Play className="h-4 w-4 mr-1" />
                Continue
              </Link>
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            onClick={() => onEnroll && onEnroll(path.id)}
          >
            <GraduationCap className="h-4 w-4 mr-1" />
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
