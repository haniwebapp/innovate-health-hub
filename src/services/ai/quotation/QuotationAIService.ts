
import { AIService } from "../AIService";
import { AIServiceType } from "../AIServiceRegistry";
import { AIServiceStaticReferences, CallTrace } from "../types/AIServiceTypes";

export interface QuotationQuery {
  query: string;
  userId?: string | null;
  context?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface QuotationData {
  price?: number;
  timeframe?: string;
  services?: string[];
  requirements?: string[];
}

export interface QuotationResponse {
  answer: string;
  quotationData?: QuotationData;
  relatedResources?: Resource[];
  followUpQuestions?: string[];
}

export class QuotationAIService extends AIService {
  serviceType = AIServiceType.Quotation;
  private static instance: QuotationAIService;

  constructor() {
    super();
  }

  public static getInstance(): QuotationAIService {
    if (!QuotationAIService.instance) {
      QuotationAIService.instance = new QuotationAIService();
    }
    return QuotationAIService.instance;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  getStaticReferences(): AIServiceStaticReferences {
    return {};
  }

  async recordCall(trace: CallTrace): Promise<void> {
    console.log('Quotation AI Service call recorded:', trace);
  }

  public async handleQuotationQuery(query: QuotationQuery): Promise<QuotationResponse> {
    try {
      console.log("Processing quotation query:", query);
      
      // Mock response for development
      return {
        answer: `Thank you for your query about ${query.context || 'our services'}. I'd be happy to provide information on that.`,
        quotationData: {
          price: 5000,
          timeframe: "3-4 weeks",
          services: ["Consultation", "Implementation", "Support"],
          requirements: ["Technical Documentation", "Initial Assessment"]
        },
        relatedResources: [
          {
            title: "Pricing Guidelines",
            url: "/resources/pricing",
            type: "Document"
          },
          {
            title: "Service Catalog",
            url: "/resources/services",
            type: "Catalog"
          }
        ],
        followUpQuestions: [
          "Would you like a detailed breakdown of costs?",
          "Do you need information about customization options?",
          "Would you like to schedule a consultation?"
        ]
      };
    } catch (error) {
      console.error("Error in handleQuotationQuery:", error);
      throw error;
    }
  }
}
