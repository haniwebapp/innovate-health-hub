
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Maximize, Minimize, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  minimized: boolean;
  currentSection: string | null;
  sections: Array<{id: string; label: string;}>;
  toggleMinimize: () => void;
  onClose: () => void;
}

export function ChatHeader({ 
  minimized, 
  currentSection, 
  sections, 
  toggleMinimize, 
  onClose 
}: ChatHeaderProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between px-4 py-2",
        "bg-gradient-to-r from-moh-green to-moh-green/80",
        "text-white"
      )}
    >
      <div className="flex items-center space-x-2">
        {!minimized ? (
          <>
            <div className="flex items-center space-x-1">
              <Sparkles size={16} className="text-moh-gold" />
              <span className="font-semibold">MOH Assistant</span>
            </div>
            {currentSection && (
              <span className="text-xs bg-moh-gold/20 px-2 py-0.5 rounded-full">
                {sections.find(s => s.id === currentSection)?.label}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-1">
            <Sparkles size={16} className="text-moh-gold" />
            <span className="font-semibold">MOH Assistant</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-white hover:bg-white/20" 
          onClick={toggleMinimize}
        >
          {minimized ? <Maximize size={14} /> : <Minimize size={14} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-white hover:bg-white/20" 
          onClick={onClose}
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
}
