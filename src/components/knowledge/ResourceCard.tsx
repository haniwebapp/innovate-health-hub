
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, ExternalLink, Bookmark, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockResources, resourceTypeIcons } from "./mockData";

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: string;
    category: string;
    thumbnail?: string;
    matchScore?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    url?: string;
    downloadCount?: number;
  };
  className?: string;
  onSave?: (resourceId: string) => void;
}

export function ResourceCard({ resource, className, onSave }: ResourceCardProps) {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(resource.id);
    }
    
    toast({
      title: isSaved ? "Resource removed" : "Resource saved",
      description: isSaved 
        ? "Resource has been removed from your saved items" 
        : "Resource has been added to your saved items"
    });
  };

  // Get the appropriate icon based on resource type
  const TypeIcon = resource.type && resourceTypeIcons[resource.type] 
    ? resourceTypeIcons[resource.type] 
    : FileText;
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="h-40 bg-muted relative">
        {resource.thumbnail ? (
          <img 
            src={resource.thumbnail} 
            alt={resource.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <TypeIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {resource.matchScore && (
            <Badge className="bg-moh-green">
              Match: {resource.matchScore}%
            </Badge>
          )}
          {resource.isNew && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              New
            </Badge>
          )}
        </div>
        {resource.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-moh-gold">
            <Sparkles className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <Badge variant="outline" className="w-fit mb-1">
          {resource.category}
        </Badge>
        <CardTitle className="text-base line-clamp-1">{resource.title}</CardTitle>
        <CardDescription className="flex items-center text-xs">
          <TypeIcon className="h-3 w-3 mr-1" />
          {resource.type}
          {resource.downloadCount !== undefined && (
            <span className="ml-2 flex items-center">
              <Download className="h-3 w-3 mr-1" />
              {resource.downloadCount}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm line-clamp-2">{resource.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={resource.url ? resource.url : `/dashboard/knowledge/resources/${resource.id}`}>
            <ExternalLink className="h-3 w-3 mr-1" />
            View Resource
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleSave}
          className={isSaved ? "text-moh-green" : ""}
        >
          <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
        </Button>
      </CardFooter>
    </Card>
  );
}

// If no resources are provided, this component can be used with mock data
export function ResourceCardWithFallback({ resource, className, onSave }: Partial<ResourceCardProps>) {
  // Use the first mock resource if none is provided
  const fallbackResource = resource || mockResources[0];
  return <ResourceCard resource={fallbackResource} className={className} onSave={onSave} />;
}
