
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LanguageSwitcher() {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-moh-darkGreen hover:bg-gray-50 hover:text-moh-green rounded-full relative"
        aria-label="Language"
        onClick={() => {
          // Show notification that the app is English only
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 2000);
        }}
      >
        <motion.div>
          <Globe className="h-5 w-5" />
        </motion.div>
        <motion.div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-moh-gold rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Button>
      
      {/* Language notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-moh-green text-white px-4 py-2 rounded-md shadow-lg"
          >
            Application is available in English only
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
