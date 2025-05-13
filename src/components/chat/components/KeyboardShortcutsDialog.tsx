
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TableHeader, TableBody, TableCell, TableHead, TableRow, Table } from "@/components/ui/table";

interface KeyboardShortcutsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsDialog({ isOpen, onClose }: KeyboardShortcutsDialogProps) {
  const shortcuts = [
    { key: "Esc", description: "Close chatbot" },
    { key: "Alt + M", description: "Minimize/maximize chatbot" },
    { key: "Alt + C", description: "Focus chat input" },
    { key: "Alt + K", description: "Show keyboard shortcuts" },
    { key: "Alt + 1", description: "Switch to Chat tab" },
    { key: "Alt + 2", description: "Switch to Sections tab" },
    { key: "Ctrl + Enter", description: "Send message when typing" },
    { key: "Enter", description: "Send message (when not using Shift+Enter for new line)" },
    { key: "Shift + Enter", description: "Add new line in message input" },
    { key: "Tab / Shift + Tab", description: "Navigate through actionable elements" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            These shortcuts are available when the chat window is open
          </DialogDescription>
        </DialogHeader>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shortcut</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shortcuts.map((shortcut, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono bg-muted/50 text-center">
                  {shortcut.key}
                </TableCell>
                <TableCell>{shortcut.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
