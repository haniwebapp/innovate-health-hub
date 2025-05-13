
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
}

export function ChatInput({ 
  input, 
  setInput, 
  handleSendMessage, 
  isLoading, 
  handleKeyPress,
  inputRef 
}: ChatInputProps) {
  return (
    <div className="p-2 border-t">
      <div className="relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question..."
          className="w-full p-2 pr-10 text-sm border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-moh-green dark:bg-gray-800 dark:border-gray-700"
          rows={2}
          disabled={isLoading}
        />
        <Button
          size="sm"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="absolute right-1 bottom-1 h-8 w-8 bg-moh-green hover:bg-moh-green/90 p-0"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
