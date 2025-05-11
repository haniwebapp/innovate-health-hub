
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
}

export interface SupportInteraction {
  id: string;
  user_id: string;
  ticket_id?: string;
  query?: string;
  response?: string;
  interaction_type: string;
  created_at: string;
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
