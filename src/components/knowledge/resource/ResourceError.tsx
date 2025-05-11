
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourceErrorProps {
  error: string | null;
}

export function ResourceError({ error }: ResourceErrorProps) {
  const { t } = useLanguage();
  
  return (
    <Alert variant="destructive" className="my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{t('common.error')}</AlertTitle>
      <AlertDescription>
        {error || t('knowledge.resourceNotFound')}
      </AlertDescription>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4" 
        asChild
      >
        <Link to="/dashboard/knowledge">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.goBack')}
        </Link>
      </Button>
    </Alert>
  );
}
