
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  organization?: string;
}

interface NewThreadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateThread: (title: string, participants: string[]) => void;
}

export default function NewThreadDialog({
  open,
  onOpenChange,
  onCreateThread
}: NewThreadDialogProps) {
  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch available users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { data: currentUser } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, organization')
          .neq('id', currentUser.user?.id || '')
          .order('first_name', { ascending: true });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setTitle("");
      setSelectedUsers([]);
      setSearchQuery("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateThread(title.trim(), selectedUsers);
    }
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const organization = (user.organization || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || organization.includes(query);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Conversation</DialogTitle>
            <DialogDescription>
              Start a new conversation with one or more participants.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Conversation Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for this conversation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Participants</Label>
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-2"
              />
              
              <div className="border rounded-md overflow-auto max-h-[200px]">
                {isLoading ? (
                  <div className="flex justify-center items-center h-[100px]">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <div className="divide-y">
                    {filteredUsers.map(user => (
                      <div 
                        key={user.id}
                        className={`p-3 flex items-center gap-2 cursor-pointer hover:bg-muted ${
                          selectedUsers.includes(user.id) ? 'bg-muted' : ''
                        }`}
                        onClick={() => toggleUser(user.id)}
                      >
                        <input
                          type="checkbox" 
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUser(user.id)}
                          className="h-4 w-4"
                        />
                        <div>
                          <p className="font-medium">
                            {user.first_name} {user.last_name}
                          </p>
                          {user.organization && (
                            <p className="text-xs text-muted-foreground">
                              {user.organization}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-3 text-sm text-muted-foreground text-center">
                    No users found
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!title.trim() || selectedUsers.length === 0}
            >
              Create Conversation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
