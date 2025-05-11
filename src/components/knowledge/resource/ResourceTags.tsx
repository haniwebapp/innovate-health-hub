
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ResourceTagsProps {
  category: string;
  tags?: string[];
}

export function ResourceTags({ category, tags = [] }: ResourceTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="secondary" className="bg-moh-lightGreen/30">
        {category}
      </Badge>
      {tags?.map(tag => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
