
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Search, Shield, User, UserCheck, UserX } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";

type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType?: string;
  organization?: string;
  lastSignIn?: string;
  status: "active" | "inactive";
};

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: authUsers, error: authError } = await supabase
        .from('auth.users')
        .select(`
          id,
          email,
          last_sign_in_at,
          raw_user_meta_data
        `);

      if (authError) throw authError;

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      const mappedUsers = authUsers.map(user => {
        const profile = profiles.find(p => p.id === user.id);
        return {
          id: user.id,
          email: user.email || "Unknown",
          firstName: profile?.first_name || user.raw_user_meta_data?.firstName || "",
          lastName: profile?.last_name || user.raw_user_meta_data?.lastName || "",
          userType: profile?.user_type || user.raw_user_meta_data?.userType || "user",
          organization: profile?.organization || user.raw_user_meta_data?.organization || "",
          lastSignIn: user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "Never",
          status: user.last_sign_in_at ? "active" : "inactive"
        };
      });

      setUsers(mappedUsers);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching users",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && user.status === 'active';
    if (activeTab === 'inactive') return matchesSearch && user.status === 'inactive';
    
    return false;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Active</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>;
  };

  const isAdminUser = (email: string) => {
    return email.endsWith('@moh.gov.sa');
  };

  return (
    <AdminLayout 
      title="User Management"
      description="View and manage platform users"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={fetchUsers} disabled={isLoading}>
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <Card className="mt-4">
          <CardContent className="p-0">
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {isAdminUser(user.email) ? (
                          <Shield className="h-4 w-4 text-moh-green" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                        {user.firstName} {user.lastName}
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
          </CardContent>
        </Card>
      </Tabs>
      
      <Card className="mt-6">
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
    </AdminLayout>
  );
}
