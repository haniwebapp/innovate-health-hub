
import { Json } from '@/types/supabase';

export interface ClinicalRecord {
  id: string;
  title: string;
  description?: string;
  record_type: string;
  symptoms?: string[];
  diagnosis?: string[];
  created_by: string;
  created_at: string;
  updated_at?: string;
  medical_codes?: {
    [key: string]: string;
  };
  related_innovation_id?: string;
}

export interface ClinicalTag {
  id: string;
  record_id: string;
  tag: string;
  source: string;
  confidence: number;
  created_at: string;
}

export interface ClinicalAnalysis {
  id?: string;
  record_id: string;
  analysis_type: string;
  results: Json;
  confidence: number;
  created_by: string;
  created_at?: string;
}

export interface TextAnalysisResult {
  tags: string[];
  categories: string[];
  entities: string[];
  summary?: string;
  confidence: number;
}

export interface ClinicalRecordViewerProps {
  record: ClinicalRecord;
  onUpdate: () => void;
}

export interface ClinicalRecordFormProps {
  onSubmit: (data: {
    title?: string;
    description?: string;
    diagnosis?: string[];
    record_type?: string;
    symptoms?: string[];
  }) => void;
  onCancel: () => void;
  initialData?: ClinicalRecord;
}
