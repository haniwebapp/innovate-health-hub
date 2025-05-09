
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, UserCheck } from "lucide-react";
import { UserProfile } from "@/types/admin";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo } from "react";

interface AdminUserStatsProps {
  users: UserProfile[];
}

export default function AdminUserStats({ users }: AdminUserStatsProps) {
  const isAdminUser = (email: string) => {
    return email.endsWith('@moh.gov.sa');
  };

  // Calculate user statistics
  const activeUsers = useMemo(() => users.filter(u => u.status === 'active').length, [users]);
  const inactiveUsers = useMemo(() => users.filter(u => u.status === 'inactive').length, [users]);
  const adminUsers = useMemo(() => users.filter(u => isAdminUser(u.email)).length, [users]);
  
  // Prepare chart data
  const userTypeData = useMemo(() => {
    const userTypes: Record<string, number> = {};
    
    users.forEach(user => {
      const type = user.userType || 'unknown';
      userTypes[type] = (userTypes[type] || 0) + 1;
    });
    
    return Object.entries(userTypes).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      count: count
    }));
  }, [users]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Admin Users</p>
                <p className="text-2xl font-bold">{adminUsers}</p>
              </div>
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Users by Type</CardTitle>
          <CardDescription>Distribution of users by category</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] mt-4">
          {userTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userTypeData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value) => [`${value} users`, 'Count']}
                  labelFormatter={(label) => `Type: ${label}`}
                />
                <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
