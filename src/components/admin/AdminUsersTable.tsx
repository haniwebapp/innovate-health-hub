
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, User, UserX } from "lucide-react";
import { UserProfile } from "@/types/admin";

interface AdminUsersTableProps {
  users: UserProfile[];
  isLoading: boolean;
}

export default function AdminUsersTable({ users, isLoading }: AdminUsersTableProps) {
  const getStatusBadge = (status: "active" | "inactive") => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Active</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>;
  };

  const isAdminUser = (email: string) => {
    return email.endsWith('@moh.gov.sa');
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
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
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
