
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, User, UserX, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/admin";
import { useState } from "react";
import { motion } from "framer-motion";

interface AdminUsersTableProps {
  users: UserProfile[];
  isLoading: boolean;
}

export default function AdminUsersTable({ users, isLoading }: AdminUsersTableProps) {
  const { toast } = useToast();
  const [processingUsers, setProcessingUsers] = useState<Record<string, boolean>>({});

  const getStatusBadge = (status: "active" | "inactive") => {
    if (status === 'active') {
      return <Badge className="bg-moh-green text-white">Active</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground border-moh-green/20">Inactive</Badge>;
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
        className: "bg-moh-lightGreen border-moh-green/20 text-moh-darkGreen",
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
        <TableRow className="bg-moh-lightGreen/30 hover:bg-moh-lightGreen/40">
          <TableHead className="text-moh-darkGreen font-medium">Name</TableHead>
          <TableHead className="text-moh-darkGreen font-medium">Email</TableHead>
          <TableHead className="text-moh-darkGreen font-medium">Type</TableHead>
          <TableHead className="text-moh-darkGreen font-medium">Organization</TableHead>
          <TableHead className="text-moh-darkGreen font-medium">Last Activity</TableHead>
          <TableHead className="text-moh-darkGreen font-medium">Status</TableHead>
          <TableHead className="text-right text-moh-darkGreen font-medium">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b border-moh-green/10 hover:bg-moh-lightGreen/10"
            >
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
              <TableCell className="text-moh-darkGreen/80">{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-moh-lightGreen/50 text-moh-darkGreen border-moh-green/20">
                  {user.userType || "User"}
                </Badge>
              </TableCell>
              <TableCell className="text-moh-darkGreen/80">{user.organization || "-"}</TableCell>
              <TableCell className="text-moh-darkGreen/80">{user.lastSignIn}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:bg-moh-lightGreen/40">
                      <MoreHorizontal className="h-4 w-4 text-moh-darkGreen" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border border-moh-green/10">
                    <DropdownMenuItem
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      disabled={processingUsers[user.id]}
                      className={user.status === "active" 
                        ? "text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50"
                        : "text-green-600 hover:text-green-700 hover:bg-green-50 focus:bg-green-50"
                      }
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
            </motion.tr>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-moh-green"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground py-6">
                  <UserX className="h-12 w-12 mb-2 text-moh-green/50" />
                  <p className="text-moh-darkGreen/60 font-medium">No users found</p>
                  <p className="text-moh-darkGreen/40 text-sm">Try adjusting your search criteria</p>
                </div>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
