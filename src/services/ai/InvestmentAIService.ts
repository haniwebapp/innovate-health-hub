
import { AIService, AIServiceType } from './AIServiceRegistry';
import { AIServiceStaticReferences, CallTrace } from './types/AIServiceTypes';

export interface InnovationData {
  name: string;
  description: string;
  stage: string;
  sector: string;
  fundingNeeded?: number;
  teamSize?: number;
  traction?: string;
  patentStatus?: string;
  regulatoryStatus?: string;
}

export interface InvestorCriteria {
  investmentFocus: string[];
  investmentStage: string[];
  geographicFocus?: string[];
  investmentSizeMin?: number;
  investmentSizeMax?: number;
}

export interface MatchResult {
  matchScore: number;
  mainReasons: string[];
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendedApproach: string;
  keyMetrics: string[];
  alignmentAreas: string[]; // Added missing property
  error?: string; // Added error property
}

export interface MarketTrendParams {
  sector: string;
  timeframe: string;
  region: string;
}

export interface MarketAnalysis {
  summary: string;
  growthRate: number;
  marketSize: string;
  keyTrends: string[];
  emergingOpportunities: string[];
  vision2030Alignment: string;
  investmentRecommendations: string[];
}

export interface PitchDeckTemplate {
  id: string;
  name: string;
  description: string;
  suitableFor: string[];
  slides: {
    title: string;
    description: string;
    tips: string[];
  }[];
}

export interface PitchDeckContent {
  slides: {
    title: string;
    content: string;
    tips: string[];
  }[];
}

export interface Vision2030AlignmentAnalysis {
  alignmentScore: number;
  alignmentAreas: string[];
  vision2030Objectives: string[];
  improvementAreas: string[];
  potentialImpact: string;
  recommendations: string[];
}

export class InvestmentAIService implements AIService {
  serviceType = AIServiceType.Investment;
  
  constructor() {}

  static getInstance(): InvestmentAIService {
    return new InvestmentAIService();
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Investment AI Service call recorded:', trace);
  }

  static async generateMatchAnalysis(
    innovationData: InnovationData,
    investorCriteria?: InvestorCriteria
  ): Promise<MatchResult> {
    console.log('Generating match analysis for:', innovationData.name);
    
    // Mock implementation
    return {
      matchScore: 87,
      mainReasons: [
        "Strong alignment with investor focus on healthcare tech",
        "Match with early-stage investment criteria",
        "Region alignment with Saudi Arabia focus"
      ],
      swotAnalysis: {
        strengths: ["Innovative solution", "Strong team background", "Clear market need"],
        weaknesses: ["Early revenue traction", "Regulatory approvals pending"],
        opportunities: ["Growing market demand", "Few competitors in the region", "Vision 2030 alignment"],
        threats: ["Regulatory changes", "Large tech companies entering market"]
      },
      recommendedApproach: "Emphasize traction and Vision 2030 alignment in pitch",
      keyMetrics: ["User growth rate", "Clinical validation results", "Regulatory approval timeline"],
      alignmentAreas: ["Healthcare sector transformation", "Digital economy", "Quality of life"]
    };
  }

  static async generateMarketAnalysis(params: MarketTrendParams): Promise<MarketAnalysis> {
    console.log('Generating market analysis for sector:', params.sector);
    
    // Mock implementation
    return {
      summary: `The ${params.sector} sector in ${params.region} is showing strong growth potential over the ${params.timeframe}`,
      growthRate: 15.7,
      marketSize: "$4.2B by 2025",
      keyTrends: [
        "Increasing adoption of AI-powered diagnostics",
        "Remote patient monitoring expansion",
        "Interoperability between healthcare systems",
        "Focus on preventative care technologies"
      ],
      emergingOpportunities: [
        "Personalized medicine solutions",
        "Mental health tech platforms",
        "Health data analytics tools",
        "Telehealth in underserved regions"
      ],
      vision2030Alignment: "Strong alignment with Vision 2030's healthcare transformation goals, particularly in digitizing healthcare services and improving accessibility.",
      investmentRecommendations: [
        "Focus on solutions integrating with existing healthcare infrastructure",
        "Prioritize technologies with clear ROI for healthcare providers",
        "Consider partnerships with established healthcare institutions",
        "Develop solutions addressing local healthcare challenges"
      ]
    };
  }

  static async getPitchDeckTemplates(): Promise<PitchDeckTemplate[]> {
    console.log(`Getting pitch deck templates`);
    
    // Mock implementation
    return [
      {
        id: "template1",
        name: "Healthcare Innovation Pitch",
        description: "Optimized for early-stage healthcare innovations seeking first round funding",
        suitableFor: ["Healthcare", "MedTech", "Digital Health"],
        slides: [
          {
            title: "Problem Statement",
            description: "Define the healthcare problem you're solving",
            tips: ["Use statistics to quantify the problem", "Share a compelling patient story"]
          },
          {
            title: "Solution Overview",
            description: "Present your innovation clearly",
            tips: ["Use simple visuals", "Avoid technical jargon"]
          }
        ]
      },
      {
        id: "template2",
        name: "MedTech Growth Deck",
        description: "For established medical technology companies seeking growth capital",
        suitableFor: ["MedTech", "Medical Devices", "Diagnostics"],
        slides: [
          {
            title: "Traction & Validation",
            description: "Show evidence of market adoption",
            tips: ["Include key metrics", "Highlight clinical validation"]
          },
          {
            title: "Regulatory Strategy",
            description: "Outline your path to compliance",
            tips: ["Show timeline", "Highlight regulatory expertise"]
          }
        ]
      }
    ];
  }

  static async generatePitchDeckContent(innovationData: InnovationData, templateId: string): Promise<Record<string, string>> {
    console.log(`Generating pitch deck content for ${innovationData.name} using template ${templateId}`);
    
    // Mock implementation - returning a simple Record<string, string> instead of the complex PitchDeckContent
    return {
      "Problem Statement": `The healthcare system faces significant challenges in ${innovationData.sector}, with patients experiencing...`,
      "Solution Overview": `${innovationData.name} addresses these challenges by providing a ${innovationData.description}`,
      "Market Opportunity": `The market for ${innovationData.sector} solutions is projected to reach $X billion by 2025, with a CAGR of Y%...`,
      "Business Model": "Our business model focuses on B2B partnerships with healthcare providers...",
      "Go-to-Market Strategy": "We will initially target major hospitals in Saudi Arabia..."
    };
  }

  static async analyzeVision2030Alignment(innovationData: InnovationData): Promise<Vision2030AlignmentAnalysis> {
    console.log(`Analyzing Vision 2030 alignment for ${innovationData.name}`);
    
    // Mock implementation
    return {
      alignmentScore: 85,
      alignmentAreas: [
        "Healthcare sector transformation",
        "Digital economy development",
        "Quality of life improvement",
        "Economic diversification"
      ],
      vision2030Objectives: [
        "Increase private sector participation in healthcare",
        "Improve access to healthcare services",
        "Develop digital infrastructure",
        "Create high-value jobs"
      ],
      improvementAreas: [
        "Localization of technology development",
        "Alignment with national healthcare standards"
      ],
      potentialImpact: "The innovation could significantly contribute to Vision 2030's healthcare transformation goals by improving patient outcomes and reducing healthcare costs.",
      recommendations: [
        "Highlight Vision 2030 alignment in investor presentations",
        "Partner with local healthcare institutions",
        "Explore Ministry of Health innovation programs",
        "Consider Saudi FDA requirements early in development"
      ]
    };
  }
}
