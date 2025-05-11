
// Import the AIService base class
import { AIService } from "./AIService";

// Import all service implementations
import { InvestmentAIService } from "./InvestmentAIService";
import { RegulatoryAIService } from "./RegulatoryAIService";
import { InnovationAIService } from "./InnovationAIService";
import { KnowledgeAIService } from "./KnowledgeAIService";
import { PolicyAIService } from "./PolicyAIService";
import { ChallengeAIService } from "./challenge/ChallengeAIService";
import { SupportAIService } from "./support/SupportAIService";
import { ClinicalAIService } from "./clinical/ClinicalAIService";
import { EventsAIService } from "./events/EventsAIService";
import { AdminAIService } from "./admin/AdminAIService";
import { ComplianceAIService } from "./compliance/ComplianceAIService";
import { CommunityAIService } from "./community/CommunityAIService";

// Register all services with the AIService class
AIService.investment = InvestmentAIService;
AIService.regulatory = RegulatoryAIService;
AIService.innovation = InnovationAIService;
AIService.knowledge = KnowledgeAIService;
AIService.policy = PolicyAIService;
AIService.challenge = ChallengeAIService;
AIService.support = SupportAIService;
AIService.clinical = ClinicalAIService;
AIService.events = EventsAIService;
AIService.admin = AdminAIService;
AIService.compliance = ComplianceAIService;
AIService.community = CommunityAIService;

// Export registered services to ensure the registration code runs
export const registeredServices = {
  investment: InvestmentAIService,
  regulatory: RegulatoryAIService,
  innovation: InnovationAIService,
  knowledge: KnowledgeAIService,
  policy: PolicyAIService,
  challenge: ChallengeAIService,
  support: SupportAIService,
  clinical: ClinicalAIService,
  events: EventsAIService,
  admin: AdminAIService,
  compliance: ComplianceAIService,
  community: CommunityAIService
};
