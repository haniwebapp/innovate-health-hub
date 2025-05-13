
import React, { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { LoadingIndicator } from "./LoadingIndicator";

interface ChatMessagesProps {
  messages: Array<{type: "user" | "assistant", content: string}>;
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [messages, isLoading]);

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
      
      {/* This div is used as a reference for scrolling to the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
}
