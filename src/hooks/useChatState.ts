
import { useState, useRef, useEffect } from "react";
import { QuotationAIService, QuotationQuery, QuotationResponse } from "@/services/ai/quotation/QuotationAIService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export type Message = {
  type: "user" | "assistant";
  content: string;
  timestamp?: string;
};

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QuotationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [minimized, setMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const chatContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Helper function to format timestamp
  const getFormattedTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Enhanced scroll functionality - scrolls to bottom whenever messages change
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      // Use setTimeout to ensure DOM update is complete
      setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  // Auto scroll to bottom when messages, loading state, or current response changes
  useEffect(() => {
    if (!minimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, currentResponse, minimized]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        type: "assistant", 
        content: "Welcome to our healthcare innovation platform! How can I help you today?",
        timestamp: getFormattedTimestamp()
      }]);
    }
  }, [messages.length]);
  
  // Auto-focus the input field when opening and not minimized
  useEffect(() => {
    if (inputRef.current && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [minimized]);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = input.trim();
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userMessage,
      timestamp: getFormattedTimestamp()
    }]);
    setInput("");
    setIsLoading(true);
    setCurrentResponse(null);

    try {
      // Call AI service
      const query: QuotationQuery = {
        query: userMessage,
        userId: user?.id,
        context: currentSection || undefined
      };
      
      const response = await QuotationAIService.getInstance().handleQuotationQuery(query);
      setCurrentResponse(response);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: response.answer,
        timestamp: getFormattedTimestamp()
      }]);
    } catch (error: any) {
      console.error("Error getting response:", error);
      toast({
        variant: "destructive",
        title: "Service Error",
        description: "Failed to get a response. Please try again.",
      });
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I apologize for the inconvenience. I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: getFormattedTimestamp()
      }]);
    } finally {
      setIsLoading(false);
      
      // Auto-focus the input field after sending a message
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    
    if (section) {
      setMessages([{ 
        type: "assistant", 
        content: `You're now exploring ${section.label}. ${section.description} How can I help you with this?`,
        timestamp: getFormattedTimestamp()
      }]);
      setActiveTab("chat");
      
      toast({
        title: `${section.label} selected`,
        description: "Chat context has been updated.",
        duration: 3000,
      });
    }
  };

  const toggleMinimize = () => {
    setMinimized(prev => !prev);
  };
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const toggleShortcutsDialog = () => {
    setShortcutsDialogOpen(prev => !prev);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    currentResponse,
    activeTab,
    setActiveTab,
    minimized,
    currentSection,
    shortcutsDialogOpen,
    setShortcutsDialogOpen,
    chatContentRef,
    inputRef,
    handleSendMessage,
    handleKeyPress,
    handleSelectSection,
    toggleMinimize,
    focusInput,
    toggleShortcutsDialog
  };
}

// Import here to avoid circular dependency
import { sections } from "../components/chat/components/ChatSections";
