
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import AdminUserStats from "@/components/admin/AdminUserStats";
import UserInsightsCard from "@/components/ai/UserInsightsCard";
import AdminAIAssistant from "@/components/ai/AdminAIAssistant";
import { UserProfile } from "@/types/admin";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const navigate = useNavigate();

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
        return {
          id: profile.id,
          email: profile.email || "",
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          userType: profile.user_type || "user",
          organization: profile.organization || "",
          lastSignIn: profile.last_sign_in ? new Date(profile.last_sign_in).toLocaleDateString() : "Never",
          status: profile.status as "active" | "inactive" || "active"
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

  const handleAddUser = () => {
    navigate("/admin/users/add");
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
            className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen hover:text-moh-darkGreen"
          >
            {showAIAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
          <Button 
            onClick={fetchUsers} 
            disabled={isLoading}
            variant="outline"
            className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen hover:text-moh-darkGreen"
          >
            {isLoading ? "Loading..." : "Refresh Users"}
          </Button>
          <Button 
            onClick={() => navigate("/admin/users/add")}
            className="bg-moh-green hover:bg-moh-darkGreen"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      }
    >
      {showAIAssistant && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <AdminAIAssistant />
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm mb-4"
      >
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users..." 
          className="pl-8 border-moh-green/20 focus-visible:ring-moh-green/30" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-moh-lightGreen/50 border-moh-green/10 p-1">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
          >
            All Users
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="inactive"
            className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
          >
            Inactive
          </TabsTrigger>
        </TabsList>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-moh-green/10 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <AdminUsersTable users={filteredUsers} isLoading={isLoading} />
            </CardContent>
          </Card>
        </motion.div>
      </Tabs>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <AdminUserStats users={users} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <UserInsightsCard users={users} />
      </motion.div>
    </AdminLayout>
  );
}
