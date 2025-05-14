
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export function useSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const widgetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const handleNewMessage = () => {
    setMessageCount(prev => prev + 1);
  };

  const handleSupportRequest = (message: string, email?: string) => {
    // This would connect to your support system in a real implementation
    console.log("Support request:", { message, email });
    
    toast({
      title: "Support request sent",
      description: "We'll get back to you as soon as possible.",
      variant: "success"
    });

    setMessageCount(0);
    toggleOpen();
  };

  return {
    isOpen,
    isMinimized,
    messageCount,
    widgetRef,
    toggleOpen,
    toggleMinimize,
    handleNewMessage,
    handleSupportRequest
  };
}
