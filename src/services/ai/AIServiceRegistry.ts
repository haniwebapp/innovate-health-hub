
import { InvestmentAIService } from "../ai/InvestmentAIService";
import { RegulatoryAIService } from "../ai/RegulatoryAIService";
import { InnovationAIService } from "../ai/InnovationAIService";
import { KnowledgeAIService } from "../ai/KnowledgeAIService";
import { PolicyAIService } from "../ai/PolicyAIService";
import { ChallengeAIService } from "../ai/challenge/ChallengeAIService"; 
import { SupportAIService } from "../ai/support/SupportAIService";
import { ClinicalAIService } from "../ai/clinical/ClinicalAIService";
import { EventsAIService } from "../ai/events/EventsAIService";
import { AdminAIService } from "../ai/admin/AdminAIService";
import { ComplianceAIService } from "../ai/compliance/ComplianceAIService";
import { CommunityAIService } from "../ai/community/CommunityAIService";
import { QuotationAIService } from "../ai/quotation/QuotationAIService";

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
    AIServiceRegistry.register(AIServiceType.Investment, new InvestmentAIService());
    AIServiceRegistry.register(AIServiceType.Regulatory, new RegulatoryAIService());
    AIServiceRegistry.register(AIServiceType.Innovation, new InnovationAIService());
    AIServiceRegistry.register(AIServiceType.Knowledge, new KnowledgeAIService());
    AIServiceRegistry.register(AIServiceType.Policy, new PolicyAIService());
    AIServiceRegistry.register(AIServiceType.Challenge, new ChallengeAIService());
    AIServiceRegistry.register(AIServiceType.Support, new SupportAIService());
    AIServiceRegistry.register(AIServiceType.Clinical, new ClinicalAIService());
    AIServiceRegistry.register(AIServiceType.Events, new EventsAIService());
    AIServiceRegistry.register(AIServiceType.Admin, new AdminAIService());
    AIServiceRegistry.register(AIServiceType.Compliance, new ComplianceAIService());
    AIServiceRegistry.register(AIServiceType.Community, new CommunityAIService());
    AIServiceRegistry.register(AIServiceType.Quotation, new QuotationAIService());
  }
}

// Call initialize to register all services
AIServiceRegistry.initialize();
