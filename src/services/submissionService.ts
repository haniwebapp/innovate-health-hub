
import { supabase } from "@/integrations/supabase/client";
import { Submission, Challenge } from "@/types/challenges";
import { toast } from "@/hooks/use-toast";

// Mock data for submissions (to be replaced with real API calls)
const mockSubmissions: Submission[] = [
  {
    id: "1",
    title: "AI-powered Remote Patient Monitoring",
    challenge_id: "1",
    challenge_title: "Remote Patient Monitoring Solutions",
    status: "submitted",
    submitted_at: "2025-05-01T10:30:00Z",
    updated_at: "2025-05-01T10:30:00Z",
    category: "Digital Health",
    description: "Our solution leverages AI to monitor patients remotely",
    team_members: "Dr. Fahad Al-Otaibi, Sarah Ahmed"
  },
  {
    id: "2",
    title: "Blockchain Health Records",
    challenge_id: "2",
    challenge_title: "Secure Health Data Exchange",
    status: "under_review",
    submitted_at: "2025-04-28T15:45:00Z",
    updated_at: "2025-04-30T09:20:00Z",
    category: "Health Data",
  },
  {
    id: "3",
    title: "Smart Ambulance Dispatch System",
    challenge_id: "3",
    challenge_title: "Emergency Response Innovation",
    status: "draft",
    submitted_at: null,
    updated_at: "2025-05-03T14:10:00Z",
    category: "Emergency Services",
  }
];

// Get all submissions for the current user
export const getUserSubmissions = async (): Promise<Submission[]> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('submissions')
    //   .select('*')
    //   .order('updated_at', { ascending: false });
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => resolve(mockSubmissions), 500);
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    toast({
      title: "Error",
      description: "Failed to load submissions. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

// Get a specific submission by ID
export const getSubmissionById = async (id: string): Promise<Submission | null> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('submissions')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const submission = mockSubmissions.find(s => s.id === id) || null;
        resolve(submission);
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    return null;
  }
};

// Create a new submission
export const createSubmission = async (submission: Partial<Submission>): Promise<Submission | null> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('submissions')
    //   .insert([submission])
    //   .select()
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const newSubmission: Submission = {
          id: Math.random().toString(36).substring(2, 11),
          title: submission.title || "",
          challenge_id: submission.challenge_id || "",
          challenge_title: submission.challenge_title || "",
          status: "submitted",
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          category: submission.category || "",
          description: submission.description,
          team_members: submission.team_members
        };
        resolve(newSubmission);
      }, 500);
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    toast({
      title: "Error",
      description: "Failed to create submission. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Update an existing submission
export const updateSubmission = async (id: string, updates: Partial<Submission>): Promise<Submission | null> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('submissions')
    //   .update(updates)
    //   .eq('id', id)
    //   .select()
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const submissionIndex = mockSubmissions.findIndex(s => s.id === id);
        if (submissionIndex >= 0) {
          const updatedSubmission = {
            ...mockSubmissions[submissionIndex],
            ...updates,
            updated_at: new Date().toISOString()
          };
          resolve(updatedSubmission);
        } else {
          resolve(null);
        }
      }, 500);
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    toast({
      title: "Error",
      description: "Failed to update submission. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Delete a submission
export const deleteSubmission = async (id: string): Promise<boolean> => {
  try {
    // When integrated with Supabase:
    // const { error } = await supabase
    //   .from('submissions')
    //   .delete()
    //   .eq('id', id);
    
    // if (error) throw error;
    // return true;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 500);
    });
  } catch (error) {
    console.error("Error deleting submission:", error);
    toast({
      title: "Error",
      description: "Failed to delete submission. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};
