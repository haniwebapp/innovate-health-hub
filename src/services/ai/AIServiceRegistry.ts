
// Import the AIService base class
import { AIService } from "./AIService";

// Import all service implementations
import { InvestmentAIService } from "./InvestmentAIService";
import { RegulatoryAIService } from "./RegulatoryAIService";
import { InnovationAIService } from "./InnovationAIService";
import { KnowledgeAIService } from "./KnowledgeAIService";
import { PolicyAIService } from "./PolicyAIService";

// Register all services with the AIService class
AIService.investment = InvestmentAIService;
AIService.regulatory = RegulatoryAIService;
AIService.innovation = InnovationAIService;
AIService.knowledge = KnowledgeAIService;
AIService.policy = PolicyAIService;

// Export registered services to ensure the registration code runs
export const registeredServices = {
  investment: InvestmentAIService,
  regulatory: RegulatoryAIService,
  innovation: InnovationAIService,
  knowledge: KnowledgeAIService,
  policy: PolicyAIService
};
