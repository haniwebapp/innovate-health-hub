
import React from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { toast } = useToast();
  
  const handleLanguageInfo = () => {
    // Show toast notification
    toast({
      title: 'English Only',
      description: 'This application is currently available in English only',
      duration: 3000,
    });
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 rounded-full bg-moh-lightGreen/30 border-moh-green hover:bg-moh-lightGreen"
      onClick={handleLanguageInfo}
    >
      <motion.div>
        <Languages className="h-4 w-4 text-moh-darkGreen" />
      </motion.div>
      <span className="font-medium">
        English
      </span>
    </Button>
  );
}
