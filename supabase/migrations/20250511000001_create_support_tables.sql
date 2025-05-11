
-- Create tables for support system

-- Support tickets table
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed')),
  assigned_team TEXT,
  assigned_to UUID REFERENCES auth.users,
  sentiment TEXT,
  initial_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS support_tickets_user_id_idx ON public.support_tickets (user_id);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON public.support_tickets (status);

-- Support interactions table (chat history, notes, etc.)
CREATE TABLE IF NOT EXISTS public.support_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  ticket_id UUID REFERENCES public.support_tickets,
  query TEXT,
  response TEXT,
  interaction_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS support_interactions_user_id_idx ON public.support_interactions (user_id);
CREATE INDEX IF NOT EXISTS support_interactions_ticket_id_idx ON public.support_interactions (ticket_id);

-- RLS Policies for support tickets
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Users can view their own tickets
CREATE POLICY "Users can view their own support tickets"
  ON public.support_tickets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own tickets
CREATE POLICY "Users can create their own support tickets"
  ON public.support_tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own tickets (except certain fields)
CREATE POLICY "Users can update their own support tickets"
  ON public.support_tickets
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all tickets
CREATE POLICY "Admins can view all support tickets"
  ON public.support_tickets
  FOR SELECT
  USING ((SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Admins can update all tickets
CREATE POLICY "Admins can update all support tickets"
  ON public.support_tickets
  FOR UPDATE
  USING ((SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- RLS Policies for support interactions
ALTER TABLE public.support_interactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own interactions
CREATE POLICY "Users can view their own support interactions"
  ON public.support_interactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own interactions
CREATE POLICY "Users can create their own support interactions"
  ON public.support_interactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all interactions
CREATE POLICY "Admins can view all support interactions"
  ON public.support_interactions
  FOR SELECT
  USING ((SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');
