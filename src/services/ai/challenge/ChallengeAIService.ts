
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface ChallengeIdea {
  title: string;
  description: string;
  potentialImpact: string;
  targetAudience: string;
  estimatedDifficulty: string;
  relevantTags: string[];
  vision2030Alignment: string;
}

export interface ProposalScoreResult {
  overallScore: number;
  criteria: {
    innovation: number;
    feasibility: number;
    impact: number;
    scalability: number;
    sustainability: number;
  };
  strengths: string[];
  improvements: string[];
  vision2030Alignment: number;
}

export interface ReviewerMatchResult {
  reviewerId: string;
  matchScore: number;
  matchReason: string;
  expertise: string[];
}

/**
 * Service for handling challenge-related AI operations
 */
export class ChallengeAIService {
  /**
   * Generate AI-powered challenge ideas based on sector and focus
   */
  static async generateChallengeIdeas(sector: string, focus?: string): Promise<ChallengeIdea[]> {
    try {
      const { data, error } = await supabase.functions.invoke("challenge-ideas-generator", {
        body: { 
          sector,
          focus
        }
      });

      if (error) throw error;
      return data as ChallengeIdea[];
    } catch (error: any) {
      console.error("Error generating challenge ideas:", error);
      throw AIService.handleError(error, "generateChallengeIdeas", "challenge");
    }
  }

  /**
   * Score a proposal based on multiple criteria
   */
  static async scoreProposal(
    proposalText: string, 
    criteria?: string[]
  ): Promise<ProposalScoreResult> {
    try {
      const { data, error } = await supabase.functions.invoke("proposal-scoring", {
        body: { 
          proposalText,
          criteria
        }
      });

      if (error) throw error;
      return data as ProposalScoreResult;
    } catch (error: any) {
      console.error("Error scoring proposal:", error);
      throw AIService.handleError(error, "scoreProposal", "challenge");
    }
  }

  /**
   * Match reviewers to a specific challenge based on expertise and availability
   */
  static async matchReviewers(
    challengeDescription: string,
    requiredExpertise: string[]
  ): Promise<ReviewerMatchResult[]> {
    try {
      const { data, error } = await supabase.functions.invoke("reviewer-matching", {
        body: { 
          challengeDescription,
          requiredExpertise
        }
      });

      if (error) throw error;
      return data as ReviewerMatchResult[];
    } catch (error: any) {
      console.error("Error matching reviewers:", error);
      throw AIService.handleError(error, "matchReviewers", "challenge");
    }
  }

  /**
   * Detect duplicate or similar challenges
   */
  static async detectDuplicateChallenges(
    newChallengeTitle: string,
    newChallengeDescription: string
  ): Promise<{
    isDuplicate: boolean;
    similarityScore: number;
    similarChallenges: { id: string; title: string; similarity: number }[];
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("duplicate-challenge-detection", {
        body: { 
          newChallengeTitle,
          newChallengeDescription
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error detecting duplicate challenges:", error);
      throw AIService.handleError(error, "detectDuplicateChallenges", "challenge");
    }
  }

  /**
   * Generate enhancement suggestions for challenge submissions
   */
  static async generateSubmissionSuggestions(
    submissionText: string,
    challengeContext: string
  ): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke("submission-enhancement", {
        body: { 
          submissionText,
          challengeContext
        }
      });

      if (error) throw error;
      return data.suggestions;
    } catch (error: any) {
      console.error("Error generating submission suggestions:", error);
      throw AIService.handleError(error, "generateSubmissionSuggestions", "challenge");
    }
  }
}
