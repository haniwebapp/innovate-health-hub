
import { useEffect } from 'react';

type KeyboardShortcutOptions = {
  isOpen: boolean;
  minimized: boolean;
  onClose: () => void;
  toggleMinimize: () => void;
  onSendMessage: () => void;
  onFocusInput: () => void;
  onSwitchTab: (tab: string) => void;
  currentTab: string;
};

/**
 * Hook to handle keyboard shortcuts for the chat interface
 */
export function useChatKeyboardShortcuts({
  isOpen,
  minimized,
  onClose,
  toggleMinimize,
  onSendMessage,
  onFocusInput,
  onSwitchTab,
  currentTab
}: KeyboardShortcutOptions) {
  
  useEffect(() => {
    // Only add keyboard listeners if the chat is open
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const isTypingInInput = 
        document.activeElement instanceof HTMLInputElement || 
        document.activeElement instanceof HTMLTextAreaElement;
      
      // Escape key to close chat
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Alt+M to minimize/maximize
      if (e.key === 'm' && e.altKey) {
        e.preventDefault();
        toggleMinimize();
      }
      
      // Alt+C to focus chat input (if not minimized)
      if (e.key === 'c' && e.altKey && !minimized) {
        e.preventDefault();
        onFocusInput();
      }
      
      // Alt+1 to switch to chat tab
      if (e.key === '1' && e.altKey && !minimized && currentTab !== 'chat') {
        e.preventDefault();
        onSwitchTab('chat');
      }
      
      // Alt+2 to switch to sections tab
      if (e.key === '2' && e.altKey && !minimized && currentTab !== 'sections') {
        e.preventDefault();
        onSwitchTab('sections');
      }
      
      // Ctrl+Enter to send message when typing in the textarea
      if (e.key === 'Enter' && e.ctrlKey && isTypingInInput) {
        e.preventDefault();
        onSendMessage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, minimized, onClose, toggleMinimize, onSendMessage, onFocusInput, onSwitchTab, currentTab]);
}
