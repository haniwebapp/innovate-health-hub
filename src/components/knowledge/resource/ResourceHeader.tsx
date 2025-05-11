
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { KnowledgeResource } from "@/utils/knowledgeUtils";
import { getRTLClasses } from "@/utils/rtlUtils";

interface ResourceHeaderProps {
  resource: KnowledgeResource;
  language: string;
}

export function ResourceHeader({ resource, language }: ResourceHeaderProps) {
  const rtlClasses = getRTLClasses(language);
  
  return (
    <div className={`flex justify-between items-start ${rtlClasses.flex}`}>
      <div>
        <CardTitle className={rtlClasses.text}>
          {resource.title}
        </CardTitle>
        <CardDescription className={rtlClasses.text}>
          {resource.author && `${language === 'en' ? 'By' : 'بواسطة'} ${resource.author} • `}
          {language === 'en' ? 'Published' : 'نُشر'}: {new Date(resource.created_at).toLocaleDateString()}
        </CardDescription>
      </div>
      <Badge variant="outline" className="capitalize">
        {resource.type}
      </Badge>
    </div>
  );
}
