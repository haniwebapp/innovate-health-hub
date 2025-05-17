
import { supabase } from "@/integrations/supabase/client";
import { InnovationGuideInput, InnovationGuideResult } from "../policy/types";

export class InnovationGuideService {
  /**
   * Generate tailored guidance for healthcare innovations
   */
  static async generateGuide(input: InnovationGuideInput): Promise<InnovationGuideResult> {
    try {
      const { data, error } = await supabase.functions.invoke("innovation-guide", {
        body: input
      });

      if (error) throw new Error(error.message);
      
      // For demo purposes, if there's no edge function yet, return mock data
      if (!data) {
        return this.getMockGuideData(input);
      }
      
      // Save the generated guide to the database
      await this.saveGuide({
        title: `${input.innovationType} ${input.innovationStage} Guide`,
        description: `Guidance for ${input.innovationType} in ${input.innovationStage} stage`,
        content: data,
        innovation_type: input.innovationType,
        innovation_stage: input.innovationStage
      });
      
      return data as InnovationGuideResult;
    } catch (error: any) {
      console.error("Error generating innovation guide:", error);
      throw new Error(error.message || "Failed to generate innovation guide");
    }
  }

  /**
   * Save a generated innovation guide to the database
   */
  private static async saveGuide(guide: {
    title: string;
    description: string;
    content: any;
    innovation_type: string;
    innovation_stage: string;
  }) {
    try {
      // Only attempt to save if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('innovation_guides')
        .insert({
          title: guide.title,
          description: guide.description,
          content: guide.content,
          innovation_type: guide.innovation_type,
          innovation_stage: guide.innovation_stage,
          user_id: user.id
        });

      if (error) {
        console.error("Failed to save innovation guide:", error);
      }
    } catch (err) {
      console.error("Error saving innovation guide:", err);
    }
  }

  /**
   * Get a list of all innovation guides for the current user
   */
  static async listGuides() {
    try {
      // First check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("User not authenticated, returning mock data");
        return this.getMockGuidesList();
      }
      
      const { data, error } = await supabase
        .from('innovation_guides')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn("Could not fetch innovation guides, returning mock data:", error);
        return this.getMockGuidesList();
      }
      
      return data || this.getMockGuidesList();
    } catch (error: any) {
      console.error("Error listing innovation guides:", error);
      return this.getMockGuidesList();
    }
  }

  /**
   * Mock data for development and demo purposes - guides list
   */
  private static getMockGuidesList() {
    return [
      {
        id: "1",
        title: "Digital Health App Development Guide",
        description: "Comprehensive guidance for creating healthcare mobile applications",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        user_id: "current-user"
      },
      {
        id: "2",
        title: "Medical Device Regulatory Pathway",
        description: "Step-by-step guidance for medical device approval",
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        user_id: "current-user"
      },
      {
        id: "3",
        title: "Healthcare Data Platform Strategy",
        description: "Guidelines for developing secure healthcare data platforms",
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        user_id: "current-user"
      }
    ];
  }

  /**
   * Mock data for development and demo purposes
   */
  private static getMockGuideData(input: InnovationGuideInput): InnovationGuideResult {
    const guides: Record<string, InnovationGuideResult> = {
      concept: {
        stageSpecificGuidance: {
          title: "Ideation & Concept Development",
          description: "Focus on refining your idea and validating the healthcare need it addresses.",
          steps: [
            "Conduct stakeholder interviews with healthcare professionals to validate the problem",
            "Research existing solutions and identify gaps in the market",
            "Develop a value proposition canvas to clarify benefits",
            "Create preliminary sketches or mockups of your concept",
            "Identify key technical and regulatory considerations early"
          ]
        },
        recommendations: [
          "Form an advisory board with clinical expertise",
          "Consider patient journey mapping to identify pain points",
          "Document your innovation's potential impact on healthcare outcomes",
          "Start building relationships with potential pilot partners"
        ],
        resources: [
          {
            title: "Healthcare Innovation Toolkit",
            description: "Templates and frameworks for early-stage healthcare innovations",
            url: "https://health.gov.sa/resources/innovation"
          },
          {
            title: "Problem Validation Guide",
            description: "Methods for validating healthcare problems and needs"
          },
          {
            title: "Value Proposition Canvas for Healthcare",
            description: "Specialized template for healthcare innovations"
          }
        ],
        marketInsights: [
          "The digital health market is projected to grow at 15% annually through 2027",
          "Remote monitoring solutions are seeing increased adoption post-pandemic",
          "Hospital systems are prioritizing innovations that reduce readmissions",
          "Patient engagement is a key priority for healthcare organizations"
        ],
        nextSteps: [
          "Develop a simple prototype or proof of concept",
          "Begin preliminary discussions with potential users",
          "Research regulatory pathways relevant to your innovation",
          "Identify potential funding sources for early development"
        ]
      },
      prototype: {
        stageSpecificGuidance: {
          title: "Prototype Development & Testing",
          description: "Focus on building a functional prototype and gathering initial user feedback.",
          steps: [
            "Develop a minimum viable product (MVP) with core functionality",
            "Conduct usability testing with healthcare professionals",
            "Gather feedback on user experience and clinical workflow integration",
            "Refine your prototype based on initial feedback",
            "Begin documenting technical specifications for regulatory purposes"
          ]
        },
        recommendations: [
          "Keep your prototype focused on solving the core problem",
          "Consider both functional and aesthetic aspects of design",
          "Establish metrics to evaluate prototype effectiveness",
          "Begin thinking about integration with existing healthcare systems"
        ],
        resources: [
          {
            title: "Healthcare UX Design Guidelines",
            description: "Best practices for healthcare application design"
          },
          {
            title: "Clinical Workflow Integration Guide",
            description: "Methods for integrating innovations into clinical workflows"
          },
          {
            title: "Prototype Testing Protocols",
            description: "Standardized approaches to prototype evaluation in healthcare"
          }
        ],
        marketInsights: [
          "Healthcare providers prefer solutions that integrate with existing EHR systems",
          "User experience is increasingly important in healthcare technology adoption",
          "Solutions with demonstrated time-saving benefits see faster adoption",
          "Privacy and security features are critical evaluation criteria"
        ],
        nextSteps: [
          "Develop a more robust prototype based on feedback",
          "Begin preliminary clinical validation if appropriate",
          "Identify potential pilot partners for real-world testing",
          "Draft an intellectual property protection strategy"
        ]
      },
      regulatory: {
        stageSpecificGuidance: {
          title: "Regulatory Navigation & Compliance",
          description: "Focus on understanding and meeting regulatory requirements for your innovation.",
          steps: [
            "Determine your product's regulatory classification",
            "Develop a regulatory strategy and timeline",
            "Prepare required documentation and evidence",
            "Engage with regulatory consultants if needed",
            "Plan for post-market surveillance requirements"
          ]
        },
        recommendations: [
          "Start regulatory planning as early as possible",
          "Consider region-specific requirements for global markets",
          "Document all design decisions with regulatory compliance in mind",
          "Maintain detailed records of testing and validation"
        ],
        resources: [
          {
            title: "Saudi FDA Medical Device Regulations",
            description: "Official guidelines for medical device approval in Saudi Arabia",
            url: "https://sfda.gov.sa/en/regulations"
          },
          {
            title: "Regulatory Pathway Decision Tool",
            description: "Interactive tool to determine appropriate regulatory pathways"
          },
          {
            title: "Healthcare Compliance Documentation Templates",
            description: "Standardized templates for regulatory submissions"
          }
        ],
        marketInsights: [
          "Regulatory approval timelines can significantly impact go-to-market strategies",
          "Early engagement with regulatory bodies can streamline the approval process",
          "Reimbursement considerations should be evaluated alongside regulatory approval",
          "Privacy regulations like GDPR and HIPAA compliance are increasingly important"
        ],
        nextSteps: [
          "Schedule pre-submission meetings with regulatory authorities",
          "Finalize your technical documentation package",
          "Develop a quality management system",
          "Create a regulatory submission timeline and resource plan"
        ]
      },
    };

    // Default to concept stage if input stage doesn't match any predefined guides
    return guides[input.innovationStage] || guides.concept;
  }
}
