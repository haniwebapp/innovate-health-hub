import { InvestmentAIService } from "./investment/InvestmentAIService";
import { RegulatoryAIService } from "./regulatory/RegulatoryAIService";
import { InnovationAIService } from "./innovation/InnovationAIService";
import { KnowledgeAIService } from "./knowledge/KnowledgeAIService";
import { PolicyAIService } from "./policy/PolicyAIService";
import { ChallengeAIService } from "./challenge/ChallengeAIService";
import { SupportAIService } from "./support/SupportAIService";
import { ClinicalAIService } from "./clinical/ClinicalAIService";
import { EventsAIService } from "./events/EventsAIService";
import { AdminAIService } from "./admin/AdminAIService";
import { ComplianceAIService } from "./compliance/ComplianceAIService";
import { CommunityAIService } from "./community/CommunityAIService";
import { QuotationAIService } from "./quotation/QuotationAIService";

import {
  AIServiceStaticReferences,
  CallTrace
} from "./types/AIServiceTypes";

export enum AIServiceType {
  Investment = 'investment',
  Regulatory = 'regulatory',
  Innovation = 'innovation',
  Knowledge = 'knowledge',
  Policy = 'policy',
  Challenge = 'challenge',
  Support = 'support',
  Clinical = 'clinical',
  Events = 'events',
  Admin = 'admin',
  Compliance = 'compliance',
  Community = 'community',
  Quotation = 'quotation',
}

export enum AIOperationType {
  Validate = 'validate',
  Generate = 'generate',
  Summarize = 'summarize',
  Translate = 'translate',
  Extract = 'extract',
  Classify = 'classify',
  Search = 'search',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  Analyze = 'analyze',
  Recommend = 'recommend',
  Predict = 'predict',
  Optimize = 'optimize',
  Monitor = 'monitor',
  Alert = 'alert',
  Diagnose = 'diagnose',
  Plan = 'plan',
  Design = 'design',
  Simulate = 'simulate',
  Test = 'test',
  Debug = 'debug',
  Deploy = 'deploy',
  Configure = 'configure',
  Train = 'train',
  Evaluate = 'evaluate',
  Explain = 'explain',
  Reason = 'reason',
  Decide = 'decide',
  Act = 'act',
  Learn = 'learn',
  Adapt = 'adapt',
  Evolve = 'evolve',
  GenerateResponse = 'generate_response',
}

export interface AIService {
  serviceType: AIServiceType;
  isAvailable(): Promise<boolean>;
  getStaticReferences(): AIServiceStaticReferences;
  recordCall(trace: CallTrace): Promise<void>;
}

export class AIServiceRegistry {
  private static services: { [key: string]: any } = {};

  static register(serviceType: AIServiceType, service: any) {
    AIServiceRegistry.services[serviceType] = service;
  }

  static get(serviceType: AIServiceType): any {
    return AIServiceRegistry.services[serviceType];
  }

  static getAll(): { [key: string]: any } {
    return AIServiceRegistry.services;
  }

  static initialize(): void {
    // Initialize and register all AI services here
    AIServiceRegistry.register(AIServiceType.Investment, InvestmentAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Regulatory, RegulatoryAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Innovation, InnovationAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Knowledge, KnowledgeAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Policy, PolicyAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Challenge, ChallengeAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Support, SupportAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Clinical, ClinicalAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Events, EventsAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Admin, AdminAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Compliance, ComplianceAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Community, CommunityAIService.getInstance());
    AIServiceRegistry.register(AIServiceType.Quotation, QuotationAIService.getInstance());
  }
}

// Call initialize to register all services
AIServiceRegistry.initialize();
