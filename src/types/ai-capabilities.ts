
// AI capability categories
export enum AICapabilityCategory {
  INNOVATION_CHALLENGES = "innovation_challenges",
  INVESTMENT_HUB = "investment_hub",
  REGULATORY_SANDBOX = "regulatory_sandbox",
  KNOWLEDGE_HUB = "knowledge_hub",
  POLICY_STRATEGY = "policy_strategy",
  POLICIES_GUIDELINES = "policies_guidelines",
  SUPPORT_SYSTEM = "support_system",
  SUCCESS_STORIES = "success_stories",
  EVENTS = "events",
  ADMIN_LOGS = "admin_logs",
  CLINICAL_SCIENTIFIC = "clinical_scientific",
  COMPLIANCE_LEGAL = "compliance_legal",
  MOH_STRATEGY = "moh_strategy",
  CONTENT_COMMUNITY = "content_community",
  ECOSYSTEM_OUTREACH = "ecosystem_outreach",
  INTELLIGENCE_PREDICTION = "intelligence_prediction",
  PERSONALIZATION_COACHING = "personalization_coaching",
  CLINICAL_SIMULATION = "clinical_simulation",
  CROSS_DOMAIN_MAPPING = "cross_domain_mapping",
  NATIONAL_OPS = "national_ops",
  SMART_INTERFACES = "smart_interfaces",
  GLOBAL_ALIGNMENT = "global_alignment",
  PLATFORM_INTELLIGENCE = "platform_intelligence",
  RESPONSIBLE_AI = "responsible_ai"
}

// Main interface for AI Capability
export interface AICapability {
  id: string;
  name: string;
  description: string;
  category: AICapabilityCategory;
  status: AICapabilityStatus;
  icon: string;
  isAdminOnly: boolean;
  isPlatformFeature: boolean;
  isAIFeature: boolean;
  implementationPhase: number;
  releaseDate?: string;
  dependencies?: string[];
}

export enum AICapabilityStatus {
  PLANNED = "planned",
  IN_DEVELOPMENT = "in_development",
  BETA = "beta",
  LIVE = "live",
  DEPRECATED = "deprecated"
}

// Category metadata
export interface AICapabilityCategoryInfo {
  id: AICapabilityCategory;
  name: string;
  description: string;
  icon: string;
  totalCapabilities: number;
  implementedCapabilities: number;
}

// Implementation phase
export interface AIImplementationPhase {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  capabilities: AICapability[];
}
