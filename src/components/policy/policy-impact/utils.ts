
import { PolicyData } from "@/services/ai/policy/types";

export const initialPolicyData: PolicyData = {
  name: "",
  description: "",
  sector: "healthcare",
  stakeholders: []
};

export const initialSimulationParams = {
  timeframe: "5 years",
  region: "Saudi Arabia"
};
