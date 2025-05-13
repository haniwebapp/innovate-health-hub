
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { KnowledgeResource } from "@/utils/knowledgeUtils";

interface ResourceHeaderProps {
  resource: KnowledgeResource;
}

export function ResourceHeader({ resource }: ResourceHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle>
          {resource.title}
        </CardTitle>
        <CardDescription>
          {resource.author && `By ${resource.author} • `}
          Published: {new Date(resource.created_at).toLocaleDateString()}
        </CardDescription>
      </div>
      <Badge variant="outline" className="capitalize">
        {resource.type}
      </Badge>
    </div>
  );
}
