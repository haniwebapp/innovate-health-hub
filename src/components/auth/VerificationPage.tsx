
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function VerificationPage() {
  const { t } = useLanguage();
  const [isResending, setIsResending] = useState(false);
  const [hasResent, setHasResent] = useState(false);
  
  const handleResendEmail = () => {
    setIsResending(true);
    
    // Simulate resending email
    setTimeout(() => {
      setIsResending(false);
      setHasResent(true);
      
      // Reset the state after 3 seconds
      setTimeout(() => setHasResent(false), 3000);
    }, 1500);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        className="w-20 h-20 bg-moh-lightGreen rounded-full flex items-center justify-center mb-4"
      >
        <CheckCircle className="h-12 w-12 text-moh-green" />
      </motion.div>
      
      <h1 className="text-2xl md:text-3xl font-bold font-playfair text-moh-darkGreen">
        {t('verification.checkInbox')}
      </h1>
      
      <p className="text-muted-foreground text-md">
        {t('verification.description')}
      </p>
      
      <div className="space-y-4 w-full">
        <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen">
          <Link to="/auth/login">{t('verification.goToLogin')}</Link>
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {t('verification.notReceived')}
          </p>
          
          <Button 
            variant="outline" 
            onClick={handleResendEmail} 
            disabled={isResending || hasResent}
            className="text-moh-green border-moh-green/50 hover:bg-moh-lightGreen hover:text-moh-darkGreen"
          >
            {isResending ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                {t('verification.resending')}
              </>
            ) : hasResent ? (
              t('verification.emailResent')
            ) : (
              t('verification.resendEmail')
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
