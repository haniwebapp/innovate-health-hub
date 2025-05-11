
import { 
  AICapability, 
  AICapabilityCategory, 
  AICapabilityStatus,
  AIImplementationPhase
} from "@/types/ai-capabilities";

import { 
  Brain, 
  Cpu, 
  LineChart, 
  GraduationCap, 
  LawJustice, 
  FileText, 
  Headphones, 
  Trophy, 
  Calendar, 
  Settings, 
  Microscope, 
  ShieldCheck, 
  Target, 
  Folder, 
  Network, 
  BrainCircuit, 
  Users, 
  Stethoscope, 
  Shuffle, 
  Building, 
  Smartphone, 
  Globe, 
  BarChart3, 
  Shield,
  Layers
} from "lucide-react";

// Mock data for AI capabilities
const aiCapabilities: AICapability[] = [
  // Innovation Challenges
  {
    id: "ai-challenge-ideas",
    name: "AI-generated challenge ideas",
    description: "Generate innovative challenge ideas based on global healthcare trends and local needs",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.LIVE,
    icon: "brain",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1,
    releaseDate: "2023-11-15"
  },
  {
    id: "proposal-scoring",
    name: "Proposal scoring (multi-criteria)",
    description: "AI-powered scoring system for proposals based on multiple criteria",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.LIVE,
    icon: "chart",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1,
    releaseDate: "2023-12-01"
  },
  {
    id: "reviewer-matching",
    name: "Reviewer auto-matching",
    description: "Automatically match reviewers to proposals based on expertise and domain knowledge",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.BETA,
    icon: "users",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "personalized-challenge-feed",
    name: "Personalized challenge feed",
    description: "AI-curated personalized feed of challenges based on user interests and history",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.IN_DEVELOPMENT,
    icon: "feed",
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "strategic-alignment",
    name: "Strategic alignment scoring",
    description: "Score proposals based on alignment with strategic initiatives like Vision 2030",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.IN_DEVELOPMENT,
    icon: "target",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "duplicate-detection",
    name: "Duplicate challenge detection",
    description: "Detect and flag duplicate or similar innovation challenges",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: "search",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "submission-suggestions",
    name: "Submission enhancement suggestions",
    description: "AI-powered suggestions to enhance innovation submissions",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: "lightbulb",
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Investment Hub
  {
    id: "investor-startup-match",
    name: "Embedding-based investor-startup match",
    description: "Advanced matching algorithm connecting investors with startups based on embeddings",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.BETA,
    icon: "handshake",
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "pitch-deck-generator",
    name: "Pitch deck generator",
    description: "AI-powered tool to generate professional pitch decks",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.IN_DEVELOPMENT,
    icon: "presentation",
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "investor-predictor",
    name: "Investor engagement predictor",
    description: "Predict likelihood of investor engagement based on startup profile",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: "chart-line",
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  
  // Adding more capabilities from each category would follow the same pattern
  
  // Responsible AI & Governance (last category)
  {
    id: "bias-detection",
    name: "Bias detection engine",
    description: "AI system to detect and mitigate biases in platform algorithms",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: "shield",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "responsible-ai-training",
    name: "Responsible AI training module",
    description: "Training module for platform users on responsible AI usage",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: "graduation-cap",
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "explainability-dashboard",
    name: "XAI explainability dashboard",
    description: "Dashboard for explaining AI decisions and recommendations",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: "dashboard",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "misuse-detector",
    name: "Misuse trigger detector",
    description: "System to detect potential misuse of AI features",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: "alert-triangle",
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  }
];

// Helper functions for accessing the data
export const getAICapabilities = (): AICapability[] => {
  return aiCapabilities;
};

export const getAICapabilitiesByCategory = (category: AICapabilityCategory): AICapability[] => {
  return aiCapabilities.filter(capability => capability.category === category);
};

export const getAICapabilitiesByPhase = (phase: number): AICapability[] => {
  return aiCapabilities.filter(capability => capability.implementationPhase === phase);
};

export const getAICapabilitiesByStatus = (status: AICapabilityStatus): AICapability[] => {
  return aiCapabilities.filter(capability => capability.status === status);
};

export const getAICapabilitiesByUser = (isAdmin: boolean): AICapability[] => {
  if (isAdmin) {
    return aiCapabilities;
  }
  return aiCapabilities.filter(capability => !capability.isAdminOnly);
};

export const getImplementedAICapabilities = (): AICapability[] => {
  return aiCapabilities.filter(
    capability => 
      capability.status === AICapabilityStatus.LIVE || 
      capability.status === AICapabilityStatus.BETA
  );
};

// Category information
export const getAICapabilityCategoryInfo = () => {
  const categoryInfo: {
    id: AICapabilityCategory;
    name: string;
    description: string;
    icon: string;
    totalCapabilities: number;
    implementedCapabilities: number;
  }[] = [];
  
  Object.values(AICapabilityCategory).forEach(categoryId => {
    const capabilities = getAICapabilitiesByCategory(categoryId);
    const implemented = capabilities.filter(
      c => c.status === AICapabilityStatus.LIVE || c.status === AICapabilityStatus.BETA
    ).length;
    
    let name = '';
    let description = '';
    
    // Map category IDs to human-readable names and descriptions
    switch (categoryId) {
      case AICapabilityCategory.INNOVATION_CHALLENGES:
        name = 'Innovation Challenges';
        description = 'AI features for managing innovation challenges and submissions';
        break;
      case AICapabilityCategory.INVESTMENT_HUB:
        name = 'Investment Hub';
        description = 'AI tools for connecting startups with investors';
        break;
      case AICapabilityCategory.REGULATORY_SANDBOX:
        name = 'Regulatory Sandbox';
        description = 'AI-powered compliance and regulatory features';
        break;
      case AICapabilityCategory.KNOWLEDGE_HUB:
        name = 'Knowledge Hub';
        description = 'AI features for knowledge management and sharing';
        break;
      case AICapabilityCategory.POLICY_STRATEGY:
        name = 'Policy & Strategy';
        description = 'Strategic policy analysis and development tools';
        break;
      case AICapabilityCategory.POLICIES_GUIDELINES:
        name = 'Policies & Guidelines';
        description = 'AI tools for policy management and guidelines';
        break;
      case AICapabilityCategory.SUPPORT_SYSTEM:
        name = 'Support System';
        description = 'AI-powered support and assistance features';
        break;
      case AICapabilityCategory.SUCCESS_STORIES:
        name = 'Success Stories';
        description = 'AI tools for highlighting and promoting success stories';
        break;
      case AICapabilityCategory.EVENTS:
        name = 'Events';
        description = 'AI features for event management and recommendations';
        break;
      case AICapabilityCategory.ADMIN_LOGS:
        name = 'Admin & Logs';
        description = 'Administrative tools and logging features powered by AI';
        break;
      case AICapabilityCategory.CLINICAL_SCIENTIFIC:
        name = 'Clinical & Scientific';
        description = 'AI tools for clinical and scientific research';
        break;
      case AICapabilityCategory.COMPLIANCE_LEGAL:
        name = 'Compliance & Legal';
        description = 'AI-powered compliance and legal tools';
        break;
      case AICapabilityCategory.MOH_STRATEGY:
        name = 'MOH Strategy';
        description = 'Strategic AI tools for the Ministry of Health';
        break;
      case AICapabilityCategory.CONTENT_COMMUNITY:
        name = 'Content & Community';
        description = 'AI features for content management and community engagement';
        break;
      case AICapabilityCategory.ECOSYSTEM_OUTREACH:
        name = 'Ecosystem Outreach';
        description = 'AI tools for ecosystem development and outreach';
        break;
      case AICapabilityCategory.INTELLIGENCE_PREDICTION:
        name = 'Intelligence & Prediction';
        description = 'Advanced AI prediction and intelligence features';
        break;
      case AICapabilityCategory.PERSONALIZATION_COACHING:
        name = 'Personalization & Coaching';
        description = 'AI-powered personalization and coaching tools';
        break;
      case AICapabilityCategory.CLINICAL_SIMULATION:
        name = 'Clinical Simulation';
        description = 'Clinical simulation and modeling features';
        break;
      case AICapabilityCategory.CROSS_DOMAIN_MAPPING:
        name = 'Cross-Domain Mapping';
        description = 'AI tools for cross-domain analysis and connections';
        break;
      case AICapabilityCategory.NATIONAL_OPS:
        name = 'National Operations';
        description = 'AI features for national-level operations';
        break;
      case AICapabilityCategory.SMART_INTERFACES:
        name = 'Smart Interfaces';
        description = 'AI-powered smart interface features';
        break;
      case AICapabilityCategory.GLOBAL_ALIGNMENT:
        name = 'Global Alignment';
        description = 'AI tools for global alignment and collaboration';
        break;
      case AICapabilityCategory.PLATFORM_INTELLIGENCE:
        name = 'Platform Intelligence';
        description = 'AI-powered platform intelligence features';
        break;
      case AICapabilityCategory.RESPONSIBLE_AI:
        name = 'Responsible AI';
        description = 'Tools for responsible AI usage and governance';
        break;
      default:
        name = categoryId;
        description = 'AI capabilities';
    }
    
    categoryInfo.push({
      id: categoryId,
      name,
      description,
      icon: 'circle',
      totalCapabilities: capabilities.length,
      implementedCapabilities: implemented
    });
  });
  
  return categoryInfo;
};

// Implementation phases
export const getCapabilitiesByPhase = () => {
  const phases: {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    status: 'upcoming' | 'in-progress' | 'completed';
    capabilities: AICapability[];
  }[] = [
    {
      id: 1,
      name: 'Phase 1: Core Capabilities',
      description: 'Implementation of foundational AI services and basic features',
      startDate: '2023-10',
      endDate: '2024-03',
      status: 'completed',
      capabilities: aiCapabilities.filter(c => c.implementationPhase === 1)
    },
    {
      id: 2,
      name: 'Phase 2: Advanced Features',
      description: 'Enhanced AI features with advanced analytics and personalization',
      startDate: '2024-04',
      endDate: '2024-09',
      status: 'in-progress',
      capabilities: aiCapabilities.filter(c => c.implementationPhase === 2)
    },
    {
      id: 3,
      name: 'Phase 3: Specialized Capabilities',
      description: 'Specialized AI features for specific domains and advanced use cases',
      startDate: '2024-10',
      endDate: '2025-03',
      status: 'upcoming',
      capabilities: aiCapabilities.filter(c => c.implementationPhase === 3)
    }
  ];
  
  return phases;
};
