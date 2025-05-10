
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GeneratedLogo from "@/components/logos/GeneratedLogo";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ isCollapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className={cn(
      "flex h-16 items-center border-b border-slate-700/30 px-4 py-4",
      isCollapsed ? "justify-center" : "justify-between"
    )}>
      <div className="flex items-center gap-2 overflow-hidden">
        <motion.div 
          className="relative overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <GeneratedLogo 
            name="MOH" 
            shape="hexagon" 
            style="gradient" 
            size={isCollapsed ? 32 : 36} 
            primaryColor="#00814A"  
            secondaryColor="#C3A86B"
          />
        </motion.div>
        
        {!isCollapsed && (
          <motion.div 
            className="font-semibold text-white flex flex-col"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-lg leading-none">MOH</span>
            <span className="block text-xs text-moh-gold font-light">AI Platform</span>
          </motion.div>
        )}
      </div>
      
      {!isCollapsed && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className="text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full"
        >
          <ChevronLeft size={18} />
        </Button>
      )}
      
      {isCollapsed && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className="absolute right-0 -mr-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full w-6 h-6 mt-10"
        >
          <ChevronRight size={14} />
        </Button>
      )}
    </div>
  );
}
