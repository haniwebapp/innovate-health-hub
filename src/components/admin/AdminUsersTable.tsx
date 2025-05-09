
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, User, UserX, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/admin";
import { useState } from "react";

interface AdminUsersTableProps {
  users: UserProfile[];
  isLoading: boolean;
}

export default function AdminUsersTable({ users, isLoading }: AdminUsersTableProps) {
  const { toast } = useToast();
  const [processingUsers, setProcessingUsers] = useState<Record<string, boolean>>({});

  const getStatusBadge = (status: "active" | "inactive") => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Active</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>;
  };

  const isAdminUser = (email: string) => {
    return email.endsWith('@moh.gov.sa');
  };

  const toggleUserStatus = async (userId: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    // Set processing state
    setProcessingUsers(prev => ({...prev, [userId]: true}));
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: `User has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
      });
    } catch (error: any) {
      console.error("Error updating user status:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    } finally {
      // Reset processing state
      setProcessingUsers(prev => ({...prev, [userId]: false}));
      
      // Refresh the page to show updated status
      window.location.reload();
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium flex items-center gap-2">
                {isAdminUser(user.email) ? (
                  <Shield className="h-4 w-4 text-moh-green" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                {user.firstName || user.lastName ? 
                  `${user.firstName || ''} ${user.lastName || ''}`.trim() : 
                  `User ${user.id.substring(0, 5)}`}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.userType || "User"}</TableCell>
              <TableCell>{user.organization || "-"}</TableCell>
              <TableCell>{user.lastSignIn}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      disabled={processingUsers[user.id]}
                    >
                      {user.status === "active" ? (
                        <>
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Deactivate User
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Activate User
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-moh-green"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <UserX className="h-10 w-10 mb-2" />
                  No users found
                </div>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
