-- Migration for Dynamic Student Dashboard

-- 1. Create worlds table
CREATE TABLE IF NOT EXISTS public.worlds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.worlds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view worlds" ON public.worlds FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage worlds" ON public.worlds FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 2. Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  world_id UUID NOT NULL REFERENCES public.worlds(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  "order" INT DEFAULT 0,
  xp_reward INT DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage lessons" ON public.lessons FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. Create student_progress table
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  world_id UUID NOT NULL REFERENCES public.worlds(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  progress_percentage INT DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view own progress" ON public.student_progress FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Students can update own progress" ON public.student_progress FOR ALL TO authenticated USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY "Teachers can view classroom progress" ON public.student_progress FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.classroom_students cs
    JOIN public.classrooms c ON c.id = cs.classroom_id
    WHERE cs.student_id = student_progress.student_id AND c.teacher_id = auth.uid()
  ) OR public.is_admin()
);
CREATE POLICY "Admins full access to progress" ON public.student_progress FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 4. Create student_badges table
CREATE TABLE IF NOT EXISTS public.student_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_name TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view own badges" ON public.student_badges FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Admins full access badges" ON public.student_badges FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. Create student_words table
CREATE TABLE IF NOT EXISTS public.student_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  learned_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_words ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view own words" ON public.student_words FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Students can insert own words" ON public.student_words FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
CREATE POLICY "Admins full access words" ON public.student_words FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6. Create ai_conversations table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  duration_minutes INT DEFAULT 0,
  message_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view own AI convos" ON public.ai_conversations FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Students can insert AI convos" ON public.ai_conversations FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
CREATE POLICY "Teachers can view AI convos" ON public.ai_conversations FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.classroom_students cs
    JOIN public.classrooms c ON c.id = cs.classroom_id
    WHERE cs.student_id = ai_conversations.student_id AND c.teacher_id = auth.uid()
  ) OR public.is_admin()
);

-- 7. Create students View
-- This perfectly matches the requested query: supabase.from('students').select('*')
CREATE OR REPLACE VIEW public.students AS
SELECT * FROM public.profiles WHERE role = 'student';


-- 8. Seed Data (Worlds and Lessons)
INSERT INTO public.worlds (id, title, description, "order")
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Vocabulary Forest', 'Learn new words in the magical forest.', 1),
  ('22222222-2222-2222-2222-222222222222', 'Grammar Castle', 'Master sentence structures.', 2),
  ('33333333-3333-3333-3333-333333333333', 'Speaking Ocean', 'Practice pronunciation with ocean friends.', 3),
  ('44444444-4444-4444-4444-444444444444', 'Reading Valley', 'Read exciting stories.', 4),
  ('55555555-5555-5555-5555-555555555555', 'Writing Mountain', 'Climb to the top with perfect paragraphs.', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (world_id, title, "order", xp_reward)
VALUES
  -- Vocabulary Forest
  ('11111111-1111-1111-1111-111111111111', 'Animals and Nature', 1, 50),
  ('11111111-1111-1111-1111-111111111111', 'Wild Animals', 2, 50),
  ('11111111-1111-1111-1111-111111111111', 'Colors and Shapes', 3, 50),
  ('11111111-1111-1111-1111-111111111111', 'Food and Drinks', 4, 50),
  ('11111111-1111-1111-1111-111111111111', 'Family Members', 5, 50),
  -- Grammar Castle
  ('22222222-2222-2222-2222-222222222222', 'Present Tense', 1, 60),
  ('22222222-2222-2222-2222-222222222222', 'Past Tense', 2, 60),
  ('22222222-2222-2222-2222-222222222222', 'Future Tense', 3, 60),
  -- Speaking Ocean
  ('33333333-3333-3333-3333-333333333333', 'Greeting Friends', 1, 40),
  ('33333333-3333-3333-3333-333333333333', 'Asking Questions', 2, 40)
ON CONFLICT DO NOTHING;
