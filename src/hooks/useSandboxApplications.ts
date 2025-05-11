
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchAllSandboxApplications, 
  fetchUserSandboxApplications,
  SandboxApplication,
  updateSandboxApplicationStatus
} from '@/utils/regulatoryUtils';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export function useSandboxApplications(isAdmin: boolean = false) {
  const [applications, setApplications] = useState<SandboxApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    getUser();
  }, []);
  
  // Load applications
  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apps = isAdmin 
        ? await fetchAllSandboxApplications()
        : await fetchUserSandboxApplications();
        
      setApplications(apps);
    } catch (err) {
      console.error("Error loading sandbox applications:", err);
      setError("Failed to load applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);
  
  useEffect(() => {
    if (user || isAdmin) {
      loadApplications();
    }
  }, [user, isAdmin, loadApplications]);
  
  // Update application status
  const updateStatus = useCallback(async (applicationId: string, status: string, startDate?: string, endDate?: string) => {
    try {
      await updateSandboxApplicationStatus(applicationId, status, startDate, endDate);
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status } : app
      ));
      
      toast({
        title: "Status Updated",
        description: `Application status updated to ${status}`,
      });
      
      return true;
    } catch (err) {
      console.error("Failed to update status:", err);
      toast({
        title: "Update Failed",
        description: "Failed to update application status. Please try again.",
        variant: "destructive"
      });
      
      return false;
    }
  }, [toast]);
  
  // Filter applications
  const filterApplications = useCallback((status: string | null = null) => {
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  }, [applications]);
  
  return {
    applications,
    loading,
    error,
    user,
    updateStatus,
    filterApplications,
    refreshApplications: loadApplications
  };
}
