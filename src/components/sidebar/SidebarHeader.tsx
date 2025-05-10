
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ isCollapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-sm px-2">
      <div className="flex items-center gap-2 px-2">
        {!isCollapsed ? (
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-br from-moh-green to-moh-darkGreen p-1 flex items-center justify-center h-8 w-8">
              <span className="text-white text-xs font-bold">MOH</span>
            </div>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <span className="text-white font-bold leading-tight">MOH</span>
              <span className="text-moh-gold text-xs leading-tight">AI Platform</span>
            </motion.div>
          </Link>
        ) : (
          <Link to="/" className="flex items-center justify-center">
            <div className="rounded-full bg-gradient-to-br from-moh-green to-moh-darkGreen p-1 flex items-center justify-center h-8 w-8">
              <span className="text-white text-xs font-bold">MOH</span>
            </div>
          </Link>
        )}
      </div>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-slate-800/80 rounded-full"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
