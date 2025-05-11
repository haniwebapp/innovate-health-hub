
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { Thread } from "@/utils/messageUtils";

interface MessageComposerProps {
  selectedThread: Thread | null;
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

export function MessageComposer({ selectedThread, onSendMessage, isLoading }: MessageComposerProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    try {
      await onSendMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-3">
      <div className="relative">
        <Textarea
          placeholder={selectedThread ? "Type your message..." : "Select a conversation to send a message"}
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!selectedThread || isLoading}
          className="resize-none pr-14"
        />
        <Button
          size="sm"
          type="submit"
          disabled={!message.trim() || !selectedThread || isLoading}
          className="absolute bottom-2 right-2"
        >
          <SendHorizontal className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
}
