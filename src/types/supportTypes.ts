
export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assigned_team?: string;
  assigned_to?: string;
  sentiment?: string;
  initial_response?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  // New fields
  metadata?: any;
  tags?: string[];
  satisfaction_rating?: number;
  response_time_minutes?: number;
  resource_id?: string;
  resource_type?: string;
}

export interface SupportInteraction {
  id: string;
  user_id: string;
  ticket_id?: string;
  query?: string;
  response?: string;
  interaction_type: string;
  created_at: string;
  // New fields
  feedback?: boolean;
  ai_generated?: boolean;
  metadata?: any;
  tags?: string[];
}

export interface FeedbackSummary {
  summary: string;
  sentimentBreakdown: Record<string, number>;
  commonThemes: string[];
  recommendations: string[];
}

export interface TicketClassification {
  urgency: "low" | "medium" | "high" | "critical";
  sentiment: "positive" | "neutral" | "negative";
  category: string;
  assignedTeam: string;
}

export interface KnowledgeBaseMetric {
  id: string;
  resource_id: string;
  views: number;
  helpful_count: number;
  not_helpful_count: number;
  tickets_resolved: number;
  last_accessed?: string;
  created_at: string;
  updated_at: string;
}

export interface SupportAnalytic {
  id: string;
  metric_name: string;
  metric_value: number;
  category?: string;
  time_period: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}
