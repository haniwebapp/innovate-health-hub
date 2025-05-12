
export interface ClinicalTag {
  id: string;
  record_id: string;
  tag: string;
  source: string;
  created_at: string;
  confidence?: number;
}

export interface ClinicalRecord {
  id: string;
  title: string;
  description?: string;
  record_type: string;
  symptoms?: string[];
  diagnosis?: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  related_innovation_id?: string;
  medical_codes?: Record<string, string>;
}
