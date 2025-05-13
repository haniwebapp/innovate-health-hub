
import { AIService } from "@/services/ai/AIService";

export interface ChallengeIdea {
  title: string;
  description: string;
  potentialImpact: string;
  targetAudience: string;
  estimatedDifficulty: string;
  relevantTags: string[];
  vision2030Alignment: string;
}

export interface ReviewerMatchResult {
  reviewerId: string;
  matchScore: number;
  matchReason: string;
  expertise: string[];
}

export interface ProposalScoreResult {
  overallScore: number;
  criteria: Record<string, number>;
  strengths: string[];
  improvements: string[];
  vision2030Alignment: number;
}

export interface DuplicateDetectionResult {
  isDuplicate: boolean;
  similarityScore: number;
  similarChallenges: SimilarChallenge[];
  analysis?: string;
}

export interface SimilarChallenge {
  id: string;
  title: string;
  similarity: number;
  overlappingConcepts?: string[];
}

export class ChallengeAIService {
  static async generateChallengeIdeas(sector: string, focus?: string): Promise<ChallengeIdea[]> {
    try {
      console.log(`Generating challenge ideas for ${sector} sector with focus on ${focus || 'general'}`);
      
      const response = await fetch('/supabase/functions/v1/challenge-ideas-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, focus })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate ideas: ${errorText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error in generateChallengeIdeas:', error);
      throw error;
    }
  }

  static async matchReviewers(
    challengeDescription: string,
    requiredExpertise: string[]
  ): Promise<ReviewerMatchResult[]> {
    try {
      console.log(`Finding reviewers for challenge with expertise: ${requiredExpertise.join(', ')}`);
      
      const response = await fetch('/supabase/functions/v1/reviewer-matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeDescription, requiredExpertise })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to match reviewers: ${errorText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error in matchReviewers:', error);
      throw error;
    }
  }
  
  static async generateSubmissionSuggestions(
    submissionText: string,
    challengeContext?: string
  ): Promise<string[]> {
    try {
      console.log('Generating submission enhancement suggestions');
      
      // Mock implementation for now
      return [
        "Consider adding quantitative metrics to demonstrate the impact of your solution.",
        "Elaborate on how your innovation aligns with Saudi Vision 2030 healthcare objectives.",
        "Include more details about implementation feasibility and resource requirements.",
        "Strengthen the user experience section with concrete examples or user stories."
      ];
    } catch (error) {
      console.error('Error generating submission suggestions:', error);
      throw error;
    }
  }
  
  static async scoreProposal(
    proposalText: string,
    criteria: string[]
  ): Promise<ProposalScoreResult> {
    try {
      console.log(`Scoring proposal against criteria: ${criteria.join(', ')}`);
      
      const response = await fetch('/supabase/functions/v1/proposal-scoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalText, criteria })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to score proposal: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in scoreProposal:', error);
      throw error;
    }
  }

  static async detectDuplicateChallenges(
    title: string,
    description: string
  ): Promise<DuplicateDetectionResult> {
    try {
      console.log(`Checking for duplicate challenges with title: ${title}`);
      
      const response = await fetch('/supabase/functions/v1/duplicate-challenge-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          newChallengeTitle: title,
          newChallengeDescription: description 
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to detect duplicates: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in detectDuplicateChallenges:', error);
      return {
        isDuplicate: false,
        similarityScore: 0,
        similarChallenges: [],
        analysis: `Error analyzing challenge: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}
