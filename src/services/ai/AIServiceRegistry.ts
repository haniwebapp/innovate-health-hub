
import { AIServiceStaticReferences, CallTrace } from "./types/AIServiceTypes";

// Define service types
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
    // We'll load the services lazily to avoid circular dependencies
    // Import services dynamically only when initializing
    import("./InvestmentAIService").then(({ InvestmentAIService }) => {
      AIServiceRegistry.register(AIServiceType.Investment, new InvestmentAIService());
    });
    
    import("./RegulatoryAIService").then(({ RegulatoryAIService }) => {
      AIServiceRegistry.register(AIServiceType.Regulatory, new RegulatoryAIService());
    });

    import("./InnovationAIService").then(({ InnovationAIService }) => {
      AIServiceRegistry.register(AIServiceType.Innovation, new InnovationAIService());
    });

    import("./KnowledgeAIService").then(({ KnowledgeAIService }) => {
      AIServiceRegistry.register(AIServiceType.Knowledge, new KnowledgeAIService());
    });

    import("./PolicyAIService").then(({ PolicyAIService }) => {
      AIServiceRegistry.register(AIServiceType.Policy, new PolicyAIService());
    });

    import("./challenge/ChallengeAIService").then(({ ChallengeAIService }) => {
      AIServiceRegistry.register(AIServiceType.Challenge, new ChallengeAIService());
    });

    import("./support/SupportAIService").then(({ SupportAIService }) => {
      AIServiceRegistry.register(AIServiceType.Support, new SupportAIService());
    });

    import("./clinical/ClinicalAIService").then(({ ClinicalAIService }) => {
      AIServiceRegistry.register(AIServiceType.Clinical, new ClinicalAIService());
    });

    import("./events/EventsAIService").then(({ EventsAIService }) => {
      AIServiceRegistry.register(AIServiceType.Events, new EventsAIService());
    });

    import("./admin/AdminAIService").then(({ AdminAIService }) => {
      AIServiceRegistry.register(AIServiceType.Admin, new AdminAIService());
    });

    import("./compliance/ComplianceAIService").then(({ ComplianceAIService }) => {
      AIServiceRegistry.register(AIServiceType.Compliance, new ComplianceAIService());
    });

    import("./community/CommunityAIService").then(({ CommunityAIService }) => {
      AIServiceRegistry.register(AIServiceType.Community, new CommunityAIService());
    });

    import("./quotation/QuotationAIService").then(({ QuotationAIService }) => {
      AIServiceRegistry.register(AIServiceType.Quotation, new QuotationAIService());
    });
  }
}

// Call initialize to register all services
AIServiceRegistry.initialize();
