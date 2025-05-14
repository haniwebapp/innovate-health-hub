
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportWidgetButtonProps {
  onClick: () => void;
  isOpen: boolean;
  messageCount: number;
}

export function SupportWidgetButton({ onClick, isOpen, messageCount = 0 }: SupportWidgetButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-full shadow-lg",
        "flex items-center justify-center w-14 h-14",
        "bg-moh-green hover:bg-moh-darkGreen text-white",
        "transition-colors duration-200"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
            <X size={24} />
          </motion.span>
        ) : (
          <motion.span
            key="support"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LifeBuoy size={24} />
          </motion.span>
        )}
      </AnimatePresence>

      {messageCount > 0 && !isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
                    rounded-full h-5 w-5 flex items-center justify-center font-medium"
        >
          {messageCount > 9 ? "9+" : messageCount}
        </motion.div>
      )}
    </motion.button>
  );
}
