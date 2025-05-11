
import { Application } from "./applications/types";
import { RegulatoryFramework } from "./RegulatoryFrameworkCard";
import { ComplianceRequirement } from "./ComplianceRequirementCard";

// Mock data for sandbox applications
export const mockSandboxApplications: Application[] = [
  {
    id: "1",
    name: "Remote Patient Monitoring System",
    status: "in-review",
    submittedDate: "2025-04-28",
    framework: "Medical Devices Regulatory Framework",
    progress: 65,
  },
  {
    id: "2",
    name: "AI-Based Diagnostic Tool",
    status: "approved",
    submittedDate: "2025-03-15",
    framework: "Digital Health Software Framework",
    progress: 100,
    testingPeriod: "2025-05-01 to 2025-07-31",
  }
];

// Mock regulatory frameworks with string icon names
export const mockRegulatoryFrameworks: RegulatoryFramework[] = [
  {
    id: "mdf",
    title: "Medical Devices Framework",
    icon: "Shield",
    description: "For physical medical devices and equipment",
    completedSteps: 2,
    totalSteps: 5,
    steps: [
      "Complete device classification form",
      "Submit technical documentation",
      "Register for conformity assessment",
      "Perform safety testing",
      "Submit final approval request"
    ]
  },
  {
    id: "dhf",
    title: "Digital Health Software Framework",
    icon: "Code",
    description: "For healthcare software and digital tools",
    completedSteps: 1,
    totalSteps: 4,
    steps: [
      "Complete software assessment form",
      "Submit security & privacy documentation",
      "Perform usability testing",
      "Submit final compliance report"
    ]
  },
  {
    id: "biof",
    title: "Biotechnology Framework",
    icon: "Beaker",
    description: "For biotech and pharmaceutical innovations",
    completedSteps: 0,
    totalSteps: 6,
    steps: [
      "Submit product classification form",
      "Register R&D protocols",
      "Submit safety test results",
      "Complete clinical trial documentation",
      "Submit manufacturing protocols",
      "Apply for final approval"
    ]
  }
];

// Mock compliance requirements
export const mockComplianceRequirements: ComplianceRequirement[] = [
  {
    id: "1",
    title: "Data Privacy Impact Assessment",
    description: "Complete a detailed assessment of how patient data is collected, stored, and processed in your innovation.",
    status: "required",
    completed: true
  },
  {
    id: "2",
    title: "Security Testing Report",
    description: "Submit results from penetration testing and security vulnerability assessments performed on your solution.",
    status: "required",
    completed: false
  },
  {
    id: "3",
    title: "Clinical Validation Documentation",
    description: "Provide evidence of clinical testing and validation of your solution's effectiveness and safety.",
    status: "recommended",
    completed: false
  },
  {
    id: "4",
    title: "User Experience Analysis",
    description: "Submit findings from usability testing with healthcare professionals who would use your system.",
    status: "optional",
    completed: false
  }
];

// Mock test details
export const mockTestDetails = {
  id: "1",
  name: "Remote Patient Monitoring System",
  testingPeriod: "2025-05-01 to 2025-07-31",
  daysLeft: 82,
  nextMilestone: "Mid-term report submission",
  nextMilestoneDate: "2025-06-15",
  metrics: [
    { name: "Patients enrolled", target: 50, current: 12 },
    { name: "Data points collected", target: 5000, current: 1280 },
    { name: "Clinical reviews completed", target: 10, current: 2 }
  ]
};
