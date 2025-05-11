
export interface ClinicalRecord {
  id: string;
  title: string;
  description?: string;
  record_type: string;
  medical_codes?: Record<string, any>;
  symptoms?: string[];
  diagnosis?: string[];
  related_innovation_id?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface ClinicalTag {
  id: string;
  record_id: string;
  tag: string;
  confidence?: number;
  source: string;
  created_at: Date;
}

export interface ClinicalAnalysis {
  id: string;
  record_id: string;
  analysis_type: string;
  results: Record<string, any>;
  confidence?: number;
  created_at: Date;
  created_by: string;
}

export interface ClinicalRecordFormData {
  title: string;
  description?: string;
  record_type: string;
  medical_codes?: Record<string, any>;
  symptoms?: string[];
  diagnosis?: string[];
  related_innovation_id?: string;
}

export interface ClinicalTagFormData {
  record_id: string;
  tag: string;
  confidence?: number;
  source: string;
}

export interface ClinicalAnalysisFormData {
  record_id: string;
  analysis_type: string;
  results: Record<string, any>;
  confidence?: number;
}
