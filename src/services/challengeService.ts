
import { supabase } from "@/integrations/supabase/client";
import { Challenge, Submission } from "@/types/challenges";

/**
 * Fetch all challenges with optional filters
 * @param status Optional status filter
 * @returns Array of challenges
 */
export const fetchChallenges = async (status?: string) => {
  let query = supabase.from('challenges').select('*');
  
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Process requirements to ensure it's an array
  return data.map(challenge => ({
    ...challenge,
    requirements: parseRequirements(challenge.requirements)
  }));
};

/**
 * Parse requirements from JSON/string to array
 */
const parseRequirements = (requirements: any): string[] => {
  if (!requirements) return [];
  
  try {
    if (typeof requirements === 'string') {
      const parsed = JSON.parse(requirements);
      return Array.isArray(parsed) ? parsed : [];
    } else if (Array.isArray(requirements)) {
      return requirements;
    }
    return [];
  } catch (e) {
    console.error("Error parsing requirements:", e);
    return [];
  }
};

/**
 * Fetch a single challenge by ID
 * @param id Challenge ID
 * @returns Challenge object
 */
export const fetchChallengeById = async (id: string) => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  // Process requirements to ensure it's an array
  return {
    ...data,
    requirements: parseRequirements(data.requirements)
  };
};

/**
 * Create a new challenge
 * @param challenge Challenge data
 * @returns Created challenge
 */
export const createChallenge = async (challenge: Partial<Challenge>) => {
  // Ensure we have the required fields for the database
  if (!challenge.title || !challenge.description || !challenge.category || !challenge.end_date) {
    throw new Error('Missing required challenge fields');
  }

  // Create a copy of the challenge object to modify
  const insertData = { ...challenge };
  
  // If requirements is an array, we need to stringify it
  if (insertData.requirements && Array.isArray(insertData.requirements)) {
    insertData.requirements = JSON.stringify(insertData.requirements);
  }

  const { data, error } = await supabase
    .from('challenges')
    .insert(insertData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

/**
 * Update an existing challenge
 * @param id Challenge ID
 * @param challenge Updated challenge data
 * @returns Updated challenge
 */
export const updateChallenge = async (id: string, challenge: Partial<Challenge>) => {
  // Create a copy of the challenge object to modify
  const updateData = { ...challenge };
  
  // If requirements is an array, we need to stringify it
  if (updateData.requirements && Array.isArray(updateData.requirements)) {
    updateData.requirements = JSON.stringify(updateData.requirements);
  }

  const { data, error } = await supabase
    .from('challenges')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

/**
 * Delete a challenge
 * @param id Challenge ID
 */
export const deleteChallenge = async (id: string) => {
  const { error } = await supabase
    .from('challenges')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

/**
 * Fetch submissions for a challenge
 * @param challengeId Challenge ID
 * @returns Array of submissions
 */
export const fetchSubmissionsForChallenge = async (challengeId: string) => {
  // Use the RPC function we created
  const { data, error } = await supabase.rpc('get_challenge_submissions', {
    input_challenge_id: challengeId
  });
  
  if (error) throw error;
  
  // Map to our Submission type
  return data.map(item => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    description: item.description,
    challenge_id: item.challenge_id,
    user_id: item.user_id,
    team_members: item.team_members,
    status: item.status,
    submitted_at: item.submitted_at,
    updated_at: item.updated_at,
    score: item.score,
    feedback: item.feedback,
    profiles: {
      first_name: item.user_first_name,
      last_name: item.user_last_name,
      organization: item.user_organization
    }
  }));
};

/**
 * Update submission status
 * @param submissionId Submission ID
 * @param status New status
 * @param feedback Optional feedback
 * @param score Optional score
 */
export const updateSubmissionStatus = async (
  submissionId: string, 
  status: string,
  feedback?: string,
  score?: number
) => {
  const { error } = await supabase
    .from('challenge_submissions')
    .update({ 
      status, 
      feedback: feedback || null,
      score: score || null
    })
    .eq('id', submissionId);
  
  if (error) throw error;
  return true;
};
