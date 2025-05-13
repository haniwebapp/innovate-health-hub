
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800"
      >
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Thinking...</span>
        </div>
      </motion.div>
    </div>
  );
}
