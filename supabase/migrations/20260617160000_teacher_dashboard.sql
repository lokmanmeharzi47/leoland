-- Migration for Teacher Dashboard

-- Create classrooms table
CREATE TABLE IF NOT EXISTS public.classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;

-- Create classroom_students association table
CREATE TABLE IF NOT EXISTS public.classroom_students (
  classroom_id UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (classroom_id, student_id)
);

ALTER TABLE public.classroom_students ENABLE ROW LEVEL SECURITY;

-- Create student_activity table
CREATE TABLE IF NOT EXISTS public.student_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'completed_lesson', 'played_game', 'completed_story', 'ai_conversation'
  title TEXT NOT NULL,
  xp_earned INT DEFAULT 0,
  score INT, -- optional percentage or points
  lesson_id UUID, -- optional link to lesson
  world_id UUID, -- optional link to world/category
  game_id UUID, -- optional link to game
  story_id UUID, -- optional link to story
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.student_activity ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- 1. Teachers can manage their own classrooms
CREATE POLICY "Teachers can manage their own classrooms"
ON public.classrooms
FOR ALL
TO authenticated
USING (teacher_id = auth.uid())
WITH CHECK (teacher_id = auth.uid());

-- Admins can do everything
CREATE POLICY "Admins have full access to classrooms"
ON public.classrooms
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 2. Teachers can manage students in their classrooms
CREATE POLICY "Teachers can view classroom_students for their classrooms"
ON public.classroom_students
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.classrooms c
    WHERE c.id = classroom_id AND c.teacher_id = auth.uid()
  ) OR public.is_admin()
);

CREATE POLICY "Teachers can manage classroom_students for their classrooms"
ON public.classroom_students
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.classrooms c
    WHERE c.id = classroom_id AND c.teacher_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.classrooms c
    WHERE c.id = classroom_id AND c.teacher_id = auth.uid()
  )
);

-- Admins full access
CREATE POLICY "Admins have full access to classroom_students"
ON public.classroom_students
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. Student Activity Policies
CREATE POLICY "Students can view their own activity"
ON public.student_activity
FOR SELECT
TO authenticated
USING (student_id = auth.uid());

CREATE POLICY "Students can insert their own activity"
ON public.student_activity
FOR INSERT
TO authenticated
WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers can view activity of students in their classrooms"
ON public.student_activity
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.classroom_students cs
    JOIN public.classrooms c ON c.id = cs.classroom_id
    WHERE cs.student_id = student_activity.student_id AND c.teacher_id = auth.uid()
  ) OR public.is_admin()
);

-- Admin
CREATE POLICY "Admins have full access to student_activity"
ON public.student_activity
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
