
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function ChatInput({ value, onChange, onSend, isLoading, onKeyPress }: ChatInputProps) {
  return (
    <div className="border-t p-3">
      <div className="flex items-end gap-2 pt-1">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Enter your message..."
          className="flex-1 resize-none min-h-[50px] max-h-[100px] border-gray-300"
          disabled={isLoading}
        />
        <Button 
          onClick={onSend} 
          disabled={isLoading || !value.trim()}
          className="h-[50px] w-[50px] p-0 rounded-full bg-moh-green hover:bg-moh-darkGreen"
        >
          {isLoading ? 
            <Loader2 className="h-5 w-5 animate-spin" /> : 
            <Send className="h-5 w-5" />
          }
        </Button>
      </div>
    </div>
  );
}
