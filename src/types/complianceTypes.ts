
export interface ComplianceRecord {
  id: string;
  title: string;
  description: string;
  compliance_type: string;
  standard_name: string;
  applicable_regulations?: string[];
  status: 'compliant' | 'non-compliant' | 'pending' | 'not-applicable';
  evidence_links?: string[];
  resource_id?: string;
  resource_type?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
}

export interface ComplianceFormData {
  title: string;
  description: string;
  compliance_type: string;
  standard_name: string;
  applicable_regulations?: string[];
  status: 'compliant' | 'non-compliant' | 'pending' | 'not-applicable';
  evidence_links?: string[];
  resource_id?: string;
  resource_type?: string;
}
