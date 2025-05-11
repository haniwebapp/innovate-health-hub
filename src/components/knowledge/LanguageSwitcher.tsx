
import React from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const handleLanguageToggle = () => {
    // Toggle between English and Arabic
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    
    // Show toast notification
    toast({
      title: language === 'en' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English',
      description: language === 'en' 
        ? 'يمكنك العودة إلى الإنجليزية في أي وقت' 
        : 'You can switch back to Arabic at any time',
      duration: 3000,
    });
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 rounded-full bg-moh-lightGreen/30 border-moh-green hover:bg-moh-lightGreen"
      onClick={handleLanguageToggle}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: language === 'ar' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Languages className="h-4 w-4 text-moh-darkGreen" />
      </motion.div>
      <span className="font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
}
