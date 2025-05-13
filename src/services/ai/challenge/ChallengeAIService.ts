
import { AIService, AIServiceType } from '../AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from '../types/AIServiceTypes';

export interface ChallengeIdea {
  title: string;
  description: string;
  category: string;
  potentialImpact: string;
  targetAudience: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface ProposalScoreResult {
  totalScore: number;
  categoryScores: {
    innovation: number;
    feasibility: number;
    impact: number;
    presentation: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestedImprovements: string[];
}

export interface ReviewerMatchResult {
  matchedReviewers: {
    reviewerId: string;
    reviewerName: string;
    matchScore: number;
    expertise: string[];
  }[];
}

export class ChallengeAIService implements AIService {
  serviceType = AIServiceType.Challenge;

  constructor() {}

  static getInstance(): ChallengeAIService {
    return new ChallengeAIService();
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Challenge AI Service call recorded:', trace);
  }

  static async generateChallengeIdeas(
    keywords: string[],
    category: string,
    count: number = 3
  ): Promise<ChallengeIdea[]> {
    console.log(`Generating ${count} challenge ideas for category ${category} with keywords:`, keywords);
    
    // Mock implementation
    return Array(count).fill(null).map((_, i) => ({
      title: `AI-Generated Challenge Idea ${i + 1}`,
      description: `This is an AI-generated challenge idea based on your keywords: ${keywords.join(', ')}`,
      category: category,
      potentialImpact: "This challenge could significantly improve healthcare outcomes by leveraging new approaches.",
      targetAudience: "Healthcare professionals and innovators",
      complexity: i % 3 === 0 ? 'Low' : i % 3 === 1 ? 'Medium' : 'High'
    }));
  }

  static async detectDuplicateChallenges(
    challengeTitle: string,
    challengeDescription: string
  ): Promise<{ isDuplicate: boolean; similarChallenges: any[]; similarityScore: number }> {
    console.log(`Checking for duplicate challenges for: ${challengeTitle}`);
    
    // Mock implementation
    const mockSimilarity = Math.random();
    const isDuplicate = mockSimilarity > 0.7;
    
    return {
      isDuplicate: isDuplicate,
      similarChallenges: isDuplicate ? [
        {
          id: "challenge-123",
          title: "Very Similar Challenge",
          description: "This challenge has similar goals and approaches",
          similarityScore: mockSimilarity
        }
      ] : [],
      similarityScore: mockSimilarity
    };
  }

  static async scoreProposal(
    proposalText: string,
    challengeCriteria: string[]
  ): Promise<ProposalScoreResult> {
    console.log(`Scoring proposal against ${challengeCriteria.length} criteria`);
    
    // Mock implementation
    return {
      totalScore: 82,
      categoryScores: {
        innovation: 85,
        feasibility: 78,
        impact: 89,
        presentation: 76
      },
      strengths: [
        "Innovative approach to the problem",
        "Clear articulation of potential impact",
        "Well-structured presentation of ideas"
      ],
      weaknesses: [
        "Implementation timeline may be optimistic",
        "Cost considerations could be more detailed"
      ],
      suggestedImprovements: [
        "Provide more details on technical feasibility",
        "Strengthen the sustainability section",
        "Include more details about target beneficiaries"
      ]
    };
  }

  static async matchReviewers(
    proposalSummary: string,
    expertiseNeeded: string[]
  ): Promise<ReviewerMatchResult> {
    console.log(`Matching reviewers with expertise in: ${expertiseNeeded.join(', ')}`);
    
    // Mock implementation
    return {
      matchedReviewers: [
        {
          reviewerId: "reviewer-123",
          reviewerName: "Dr. Jane Smith",
          matchScore: 92,
          expertise: ["Digital Health", "Patient Experience"]
        },
        {
          reviewerId: "reviewer-456",
          reviewerName: "Prof. Ahmed Hassan",
          matchScore: 87,
          expertise: ["Medical Devices", "Healthcare Innovation"]
        },
        {
          reviewerId: "reviewer-789",
          reviewerName: "Dr. Maria Rodriguez",
          matchScore: 81,
          expertise: ["Clinical Research", "Public Health"]
        }
      ]
    };
  }

  static async generateSubmissionSuggestions(
    partialSubmission: string,
    challengeGuidelines: string
  ): Promise<{ suggestions: string[]; missingElements: string[] }> {
    console.log(`Generating suggestions for partial submission based on guidelines`);
    
    // Mock implementation
    return {
      suggestions: [
        "Consider adding more details about the expected outcomes and impact metrics.",
        "The budget section would benefit from more specific cost breakdowns.",
        "Your implementation timeline could be more detailed with key milestones."
      ],
      missingElements: [
        "Sustainability plan",
        "Team qualifications",
        "Risk assessment"
      ]
    };
  }
}
