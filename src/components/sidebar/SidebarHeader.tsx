
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
    <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-2">
      <div className="flex items-center gap-2 px-2">
        {!isCollapsed ? (
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/d5f3d02d-fd0b-43f5-ba20-ca6d566850df.png" 
              alt="Ministry of Health Logo" 
              className="h-10 object-contain" 
            />
          </Link>
        ) : (
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/d5f3d02d-fd0b-43f5-ba20-ca6d566850df.png" 
              alt="Ministry of Health Logo" 
              className="h-8 object-contain" 
            />
          </Link>
        )}
      </div>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 hover:text-moh-green hover:bg-slate-100/80 rounded-full"
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
