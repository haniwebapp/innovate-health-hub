
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VerificationPage() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-moh-lightGreen rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-10 w-10 text-moh-green" />
      </div>
      
      <h1 className="text-2xl font-bold">{t('verification.checkInbox')}</h1>
      
      <p className="text-muted-foreground">
        {t('verification.description')}
      </p>
      
      <div className="space-y-4 w-full">
        <Button asChild className="w-full">
          <Link to="/auth/login">{t('verification.goToLogin')}</Link>
        </Button>
        
        <p className="text-sm text-muted-foreground">
          {t('verification.notReceived')}
        </p>
      </div>
    </div>
  );
}
