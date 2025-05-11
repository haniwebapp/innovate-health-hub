
import React from 'react';
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ResourceLoading() {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center items-center py-24">
      <Loader2 className="h-8 w-8 animate-spin text-moh-green mr-2" />
      <p>{t('knowledge.loadingResource')}</p>
    </div>
  );
}
