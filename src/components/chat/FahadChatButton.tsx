
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { PulseRings } from "@/components/home/hero/animations/PulseRings";

interface FahadChatButtonProps {
  hasNewMessages?: boolean;
  onClick: () => void;
  isOpen: boolean;
}

export function FahadChatButton({ hasNewMessages = false, onClick, isOpen }: FahadChatButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  // Start pulsing effect when there are new messages
  useEffect(() => {
    if (hasNewMessages) {
      setIsPulsing(true);
      // Stop pulsing after 5 seconds to avoid distraction
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [hasNewMessages]);

  return (
    <motion.div 
      className="fixed bottom-5 right-5 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {isPulsing && !isOpen && (
          <div className="absolute inset-0">
            <PulseRings />
          </div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={onClick}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-moh-green shadow-lg hover:bg-moh-darkGreen transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isPulsing ? { y: [0, -5, 0], transition: { repeat: 3, duration: 1 } } : {}}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.div
              key="chat"
              className="flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {hasNewMessages && !isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 h-3 w-3 bg-moh-gold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
