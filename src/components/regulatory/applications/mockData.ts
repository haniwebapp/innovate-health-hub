
import { Application } from "./types";

// Mock data for sandbox applications
export const mockApplications: Application[] = [
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
  },
  {
    id: "3",
    name: "Smart Medication Dispenser",
    status: "draft",
    submittedDate: "2025-05-02",
    framework: "Medical Devices Regulatory Framework",
    progress: 25,
  },
  {
    id: "4",
    name: "Healthcare Data Analytics Platform",
    status: "in-review",
    submittedDate: "2025-04-10",
    framework: "Digital Health Software Framework",
    progress: 70,
  }
];

// Helper function to get application by ID
export const getApplicationById = (id: string): Application | undefined => {
  return mockApplications.find(app => app.id === id);
};
