
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Since we're English-only now, this is just a placeholder function
  const handleLanguageChange = (newLanguage: 'en') => {
    if (newLanguage !== language) {
      setIsChangingLanguage(true);
      setLanguage(newLanguage);
      
      // Show animation and notification
      setTimeout(() => {
        setIsChangingLanguage(false);
        setShowNotification(true);
        
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      }, 800);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full relative"
            aria-label="Language"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isChangingLanguage ? 'changing' : 'static'}
                initial={{ rotate: 0 }}
                animate={isChangingLanguage ? { rotate: 360 } : {}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Globe className="h-5 w-5" />
              </motion.div>
            </AnimatePresence>
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-moh-gold rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px] bg-white">
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('en')} 
            className="bg-moh-lightGreen cursor-pointer flex items-center justify-between px-4 py-2"
          >
            <span className="flex items-center">
              <span className="mr-2">🇬🇧</span>
              English
            </span>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }} 
              className="w-2 h-2 bg-moh-green rounded-full"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Language change notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-moh-green text-white px-4 py-2 rounded-md shadow-lg"
          >
            Language changed to English
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
