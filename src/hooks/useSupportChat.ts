
import { useState, useRef, useEffect } from "react";
import { SupportAIService, SupportQuery, SupportResponse } from "@/services/ai/support/SupportAIService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function useSupportChat() {
  const [messages, setMessages] = useState<Array<{type: "user" | "assistant", content: string}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<SupportResponse | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom of chat when messages change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 0);
    }
  }, [messages, isLoading, currentResponse]);

  // Initial greeting
  useEffect(() => {
    setMessages([{ 
      type: "assistant", 
      content: "Hello! I'm your support assistant. How can I help you with your healthcare innovation journey today?" 
    }]);
  }, []);

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
      const query: SupportQuery = {
        query: userMessage,
        userId: user?.id
      };
      
      const response = await SupportAIService.handleSupportQuery(query);
      setCurrentResponse(response);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { type: "assistant", content: response.answer }]);
    } catch (error: any) {
      console.error("Error getting support response:", error);
      toast({
        variant: "destructive",
        title: "Support Error",
        description: "Failed to get a response from the support assistant.",
      });
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I'm sorry, I encountered an error processing your request. Please try again or submit a ticket for more detailed assistance." 
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

  return {
    messages,
    input,
    setInput,
    isLoading,
    currentResponse,
    scrollContainerRef,
    handleSendMessage,
    handleKeyPress
  };
}
