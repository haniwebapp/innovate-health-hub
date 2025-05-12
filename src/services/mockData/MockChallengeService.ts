
import { supabase } from '@/integrations/supabase/client';

interface Challenge {
  id?: string;
  title: string;
  description: string;
  long_description?: string;
  category: string;
  image_url?: string;
  organizer?: string;
  start_date: string;
  end_date: string;
  status: string;
  prize?: string;
  eligibility?: string;
  requirements?: string | null;
}

export class MockChallengeService {
  /**
   * Checks if challenges table exists by attempting to query it
   */
  public async checkIfChallengesTableExists(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('challenges')
        .select('id')
        .limit(1);
      
      return !error;
    } catch (error) {
      console.error('Error checking challenges table:', error);
      return false;
    }
  }
  
  /**
   * Creates challenges from mock data
   */
  public async createChallenges(): Promise<void> {
    try {
      const tableExists = await this.checkIfChallengesTableExists();
      
      if (!tableExists) {
        console.log('Challenges table does not exist or is not accessible.');
        return;
      }
      
      // Check if there are already challenges
      const { data: existingChallenges } = await supabase
        .from('challenges')
        .select('id')
        .limit(1);
      
      if (existingChallenges && existingChallenges.length > 0) {
        console.log('Challenges already exist, skipping creation');
        return;
      }
      
      // Create challenge data with proper date handling
      const challenges: Challenge[] = [
        {
          title: "AI-Driven Remote Patient Monitoring Solutions",
          description: "Develop innovative solutions for remote monitoring of patients using artificial intelligence.",
          long_description: "We are seeking solutions that leverage AI to improve remote monitoring of patients, particularly those with chronic conditions. Solutions should demonstrate improved patient outcomes, reduced hospital readmissions, and enhanced quality of life for patients.",
          category: "Digital Health",
          image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          organizer: "Ministry of Health",
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          prize: "SAR 500,000",
          eligibility: "Open to all healthcare technology companies and research institutions",
          requirements: JSON.stringify({
            technical: ["Scalable solution", "AI integration", "Data security"],
            clinical: ["Evidence-based", "Patient-centered"]
          })
        },
        {
          title: "Innovations in Medical Waste Management",
          description: "Create sustainable solutions for managing medical waste in healthcare facilities.",
          long_description: "Medical waste management is a critical challenge for healthcare facilities. We are looking for innovative, sustainable approaches that reduce environmental impact while ensuring safety and compliance with regulations.",
          category: "Environmental Health",
          image_url: "https://images.unsplash.com/photo-1563477710521-5def7fbd8bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          organizer: "Ministry of Health",
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          prize: "SAR 300,000",
          eligibility: "Open to environmental and healthcare technology companies",
          requirements: JSON.stringify({
            environmental: ["Reduced carbon footprint", "Compliance with regulations"],
            operational: ["Cost-effectiveness", "Ease of implementation"]
          })
        },
        {
          title: "Mental Health Digital Interventions",
          description: "Develop digital solutions to improve access to mental health support and services.",
          long_description: "Mental health is a growing concern globally. This challenge seeks digital solutions that improve access to mental health support, reduce stigma, and provide effective interventions for people with various mental health conditions.",
          category: "Mental Health",
          image_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          organizer: "Ministry of Health",
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          prize: "SAR 400,000",
          eligibility: "Open to digital health companies and mental health specialists",
          requirements: JSON.stringify({
            clinical: ["Evidence-based approaches", "User-centric design"],
            technical: ["Privacy-focused", "Accessible to all"]
          })
        }
      ];

      // Insert challenges into the database
      const { error } = await supabase
        .from('challenges')
        .insert(challenges);
      
      if (error) {
        console.error('Error creating challenges:', error);
      } else {
        console.log('Successfully created challenges');
      }
    } catch (error) {
      console.error('Error in createChallenges:', error);
    }
  }
  
  /**
   * Gets all challenges from the database
   */
  public async getAllChallenges() {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting challenges:', error);
      return [];
    }
  }
}

export const mockChallengeService = new MockChallengeService();
