
import { ResourceLink } from "@/services/ai/support/SupportAIService";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SupportRelatedResourcesProps {
  resources: ResourceLink[];
}

export function SupportRelatedResources({ resources }: SupportRelatedResourcesProps) {
  if (!resources || resources.length === 0) return null;
  
  return (
    <Card className="mt-4 bg-slate-50 border-slate-200">
      <CardContent className="pt-4">
        <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
          <Search size={14} />
          Related Resources
        </h4>
        <ul className="space-y-2">
          {resources.map((resource, idx) => (
            <li key={idx} className="text-sm">
              <a 
                href={resource.url} 
                className="text-blue-600 hover:underline flex items-center gap-1"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Badge variant="outline" className="text-xs">
                  {resource.type}
                </Badge>
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
