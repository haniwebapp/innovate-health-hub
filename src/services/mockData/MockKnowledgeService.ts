
import { supabase } from "@/integrations/supabase/client";

export class MockKnowledgeService {
  /**
   * Generates and inserts mock knowledge resources into the database
   */
  static async generateMockKnowledge(): Promise<number> {
    try {
      // Check if knowledge resources already exist
      const { data: existingResources } = await supabase
        .from('knowledge_resources')
        .select('id');
      
      if (existingResources && existingResources.length > 0) {
        console.log('Mock knowledge resources already exist in the database');
        return 0;
      }
      
      const mockResources = [
        {
          title: "Guide to Healthcare Innovation in Saudi Arabia",
          description: "A comprehensive guide to healthcare innovation policies, opportunities, and regulations in Saudi Arabia.",
          category: "Healthcare Policy",
          type: "guide",
          author: "Ministry of Health Innovation Committee",
          featured: true,
          tags: ["policy", "innovation", "healthcare", "regulation"],
          summary: "This guide provides an overview of the healthcare innovation landscape in Saudi Arabia, including key policies, opportunities for innovators, and regulatory considerations.",
          content: "# Healthcare Innovation in Saudi Arabia\n\nThe healthcare sector in Saudi Arabia is undergoing rapid transformation as part of Vision 2030...",
          key_points: [
            "Understanding the Saudi healthcare ecosystem",
            "Key innovation priorities and focus areas",
            "Regulatory pathway for healthcare innovations",
            "Available funding and support mechanisms"
          ],
          relevant_topics: ["digital health", "medical devices", "biotechnology", "healthcare IT"]
        },
        {
          title: "Digital Health Implementation Framework",
          description: "Framework for implementing digital health solutions in Saudi healthcare facilities.",
          category: "Digital Health",
          type: "whitepaper",
          author: "Digital Health Excellence Center",
          featured: true,
          tags: ["digital health", "implementation", "healthcare IT", "best practices"],
          summary: "This whitepaper presents a comprehensive framework for implementing digital health solutions in Saudi healthcare facilities, from planning to evaluation.",
          key_points: [
            "Assessment of digital readiness",
            "Stakeholder engagement strategies",
            "Implementation phases and milestones",
            "Monitoring and evaluation approaches"
          ],
          relevant_topics: ["healthcare transformation", "IT infrastructure", "change management", "telemedicine"]
        },
        {
          title: "Regulatory Compliance Guide for Medical Devices",
          description: "Step-by-step guide to achieving regulatory compliance for medical devices in Saudi Arabia.",
          category: "Regulatory",
          type: "guide",
          author: "Saudi FDA",
          featured: false,
          tags: ["regulation", "medical devices", "compliance", "SFDA"],
          summary: "This guide outlines the regulatory requirements and approval processes for medical devices in Saudi Arabia, with practical step-by-step instructions.",
          content: "# Medical Device Regulation in Saudi Arabia\n\nThe Saudi Food and Drug Authority (SFDA) regulates medical devices in the Kingdom...",
          key_points: [
            "Device classification system",
            "Documentation requirements",
            "Testing and validation procedures",
            "Post-market surveillance obligations"
          ],
          relevant_topics: ["medical equipment", "regulatory approval", "compliance", "quality management"]
        },
        {
          title: "Healthcare Investment Landscape Report 2025",
          description: "Analysis of investment trends, opportunities, and forecasts for healthcare sector investments.",
          category: "Investment",
          type: "report",
          author: "Health Investment Council",
          featured: true,
          tags: ["investment", "market analysis", "trends", "funding"],
          summary: "This report provides a comprehensive analysis of the healthcare investment landscape in Saudi Arabia for 2025, including trends, opportunities, and forecasts.",
          key_points: [
            "Emerging investment opportunities in healthcare",
            "Venture capital and private equity trends",
            "Government funding initiatives",
            "Return on investment analysis by sector"
          ],
          relevant_topics: ["healthcare economics", "venture capital", "private equity", "market forecasting"]
        },
        {
          title: "Clinical Validation Methods for Digital Health",
          description: "Best practices and methods for validating digital health solutions in clinical settings.",
          category: "Clinical Research",
          type: "methodology",
          author: "Health Research Center",
          featured: false,
          tags: ["clinical validation", "research methods", "evidence", "digital health"],
          summary: "This resource outlines methodologies for designing and conducting clinical validation studies for digital health innovations.",
          key_points: [
            "Study design considerations",
            "Patient recruitment strategies",
            "Data collection and analysis methods",
            "Regulatory requirements for clinical validation"
          ],
          relevant_topics: ["clinical trials", "evidence generation", "research ethics", "patient outcomes"]
        }
      ];
      
      // Insert knowledge resources
      const { data, error } = await supabase
        .from('knowledge_resources')
        .insert(mockResources)
        .select();
        
      if (error) {
        console.error("Error inserting mock knowledge resources:", error);
        throw error;
      }
      
      console.log(`Successfully inserted ${data?.length || 0} mock knowledge resources`);
      return data?.length || 0;
    } catch (error) {
      console.error("Error generating mock knowledge resources:", error);
      throw error;
    }
  }
}
