
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Menu } from "lucide-react";
import { Message } from "@/hooks/useChatState";
import { QuotationResponse } from "@/services/ai/quotation/QuotationAIService";

// Import components
import { ChatHeader } from "./components/ChatHeader";
import { ChatContent } from "./components/ChatContent";
import { ChatInput } from "./components/ChatInput";
import { ChatFooter } from "./components/ChatFooter";
import { ChatSections, sections } from "./components/ChatSections";
import { KeyboardShortcutsDialog } from "./components/KeyboardShortcutsDialog";

interface ChatUIProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  currentResponse: QuotationResponse | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  minimized: boolean;
  currentSection: string | null;
  shortcutsDialogOpen: boolean;
  setShortcutsDialogOpen: (open: boolean) => void;
  chatContentRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleSelectSection: (sectionId: string) => void;
  toggleMinimize: () => void;
}

export function ChatUI({
  isOpen,
  onClose,
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
  toggleMinimize
}: ChatUIProps) {
  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-4 right-4 z-50 flex flex-col",
            "bg-white dark:bg-gray-900 rounded-xl shadow-2xl",
            "border border-gray-200 dark:border-gray-800",
            "overflow-hidden",
            minimized ? "w-64 h-14" : "w-80 md:w-96 h-[500px] max-h-[80vh]"
          )}
          role="dialog"
          aria-label="Chat with MOH Assistant"
          aria-modal="true"
          style={{
            height: minimized ? "3.5rem" : "500px",
            maxHeight: "80vh"
          }}
        >
          {/* Chatbot Header */}
          <ChatHeader 
            minimized={minimized}
            currentSection={currentSection}
            sections={sections}
            toggleMinimize={toggleMinimize}
            onClose={onClose}
            showKeyboardShortcuts={() => setShortcutsDialogOpen(true)}
          />
          
          {!minimized && (
            <>
              <Tabs 
                defaultValue="chat" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                <TabsList className="grid grid-cols-2 p-1 mx-4 mt-2 bg-moh-green/10">
                  <TabsTrigger 
                    value="chat" 
                    className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
                    aria-label="Chat tab"
                  >
                    <MessageSquare size={16} className="mr-1" aria-hidden="true" /> Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sections" 
                    className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
                    aria-label="Sections tab"
                  >
                    <Menu size={16} className="mr-1" aria-hidden="true" /> Sections
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent 
                  value="chat" 
                  className="flex-1 flex flex-col overflow-hidden mt-2 px-1"
                >
                  <ChatContent 
                    messages={messages}
                    isLoading={isLoading}
                    chatContentRef={chatContentRef}
                    currentResponse={currentResponse}
                    setInput={setInput}
                  />

                  <ChatInput 
                    input={input}
                    setInput={setInput}
                    handleSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    handleKeyPress={handleKeyPress}
                    inputRef={inputRef}
                    characterCount={input.length}
                    maxLength={1000}
                  />
                </TabsContent>
                
                <TabsContent value="sections" className="flex-1 overflow-hidden mt-2">
                  <ChatSections 
                    currentSection={currentSection}
                    onSelectSection={handleSelectSection}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {/* Chatbot Footer */}
          <ChatFooter />
        </motion.div>
      </AnimatePresence>
      
      {/* Keyboard shortcuts dialog */}
      <KeyboardShortcutsDialog 
        isOpen={shortcutsDialogOpen} 
        onClose={() => setShortcutsDialogOpen(false)}
      />
    </>
  );
}
