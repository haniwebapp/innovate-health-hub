
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import AdminUserStats from "@/components/admin/AdminUserStats";
import UserInsightsCard from "@/components/ai/UserInsightsCard";
import AdminAIAssistant from "@/components/ai/AdminAIAssistant";
import { UserProfile } from "@/types/admin";

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      // Map profiles to UserProfile format
      const mappedUsers: UserProfile[] = profiles.map(profile => {
        // Generate an email from the profile data or use a placeholder
        const email = profile.user_type === 'admin' 
          ? `${profile.first_name || 'admin'}.${profile.last_name || 'user'}@moh.gov.sa` 
          : `${profile.first_name || 'user'}.${profile.last_name || profile.id.substring(0, 5)}@example.com`;
        
        return {
          id: profile.id,
          email: email,
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          userType: profile.user_type || "user",
          organization: profile.organization || "",
          lastSignIn: new Date(profile.updated_at).toLocaleDateString(),
          status: Math.random() > 0.2 ? "active" : "inactive" // Simulate active/inactive status
        };
      });

      console.log("Fetched users:", mappedUsers);
      setUsers(mappedUsers);
    } catch (error: any) {
      console.error("Error fetching users:", error);
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

  return (
    <AdminLayout 
      title="User Management"
      description="View and manage platform users"
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            {showAIAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
          <Button onClick={fetchUsers} disabled={isLoading}>
            {isLoading ? "Loading..." : "Refresh Users"}
          </Button>
        </div>
      }
    >
      {showAIAssistant && (
        <div className="mb-6">
          <AdminAIAssistant />
        </div>
      )}

      <div className="relative w-full max-w-sm mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-0">
            <AdminUsersTable users={filteredUsers} isLoading={isLoading} />
          </CardContent>
        </Card>
      </Tabs>
      
      <div className="mt-6">
        <AdminUserStats users={users} />
      </div>

      <UserInsightsCard users={users} />
    </AdminLayout>
  );
}
