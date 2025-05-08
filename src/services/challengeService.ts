
import { supabase } from "@/integrations/supabase/client";
import { Challenge } from "@/types/challenges";
import { toast } from "@/hooks/use-toast";

// Mock data for challenges
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    long_description: "This challenge seeks innovative approaches to monitor patients with chronic conditions who live in remote or underserved areas of Saudi Arabia. Solutions should consider connectivity limitations, cultural context, and integration with existing healthcare systems while ensuring data privacy and security.",
    deadline: "June 30, 2025",
    submission_deadline: "2025-06-30T23:59:59+03:00",
    category: "Digital Health",
    participants: 47,
    prize: "SAR 500,000",
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Innovation Department",
    status: "open",
    eligibility: "Healthcare professionals and innovators",
    requirements: [
      "Solution must be applicable within Saudi healthcare system",
      "Must address privacy and security concerns",
      "Must work in areas with limited connectivity"
    ],
    timeline: [
      { date: "May 15, 2025", event: "Information Session" },
      { date: "June 1, 2025", event: "Preliminary Proposal Due" },
      { date: "June 30, 2025", event: "Final Submission" }
    ]
  },
  {
    id: "2",
    title: "AI for Early Disease Detection",
    description: "Develop AI solutions that can help in early detection of diseases through accessible screening methods.",
    long_description: "Early disease detection is crucial for effective treatment and improved patient outcomes. This challenge seeks AI-powered solutions that can detect early signs of diseases through accessible screening methods that can be deployed in primary care settings across the Kingdom.",
    deadline: "July 15, 2025",
    submission_deadline: "2025-07-15T23:59:59+03:00",
    category: "Artificial Intelligence",
    participants: 63,
    prize: "SAR 750,000",
    image_url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Saudi Health Informatics Association",
    status: "open",
    eligibility: "AI researchers and healthcare technologists",
    requirements: [
      "Solution must demonstrate high accuracy",
      "Must be usable in primary healthcare settings",
      "Must provide explainable results"
    ],
    timeline: [
      { date: "May 30, 2025", event: "Workshop" },
      { date: "June 30, 2025", event: "Prototype Demo" },
      { date: "July 15, 2025", event: "Final Submission" }
    ]
  },
  {
    id: "3",
    title: "Healthcare Supply Chain Optimization",
    description: "Improve healthcare supply chain efficiency to ensure medical supplies reach all regions of the Kingdom.",
    long_description: "Efficient supply chain management is vital for ensuring that medical supplies and equipment reach healthcare facilities across all regions of Saudi Arabia in a timely manner. This challenge seeks innovative solutions to optimize the healthcare supply chain, reduce waste, and ensure equitable distribution.",
    deadline: "August 20, 2025",
    submission_deadline: "2025-08-20T23:59:59+03:00",
    category: "Operations",
    participants: 29,
    prize: "SAR 400,000",
    image_url: "https://images.unsplash.com/photo-1573883429746-375a49ffaefe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Supply Chain Division",
    status: "upcoming",
    eligibility: "Supply chain experts and logistics professionals",
    requirements: [
      "Solution must be scalable across regions",
      "Must optimize for both efficiency and equity",
      "Must integrate with existing systems"
    ],
    timeline: [
      { date: "July 1, 2025", event: "Challenge Launch" },
      { date: "July 30, 2025", event: "Concept Submission" },
      { date: "August 20, 2025", event: "Final Submission" }
    ]
  }
];

// Get all challenges with filtering options
export const getAllChallenges = async (filters?: {
  status?: string;
  category?: string;
  search?: string;
}): Promise<Challenge[]> => {
  try {
    // When integrated with Supabase, we would apply filters to the query
    // const query = supabase.from('challenges').select('*');
    
    // if (filters?.status) query.eq('status', filters.status);
    // if (filters?.category) query.eq('category', filters.category);
    // if (filters?.search) query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    
    // const { data, error } = await query.order('submission_deadline', { ascending: true });
    
    // if (error) throw error;
    // return data;
    
    // Using mock data with filtering for now:
    return new Promise(resolve => {
      setTimeout(() => {
        let filtered = [...mockChallenges];
        
        // Apply filters
        if (filters?.status && filters.status !== 'all') {
          filtered = filtered.filter(c => c.status === filters.status);
        }
        
        if (filters?.category) {
          filtered = filtered.filter(c => c.category === filters.category);
        }
        
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(
            c => c.title.toLowerCase().includes(search) || 
                 c.description.toLowerCase().includes(search) ||
                 c.category.toLowerCase().includes(search)
          );
        }
        
        resolve(filtered);
      }, 500);
    });
  } catch (error) {
    console.error("Error fetching challenges:", error);
    toast({
      title: "Error",
      description: "Failed to load challenges. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

// Get a specific challenge by ID
export const getChallengeById = async (id: string): Promise<Challenge | null> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('challenges')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const challenge = mockChallenges.find(c => c.id === id) || null;
        resolve(challenge);
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    toast({
      title: "Error",
      description: "Failed to load challenge details. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Get challenges by category
export const getChallengesByCategory = async (category: string): Promise<Challenge[]> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('challenges')
    //   .select('*')
    //   .eq('category', category)
    //   .order('submission_deadline', { ascending: true });
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredChallenges = mockChallenges.filter(c => c.category === category);
        resolve(filteredChallenges);
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching challenges by category:", error);
    return [];
  }
};

// Get challenges by status
export const getChallengesByStatus = async (status: string): Promise<Challenge[]> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('challenges')
    //   .select('*')
    //   .eq('status', status)
    //   .order('submission_deadline', { ascending: true });
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredChallenges = mockChallenges.filter(c => c.status === status);
        resolve(filteredChallenges);
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching challenges by status:", error);
    return [];
  }
};

// Search challenges
export const searchChallenges = async (query: string): Promise<Challenge[]> => {
  try {
    // When integrated with Supabase:
    // const { data, error } = await supabase
    //   .from('challenges')
    //   .select('*')
    //   .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    //   .order('submission_deadline', { ascending: true });
    
    // if (error) throw error;
    // return data;
    
    // Using mock data for now:
    return new Promise(resolve => {
      setTimeout(() => {
        const searchQuery = query.toLowerCase();
        const filteredChallenges = mockChallenges.filter(
          c => c.title.toLowerCase().includes(searchQuery) || 
               c.description.toLowerCase().includes(searchQuery) ||
               c.category.toLowerCase().includes(searchQuery)
        );
        resolve(filteredChallenges);
      }, 300);
    });
  } catch (error) {
    console.error("Error searching challenges:", error);
    return [];
  }
};

