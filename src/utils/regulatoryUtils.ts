
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
