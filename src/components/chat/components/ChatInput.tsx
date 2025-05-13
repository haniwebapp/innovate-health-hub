
import React from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  characterCount?: number;
  maxLength?: number;
}

export function ChatInput({ 
  input, 
  setInput, 
  handleSendMessage, 
  isLoading, 
  handleKeyPress,
  inputRef,
  characterCount = 0,
  maxLength = 1000
}: ChatInputProps) {
  return (
    <div className="p-2 border-t" role="form" aria-label="Chat message form">
      <div className="relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question... (Alt+C to focus)"
          className="w-full p-2 pr-10 text-sm border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-moh-green dark:bg-gray-800 dark:border-gray-700"
          rows={2}
          disabled={isLoading}
          aria-label="Message input"
          aria-describedby="message-input-help"
          maxLength={maxLength}
        />
        <Button
          type="button"
          size="sm"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 bottom-2 h-8 w-8 bg-moh-green hover:bg-moh-green/90 p-0"
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <SendHorizontal className="h-4 w-4" aria-hidden="true" />}
        </Button>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
          <span id="message-input-help" className="text-xs">
            Press Enter to send or Shift+Enter for a new line
          </span>
          <span aria-live="polite" className={`${characterCount > maxLength * 0.9 ? 'text-amber-500' : ''}`}>
            {characterCount}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
