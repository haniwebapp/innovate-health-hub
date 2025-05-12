
import { supabase } from "@/integrations/supabase/client";

export class MockChallengeService {
  /**
   * Generates and inserts mock challenges into the database
   */
  static async generateMockChallenges(): Promise<number> {
    try {
      // Check if challenges already exist
      const { data: existingChallenges } = await supabase
        .from('challenges')
        .select('id');
      
      if (existingChallenges && existingChallenges.length > 0) {
        console.log('Mock challenges already exist in the database');
        return 0;
      }
      
      const mockChallenges = [
        {
          title: "Digital Health Solutions for Remote Communities",
          description: "Develop innovative digital health solutions that can reach remote and underserved communities in Saudi Arabia.",
          long_description: "This challenge aims to identify and develop digital health solutions that can effectively address healthcare access barriers in remote and underserved communities across Saudi Arabia. We're looking for innovative approaches that leverage technology to provide quality healthcare services to regions with limited physical healthcare infrastructure.",
          category: "Digital Health",
          image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
          organizer: "Ministry of Health",
          start_date: new Date(2025, 3, 1), // April 1, 2025
          end_date: new Date(2025, 6, 30), // July 30, 2025
          status: "active",
          prize: "500,000 SAR and implementation support",
          eligibility: "Open to Saudi-based startups, universities, and research institutions",
          requirements: JSON.stringify({
            criteria: [
              "Technical feasibility",
              "Potential impact",
              "Sustainability",
              "Scalability"
            ],
            deliverables: [
              "Detailed solution proposal",
              "Prototype or proof of concept",
              "Implementation plan",
              "Budget estimation"
            ]
          })
        },
        {
          title: "AI for Early Disease Detection",
          description: "Leverage artificial intelligence to develop tools for early detection of chronic diseases prevalent in Saudi Arabia.",
          long_description: "This challenge focuses on harnessing the power of artificial intelligence to develop innovative tools for early detection of chronic diseases prevalent in Saudi Arabia, such as diabetes, cardiovascular diseases, and cancer. We're seeking solutions that can analyze medical data, identify risk patterns, and provide early warnings to healthcare providers.",
          category: "AI & Healthcare",
          image_url: "https://images.unsplash.com/photo-1576091160110-aa486e7f895e?q=80&w=800&auto=format&fit=crop",
          organizer: "Ministry of Health",
          start_date: new Date(2025, 2, 15), // March 15, 2025
          end_date: new Date(2025, 5, 15), // June 15, 2025
          status: "active",
          prize: "750,000 SAR and clinical validation support",
          eligibility: "Open globally with preference for Saudi-based teams",
          requirements: JSON.stringify({
            criteria: [
              "Algorithm accuracy",
              "Data privacy compliance",
              "Integration with existing healthcare systems",
              "User experience for healthcare providers"
            ],
            deliverables: [
              "Machine learning model",
              "Technical documentation",
              "Privacy impact assessment",
              "Validation study design"
            ]
          })
        },
        {
          title: "Mental Health Tech Innovation",
          description: "Create technology-based solutions to improve mental health support and accessibility in Saudi communities.",
          long_description: "This challenge aims to identify innovative technology-based solutions that can enhance mental health support and accessibility in Saudi communities. We're looking for approaches that can break down barriers to mental healthcare, reduce stigma, and provide effective support tools for both patients and healthcare providers.",
          category: "Mental Health",
          image_url: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=800&auto=format&fit=crop",
          organizer: "Ministry of Health",
          start_date: new Date(2025, 4, 10), // May 10, 2025
          end_date: new Date(2025, 7, 10), // August 10, 2025
          status: "upcoming",
          prize: "350,000 SAR and pilot implementation",
          eligibility: "Open to Saudi citizens, residents, and entities",
          requirements: JSON.stringify({
            criteria: [
              "Cultural sensitivity",
              "Evidence-based approach",
              "User engagement",
              "Privacy and confidentiality"
            ],
            deliverables: [
              "Solution prototype",
              "Research validation plan",
              "Implementation roadmap",
              "Evaluation metrics"
            ]
          })
        },
        {
          title: "Healthcare IoT Solutions",
          description: "Develop IoT solutions for healthcare settings to improve patient monitoring and hospital efficiency.",
          long_description: "This challenge focuses on developing innovative Internet of Things (IoT) solutions for healthcare settings that can significantly improve patient monitoring capabilities and overall hospital efficiency. We're seeking technologies that can transform healthcare delivery through smart, connected devices while ensuring data security and patient privacy.",
          category: "IoT & Healthcare",
          image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
          organizer: "Ministry of Health",
          start_date: new Date(2025, 1, 1), // February 1, 2025
          end_date: new Date(2025, 4, 1), // May 1, 2025
          status: "active",
          prize: "600,000 SAR and hospital implementation partnership",
          eligibility: "Open to all innovators, startups, and established companies",
          requirements: JSON.stringify({
            criteria: [
              "Device reliability",
              "Data security",
              "Scalability",
              "Healthcare workflow integration"
            ],
            deliverables: [
              "Working prototype",
              "Technical specifications",
              "Security assessment",
              "User testing results"
            ]
          })
        },
        {
          title: "Preventive Healthcare Gamification",
          description: "Create engaging gamified solutions to encourage preventive healthcare practices among Saudi citizens.",
          long_description: "This challenge aims to harness the power of gamification to create engaging solutions that encourage preventive healthcare practices among Saudi citizens. We're looking for innovative approaches that can motivate positive health behaviors, increase health literacy, and make preventive healthcare an enjoyable part of daily life.",
          category: "Digital Health",
          image_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
          organizer: "Ministry of Health",
          start_date: new Date(2024, 11, 15), // December 15, 2024
          end_date: new Date(2025, 2, 28), // February 28, 2025
          status: "draft",
          prize: "400,000 SAR and national rollout support",
          eligibility: "Open to game developers, health tech startups, and university teams",
          requirements: JSON.stringify({
            criteria: [
              "Engagement mechanics",
              "Health education accuracy",
              "User retention",
              "Behavior change potential"
            ],
            deliverables: [
              "Functional game or application",
              "User testing results",
              "Content validation from health experts",
              "Deployment plan"
            ]
          })
        }
      ];
      
      // Insert all mock challenges
      const { data, error } = await supabase
        .from('challenges')
        .insert(mockChallenges)
        .select();
        
      if (error) {
        console.error("Error inserting mock challenges:", error);
        throw error;
      }
      
      console.log(`Successfully inserted ${data?.length || 0} mock challenges`);
      return data?.length || 0;
    } catch (error) {
      console.error("Error generating mock challenges:", error);
      throw error;
    }
  }
}
