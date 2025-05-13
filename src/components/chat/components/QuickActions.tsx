
import React from "react";
import { Button } from "@/components/ui/button";

interface QuickActionItem {
  label: string;
  action: () => void;
  highlighted?: boolean;
}

interface QuickActionsProps {
  actions: QuickActionItem[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 my-3 px-1">
      {actions.map((action, idx) => (
        <Button 
          key={idx}
          variant="outline" 
          size="sm"
          onClick={action.action}
          className={`text-xs border rounded-full px-4 py-1 ${
            action.highlighted 
              ? "bg-moh-green text-white border-moh-green" 
              : "bg-white text-moh-darkGray border-moh-darkGray/30"
          }`}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
