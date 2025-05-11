
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";
import { AdminStatCards } from "@/components/admin/dashboard/AdminStatCards";
import { AdminDashboardTabs } from "@/components/admin/dashboard/AdminDashboardTabs";
import { AccessDeniedSection } from "@/components/admin/dashboard/AccessDeniedSection";
import { UserProfile } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Only fetch if the user is an admin
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Map profiles to UserProfile format
      const mappedUsers: UserProfile[] = profiles.map((profile: any) => {
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

  if (!isAdmin) {
    return <AccessDeniedSection />;
  }

  return (
    <div>
      <AdminDashboardHeader />
      <AdminStatCards userCount={users.length} isLoading={isLoading} />
      <AdminDashboardTabs users={users} />
    </div>
  );
}
