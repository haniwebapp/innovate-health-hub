
import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { ChatSuggestedQuestions } from "./ChatSuggestedQuestions";
import { RelatedResourcesDisplay } from "./RelatedResourcesDisplay";
import { QuotationResponse } from "@/services/ai/quotation/QuotationAIService";

interface Message {
  type: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface ChatContentProps {
  messages: Message[];
  isLoading: boolean;
  chatContentRef: React.RefObject<HTMLDivElement>;
  currentResponse: QuotationResponse | null;
  setInput: (value: string) => void;
}

export function ChatContent({ 
  messages, 
  isLoading, 
  chatContentRef, 
  currentResponse, 
  setInput 
}: ChatContentProps) {
  // Effect to auto-scroll to bottom when messages change or when loading starts/stops
  useEffect(() => {
    if (chatContentRef.current) {
      // Use setTimeout to ensure DOM update is complete
      setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messages, isLoading, currentResponse?.followUpQuestions, currentResponse?.relatedResources]);

  return (
    <div 
      ref={chatContentRef}
      className="flex-1 overflow-y-auto h-[350px] px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      <div className="space-y-4 pb-4" role="list">
        {messages.map((message, idx) => (
          <ChatBubble 
            key={idx} 
            type={message.type} 
            content={message.content} 
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start" role="status" aria-label="Assistant is typing">
            <div className="max-w-[85%] rounded-xl p-3 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" aria-hidden="true" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Follow-up questions */}
        {currentResponse?.followUpQuestions && (
          <ChatSuggestedQuestions 
            followUpQuestions={currentResponse.followUpQuestions} 
            onSelectQuestion={setInput} 
          />
        )}

        {/* Related resources */}
        {currentResponse?.relatedResources && (
          <RelatedResourcesDisplay relatedResources={currentResponse.relatedResources} />
        )}
      </div>
    </div>
  );
}
