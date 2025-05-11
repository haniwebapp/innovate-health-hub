
import { AICapability, AICapabilityCategory, AICapabilityStatus } from "@/types/ai-capabilities";
import {
  Lightbulb, DollarSign, ShieldCheck, BookOpen, ScrollText, 
  Headphones, Award, Calendar, BarChart3, Microscope,
  Scale, Building, Archive, Radio, Brain, 
  Users, Syringe, Network, Globe, RadialGradient, Smartphone, GlobeIcon, LineChart, Shield
} from "lucide-react";

// Helper function to get icon component name as string
const getIconName = (iconComponent: any): string => {
  return iconComponent.displayName || iconComponent.name || "Icon";
};

// AI Capabilities list - all 110 features
export const aiCapabilities: AICapability[] = [
  // Innovation Challenges (1-7)
  {
    id: "ai-challenge-ideas",
    name: "AI-Generated Challenge Ideas",
    description: "Generate innovative challenge ideas using AI based on global healthcare trends and local needs",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "proposal-scoring",
    name: "Proposal Multi-Criteria Scoring",
    description: "Automatically score proposals on multiple criteria using natural language understanding",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "reviewer-matching",
    name: "Reviewer Auto-Matching",
    description: "Automatically match reviewers to challenges based on expertise and background",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "personalized-challenge-feed",
    name: "Personalized Challenge Feed",
    description: "Provide users with challenges tailored to their interests and expertise",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "strategic-alignment-scoring",
    name: "Strategic Alignment Scoring",
    description: "Score challenges and proposals on alignment with Vision 2030 and strategic goals",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "duplicate-challenge-detection",
    name: "Duplicate Challenge Detection",
    description: "Identify duplicate or similar challenges to prevent redundancy",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: true, 
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "submission-enhancement",
    name: "Submission Enhancement Suggestions",
    description: "Provide suggestions to improve challenge submissions",
    category: AICapabilityCategory.INNOVATION_CHALLENGES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Lightbulb),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Investment Hub (8-14)
  {
    id: "investor-startup-match",
    name: "Embedding-Based Investor-Startup Match",
    description: "Match startups with investors using embeddings and similarity algorithms",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "pitch-deck-generator",
    name: "Pitch Deck Generator",
    description: "Generate professional pitch decks based on startup information",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "investor-engagement-predictor",
    name: "Investor Engagement Predictor",
    description: "Predict which investors are likely to engage with specific startups",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "startup-readiness-score",
    name: "Startup Readiness Score",
    description: "Assess startup readiness for investment based on multiple criteria",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "risk-profiling",
    name: "Risk Profiling",
    description: "Generate comprehensive risk profiles for startups and investments",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "vc-fit-recommender",
    name: "VC-Fit Recommender",
    description: "Recommend specific VCs based on startup characteristics and investment history",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "investor-qa-generator",
    name: "Investor Q&A Generator",
    description: "Generate potential investor questions and recommended answers",
    category: AICapabilityCategory.INVESTMENT_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(DollarSign),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Regulatory Sandbox (15-20)
  {
    id: "compliance-readiness-score",
    name: "Compliance Readiness Score",
    description: "Evaluate an innovation's readiness for regulatory approval",
    category: AICapabilityCategory.REGULATORY_SANDBOX,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ShieldCheck),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "sandbox-entry-checklist",
    name: "Sandbox Entry Checklist",
    description: "Generate tailored regulatory sandbox entry requirements",
    category: AICapabilityCategory.REGULATORY_SANDBOX,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ShieldCheck),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "ethics-risk-detection",
    name: "Ethics Risk Detection",
    description: "Identify potential ethical risks in healthcare innovations",
    category: AICapabilityCategory.REGULATORY_SANDBOX,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ShieldCheck),
    isAdminOnly: true,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "clinical-trial-simulator",
    name: "Clinical Trial Simulator",
    description: "Simulate clinical trial processes and outcomes",
    category: AICapabilityCategory.REGULATORY_SANDBOX,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ShieldCheck),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "regulatory-approval-prediction",
    name: "Regulatory Approval Prediction",
    description: "Predict likelihood of regulatory approval for innovations",
    category: AICapabilityCategory.REGULATORY_SANDBOX,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ShieldCheck),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "form-validation-ai",
    name: "Form Validation AI",
    description: "Intelligent form validation for regulatory submissions",
    category: AICapabilityCategory.REGULATORY_SANDBOX,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ShieldCheck),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Knowledge Hub (21-26)
  {
    id: "nlp-paper-summarizer",
    name: "NLP Paper Summarizer",
    description: "Automatically summarize research papers and articles",
    category: AICapabilityCategory.KNOWLEDGE_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BookOpen),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "semantic-vector-search",
    name: "Semantic Vector Search",
    description: "Search knowledge content using semantic understanding rather than keywords",
    category: AICapabilityCategory.KNOWLEDGE_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BookOpen),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "arabic-english-nlp-switch",
    name: "Arabic/English NLP Switch",
    description: "Seamlessly switch between Arabic and English for content processing",
    category: AICapabilityCategory.KNOWLEDGE_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BookOpen),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "personalized-research-feed",
    name: "Personalized Research Feed",
    description: "Provide users with research content tailored to their interests",
    category: AICapabilityCategory.KNOWLEDGE_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BookOpen),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "trend-radar",
    name: "Trend Radar",
    description: "Detect and visualize emerging healthcare innovation trends",
    category: AICapabilityCategory.KNOWLEDGE_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BookOpen),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "auto-content-tagging",
    name: "Auto Content Tagging",
    description: "Automatically tag content with relevant keywords and categories",
    category: AICapabilityCategory.KNOWLEDGE_HUB,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BookOpen),
    isAdminOnly: true,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Policy & Strategy (27-31)
  {
    id: "vision-2030-alignment-checker",
    name: "Vision 2030 Alignment Checker",
    description: "Assess alignment of innovations with Vision 2030 goals",
    category: AICapabilityCategory.POLICY_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "policy-impact-simulator",
    name: "Policy Impact Simulator",
    description: "Simulate the impact of policy changes on healthcare innovation",
    category: AICapabilityCategory.POLICY_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "moh-strategy-dashboard",
    name: "MoH Strategy Dashboard",
    description: "AI-powered dashboard for MoH strategy monitoring",
    category: AICapabilityCategory.POLICY_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "ecosystem-gap-analyzer",
    name: "Ecosystem Gap Analyzer",
    description: "Identify gaps in the healthcare innovation ecosystem",
    category: AICapabilityCategory.POLICY_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "ministerial-gpt-assistant",
    name: "Ministerial GPT Report Assistant",
    description: "Generate ministerial reports using GPT",
    category: AICapabilityCategory.POLICY_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Policies & Guidelines (32-36)
  {
    id: "policy-annotator",
    name: "Policy Annotator",
    description: "Automatically annotate policy documents with explanations",
    category: AICapabilityCategory.POLICIES_GUIDELINES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ScrollText),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "document-change-alert",
    name: "Document Change Alert",
    description: "Alert users about relevant policy and guideline changes",
    category: AICapabilityCategory.POLICIES_GUIDELINES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ScrollText),
    isAdminOnly: true,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "regulatory-qa-chatbot",
    name: "Regulatory Q&A Chatbot",
    description: "AI chatbot for regulatory questions and guidance",
    category: AICapabilityCategory.POLICIES_GUIDELINES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ScrollText),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "legal-relevance-scorer",
    name: "Legal Relevance Scorer",
    description: "Score regulatory relevance to specific innovations",
    category: AICapabilityCategory.POLICIES_GUIDELINES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ScrollText),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "gpt-policy-checklist",
    name: "GPT-based Policy Checklist",
    description: "Generate compliance checklists based on specific policies",
    category: AICapabilityCategory.POLICIES_GUIDELINES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(ScrollText),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Support System (37-42)
  {
    id: "gpt4o-support-assistant",
    name: "GPT-4o Support Assistant",
    description: "Advanced support assistant powered by GPT-4o",
    category: AICapabilityCategory.SUPPORT_SYSTEM,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Headphones),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "sentiment-detector",
    name: "Sentiment Detector",
    description: "Detect sentiment in support communications",
    category: AICapabilityCategory.SUPPORT_SYSTEM,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Headphones),
    isAdminOnly: true,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "urgency-classifier",
    name: "Urgency Classifier",
    description: "Classify support tickets by urgency",
    category: AICapabilityCategory.SUPPORT_SYSTEM,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Headphones),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "auto-ticket-assignment",
    name: "Auto Ticket Assignment",
    description: "Automatically assign tickets to appropriate staff",
    category: AICapabilityCategory.SUPPORT_SYSTEM,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Headphones),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "first-response-generator",
    name: "First-Response Generator",
    description: "Generate initial responses to support tickets",
    category: AICapabilityCategory.SUPPORT_SYSTEM,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Headphones),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "ticket-feedback-summarizer",
    name: "Ticket Feedback Summarizer",
    description: "Summarize feedback from support tickets",
    category: AICapabilityCategory.SUPPORT_SYSTEM,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Headphones),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Success Stories (43-47)
  {
    id: "journey-summarizer",
    name: "Journey Summarizer",
    description: "Summarize innovation journeys for success stories",
    category: AICapabilityCategory.SUCCESS_STORIES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Award),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "impact-quantifier",
    name: "Impact Quantifier",
    description: "Quantify the impact of successful innovations",
    category: AICapabilityCategory.SUCCESS_STORIES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Award),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "social-media-generator",
    name: "Social Media Snippet Generator",
    description: "Generate social media content for success stories",
    category: AICapabilityCategory.SUCCESS_STORIES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Award),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "spotlight-ranking-scorer",
    name: "Spotlight Ranking Scorer",
    description: "Score and rank innovations for spotlight features",
    category: AICapabilityCategory.SUCCESS_STORIES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Award),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "caption-headline-composer",
    name: "Caption/Headline Composer",
    description: "Generate compelling captions and headlines",
    category: AICapabilityCategory.SUCCESS_STORIES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Award),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Events (48-52)
  {
    id: "event-recommender",
    name: "Event Recommender",
    description: "Recommend relevant events to users",
    category: AICapabilityCategory.EVENTS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Calendar),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "speaker-suggester",
    name: "Speaker Suggester",
    description: "Suggest appropriate speakers for events",
    category: AICapabilityCategory.EVENTS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Calendar),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "trending-event-prediction",
    name: "Trending Event Prediction",
    description: "Predict which events will generate the most interest",
    category: AICapabilityCategory.EVENTS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Calendar),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "feedback-summarizer",
    name: "Feedback Summarizer",
    description: "Summarize event feedback for organizers",
    category: AICapabilityCategory.EVENTS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Calendar),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "follow-up-suggester",
    name: "Follow-up Action Suggester",
    description: "Suggest follow-up actions after events",
    category: AICapabilityCategory.EVENTS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Calendar),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Admin & Logs (53-58)
  {
    id: "ai-log-viewer",
    name: "AI Log Viewer",
    description: "View and analyze AI operation logs",
    category: AICapabilityCategory.ADMIN_LOGS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BarChart3),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 1
  },
  {
    id: "scoring-anomaly-detector",
    name: "Scoring Anomaly Detector",
    description: "Detect anomalies in evaluation scoring",
    category: AICapabilityCategory.ADMIN_LOGS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BarChart3),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "ecosystem-sentiment-graph",
    name: "Ecosystem Sentiment Graph",
    description: "Visualize sentiment trends across the innovation ecosystem",
    category: AICapabilityCategory.ADMIN_LOGS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BarChart3),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "user-drop-off-predictor",
    name: "User Drop-Off Predictor",
    description: "Predict when users might disengage from the platform",
    category: AICapabilityCategory.ADMIN_LOGS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BarChart3),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "global-benchmark-radar",
    name: "Global Benchmark Radar",
    description: "Compare performance against global benchmarks",
    category: AICapabilityCategory.ADMIN_LOGS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BarChart3),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "inter-ministerial-coordination",
    name: "Inter-Ministerial Coordination Assistant",
    description: "Assist with coordination between ministries",
    category: AICapabilityCategory.ADMIN_LOGS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(BarChart3),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Clinical + Scientific (59-63)
  {
    id: "auto-clinical-tagger",
    name: "Auto Clinical Tagger",
    description: "Automatically tag clinical content",
    category: AICapabilityCategory.CLINICAL_SCIENTIFIC,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Microscope),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "novelty-checker",
    name: "Novelty Checker",
    description: "Check novelty against patents and literature",
    category: AICapabilityCategory.CLINICAL_SCIENTIFIC,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Microscope),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "global-vc-correlator",
    name: "Global VC Flow Correlator",
    description: "Correlate local innovations with global VC trends",
    category: AICapabilityCategory.CLINICAL_SCIENTIFIC,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Microscope),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "trl-predictor",
    name: "TRL Predictor",
    description: "Predict Technology Readiness Level",
    category: AICapabilityCategory.CLINICAL_SCIENTIFIC,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Microscope),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "impact-multiplier-ai",
    name: "Impact Multiplier AI",
    description: "Identify ways to multiply innovation impact",
    category: AICapabilityCategory.CLINICAL_SCIENTIFIC,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Microscope),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Compliance & Legal (64-66)
  {
    id: "ip-overlap-detector",
    name: "IP Overlap Detector",
    description: "Detect potential IP overlaps in innovations",
    category: AICapabilityCategory.COMPLIANCE_LEGAL,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Scale),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "ethics-escalation-ai",
    name: "Ethics Escalation AI",
    description: "Identify ethics issues requiring escalation",
    category: AICapabilityCategory.COMPLIANCE_LEGAL,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Scale),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "compliance-matcher",
    name: "Compliance Matcher",
    description: "Match innovations with appropriate compliance frameworks",
    category: AICapabilityCategory.COMPLIANCE_LEGAL,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Scale),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // MoH Strategy Deep AI (67-69)
  {
    id: "national-kpi-bridge",
    name: "National KPI Bridge Engine",
    description: "Connect innovation outcomes to national KPIs",
    category: AICapabilityCategory.MOH_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "cross-sector-simulator",
    name: "Cross-Sector Simulator",
    description: "Simulate innovation impacts across sectors",
    category: AICapabilityCategory.MOH_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "national-policy-forecaster",
    name: "National Policy Impact Forecaster",
    description: "Forecast policy impacts nationally",
    category: AICapabilityCategory.MOH_STRATEGY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Content & Community (70-72)
  {
    id: "ai-wiki-builder",
    name: "AI Wiki Builder",
    description: "Build wiki content using AI",
    category: AICapabilityCategory.CONTENT_COMMUNITY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Archive),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "research-outreach-composer",
    name: "Research Outreach Composer",
    description: "Compose research outreach materials",
    category: AICapabilityCategory.CONTENT_COMMUNITY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Archive),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "gpt-comment-assistant",
    name: "GPT-Powered Comment Assistant",
    description: "Generate useful comments on platform content",
    category: AICapabilityCategory.CONTENT_COMMUNITY,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Archive),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Ecosystem Outreach (73-75)
  {
    id: "press-release-writer",
    name: "Press Release Writer",
    description: "Generate press releases for innovation achievements",
    category: AICapabilityCategory.ECOSYSTEM_OUTREACH,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Radio),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "cross-border-translator",
    name: "Cross-Border Challenge Translator",
    description: "Translate challenges for international participants",
    category: AICapabilityCategory.ECOSYSTEM_OUTREACH,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Radio),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "pitch-competition-organizer",
    name: "GPT-Driven Pitch Competition Organizer",
    description: "Organize pitch competitions using GPT",
    category: AICapabilityCategory.ECOSYSTEM_OUTREACH,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Radio),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Intelligence & Prediction (76-79)
  {
    id: "innovation-failure-learner",
    name: "Innovation Failure Learner",
    description: "Learn from failed innovations to improve future success",
    category: AICapabilityCategory.INTELLIGENCE_PREDICTION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Brain),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "ecosystem-influencer-detector",
    name: "Ecosystem Influencer Detector",
    description: "Identify key influencers in the innovation ecosystem",
    category: AICapabilityCategory.INTELLIGENCE_PREDICTION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Brain),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "funding-loop-optimizer",
    name: "Funding Loop Optimizer",
    description: "Optimize funding allocation for maximum impact",
    category: AICapabilityCategory.INTELLIGENCE_PREDICTION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Brain),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "modular-gpt-builder",
    name: "Modular GPT Builder",
    description: "Build custom GPT interfaces for specific users",
    category: AICapabilityCategory.INTELLIGENCE_PREDICTION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Brain),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Personalization & Coaching (80-81)
  {
    id: "user-behavior-optimizer",
    name: "User Behavior Optimizer",
    description: "Optimize user behaviors for improved outcomes",
    category: AICapabilityCategory.PERSONALIZATION_COACHING,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Users),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "goal-tracking-coach",
    name: "Goal-Tracking Innovation Coach",
    description: "Coach users to achieve their innovation goals",
    category: AICapabilityCategory.PERSONALIZATION_COACHING,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Users),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },

  // Clinical Simulation (82-86)
  {
    id: "clinical-report-drafter",
    name: "Clinical Report Auto-Drafter",
    description: "Auto-draft clinical reports",
    category: AICapabilityCategory.CLINICAL_SIMULATION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Syringe),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "digital-twin-comparator",
    name: "Digital Twin Comparator",
    description: "Compare innovation results with digital twin simulations",
    category: AICapabilityCategory.CLINICAL_SIMULATION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Syringe),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "disease-burden-forecaster",
    name: "Disease Burden Forecaster",
    description: "Forecast disease burden and innovation impact",
    category: AICapabilityCategory.CLINICAL_SIMULATION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Syringe),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "drg-icd-generator",
    name: "DRG/ICD Code Generator",
    description: "Generate appropriate DRG and ICD codes",
    category: AICapabilityCategory.CLINICAL_SIMULATION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Syringe),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "symptom-cluster-mapper",
    name: "Symptom Cluster Mapper",
    description: "Map symptom clusters to potential diagnoses",
    category: AICapabilityCategory.CLINICAL_SIMULATION,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Syringe),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Cross-Domain Mapping (87-90)
  {
    id: "sector-bridging-recommender",
    name: "Sector Bridging Recommender",
    description: "Recommend cross-sector innovation opportunities",
    category: AICapabilityCategory.CROSS_DOMAIN_MAPPING,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Network),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "ecosystem-graph-engine",
    name: "Ecosystem Graph Engine",
    description: "Visualize and analyze the innovation ecosystem as a graph",
    category: AICapabilityCategory.CROSS_DOMAIN_MAPPING,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Network),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "emr-lis-predictor",
    name: "EMR/LIS Integration Predictor",
    description: "Predict integration potential with healthcare IT systems",
    category: AICapabilityCategory.CROSS_DOMAIN_MAPPING,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Network),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "service-gap-scorer",
    name: "MoH Internal Service Gap Scorer",
    description: "Score internal service gaps for improvement",
    category: AICapabilityCategory.CROSS_DOMAIN_MAPPING,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Network),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // National Ops AI (91-94)
  {
    id: "challenge-policy-dashboard",
    name: "Challenge → Policy Impact Dashboard",
    description: "Dashboard showing challenge impacts on policy",
    category: AICapabilityCategory.NATIONAL_OPS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "health-outcome-heatmap",
    name: "Health Outcome Heatmap",
    description: "Heatmap of health outcomes influenced by innovations",
    category: AICapabilityCategory.NATIONAL_OPS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "procurement-readiness-analyzer",
    name: "Procurement Readiness Analyzer",
    description: "Analyze procurement readiness for innovations",
    category: AICapabilityCategory.NATIONAL_OPS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "innovation-success-forecast",
    name: "Innovation Success Forecast AI",
    description: "Forecast innovation success rates",
    category: AICapabilityCategory.NATIONAL_OPS,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Building),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Smart Interfaces (95-98)
  {
    id: "voice-command-ui",
    name: "Voice Command UI Assistant",
    description: "Voice interface for platform navigation",
    category: AICapabilityCategory.SMART_INTERFACES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Smartphone),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "smart-form-ai",
    name: "Smart Form AI Keyboard",
    description: "AI-powered keyboard for form completion",
    category: AICapabilityCategory.SMART_INTERFACES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Smartphone),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "gpt-brainstorming-rooms",
    name: "GPT Brainstorming Multiplayer Rooms",
    description: "Collaborative spaces with GPT assistance",
    category: AICapabilityCategory.SMART_INTERFACES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Smartphone),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "nocode-gpt-flow-builder",
    name: "No-Code GPT Flow Builder",
    description: "User-friendly interface for building GPT workflows",
    category: AICapabilityCategory.SMART_INTERFACES,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Smartphone),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Global Alignment (99-102)
  {
    id: "profile-sync",
    name: "Profile Sync",
    description: "Sync profiles with external platforms",
    category: AICapabilityCategory.GLOBAL_ALIGNMENT,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(GlobeIcon),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "multilingual-collaboration-ai",
    name: "Multilingual Collaboration AI",
    description: "AI-powered translation for collaboration",
    category: AICapabilityCategory.GLOBAL_ALIGNMENT,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(GlobeIcon),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "sdg-alignment-scorer",
    name: "UN SDG Alignment Scorer",
    description: "Score innovation alignment with UN Sustainable Development Goals",
    category: AICapabilityCategory.GLOBAL_ALIGNMENT,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(GlobeIcon),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "timezone-aware-planner",
    name: "Time-Zone Aware Event Planner",
    description: "Plan events considering global time zones",
    category: AICapabilityCategory.GLOBAL_ALIGNMENT,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(GlobeIcon),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Platform Intelligence (103-106)
  {
    id: "funding-success-predictor",
    name: "Funding Success Predictor",
    description: "Predict likelihood of funding success",
    category: AICapabilityCategory.PLATFORM_INTELLIGENCE,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(LineChart),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "innovation-risk-heatmap",
    name: "Innovation Risk Heatmap",
    description: "Visualize risk levels across innovations",
    category: AICapabilityCategory.PLATFORM_INTELLIGENCE,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(LineChart),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "reviewer-consistency-tracker",
    name: "Reviewer Consistency Tracker",
    description: "Track consistency of reviewer evaluations",
    category: AICapabilityCategory.PLATFORM_INTELLIGENCE,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(LineChart),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "knowledge-decay-monitor",
    name: "Knowledge Decay Monitor",
    description: "Monitor and alert on outdated knowledge",
    category: AICapabilityCategory.PLATFORM_INTELLIGENCE,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(LineChart),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },

  // Responsible AI & Governance (107-110)
  {
    id: "bias-detection-engine",
    name: "Bias Detection Engine",
    description: "Detect and mitigate bias in AI systems",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Shield),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "responsible-ai-training",
    name: "Responsible AI Training Module",
    description: "Train users on responsible AI use",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Shield),
    isAdminOnly: false,
    isPlatformFeature: true,
    isAIFeature: true,
    implementationPhase: 2
  },
  {
    id: "xai-explainability-dashboard",
    name: "XAI Explainability Dashboard",
    description: "Dashboard for explaining AI decisions",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Shield),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  },
  {
    id: "misuse-trigger-detector",
    name: "Misuse Trigger Detector",
    description: "Detect potential AI misuse",
    category: AICapabilityCategory.RESPONSIBLE_AI,
    status: AICapabilityStatus.PLANNED,
    icon: getIconName(Shield),
    isAdminOnly: true,
    isPlatformFeature: false,
    isAIFeature: true,
    implementationPhase: 3
  }
];

// Helper function to get category information
export const getAICapabilityCategoryInfo = (): AICapabilityCategoryInfo[] => {
  const categories = Object.values(AICapabilityCategory);
  
  return categories.map(categoryId => {
    const categoryCaps = aiCapabilities.filter(cap => cap.category === categoryId);
    const implementedCaps = categoryCaps.filter(cap => 
      cap.status === AICapabilityStatus.LIVE || 
      cap.status === AICapabilityStatus.BETA
    );
    
    const getCategoryName = (id: AICapabilityCategory): string => {
      const names: Record<AICapabilityCategory, string> = {
        [AICapabilityCategory.INNOVATION_CHALLENGES]: "Innovation Challenges",
        [AICapabilityCategory.INVESTMENT_HUB]: "Investment Hub",
        [AICapabilityCategory.REGULATORY_SANDBOX]: "Regulatory Sandbox",
        [AICapabilityCategory.KNOWLEDGE_HUB]: "Knowledge Hub",
        [AICapabilityCategory.POLICY_STRATEGY]: "Policy & Strategy",
        [AICapabilityCategory.POLICIES_GUIDELINES]: "Policies & Guidelines",
        [AICapabilityCategory.SUPPORT_SYSTEM]: "Support System",
        [AICapabilityCategory.SUCCESS_STORIES]: "Success Stories",
        [AICapabilityCategory.EVENTS]: "Events",
        [AICapabilityCategory.ADMIN_LOGS]: "Admin & Logs",
        [AICapabilityCategory.CLINICAL_SCIENTIFIC]: "Clinical & Scientific",
        [AICapabilityCategory.COMPLIANCE_LEGAL]: "Compliance & Legal",
        [AICapabilityCategory.MOH_STRATEGY]: "MoH Strategy",
        [AICapabilityCategory.CONTENT_COMMUNITY]: "Content & Community",
        [AICapabilityCategory.ECOSYSTEM_OUTREACH]: "Ecosystem Outreach",
        [AICapabilityCategory.INTELLIGENCE_PREDICTION]: "Intelligence & Prediction",
        [AICapabilityCategory.PERSONALIZATION_COACHING]: "Personalization & Coaching",
        [AICapabilityCategory.CLINICAL_SIMULATION]: "Clinical Simulation",
        [AICapabilityCategory.CROSS_DOMAIN_MAPPING]: "Cross-Domain Mapping",
        [AICapabilityCategory.NATIONAL_OPS]: "National Ops",
        [AICapabilityCategory.SMART_INTERFACES]: "Smart Interfaces",
        [AICapabilityCategory.GLOBAL_ALIGNMENT]: "Global Alignment",
        [AICapabilityCategory.PLATFORM_INTELLIGENCE]: "Platform Intelligence",
        [AICapabilityCategory.RESPONSIBLE_AI]: "Responsible AI & Governance"
      };
      
      return names[id] || id;
    };
    
    const getCategoryIcon = (id: AICapabilityCategory): string => {
      const icons: Record<AICapabilityCategory, string> = {
        [AICapabilityCategory.INNOVATION_CHALLENGES]: getIconName(Lightbulb),
        [AICapabilityCategory.INVESTMENT_HUB]: getIconName(DollarSign),
        [AICapabilityCategory.REGULATORY_SANDBOX]: getIconName(ShieldCheck),
        [AICapabilityCategory.KNOWLEDGE_HUB]: getIconName(BookOpen),
        [AICapabilityCategory.POLICY_STRATEGY]: getIconName(Building),
        [AICapabilityCategory.POLICIES_GUIDELINES]: getIconName(ScrollText),
        [AICapabilityCategory.SUPPORT_SYSTEM]: getIconName(Headphones),
        [AICapabilityCategory.SUCCESS_STORIES]: getIconName(Award),
        [AICapabilityCategory.EVENTS]: getIconName(Calendar),
        [AICapabilityCategory.ADMIN_LOGS]: getIconName(BarChart3),
        [AICapabilityCategory.CLINICAL_SCIENTIFIC]: getIconName(Microscope),
        [AICapabilityCategory.COMPLIANCE_LEGAL]: getIconName(Scale),
        [AICapabilityCategory.MOH_STRATEGY]: getIconName(Building),
        [AICapabilityCategory.CONTENT_COMMUNITY]: getIconName(Archive),
        [AICapabilityCategory.ECOSYSTEM_OUTREACH]: getIconName(Radio),
        [AICapabilityCategory.INTELLIGENCE_PREDICTION]: getIconName(Brain),
        [AICapabilityCategory.PERSONALIZATION_COACHING]: getIconName(Users),
        [AICapabilityCategory.CLINICAL_SIMULATION]: getIconName(Syringe),
        [AICapabilityCategory.CROSS_DOMAIN_MAPPING]: getIconName(Network),
        [AICapabilityCategory.NATIONAL_OPS]: getIconName(Building),
        [AICapabilityCategory.SMART_INTERFACES]: getIconName(Smartphone),
        [AICapabilityCategory.GLOBAL_ALIGNMENT]: getIconName(GlobeIcon),
        [AICapabilityCategory.PLATFORM_INTELLIGENCE]: getIconName(LineChart),
        [AICapabilityCategory.RESPONSIBLE_AI]: getIconName(Shield)
      };
      
      return icons[id] || "Icon";
    };
    
    return {
      id: categoryId,
      name: getCategoryName(categoryId),
      description: `AI capabilities for ${getCategoryName(categoryId).toLowerCase()}`,
      icon: getCategoryIcon(categoryId),
      totalCapabilities: categoryCaps.length,
      implementedCapabilities: implementedCaps.length
    };
  });
};

// Group capabilities by implementation phase
export const getCapabilitiesByPhase = (): AIImplementationPhase[] => {
  const phases = [1, 2, 3];
  
  return phases.map(phaseNum => {
    const phaseCapabilities = aiCapabilities.filter(cap => cap.implementationPhase === phaseNum);
    
    return {
      id: phaseNum,
      name: `Phase ${phaseNum}`,
      description: phaseNum === 1 
        ? "Core capabilities and foundation" 
        : phaseNum === 2 
          ? "Advanced features and integration" 
          : "Specialized and future capabilities",
      startDate: phaseNum === 1 
        ? "2023-Q4" 
        : phaseNum === 2 
          ? "2024-Q2" 
          : "2024-Q4",
      endDate: phaseNum === 1 
        ? "2024-Q2" 
        : phaseNum === 2 
          ? "2024-Q4" 
          : "2025-Q2",
      status: phaseNum === 1 
        ? "in-progress" 
        : phaseNum === 2 
          ? "upcoming" 
          : "upcoming",
      capabilities: phaseCapabilities
    };
  });
};

// Get capabilities by type (admin, platform, AI)
export const getAdminCapabilities = (): AICapability[] => {
  return aiCapabilities.filter(cap => cap.isAdminOnly);
};

export const getPlatformCapabilities = (): AICapability[] => {
  return aiCapabilities.filter(cap => cap.isPlatformFeature);
};

export const getAICapabilities = (): AICapability[] => {
  return aiCapabilities.filter(cap => cap.isAIFeature);
};
