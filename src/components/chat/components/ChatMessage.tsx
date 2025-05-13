
import React from "react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  type: "user" | "assistant";
  content: string;
}

export function ChatMessage({ type, content }: ChatMessageProps) {
  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`max-w-[80%] rounded-lg p-3 ${
          type === "user" 
            ? "bg-moh-green text-white" 
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="whitespace-pre-wrap">{content}</div>
      </motion.div>
    </div>
  );
}
