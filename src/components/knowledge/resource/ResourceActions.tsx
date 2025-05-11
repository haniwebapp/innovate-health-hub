
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, Download, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";

interface ResourceActionsProps {
  onSaveResource: () => void;
  onDownload: () => void;
  onTranslate: () => void;
  isTranslating: boolean;
  hasContent: boolean;
  language: string;
}

export function ResourceActions({ 
  onSaveResource, 
  onDownload, 
  onTranslate, 
  isTranslating, 
  hasContent,
  language 
}: ResourceActionsProps) {
  const { t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  return (
    <div className="flex justify-between pt-6">
      <Button 
        variant="outline"
        onClick={onSaveResource}
        className="flex items-center"
      >
        <ThumbsUp className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
        {t('knowledge.saveResource')}
      </Button>
      
      <div className={`flex gap-2 ${rtlClasses.flex}`}>
        {hasContent && !isTranslating ? (
          <Button 
            variant="outline"
            onClick={onTranslate}
            className="flex items-center"
          >
            {language === 'en' ? 'ترجمة إلى العربية' : 'Translate to English'}
          </Button>
        ) : isTranslating && (
          <Button variant="outline" disabled>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {t('knowledge.translating')}
          </Button>
        )}
        
        <Button 
          onClick={onDownload}
          className="bg-moh-darkGreen hover:bg-moh-green"
        >
          <Download className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
          {t('knowledge.download')}
        </Button>
      </div>
    </div>
  );
}
