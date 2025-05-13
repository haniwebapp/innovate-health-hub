
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Maximize, Minimize, X, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatHeaderProps {
  minimized: boolean;
  currentSection: string | null;
  sections: Array<{id: string; label: string;}>;
  toggleMinimize: () => void;
  onClose: () => void;
  showKeyboardShortcuts: () => void;
}

export function ChatHeader({ 
  minimized, 
  currentSection, 
  sections, 
  toggleMinimize, 
  onClose,
  showKeyboardShortcuts
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
              <Sparkles size={16} className="text-moh-gold" aria-hidden="true" />
              <span className="font-semibold">MOH Assistant</span>
            </div>
            {currentSection && (
              <span className="text-xs bg-moh-gold/20 px-2 py-0.5 rounded-full" aria-label={`Current section: ${sections.find(s => s.id === currentSection)?.label}`}>
                {sections.find(s => s.id === currentSection)?.label}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-1">
            <Sparkles size={16} className="text-moh-gold" aria-hidden="true" />
            <span className="font-semibold">MOH Assistant</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:bg-white/20" 
                onClick={showKeyboardShortcuts}
                aria-label="Show keyboard shortcuts"
              >
                <Keyboard size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Keyboard shortcuts (Alt+K)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:bg-white/20" 
                onClick={toggleMinimize}
                aria-label={minimized ? "Maximize chat" : "Minimize chat"}
              >
                {minimized ? <Maximize size={14} /> : <Minimize size={14} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">{minimized ? "Maximize (Alt+M)" : "Minimize (Alt+M)"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:bg-white/20" 
                onClick={onClose}
                aria-label="Close chat"
              >
                <X size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Close (Esc)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
