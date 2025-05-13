
import React, { useState, useRef, useEffect } from "react";
import { QuotationAIService, QuotationQuery, QuotationResponse } from "@/services/ai/quotation/QuotationAIService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useAuth } from "@/contexts/AuthContext";

// Import our new components
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";
import { QuickActions } from "./components/QuickActions";
import { QuotationDetails } from "./components/QuotationDetails";
import { RelatedResources } from "./components/RelatedResources";
import { FollowUpQuestions } from "./components/FollowUpQuestions";

interface FahadChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FahadChatbot({ isOpen, onClose }: FahadChatbotProps) {
  const [messages, setMessages] = useState<Array<{type: "user" | "assistant", content: string}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QuotationResponse | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        type: "assistant", 
        content: "Welcome to our healthcare innovation platform! How can I help you today?" 
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setCurrentResponse(null);

    try {
      // Call AI service
      const query: QuotationQuery = {
        query: userMessage,
        userId: user?.id,
        context: "healthcare"
      };
      
      const response = await QuotationAIService.getInstance().handleQuotationQuery(query);
      setCurrentResponse(response);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { type: "assistant", content: response.answer }]);
    } catch (error: any) {
      console.error("Error getting response:", error);
      toast({
        variant: "destructive",
        title: "Service Error",
        description: "Failed to get a response. Please try again.",
      });
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I apologize for the inconvenience. I'm having trouble processing your request right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getQuickActions = () => [
    { label: "Purchase info", action: () => setInput("I need information about purchasing") },
    { label: "Order status", action: () => setInput("What is the status of my order?") },
    { label: "Refund info", action: () => setInput("How can I request a refund?") },
    { label: "Shipping", action: () => setInput("Tell me about shipping options"), highlighted: true },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[80vh] max-h-[80vh]">
        <ChatHeader />
        
        <div className="flex flex-col h-full bg-white overflow-hidden">
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <ChatMessages 
              messages={messages} 
              isLoading={isLoading} 
            />

            {messages.length === 1 && !isLoading && (
              <QuickActions actions={getQuickActions()} />
            )}

            {/* Response components */}
            {currentResponse?.quotationData && (
              <QuotationDetails data={currentResponse.quotationData} />
            )}

            {currentResponse?.relatedResources && currentResponse.relatedResources.length > 0 && (
              <RelatedResources resources={currentResponse.relatedResources} />
            )}

            {currentResponse?.followUpQuestions && currentResponse.followUpQuestions.length > 0 && (
              <FollowUpQuestions 
                questions={currentResponse.followUpQuestions} 
                onSelect={(question) => setInput(question)} 
              />
            )}
          </ScrollArea>

          <ChatInput 
            value={input}
            onChange={setInput}
            onSend={handleSendMessage}
            isLoading={isLoading}
            onKeyPress={handleKeyPress}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
