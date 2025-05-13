
import React, { useState, useEffect } from "react";
import { FahadChatButton } from "./FahadChatButton";
import FahadChatbot from "./FahadChatbot";

export function FahadChatContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  // Simulate receiving a new message after 30 seconds if the chat is not open
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessages(true);
      }, 30000);
      
      return () => clearTimeout(timer);
    } else {
      // Clear the new message flag when chat is opened
      setHasNewMessages(false);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (hasNewMessages) setHasNewMessages(false);
  };

  return (
    <>
      <FahadChatButton 
        hasNewMessages={hasNewMessages} 
        onClick={toggleChat} 
        isOpen={isOpen} 
      />
      <FahadChatbot 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
