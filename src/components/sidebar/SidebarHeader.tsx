
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
      "flex h-16 items-center px-3 py-4",
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
            size={isCollapsed ? 36 : 40} 
            primaryColor="#3b82f6" 
            secondaryColor="#93c5fd"
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "" : "mr-2"
            )}
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
            <span className="block text-xs text-blue-300 font-light">Innovation Platform</span>
          </motion.div>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onToggleCollapse}
        className="text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
}
