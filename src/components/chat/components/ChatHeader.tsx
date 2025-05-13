
import React from "react";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DrawerHeader } from "@/components/ui/drawer";

export function ChatHeader() {
  return (
    <DrawerHeader className="bg-moh-green text-white py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src="/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png" alt="Assistant" />
          <AvatarFallback className="bg-white/20">
            <MessageSquare className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">Chat with MOH Assistant</h3>
          <p className="text-xs text-white/70">We are online!</p>
        </div>
      </div>
    </DrawerHeader>
  );
}
