import { supabase } from '@/integrations/supabase/client';

export interface SandboxApplication {
  id: string;
  name: string;
  description: string;
  innovation_type: string;
  status: string;
  risk_level: string;
  organization_type: string;
  regulatory_challenges?: string;
  submitted_at: string;
  framework_id?: string;
  user_id: string;
  start_date?: string;
  end_date?: string;
  progress: number;
  testing_duration?: string;
  created_at: string;
  updated_at: string;
  innovator?: string;
  submitted_date?: string; // Added new field to match the database
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
  message: string;
  author: string;
  author_role: string;
  is_official: boolean;
  created_at: string;
}

export interface RegulatoryFramework {
  id: string;
  title: string;
  description: string;
  icon: string;
  totalSteps: number;
}

export async function fetchUserApplications(): Promise<SandboxApplication[]> {
  try {
    const { data, error } = await supabase
      .from('sandbox_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching sandbox applications:', error);
    throw new Error(error.message);
  }
}

export async function fetchAllSandboxApplications(): Promise<SandboxApplication[]> {
  try {
    const { data, error } = await supabase
      .from('sandbox_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching all sandbox applications:', error);
    throw new Error(error.message);
  }
}

export async function fetchUserSandboxApplications(): Promise<SandboxApplication[]> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user?.id) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('sandbox_applications')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching user sandbox applications:', error);
    throw new Error(error.message);
  }
}

export async function fetchApplicationById(applicationId: string): Promise<SandboxApplication | null> {
  try {
    const { data, error } = await supabase
      .from('sandbox_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error fetching sandbox application:', error);
    return null;
  }
}

export async function fetchSandboxApplicationById(applicationId: string): Promise<SandboxApplication | null> {
  return fetchApplicationById(applicationId);
}

export async function fetchApplicationCompliance(applicationId: string): Promise<SandboxComplianceRequirement[]> {
  try {
    const { data, error } = await supabase
      .from('sandbox_compliance_requirements')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching compliance requirements:', error);
    return [];
  }
}

export async function fetchSandboxComplianceRequirements(applicationId: string): Promise<SandboxComplianceRequirement[]> {
  return fetchApplicationCompliance(applicationId);
}

export async function fetchSandboxFeedback(applicationId: string): Promise<SandboxFeedback[]> {
  try {
    const { data, error } = await supabase
      .from('sandbox_feedback')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching sandbox feedback:', error);
    return [];
  }
}

export async function addSandboxFeedback(
  applicationId: string, 
  message: string, 
  author: string, 
  authorRole: string, 
  isOfficial: boolean = true
): Promise<void> {
  try {
    const { error } = await supabase
      .from('sandbox_feedback')
      .insert({
        application_id: applicationId, 
        message, 
        author,
        author_role: authorRole,
        is_official: isOfficial
      });
      
    if (error) throw error;
  } catch (error: any) {
    console.error('Error adding sandbox feedback:', error);
    throw new Error(error.message);
  }
}

export async function updateSandboxComplianceStatus(
  requirementId: string, 
  completed: boolean
): Promise<void> {
  try {
    const now = new Date().toISOString();
    const updates = { 
      completed, 
      updated_at: now, 
      ...(completed ? { completed_at: now } : {})
    };
    
    const { error } = await supabase
      .from('sandbox_compliance_requirements')
      .update(updates)
      .eq('id', requirementId);
      
    if (error) throw error;
  } catch (error: any) {
    console.error('Error updating compliance status:', error);
    throw new Error(error.message);
  }
}

export async function updateComplianceStatus(
  requirementId: string, 
  completed: boolean
): Promise<void> {
  return updateSandboxComplianceStatus(requirementId, completed);
}

export async function updateSandboxApplicationStatus(
  applicationId: string, 
  status: string,
  startDate?: string,
  endDate?: string
): Promise<void> {
  try {
    const updates: Record<string, any> = { status };
    
    if (startDate) updates.start_date = startDate;
    if (endDate) updates.end_date = endDate;
    
    const { error } = await supabase
      .from('sandbox_applications')
      .update(updates)
      .eq('id', applicationId);
      
    if (error) throw error;
  } catch (error: any) {
    console.error('Error updating application status:', error);
    throw new Error(error.message);
  }
}

export async function fetchRegulatoryFrameworks(): Promise<RegulatoryFramework[]> {
  try {
    const { data, error } = await supabase
      .from('regulatory_frameworks')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;
    
    // Map the database structure to our interface
    return data.map(framework => ({
      id: framework.id,
      title: framework.title,
      description: framework.description,
      icon: framework.icon || '',
      totalSteps: framework.total_steps || 0
    })) || [];
  } catch (error: any) {
    console.error('Error fetching regulatory frameworks:', error);
    return [];
  }
}

export async function submitSandboxApplication(application: Partial<SandboxApplication>): Promise<string> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user?.id) throw new Error('User not authenticated');

    // Ensure required fields are provided
    const requiredFields = ['name', 'description', 'innovation_type', 'organization_type'];
    for (const field of requiredFields) {
      if (!application[field as keyof Partial<SandboxApplication>]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Create a valid Supabase insert object with all required fields
    const insertData = {
      ...application,
      user_id: session.session.user.id,
      name: application.name!, // We've verified this is not null above
      description: application.description!, // We've verified this is not null above
      innovation_type: application.innovation_type!, // We've verified this is not null above
      organization_type: application.organization_type!, // We've verified this is not null above
      innovator: application.innovator || session.session.user.id, // Default to user ID if not provided
      testing_duration: application.testing_duration || '3-months' // Default testing duration
    };
    
    const { data, error } = await supabase
      .from('sandbox_applications')
      .insert(insertData)
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  } catch (error: any) {
    console.error('Error submitting sandbox application:', error);
    throw new Error(error.message);
  }
}

export async function updateApplicationProgress(applicationId: string, progress: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('sandbox_applications')
      .update({ progress })
      .eq('id', applicationId);
      
    if (error) throw error;
  } catch (error: any) {
    console.error('Error updating application progress:', error);
    throw new Error(error.message);
  }
}
