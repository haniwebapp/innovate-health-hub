
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  type: "user" | "assistant";
  content: string;
}

export function ChatBubble({ type, content }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex",
        type === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-xl p-3",
          type === "user"
            ? "bg-gradient-to-br from-moh-green to-moh-green/90 text-white"
            : "bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800"
        )}
      >
        <p className="whitespace-pre-wrap text-sm">{content}</p>
      </div>
    </motion.div>
  );
}
