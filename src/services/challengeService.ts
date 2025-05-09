
import { supabase } from "@/integrations/supabase/client";
import { Challenge } from "@/types/challenges";

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
  return data;
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
  return data;
};

/**
 * Create a new challenge
 * @param challenge Challenge data
 * @returns Created challenge
 */
export const createChallenge = async (challenge: Partial<Challenge>) => {
  const { data, error } = await supabase
    .from('challenges')
    .insert([{
      ...challenge,
      requirements: JSON.stringify(challenge.requirements || [])
    }])
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
  // If requirements is an array, we need to stringify it
  const updateData = { ...challenge };
  if (challenge.requirements && Array.isArray(challenge.requirements)) {
    updateData.requirements = JSON.stringify(challenge.requirements);
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
  const { data, error } = await supabase
    .from('challenge_submissions')
    .select(`
      *,
      profiles:user_id (first_name, last_name, organization)
    `)
    .eq('challenge_id', challengeId)
    .order('submitted_at', { ascending: false });
  
  if (error) throw error;
  return data;
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
