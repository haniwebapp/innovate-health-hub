
import React from "react";
import { useChatState } from "@/hooks/useChatState";
import { useChatKeyboardShortcuts } from "@/hooks/useChatKeyboardShortcuts";
import { ChatUI } from "./ChatUI";

interface FahadChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FahadChatbot({ isOpen, onClose }: FahadChatbotProps) {
  const chatState = useChatState();
  
  // Use keyboard shortcuts hook
  useChatKeyboardShortcuts({
    isOpen,
    minimized: chatState.minimized,
    onClose,
    toggleMinimize: chatState.toggleMinimize,
    onSendMessage: chatState.handleSendMessage,
    onFocusInput: chatState.focusInput,
    onSwitchTab: chatState.setActiveTab,
    currentTab: chatState.activeTab
  });

  return (
    <ChatUI
      isOpen={isOpen}
      onClose={onClose}
      messages={chatState.messages}
      input={chatState.input}
      setInput={chatState.setInput}
      isLoading={chatState.isLoading}
      currentResponse={chatState.currentResponse}
      activeTab={chatState.activeTab}
      setActiveTab={chatState.setActiveTab}
      minimized={chatState.minimized}
      currentSection={chatState.currentSection}
      shortcutsDialogOpen={chatState.shortcutsDialogOpen}
      setShortcutsDialogOpen={chatState.setShortcutsDialogOpen}
      chatContentRef={chatState.chatContentRef}
      inputRef={chatState.inputRef}
      handleSendMessage={chatState.handleSendMessage}
      handleKeyPress={chatState.handleKeyPress}
      handleSelectSection={chatState.handleSelectSection}
      toggleMinimize={chatState.toggleMinimize}
    />
  );
}
