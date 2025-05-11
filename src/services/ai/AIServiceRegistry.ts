
import { AIService, AIServiceType } from "./AIService";
import { InnovationAIService } from "./InnovationAIService";
import { RegulatoryAIService } from "./RegulatoryAIService"; 
import { InvestmentAIService } from "./InvestmentAIService";
import { KnowledgeAIService } from "./KnowledgeAIService"; 
import { PolicyAIService } from "./PolicyAIService";
import { AdminAIService } from "./admin/AdminAIService";
import { ChallengeAIService } from "./challenge/ChallengeAIService";
import { CommunityAIService } from "./community/CommunityAIService";
import { ComplianceAIService } from "./compliance/ComplianceAIService";
import { EventsAIService } from "./events/EventsAIService";
import { SupportAIService } from "./support/SupportAIService";
import { ClinicalAIService } from "./clinical/ClinicalAIService";

// Register all AI services with the central registry
AIService.innovation = InnovationAIService;
AIService.regulatory = RegulatoryAIService;
AIService.investment = InvestmentAIService;
AIService.knowledge = KnowledgeAIService;
AIService.policy = PolicyAIService;
AIService.admin = AdminAIService;
AIService.challenge = ChallengeAIService;
AIService.community = CommunityAIService;
AIService.compliance = ComplianceAIService;
AIService.events = EventsAIService;
AIService.support = SupportAIService;
AIService.clinical = ClinicalAIService;

// Export a function to get a specific service by type
export function getAIService(type: AIServiceType) {
  return AIService[type];
}

// Export all services
export {
  AIService,
  InnovationAIService,
  RegulatoryAIService,
  InvestmentAIService,
  KnowledgeAIService,
  PolicyAIService,
  AdminAIService,
  ChallengeAIService,
  CommunityAIService,
  ComplianceAIService,
  EventsAIService,
  SupportAIService,
  ClinicalAIService
};
