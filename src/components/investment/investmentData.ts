
import { FundingRound } from "./FundingRoundCard";
import { Investor } from "./InvestorCard";

// Sample data - would come from an API in a real application
export const fundingRounds: FundingRound[] = [
  {
    id: "1",
    name: "Healthcare Seed Fund 2025",
    type: "Equity",
    amount: "$250,000 - $500,000",
    deadline: "July 30, 2025",
    daysLeft: 35,
    status: "open",
    categories: ["Digital Health", "Telemedicine"],
    description: "Early-stage funding for innovative digital health solutions addressing primary care accessibility.",
    organization: "Saudi Health Ventures",
    logo: "https://placehold.co/100x100?text=SHV"
  },
  {
    id: "2",
    name: "Digital Health Innovation Grant",
    type: "Grant",
    amount: "$50,000 - $150,000",
    deadline: "June 15, 2025",
    daysLeft: 12,
    status: "open",
    categories: ["AI in Healthcare", "Patient Monitoring"],
    description: "Non-dilutive funding for AI-powered healthcare solutions with demonstrable impact.",
    organization: "Ministry of Health Innovation Fund",
    logo: "https://placehold.co/100x100?text=MoH"
  },
  {
    id: "3",
    name: "MedTech Accelerator Program",
    type: "Accelerator",
    amount: "$75,000 + mentorship",
    deadline: "August 20, 2025",
    daysLeft: 62,
    status: "upcoming",
    categories: ["Medical Devices", "Diagnostics"],
    description: "Intensive 12-week accelerator program for innovative medical device startups.",
    organization: "Saudi Med Innovation Hub",
    logo: "https://placehold.co/100x100?text=SMIH"
  }
];

export const investors: Investor[] = [
  {
    id: "1",
    name: "Vision Health Ventures",
    focus: ["Digital Health", "Telemedicine", "Health Data"],
    stage: ["Seed", "Series A"],
    totalInvested: "$45M",
    description: "Early-stage venture fund focused on healthcare technology across MENA region.",
    logo: "https://placehold.co/100x100?text=VHV",
    deals: 18
  },
  {
    id: "2",
    name: "MedTech Capital Partners",
    focus: ["Medical Devices", "Diagnostics", "Healthcare IoT"],
    stage: ["Series A", "Series B"],
    totalInvested: "$120M",
    description: "Growth-stage investor specializing in medical technology and devices.",
    logo: "https://placehold.co/100x100?text=MCP",
    deals: 24
  },
  {
    id: "3",
    name: "Saudi Health Innovation Fund",
    focus: ["Biotech", "Pharma", "Healthcare Services"],
    stage: ["Seed", "Series A", "Series B"],
    totalInvested: "$80M",
    description: "Government-backed fund supporting healthcare initiatives aligned with Vision 2030.",
    logo: "https://placehold.co/100x100?text=SHIF",
    deals: 32
  }
];
