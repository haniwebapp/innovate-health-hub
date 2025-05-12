
export interface SandboxApplication {
  id: string;
  name: string;
  innovator: string;
  innovationType: string;
  submittedAt: string;
  status: string;
  riskLevel: string;
  technicalDetails?: Record<string, any>;
  clinicalValidationStatus?: string;
  targetAudience?: string;
}

export interface SandboxFilterState {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  date?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export interface SandboxTestingProtocol {
  id: string;
  applicationId: string;
  protocolName: string;
  description: string;
  status: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxApplicationSummary {
  id: string;
  name: string;
  innovator: string;
  innovationType: string;
  status: string;
  riskLevel: string;
  submittedAt: string;
  progress: number;
  requirementsCount: number;
  completedRequirementsCount: number;
  testResultsCount: number;
}
