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
      knowledge_resources: {
        Row: {
          author: string | null
          category: string
          created_at: string
          description: string
          downloads: number
          featured: boolean
          file_path: string | null
          id: string
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
          created_at?: string
          description: string
          downloads?: number
          featured?: boolean
          file_path?: string | null
          id?: string
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
          created_at?: string
          description?: string
          downloads?: number
          featured?: boolean
          file_path?: string | null
          id?: string
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
      profiles: {
        Row: {
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
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
