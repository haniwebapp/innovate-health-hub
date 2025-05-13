
import React from "react";
import { ChatMessage } from "./ChatMessage";
import { LoadingIndicator } from "./LoadingIndicator";

interface ChatMessagesProps {
  messages: Array<{type: "user" | "assistant", content: string}>;
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="space-y-4 py-4">
      {messages.map((message, idx) => (
        <ChatMessage 
          key={idx} 
          type={message.type} 
          content={message.content}
        />
      ))}
      
      {isLoading && <LoadingIndicator />}
    </div>
  );
}
