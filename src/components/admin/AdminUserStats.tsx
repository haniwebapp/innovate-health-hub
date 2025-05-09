
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, UserCheck } from "lucide-react";
import { UserProfile } from "@/types/admin";

interface AdminUserStatsProps {
  users: UserProfile[];
}

export default function AdminUserStats({ users }: AdminUserStatsProps) {
  const isAdminUser = (email: string) => {
    return email.endsWith('@moh.gov.sa');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Statistics</CardTitle>
        <CardDescription>Overview of user registration and activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-moh-green" />
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Users</p>
              <p className="text-2xl font-bold">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <User className="h-8 w-8 text-blue-500" />
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Admin Users</p>
              <p className="text-2xl font-bold">
                {users.filter(u => isAdminUser(u.email)).length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-amber-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
