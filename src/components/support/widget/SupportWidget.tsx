
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, X, Minimize, Maximize, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSupportWidget } from "@/hooks/useSupportWidget";
import { SupportWidgetButton } from "./SupportWidgetButton";
import { cn } from "@/lib/utils";

export function SupportWidget() {
  const {
    isOpen,
    isMinimized,
    messageCount,
    widgetRef,
    toggleOpen,
    toggleMinimize,
    handleSupportRequest
  } = useSupportWidget();

  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    handleSupportRequest(message, email);
    setMessage("");
    setEmail("");
  };

  React.useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      <SupportWidgetButton 
        onClick={toggleOpen} 
        isOpen={isOpen} 
        messageCount={messageCount}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "60px" : "400px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-20 right-4 z-50 w-80 rounded-lg shadow-lg",
              "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
              "flex flex-col overflow-hidden"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-moh-green text-white">
              <div className="flex items-center gap-2">
                <LifeBuoy size={16} />
                <h3 className="font-medium">Quick Support</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-white hover:bg-moh-darkGreen"
                  onClick={toggleMinimize}
                >
                  {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-white hover:bg-moh-darkGreen"
                  onClick={toggleOpen}
                >
                  <X size={14} />
                </Button>
              </div>
            </div>
            
            {/* Content */}
            {!isMinimized && (
              <div className="flex-1 overflow-auto p-4">
                <p className="text-sm mb-4">
                  Need help with something? Send us a message and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="support-message" className="text-xs font-medium">
                      Message
                    </label>
                    <Textarea
                      id="support-message"
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue..."
                      className="min-h-[120px] text-sm resize-none"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="support-email" className="text-xs font-medium">
                      Email (optional)
                    </label>
                    <Input
                      id="support-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Leave your email if you'd like to receive a response directly.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-moh-green hover:bg-moh-darkGreen"
                    disabled={!message.trim()}
                  >
                    <SendHorizontal size={16} className="mr-2" />
                    Send message
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
