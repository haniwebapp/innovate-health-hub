-- Category Management System Migration
-- Run this SQL in your Supabase SQL Editor

-- Create centralized categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  color TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create category mappings table for flexible relationships
CREATE TABLE public.category_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- 'challenge', 'event', 'innovation', etc.
  entity_id UUID NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  UNIQUE(entity_type, entity_id, category_id)
);

-- Create indexes for better performance
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_categories_active ON public.categories(is_active);
CREATE INDEX idx_category_mappings_entity ON public.category_mappings(entity_type, entity_id);
CREATE INDEX idx_category_mappings_category ON public.category_mappings(category_id);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_mappings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Anyone can view active categories" 
ON public.categories 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage all categories" 
ON public.categories 
FOR ALL 
USING ((
  SELECT user_type 
  FROM public.profiles 
  WHERE id = auth.uid()
) = 'admin')
WITH CHECK ((
  SELECT user_type 
  FROM public.profiles 
  WHERE id = auth.uid()
) = 'admin');

-- RLS Policies for category mappings
CREATE POLICY "Anyone can view category mappings" 
ON public.category_mappings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage all category mappings" 
ON public.category_mappings 
FOR ALL 
USING ((
  SELECT user_type 
  FROM public.profiles 
  WHERE id = auth.uid()
) = 'admin')
WITH CHECK ((
  SELECT user_type 
  FROM public.profiles 
  WHERE id = auth.uid()
) = 'admin');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default categories to maintain backward compatibility
INSERT INTO public.categories (name, slug, description, color, icon) VALUES
('Digital Health', 'digital-health', 'Digital health technologies and solutions', '#10B981', 'Smartphone'),
('Medical Devices', 'medical-devices', 'Medical equipment and devices', '#3B82F6', 'Activity'),
('Pharmaceuticals', 'pharmaceuticals', 'Drug development and pharmaceuticals', '#8B5CF6', 'Pill'),
('Biotechnology', 'biotechnology', 'Biotechnology and life sciences', '#F59E0B', 'Dna'),
('Healthcare AI', 'healthcare-ai', 'Artificial intelligence in healthcare', '#EF4444', 'Brain'),
('Telemedicine', 'telemedicine', 'Remote healthcare delivery', '#06B6D4', 'Video'),
('Mental Health', 'mental-health', 'Mental health and wellness', '#84CC16', 'Heart'),
('Diagnostics', 'diagnostics', 'Medical diagnostics and testing', '#F97316', 'Search'),
('Healthcare Analytics', 'healthcare-analytics', 'Data analytics and insights', '#6366F1', 'TrendingUp'),
('Public Health', 'public-health', 'Population health and prevention', '#14B8A6', 'Users');