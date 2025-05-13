
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, Download, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourceActionsProps {
  onSaveResource: () => void;
  onDownload: () => void;
  onTranslate?: () => void;
  isTranslating?: boolean;
  hasContent: boolean;
}

export function ResourceActions({ 
  onSaveResource, 
  onDownload,
  onTranslate,
  isTranslating,
  hasContent
}: ResourceActionsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between pt-6">
      <Button 
        variant="outline"
        onClick={onSaveResource}
        className="flex items-center"
      >
        <ThumbsUp className="h-4 w-4 mr-2" />
        {t('knowledge.saveResource')}
      </Button>
      
      <div className="flex gap-2">
        <Button 
          onClick={onDownload}
          className="bg-moh-darkGreen hover:bg-moh-green"
        >
          <Download className="h-4 w-4 mr-2" />
          {t('knowledge.download')}
        </Button>
      </div>
    </div>
  );
}
