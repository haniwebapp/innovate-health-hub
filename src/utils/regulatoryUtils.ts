
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

export interface RegulatoryFramework {
  id: string;
  title: string;
  description: string;
  icon: string;
  total_steps: number;
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

export async function fetchRegulatoryFrameworks(): Promise<RegulatoryFramework[]> {
  try {
    const { data, error } = await supabase
      .from('regulatory_frameworks')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching regulatory frameworks:', error);
    return [];
  }
}

export async function submitSandboxApplication(application: Partial<SandboxApplication>): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('sandbox_applications')
      .insert([{ ...application, user_id: (await supabase.auth.getSession()).data.session?.user.id }])
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
