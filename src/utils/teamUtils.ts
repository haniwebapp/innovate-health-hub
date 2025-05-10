
import { supabase } from "@/integrations/supabase/client";

export interface Team {
  id: string;
  name: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export async function fetchUserTeams() {
  const userId = supabase.auth.getUser().data?.user?.id;
  
  if (!userId) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      team_members!inner (user_id)
    `)
    .eq('team_members.user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Team[];
}

export async function fetchTeamMembers(teamId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      *,
      profiles:user_id (
        first_name,
        last_name,
        avatar_url,
        organization
      )
    `)
    .eq('team_id', teamId);

  if (error) throw error;
  return data;
}

export async function createTeam(name: string, description?: string) {
  const userId = supabase.auth.getUser().data?.user?.id;
  
  if (!userId) throw new Error("User not authenticated");
  
  // Create team
  const { data: teamData, error: teamError } = await supabase
    .from('teams')
    .insert({
      name,
      description: description || null,
      created_by: userId
    })
    .select()
    .single();

  if (teamError) throw teamError;
  
  // Add creator as team member with admin role
  const { error: memberError } = await supabase
    .from('team_members')
    .insert({
      team_id: teamData.id,
      user_id: userId,
      role: 'admin'
    });

  if (memberError) throw memberError;
  
  return teamData as Team;
}

export async function inviteToTeam(teamId: string, userId: string, role: string = 'member') {
  const { error } = await supabase
    .from('team_members')
    .insert({
      team_id: teamId,
      user_id: userId,
      role
    });

  if (error) throw error;
  return true;
}
