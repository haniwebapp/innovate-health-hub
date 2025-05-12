
export interface SandboxApplication {
  id: string;
  name: string;
  innovator: string;
  innovationType: string;
  submittedAt: string;
  status: string;
  riskLevel: string;
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
