
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useSupportChat } from "@/hooks/useSupportChat";
import { SupportChatMessage } from "./chat/SupportChatMessage";
import { SupportChatLoading } from "./chat/SupportChatLoading";
import { SupportRelatedResources } from "./chat/SupportRelatedResources";
import { SupportFollowUpQuestions } from "./chat/SupportFollowUpQuestions";

export default function SupportChatInterface() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    currentResponse,
    scrollContainerRef,
    handleSendMessage,
    handleKeyPress
  } = useSupportChat();

  return (
    <div className="flex flex-col h-[600px]">
      <div 
        className="flex-1 p-4 mb-4 border rounded-lg overflow-auto" 
        ref={scrollContainerRef}
      >
        <div className="space-y-4">
          {messages.map((message, idx) => (
            <SupportChatMessage 
              key={idx}
              type={message.type}
              content={message.content}
            />
          ))}
          
          {isLoading && <SupportChatLoading />}
        </div>

        {/* Related resources */}
        {currentResponse?.relatedResources && currentResponse.relatedResources.length > 0 && (
          <SupportRelatedResources resources={currentResponse.relatedResources} />
        )}

        {/* Follow-up questions */}
        {currentResponse?.followUpQuestions && currentResponse.followUpQuestions.length > 0 && (
          <SupportFollowUpQuestions 
            questions={currentResponse.followUpQuestions} 
            onSelectQuestion={(question) => setInput(question)}
          />
        )}
      </div>

      <div className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question here..."
          className="flex-1 resize-none min-h-[60px]"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !input.trim()}
          className="h-[60px] px-5"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
