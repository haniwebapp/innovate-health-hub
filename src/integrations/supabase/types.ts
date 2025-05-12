export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_type: string
          created_at: string | null
          details: Json | null
          id: string
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      admin_analytics: {
        Row: {
          created_at: string
          dimension: string | null
          end_date: string
          id: string
          metric_name: string
          metric_value: number
          start_date: string
          time_period: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dimension?: string | null
          end_date: string
          id?: string
          metric_name: string
          metric_value: number
          start_date: string
          time_period: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dimension?: string | null
          end_date?: string
          id?: string
          metric_name?: string
          metric_value?: number
          start_date?: string
          time_period?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_logs: {
        Row: {
          created_at: string
          details: Json
          duration_ms: number | null
          environment: string | null
          id: string
          ip_address: string | null
          log_type: string
          request_path: string | null
          resource_id: string | null
          session_id: string | null
          severity: string
          source: string
          status_code: number | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details: Json
          duration_ms?: number | null
          environment?: string | null
          id?: string
          ip_address?: string | null
          log_type: string
          request_path?: string | null
          resource_id?: string | null
          session_id?: string | null
          severity: string
          source: string
          status_code?: number | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json
          duration_ms?: number | null
          environment?: string | null
          id?: string
          ip_address?: string | null
          log_type?: string
          request_path?: string | null
          resource_id?: string | null
          session_id?: string | null
          severity?: string
          source?: string
          status_code?: number | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_call_traces: {
        Row: {
          duration: number | null
          endpoint: string | null
          id: string
          operation_log_id: string
          request_data: Json | null
          response_data: Json | null
          service_name: string
          timestamp: string
          trace_type: string
        }
        Insert: {
          duration?: number | null
          endpoint?: string | null
          id?: string
          operation_log_id: string
          request_data?: Json | null
          response_data?: Json | null
          service_name: string
          timestamp?: string
          trace_type: string
        }
        Update: {
          duration?: number | null
          endpoint?: string | null
          id?: string
          operation_log_id?: string
          request_data?: Json | null
          response_data?: Json | null
          service_name?: string
          timestamp?: string
          trace_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_call_traces_operation_log_id_fkey"
            columns: ["operation_log_id"]
            isOneToOne: false
            referencedRelation: "ai_operations_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: string
          operation_log_id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          operation_log_id: string
          rating?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          operation_log_id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_feedback_operation_log_id_fkey"
            columns: ["operation_log_id"]
            isOneToOne: false
            referencedRelation: "ai_operations_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_match_scores: {
        Row: {
          analyzed_at: string
          created_at: string
          id: string
          innovation_id: string
          investor_id: string
          match_reasons: Json | null
          match_score: number
          updated_at: string
        }
        Insert: {
          analyzed_at?: string
          created_at?: string
          id?: string
          innovation_id: string
          investor_id: string
          match_reasons?: Json | null
          match_score: number
          updated_at?: string
        }
        Update: {
          analyzed_at?: string
          created_at?: string
          id?: string
          innovation_id?: string
          investor_id?: string
          match_reasons?: Json | null
          match_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_match_scores_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_monitoring_logs: {
        Row: {
          created_at: string
          endpoint: string
          error_message: string | null
          execution_time_ms: number | null
          id: string
          request_payload: Json | null
          response_payload: Json | null
          service_name: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          endpoint: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          request_payload?: Json | null
          response_payload?: Json | null
          service_name: string
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          endpoint?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          request_payload?: Json | null
          response_payload?: Json | null
          service_name?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_operations_logs: {
        Row: {
          created_at: string
          duration: number | null
          error_details: string | null
          id: string
          input_summary: Json | null
          metadata: Json | null
          operation_name: string
          output_summary: Json | null
          service_name: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          error_details?: string | null
          id?: string
          input_summary?: Json | null
          metadata?: Json | null
          operation_name: string
          output_summary?: Json | null
          service_name: string
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          error_details?: string | null
          id?: string
          input_summary?: Json | null
          metadata?: Json | null
          operation_name?: string
          output_summary?: Json | null
          service_name?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      application_compliance: {
        Row: {
          application_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          requirement_id: string
          updated_at: string
        }
        Insert: {
          application_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          requirement_id: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          requirement_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_compliance_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "regulatory_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_compliance_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "compliance_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      application_documents: {
        Row: {
          application_id: string
          file_path: string
          file_type: string
          id: string
          name: string
          notes: string | null
          size: number
          status: string | null
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          application_id: string
          file_path: string
          file_type: string
          id?: string
          name: string
          notes?: string | null
          size: number
          status?: string | null
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          application_id?: string
          file_path?: string
          file_type?: string
          id?: string
          name?: string
          notes?: string | null
          size?: number
          status?: string | null
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "regulatory_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_similarities: {
        Row: {
          challenge_id: string | null
          created_at: string | null
          id: string
          overlapping_concepts: string[] | null
          similar_challenge_id: string | null
          similarity_score: number
          updated_at: string | null
        }
        Insert: {
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          overlapping_concepts?: string[] | null
          similar_challenge_id?: string | null
          similarity_score: number
          updated_at?: string | null
        }
        Update: {
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          overlapping_concepts?: string[] | null
          similar_challenge_id?: string | null
          similarity_score?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_similarities_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_similarities_similar_challenge_id_fkey"
            columns: ["similar_challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_submissions: {
        Row: {
          challenge_id: string
          description: string
          feedback: string | null
          id: string
          score: number | null
          status: string
          submitted_at: string
          summary: string
          team_members: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          description: string
          feedback?: string | null
          id?: string
          score?: number | null
          status?: string
          submitted_at?: string
          summary: string
          team_members?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          description?: string
          feedback?: string | null
          id?: string
          score?: number | null
          status?: string
          submitted_at?: string
          summary?: string
          team_members?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string
          eligibility: string | null
          end_date: string
          id: string
          image_url: string | null
          long_description: string | null
          organizer: string
          prize: string | null
          requirements: Json | null
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          eligibility?: string | null
          end_date: string
          id?: string
          image_url?: string | null
          long_description?: string | null
          organizer?: string
          prize?: string | null
          requirements?: Json | null
          start_date?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          eligibility?: string | null
          end_date?: string
          id?: string
          image_url?: string | null
          long_description?: string | null
          organizer?: string
          prize?: string | null
          requirements?: Json | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      clinical_analyses: {
        Row: {
          analysis_type: string
          confidence: number | null
          created_at: string
          created_by: string
          id: string
          record_id: string
          results: Json
        }
        Insert: {
          analysis_type: string
          confidence?: number | null
          created_at?: string
          created_by: string
          id?: string
          record_id: string
          results: Json
        }
        Update: {
          analysis_type?: string
          confidence?: number | null
          created_at?: string
          created_by?: string
          id?: string
          record_id?: string
          results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "clinical_analyses_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "clinical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_records: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          diagnosis: string[] | null
          id: string
          medical_codes: Json | null
          record_type: string
          related_innovation_id: string | null
          symptoms: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          diagnosis?: string[] | null
          id?: string
          medical_codes?: Json | null
          record_type: string
          related_innovation_id?: string | null
          symptoms?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          diagnosis?: string[] | null
          id?: string
          medical_codes?: Json | null
          record_type?: string
          related_innovation_id?: string | null
          symptoms?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      clinical_tags: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          record_id: string
          source: string
          tag: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          record_id: string
          source: string
          tag: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          record_id?: string
          source?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinical_tags_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "clinical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          resource_id: string
          resource_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          resource_id: string
          resource_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          resource_id?: string
          resource_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_records: {
        Row: {
          applicable_regulations: string[] | null
          compliance_type: string
          created_at: string
          created_by: string
          description: string
          evidence_links: string[] | null
          id: string
          resource_id: string | null
          resource_type: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          standard_name: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          applicable_regulations?: string[] | null
          compliance_type: string
          created_at?: string
          created_by: string
          description: string
          evidence_links?: string[] | null
          id?: string
          resource_id?: string | null
          resource_type?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          standard_name: string
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          applicable_regulations?: string[] | null
          compliance_type?: string
          created_at?: string
          created_by?: string
          description?: string
          evidence_links?: string[] | null
          id?: string
          resource_id?: string | null
          resource_type?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          standard_name?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      compliance_requirements: {
        Row: {
          created_at: string
          description: string
          framework_id: string
          id: string
          order_index: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          framework_id: string
          id?: string
          order_index?: number
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          framework_id?: string
          id?: string
          order_index?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_requirements_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "regulatory_frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_standards: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          issuing_body: string
          name: string
          publication_date: string | null
          requirements: Json | null
          updated_at: string | null
          url: string | null
          version: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          issuing_body: string
          name: string
          publication_date?: string | null
          requirements?: Json | null
          updated_at?: string | null
          url?: string | null
          version?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          issuing_body?: string
          name?: string
          publication_date?: string | null
          requirements?: Json | null
          updated_at?: string | null
          url?: string | null
          version?: string | null
        }
        Relationships: []
      }
      ethics_assessment_results: {
        Row: {
          application_id: string
          assessed_at: string | null
          concerns: string[] | null
          created_at: string | null
          fairness_score: number
          id: string
          overall_score: number
          privacy_score: number
          recommendations: string[] | null
          safety_score: number
          summary: string
          transparency_score: number
          updated_at: string | null
        }
        Insert: {
          application_id: string
          assessed_at?: string | null
          concerns?: string[] | null
          created_at?: string | null
          fairness_score: number
          id?: string
          overall_score: number
          privacy_score: number
          recommendations?: string[] | null
          safety_score: number
          summary: string
          transparency_score: number
          updated_at?: string | null
        }
        Update: {
          application_id?: string
          assessed_at?: string | null
          concerns?: string[] | null
          created_at?: string | null
          fairness_score?: number
          id?: string
          overall_score?: number
          privacy_score?: number
          recommendations?: string[] | null
          safety_score?: number
          summary?: string
          transparency_score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          attended: boolean | null
          event_id: string
          feedback: string | null
          id: string
          rating: number | null
          registration_date: string
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          event_id: string
          feedback?: string | null
          id?: string
          rating?: number | null
          registration_date?: string
          user_id: string
        }
        Update: {
          attended?: boolean | null
          event_id?: string
          feedback?: string | null
          id?: string
          rating?: number | null
          registration_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string
          end_date: string
          event_type: string
          event_url: string | null
          featured: boolean
          id: string
          is_virtual: boolean
          location: string | null
          max_attendees: number | null
          presenter: string | null
          presenter_organization: string | null
          presenter_title: string | null
          recording_url: string | null
          registration_url: string | null
          start_date: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          end_date: string
          event_type: string
          event_url?: string | null
          featured?: boolean
          id?: string
          is_virtual?: boolean
          location?: string | null
          max_attendees?: number | null
          presenter?: string | null
          presenter_organization?: string | null
          presenter_title?: string | null
          recording_url?: string | null
          registration_url?: string | null
          start_date: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          end_date?: string
          event_type?: string
          event_url?: string | null
          featured?: boolean
          id?: string
          is_virtual?: boolean
          location?: string | null
          max_attendees?: number | null
          presenter?: string | null
          presenter_organization?: string | null
          presenter_title?: string | null
          recording_url?: string | null
          registration_url?: string | null
          start_date?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      innovation_investments: {
        Row: {
          amount: number
          created_at: string
          equity_percentage: number | null
          id: string
          innovation_id: string
          investment_date: string
          investor_id: string
          notes: string | null
          program_id: string | null
          status: string
          terms: string | null
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          equity_percentage?: number | null
          id?: string
          innovation_id: string
          investment_date: string
          investor_id: string
          notes?: string | null
          program_id?: string | null
          status: string
          terms?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          equity_percentage?: number | null
          id?: string
          innovation_id?: string
          investment_date?: string
          investor_id?: string
          notes?: string | null
          program_id?: string | null
          status?: string
          terms?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "innovation_investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "innovation_investments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "investment_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          integration_id: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          integration_id?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          integration_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json
          created_at: string | null
          description: string | null
          endpoint: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          config: Json
          created_at?: string | null
          description?: string | null
          endpoint?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          description?: string | null
          endpoint?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      investment_programs: {
        Row: {
          amount_max: number | null
          amount_min: number | null
          application_url: string | null
          created_at: string
          criteria: Json | null
          deadline: string | null
          description: string
          id: string
          name: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          amount_max?: number | null
          amount_min?: number | null
          application_url?: string | null
          created_at?: string
          criteria?: Json | null
          deadline?: string | null
          description: string
          id?: string
          name: string
          status: string
          type: string
          updated_at?: string
        }
        Update: {
          amount_max?: number | null
          amount_min?: number | null
          application_url?: string | null
          created_at?: string
          criteria?: Json | null
          deadline?: string | null
          description?: string
          id?: string
          name?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      investor_profiles: {
        Row: {
          bio: string | null
          contact_email: string
          created_at: string
          geographic_focus: string[] | null
          id: string
          investment_focus: string[]
          investment_size_max: number | null
          investment_size_min: number | null
          investment_stage: string[]
          logo_url: string | null
          organization_name: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          contact_email: string
          created_at?: string
          geographic_focus?: string[] | null
          id?: string
          investment_focus: string[]
          investment_size_max?: number | null
          investment_size_min?: number | null
          investment_stage: string[]
          logo_url?: string | null
          organization_name: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          contact_email?: string
          created_at?: string
          geographic_focus?: string[] | null
          id?: string
          investment_focus?: string[]
          investment_size_max?: number | null
          investment_size_min?: number | null
          investment_stage?: string[]
          logo_url?: string | null
          organization_name?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      knowledge_embeddings: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string
          resource_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          resource_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          resource_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_embeddings_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "knowledge_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_resources: {
        Row: {
          author: string | null
          category: string
          content: string | null
          created_at: string
          description: string
          downloads: number
          featured: boolean
          file_path: string | null
          file_url: string | null
          id: string
          key_points: string[] | null
          relevant_topics: string[] | null
          summary: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
          url: string | null
        }
        Insert: {
          author?: string | null
          category: string
          content?: string | null
          created_at?: string
          description: string
          downloads?: number
          featured?: boolean
          file_path?: string | null
          file_url?: string | null
          id?: string
          key_points?: string[] | null
          relevant_topics?: string[] | null
          summary?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          author?: string | null
          category?: string
          content?: string | null
          created_at?: string
          description?: string
          downloads?: number
          featured?: boolean
          file_path?: string | null
          file_url?: string | null
          id?: string
          key_points?: string[] | null
          relevant_topics?: string[] | null
          summary?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      learning_modules: {
        Row: {
          content_type: string
          content_url: string | null
          created_at: string
          description: string
          estimated_minutes: number
          id: string
          order_index: number
          path_id: string
          resource_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content_type: string
          content_url?: string | null
          created_at?: string
          description: string
          estimated_minutes: number
          id?: string
          order_index: number
          path_id: string
          resource_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content_type?: string
          content_url?: string | null
          created_at?: string
          description?: string
          estimated_minutes?: number
          id?: string
          order_index?: number
          path_id?: string
          resource_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_modules_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_modules_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "knowledge_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          category: string
          created_at: string
          description: string
          estimated_hours: number
          featured: boolean
          id: string
          level: string
          prerequisite_path_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          estimated_hours: number
          featured?: boolean
          id?: string
          level: string
          prerequisite_path_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          estimated_hours?: number
          featured?: boolean
          id?: string
          level?: string
          prerequisite_path_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_prerequisite_path_id_fkey"
            columns: ["prerequisite_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      market_analysis_reports: {
        Row: {
          cagr: number | null
          challenges: string[] | null
          created_at: string | null
          id: string
          key_players: Json | null
          market_size: number | null
          opportunities: string[] | null
          region: string
          report_date: string | null
          sector: string
          trends: Json | null
          updated_at: string | null
        }
        Insert: {
          cagr?: number | null
          challenges?: string[] | null
          created_at?: string | null
          id?: string
          key_players?: Json | null
          market_size?: number | null
          opportunities?: string[] | null
          region: string
          report_date?: string | null
          sector: string
          trends?: Json | null
          updated_at?: string | null
        }
        Update: {
          cagr?: number | null
          challenges?: string[] | null
          created_at?: string | null
          id?: string
          key_players?: Json | null
          market_size?: number | null
          opportunities?: string[] | null
          region?: string
          report_date?: string | null
          sector?: string
          trends?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      market_trends: {
        Row: {
          category: string
          created_at: string
          data: Json
          date_range_end: string | null
          date_range_start: string | null
          description: string
          id: string
          relevance_score: number | null
          source: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          data: Json
          date_range_end?: string | null
          date_range_start?: string | null
          description: string
          id?: string
          relevance_score?: number | null
          source?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          data?: Json
          date_range_end?: string | null
          date_range_start?: string | null
          description?: string
          id?: string
          relevance_score?: number | null
          source?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_threads: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_group: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_group?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_group?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string | null
          sender_id: string
          thread_id: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string | null
          sender_id: string
          thread_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string | null
          sender_id?: string
          thread_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          content: string
          created_at: string | null
          id: string
          notification_type: string
          read: boolean | null
          title: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          content: string
          created_at?: string | null
          id?: string
          notification_type: string
          read?: boolean | null
          title: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          content?: string
          created_at?: string | null
          id?: string
          notification_type?: string
          read?: boolean | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          last_sign_in: string | null
          organization: string | null
          roles: string[] | null
          status: string
          updated_at: string
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          last_sign_in?: string | null
          organization?: string | null
          roles?: string[] | null
          status?: string
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_sign_in?: string | null
          organization?: string | null
          roles?: string[] | null
          status?: string
          updated_at?: string
          user_type?: string | null
        }
        Relationships: []
      }
      regulatory_analysis_results: {
        Row: {
          analyzed_at: string | null
          applicable_regulations: Json | null
          application_id: string
          compliance_score: number
          compliance_timeline: Json | null
          created_at: string | null
          documentation_needed: string[] | null
          id: string
          key_requirements: Json | null
          next_steps: string[] | null
          risk_level: string
          summary: string
          testing_requirements: string[] | null
          updated_at: string | null
        }
        Insert: {
          analyzed_at?: string | null
          applicable_regulations?: Json | null
          application_id: string
          compliance_score: number
          compliance_timeline?: Json | null
          created_at?: string | null
          documentation_needed?: string[] | null
          id?: string
          key_requirements?: Json | null
          next_steps?: string[] | null
          risk_level: string
          summary: string
          testing_requirements?: string[] | null
          updated_at?: string | null
        }
        Update: {
          analyzed_at?: string | null
          applicable_regulations?: Json | null
          application_id?: string
          compliance_score?: number
          compliance_timeline?: Json | null
          created_at?: string | null
          documentation_needed?: string[] | null
          id?: string
          key_requirements?: Json | null
          next_steps?: string[] | null
          risk_level?: string
          summary?: string
          testing_requirements?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      regulatory_applications: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          framework_id: string
          id: string
          innovation_type: string
          name: string
          risk_level: string | null
          start_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string | null
          framework_id: string
          id?: string
          innovation_type: string
          name: string
          risk_level?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          framework_id?: string
          id?: string
          innovation_type?: string
          name?: string
          risk_level?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regulatory_applications_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "regulatory_frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_frameworks: {
        Row: {
          created_at: string
          description: string
          icon: string | null
          id: string
          title: string
          total_steps: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          title: string
          total_steps?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          title?: string
          total_steps?: number
          updated_at?: string
        }
        Relationships: []
      }
      sandbox_applications: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          framework_id: string | null
          id: string
          innovation_type: string
          innovator: string
          name: string
          organization_type: string
          progress: number | null
          regulatory_challenges: string | null
          risk_level: string | null
          start_date: string | null
          status: string
          submitted_at: string | null
          testing_duration: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string | null
          framework_id?: string | null
          id?: string
          innovation_type: string
          innovator: string
          name: string
          organization_type: string
          progress?: number | null
          regulatory_challenges?: string | null
          risk_level?: string | null
          start_date?: string | null
          status?: string
          submitted_at?: string | null
          testing_duration: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          framework_id?: string | null
          id?: string
          innovation_type?: string
          innovator?: string
          name?: string
          organization_type?: string
          progress?: number | null
          regulatory_challenges?: string | null
          risk_level?: string | null
          start_date?: string | null
          status?: string
          submitted_at?: string | null
          testing_duration?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_applications_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "regulatory_frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
      sandbox_compliance_requirements: {
        Row: {
          application_id: string
          completed: boolean
          created_at: string
          description: string
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          application_id: string
          completed?: boolean
          created_at?: string
          description: string
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          completed?: boolean
          created_at?: string
          description?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_compliance_requirements_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "sandbox_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      sandbox_feedback: {
        Row: {
          application_id: string
          author: string
          author_role: string
          created_at: string
          id: string
          is_official: boolean
          message: string
        }
        Insert: {
          application_id: string
          author: string
          author_role: string
          created_at?: string
          id?: string
          is_official?: boolean
          message: string
        }
        Update: {
          application_id?: string
          author?: string
          author_role?: string
          created_at?: string
          id?: string
          is_official?: boolean
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_feedback_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "sandbox_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      sandbox_test_results: {
        Row: {
          application_id: string
          created_at: string
          created_by: string
          data: Json | null
          id: string
          notes: string | null
          score: number | null
          status: string
          test_date: string
          test_name: string
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          created_by: string
          data?: Json | null
          id?: string
          notes?: string | null
          score?: number | null
          status: string
          test_date?: string
          test_name: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          created_by?: string
          data?: Json | null
          id?: string
          notes?: string | null
          score?: number | null
          status?: string
          test_date?: string
          test_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_test_results_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "regulatory_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          category: string
          challenge_id: string
          challenge_title: string
          created_at: string | null
          description: string | null
          feedback: string | null
          id: string
          score: number | null
          status: string
          submitted_at: string | null
          team_members: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          challenge_id: string
          challenge_title: string
          created_at?: string | null
          description?: string | null
          feedback?: string | null
          id?: string
          score?: number | null
          status: string
          submitted_at?: string | null
          team_members?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          challenge_id?: string
          challenge_title?: string
          created_at?: string | null
          description?: string | null
          feedback?: string | null
          id?: string
          score?: number | null
          status?: string
          submitted_at?: string | null
          team_members?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      success_stories: {
        Row: {
          author_id: string | null
          category: string
          content: string
          cover_image_url: string | null
          created_at: string
          featured: boolean
          id: string
          impact_metrics: Json | null
          organization: string | null
          publication_date: string | null
          status: string
          summary: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          cover_image_url?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          impact_metrics?: Json | null
          organization?: string | null
          publication_date?: string | null
          status?: string
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          impact_metrics?: Json | null
          organization?: string | null
          publication_date?: string | null
          status?: string
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: string
          query: string | null
          response: string | null
          ticket_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: string
          query?: string | null
          response?: string | null
          ticket_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: string
          query?: string | null
          response?: string | null
          ticket_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_interactions_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_team: string | null
          assigned_to: string | null
          category: string
          created_at: string
          description: string
          id: string
          initial_response: string | null
          priority: string
          resolved_at: string | null
          sentiment: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_team?: string | null
          assigned_to?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          initial_response?: string | null
          priority: string
          resolved_at?: string | null
          sentiment?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_team?: string | null
          assigned_to?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          initial_response?: string | null
          priority?: string
          resolved_at?: string | null
          sentiment?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role: string
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      thread_participants: {
        Row: {
          id: string
          joined_at: string | null
          last_read_at: string | null
          thread_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          thread_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          thread_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_participants_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_summary: {
        Row: {
          comment_count: number | null
          created_at: string
          event_participation_count: number | null
          id: string
          last_login_at: string | null
          login_count: number | null
          resource_view_count: number | null
          submission_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          comment_count?: number | null
          created_at?: string
          event_participation_count?: number | null
          id?: string
          last_login_at?: string | null
          login_count?: number | null
          resource_view_count?: number | null
          submission_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          comment_count?: number | null
          created_at?: string
          event_participation_count?: number | null
          id?: string
          last_login_at?: string | null
          login_count?: number | null
          resource_view_count?: number | null
          submission_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          last_activity_at: string
          module_id: string
          notes: string | null
          path_id: string
          progress_percentage: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_activity_at?: string
          module_id: string
          notes?: string | null
          path_id: string
          progress_percentage?: number
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_activity_at?: string
          module_id?: string
          notes?: string | null
          path_id?: string
          progress_percentage?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_learning_progress_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_saved_resources: {
        Row: {
          id: string
          notes: string | null
          resource_id: string
          saved_at: string
          user_id: string
        }
        Insert: {
          id?: string
          notes?: string | null
          resource_id: string
          saved_at?: string
          user_id: string
        }
        Update: {
          id?: string
          notes?: string | null
          resource_id?: string
          saved_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_resources_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "knowledge_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      vision_2030_alignment_analyses: {
        Row: {
          alignment_areas: string[] | null
          alignment_score: number
          analyzed_at: string | null
          created_at: string | null
          id: string
          improvement_areas: string[] | null
          innovation_id: string
          potential_impact: string | null
          recommendations: string[] | null
          updated_at: string | null
          vision2030_objectives: string[] | null
        }
        Insert: {
          alignment_areas?: string[] | null
          alignment_score: number
          analyzed_at?: string | null
          created_at?: string | null
          id?: string
          improvement_areas?: string[] | null
          innovation_id: string
          potential_impact?: string | null
          recommendations?: string[] | null
          updated_at?: string | null
          vision2030_objectives?: string[] | null
        }
        Update: {
          alignment_areas?: string[] | null
          alignment_score?: number
          analyzed_at?: string | null
          created_at?: string | null
          id?: string
          improvement_areas?: string[] | null
          innovation_id?: string
          potential_impact?: string | null
          recommendations?: string[] | null
          updated_at?: string | null
          vision2030_objectives?: string[] | null
        }
        Relationships: []
      }
      webinar_registrations: {
        Row: {
          attended: boolean | null
          feedback: string | null
          id: string
          rating: number | null
          registration_date: string
          user_id: string
          webinar_id: string
        }
        Insert: {
          attended?: boolean | null
          feedback?: string | null
          id?: string
          rating?: number | null
          registration_date?: string
          user_id: string
          webinar_id: string
        }
        Update: {
          attended?: boolean | null
          feedback?: string | null
          id?: string
          rating?: number | null
          registration_date?: string
          user_id?: string
          webinar_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webinar_registrations_webinar_id_fkey"
            columns: ["webinar_id"]
            isOneToOne: false
            referencedRelation: "webinars"
            referencedColumns: ["id"]
          },
        ]
      }
      webinars: {
        Row: {
          category: string
          created_at: string
          description: string
          duration_minutes: number
          id: string
          max_attendees: number | null
          presenter: string
          presenter_organization: string | null
          presenter_title: string | null
          recording_url: string | null
          registration_url: string | null
          scheduled_date: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          webinar_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          duration_minutes: number
          id?: string
          max_attendees?: number | null
          presenter: string
          presenter_organization?: string | null
          presenter_title?: string | null
          recording_url?: string | null
          registration_url?: string | null
          scheduled_date: string
          status: string
          tags?: string[] | null
          title: string
          updated_at?: string
          webinar_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          max_attendees?: number | null
          presenter?: string
          presenter_organization?: string | null
          presenter_title?: string | null
          recording_url?: string | null
          registration_url?: string | null
          scheduled_date?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          webinar_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analyze_application_compliance: {
        Args: { app_id: string; app_description: string; app_type: string }
        Returns: {
          application_id: string
          completed: boolean
          created_at: string
          description: string
          id: string
          status: string
          title: string
          updated_at: string
        }[]
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      detect_log_anomalies: {
        Args: { hours_window?: number }
        Returns: {
          log_type: string
          source: string
          normal_count: number
          current_count: number
          percent_change: number
          is_anomaly: boolean
        }[]
      }
      get_challenge_submissions: {
        Args: { input_challenge_id: string }
        Returns: {
          id: string
          title: string
          summary: string
          description: string
          challenge_id: string
          user_id: string
          team_members: string
          status: string
          submitted_at: string
          updated_at: string
          score: number
          feedback: string
          user_first_name: string
          user_last_name: string
          user_organization: string
        }[]
      }
      get_logs_by_date_range_and_environment: {
        Args: { start_date: string; end_date: string; env?: string }
        Returns: {
          id: string
          log_type: string
          source: string
          severity: string
          details: Json
          created_at: string
          user_id: string
          environment: string
          count: number
        }[]
      }
      get_logs_by_source: {
        Args: { start_date: string; end_date: string }
        Returns: {
          source: string
          count: number
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          title: string
          description: string
          category: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      summarize_logs_by_severity: {
        Args: { start_date: string; end_date: string }
        Returns: {
          severity: string
          count: number
        }[]
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
