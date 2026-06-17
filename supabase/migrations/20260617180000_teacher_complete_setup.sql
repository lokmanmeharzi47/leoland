-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL, -- 'lesson', 'game', 'story', 'world'
  content_id UUID NOT NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed'
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (student_id IS NOT NULL OR classroom_id IS NOT NULL)
);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Teachers can manage assignments they created
CREATE POLICY "Teachers can manage their assignments"
ON public.assignments
FOR ALL
TO authenticated
USING (teacher_id = auth.uid())
WITH CHECK (teacher_id = auth.uid());

-- Students can view assignments assigned to them directly or to their classroom
CREATE POLICY "Students can view their assignments"
ON public.assignments
FOR SELECT
TO authenticated
USING (
  student_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.classroom_students
    WHERE classroom_id = assignments.classroom_id AND student_id = auth.uid()
  )
);

-- Students can update assignments (e.g. mark completed) assigned to them
CREATE POLICY "Students can update their assignments"
ON public.assignments
FOR UPDATE
TO authenticated
USING (
  student_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.classroom_students
    WHERE classroom_id = assignments.classroom_id AND student_id = auth.uid()
  )
)
WITH CHECK (
  student_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.classroom_students
    WHERE classroom_id = assignments.classroom_id AND student_id = auth.uid()
  )
);

-- Admins
CREATE POLICY "Admins have full access to assignments"
ON public.assignments
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
