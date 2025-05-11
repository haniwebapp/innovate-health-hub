
import { supabase } from "@/integrations/supabase/client";

// Types
export interface DbFramework {
  id: string;
  title: string;
  description: string;
  icon: string;
  total_steps: number;
}

export interface DbComplianceRequirement {
  id: string;
  framework_id: string;
  title: string;
  description: string;
  status: string;
  order_index: number;
}

export interface DbApplication {
  id: string;
  name: string;
  description: string;
  innovation_type: string;
  framework_id: string;
  status: string;
  created_at: string;
  start_date: string | null;
  end_date: string | null;
  risk_level: string | null;
  user_id: string;
}

export interface SandboxApplication {
  id: string;
  name: string;
  description: string;
  innovator: string;
  innovation_type: string;
  status: string;
  risk_level: string | null;
  regulatory_challenges: string | null;
  testing_duration: string;
  organization_type: string;
  user_id: string;
  framework_id: string | null;
  start_date: string | null;
  end_date: string | null;
  progress: number;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface SandboxComplianceRequirement {
  id: string;
  application_id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SandboxFeedback {
  id: string;
  application_id: string;
  author: string;
  author_role: string;
  message: string;
  is_official: boolean;
  created_at: string;
}

// Fetch all regulatory frameworks
export const fetchRegulatoryFrameworks = async () => {
  const { data, error } = await supabase
    .from('regulatory_frameworks')
    .select('*');

  if (error) throw error;
  return data as DbFramework[];
};

// Fetch compliance requirements by framework ID
export const fetchComplianceRequirements = async (frameworkId?: string) => {
  let query = supabase
    .from('compliance_requirements')
    .select('*')
    .order('order_index', { ascending: true });
    
  if (frameworkId) {
    query = query.eq('framework_id', frameworkId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as DbComplianceRequirement[];
};

// Fetch regulatory applications by user
export const fetchUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('regulatory_applications')
    .select(`
      *,
      regulatory_frameworks (
        title, 
        description,
        icon
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Fetch application by ID with related framework data
export const fetchApplicationById = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('regulatory_applications')
    .select(`
      *,
      regulatory_frameworks (
        title, 
        description,
        icon,
        total_steps
      )
    `)
    .eq('id', applicationId)
    .single();

  if (error) throw error;
  return data;
};

// Update application compliance status
export const updateComplianceStatus = async (complianceId: string, completed: boolean) => {
  const { data, error } = await supabase
    .from('application_compliance')
    .update({
      completed,
      completed_at: completed ? new Date().toISOString() : null
    })
    .eq('id', complianceId)
    .select();

  if (error) throw error;
  return data;
};

// SANDBOX APPLICATIONS FUNCTIONS

// Submit a new sandbox application
export const submitSandboxApplication = async (application: Omit<SandboxApplication, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'submitted_at' | 'progress' | 'start_date' | 'end_date'>) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User must be authenticated to submit an application");
  }
  
  const { data, error } = await supabase
    .from('sandbox_applications')
    .insert({
      ...application,
      user_id: user.user.id,
    })
    .select();

  if (error) throw error;
  
  // Generate initial compliance requirements if application was successfully inserted
  if (data && data.length > 0) {
    await supabase.rpc('analyze_application_compliance', { 
      app_id: data[0].id,
      app_description: data[0].description,
      app_type: data[0].innovation_type
    });
  }
  
  return data;
};

// Fetch all sandbox applications (admin only)
export const fetchAllSandboxApplications = async () => {
  const { data, error } = await supabase
    .from('sandbox_applications')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data as SandboxApplication[];
};

// Fetch sandbox applications for current user
export const fetchUserSandboxApplications = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User must be authenticated");
  }
  
  const { data, error } = await supabase
    .from('sandbox_applications')
    .select('*')
    .eq('user_id', user.user.id)
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data as SandboxApplication[];
};

// Fetch a single sandbox application by ID
export const fetchSandboxApplicationById = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('sandbox_applications')
    .select('*')
    .eq('id', applicationId)
    .single();

  if (error) throw error;
  return data as SandboxApplication;
};

// Update sandbox application status (admin only)
export const updateSandboxApplicationStatus = async (applicationId: string, status: string, startDate?: string, endDate?: string) => {
  const updateData: any = { status };
  
  if (status === 'active' && startDate) {
    updateData.start_date = startDate;
    if (endDate) updateData.end_date = endDate;
  } else if (status === 'completed') {
    updateData.end_date = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('sandbox_applications')
    .update(updateData)
    .eq('id', applicationId)
    .select();

  if (error) throw error;
  return data;
};

// Update sandbox application progress
export const updateSandboxApplicationProgress = async (applicationId: string, progress: number) => {
  const { data, error } = await supabase
    .from('sandbox_applications')
    .update({ progress })
    .eq('id', applicationId)
    .select();

  if (error) throw error;
  return data;
};

// Fetch compliance requirements for a sandbox application
export const fetchSandboxComplianceRequirements = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('sandbox_compliance_requirements')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as SandboxComplianceRequirement[];
};

// Update compliance requirement status
export const updateSandboxComplianceStatus = async (requirementId: string, completed: boolean) => {
  const { data, error } = await supabase
    .from('sandbox_compliance_requirements')
    .update({ completed })
    .eq('id', requirementId)
    .select();

  if (error) throw error;
  return data;
};

// Add feedback to a sandbox application (admin only)
export const addSandboxFeedback = async (
  applicationId: string, 
  message: string,
  author: string,
  authorRole: string,
  isOfficial: boolean = true
) => {
  const { data, error } = await supabase
    .from('sandbox_feedback')
    .insert({
      application_id: applicationId,
      message,
      author,
      author_role: authorRole,
      is_official: isOfficial
    })
    .select();

  if (error) throw error;
  return data;
};

// Fetch feedback for a sandbox application
export const fetchSandboxFeedback = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('sandbox_feedback')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as SandboxFeedback[];
};

// Call the seed function for initial setup
export const seedRegulatoryData = async () => {
  try {
    const response = await fetch(
      'https://ntgrokpnwizohtfkcfec.supabase.co/functions/v1/seed-regulatory-data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
        }
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error seeding regulatory data:', error);
    throw error;
  }
};
