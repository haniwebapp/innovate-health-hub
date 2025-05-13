
import React from "react";
import { Loader2 } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { ChatSuggestedQuestions } from "./ChatSuggestedQuestions";
import { RelatedResourcesDisplay } from "./RelatedResourcesDisplay";
import { QuotationResponse } from "@/services/ai/quotation/QuotationAIService";

interface Message {
  type: "user" | "assistant";
  content: string;
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
  return (
    <div 
      ref={chatContentRef}
      className="flex-1 overflow-y-auto h-[350px] px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div className="space-y-4 pb-4">
        {messages.map((message, idx) => (
          <ChatBubble key={idx} type={message.type} content={message.content} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl p-3 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" />
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
