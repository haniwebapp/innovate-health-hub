
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createThread } from "@/utils/messageUtils";
import { useToast } from "@/hooks/use-toast";

interface NewThreadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateThread: (title: string, participants: string[]) => void;
}

export default function NewThreadDialog({ open, onOpenChange, onCreateThread }: NewThreadDialogProps) {
  const [title, setTitle] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please enter a conversation title."
      });
      return;
    }
    
    if (!participantId.trim()) {
      toast({
        variant: "destructive",
        title: "Recipient required",
        description: "Please enter at least one recipient ID."
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Split participant IDs by commas and trim whitespace
      const participantIds = participantId
        .split(",")
        .map(id => id.trim())
        .filter(id => id);
      
      // Create a new thread
      const thread = await createThread(title, participantIds);
      
      // Call the onCreateThread callback with the thread data
      onCreateThread(title, participantIds);
      
      // Reset form
      setTitle("");
      setParticipantId("");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Failed to create thread:", error);
      toast({
        variant: "destructive",
        title: "Failed to create conversation",
        description: "Please try again later."
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Conversation Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this conversation"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants">Participant IDs</Label>
              <Input
                id="participants"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
                placeholder="Enter user IDs separated by commas"
                disabled={isSubmitting}
              />
              <p className="text-sm text-muted-foreground">
                Enter the IDs of users you want to add to this conversation, separated by commas.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
