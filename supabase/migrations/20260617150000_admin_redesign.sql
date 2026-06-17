-- Migration for Admin Dashboard Redesign

-- Add gamification columns to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS total_xp INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS coins INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS streak INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS level INT DEFAULT 1;

-- Create admin helper function for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create games table
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT DEFAULT 'easy',
  xp_reward INT DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on games
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to games"
ON public.games
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Users can read published games"
ON public.games
FOR SELECT
TO authenticated
USING (status = 'published' OR public.is_admin());

-- Create stories table
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  level TEXT DEFAULT 'beginner',
  language TEXT DEFAULT 'en',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on stories
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to stories"
ON public.stories
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Users can read published stories"
ON public.stories
FOR SELECT
TO authenticated
USING (published = true OR public.is_admin());

-- Also ensure admins have access to profiles
CREATE POLICY "Admins can view and update all profiles"
ON public.profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- End of migration
